package net.vydaeon.net.what2craft;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.reactivex.Flowable;
import io.reactivex.schedulers.Schedulers;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;

import javax.inject.Singleton;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;
import java.util.function.Function;

import static java.nio.file.FileSystems.newFileSystem;
import static java.nio.file.Files.isDirectory;
import static java.util.Collections.emptyMap;
import static java.util.Collections.unmodifiableList;
import static java.util.stream.Collectors.toUnmodifiableMap;

@Singleton
@RequiredArgsConstructor
@Slf4j
class ItemRepository {

    private static final String ITEMS_DIRECTORY_PATH = "/animal_crossing/items";

    private final Flowable<Item> allItems = Flowable.defer(() -> Flowable.fromIterable(loadCraftingItems()))
            .subscribeOn(Schedulers.io())
            .cache();

    private final ObjectMapper objectMapper;

    Flowable<Item> findAll() {
        return allItems;
    }

    private Iterable<Item> loadCraftingItems() {
        var allItemsById = loadAllItemsById();
        var craftingItems = new HashSet<Item>();
        allItemsById.values().stream()
                .filter(item -> item.getRecipe() != null)
                .peek(craftingItems::add)
                .flatMap(item -> item.getRecipe().stream())
                .map(Item.RecipeEntry::getItemId)
                .map(getItem(allItemsById))
                .filter(Objects::nonNull)
                .forEach(craftingItems::add);
        return craftingItems;
    }

    @SneakyThrows
    private Map<String, Item> loadAllItemsById() {
        var itemsPath = getItemsPath();
        try (var itemPaths = Files.walk(itemsPath, 1)) {
            return itemPaths.filter(itemPath -> !isDirectory(itemPath))
                    .map(this::loadItemJson)
                    .filter(this::isNewHorizonsItem)
                    .map(this::toItem)
                    .collect(toUnmodifiableMap(Item::getId, Function.identity()));
        }
    }

    @SneakyThrows
    private Path getItemsPath() {
        var itemsUri = ItemRepository.class.getResource(ITEMS_DIRECTORY_PATH).toURI();
        return "jar".equals(itemsUri.getScheme())
                ? newFileSystem(itemsUri, emptyMap()).getPath(ITEMS_DIRECTORY_PATH)
                : Paths.get(itemsUri);
    }

    @SneakyThrows
    private JsonNode loadItemJson(Path path) {
        try (var reader = Files.newBufferedReader(path)) {
            return objectMapper.readTree(reader);
        }
    }

    private boolean isNewHorizonsItem(JsonNode itemNode) {
        return itemNode.path("games").hasNonNull("nh");
    }

    private Item toItem(JsonNode itemNode) {
        var id = itemNode.get("id").textValue();
        var name = itemNode.get("name").textValue();
        var buyPrice = getBuyPrice(itemNode);
        var sellPrice = getSellPrice(itemNode);
        var recipe = getRecipe(itemNode);
        return new Item(id, name, buyPrice, sellPrice, recipe);
    }

    private Integer getBuyPrice(JsonNode itemNode) {
        var buyPricesNode = itemNode.path("games").path("nh").path("buyPrices");
        if (buyPricesNode.size() > 1) {
            log.warn("item with multiple buy prices: " + itemNode);
        }

        var buyPriceNode = buyPricesNode.path(0).path("value");
        return buyPriceNode.isNumber() ? buyPriceNode.intValue() : null;
    }

    private Integer getSellPrice(JsonNode itemNode) {
        var sellPriceNode = itemNode.path("games").path("nh").path("sellPrice").path("value");
        return sellPriceNode.isNumber() ? sellPriceNode.intValue() : null;
    }

    private List<Item.RecipeEntry> getRecipe(JsonNode itemNode) {
        var recipeNode = itemNode.path("games").path("nh").path("recipe");
        if (!recipeNode.isObject()) {
            return null;
        }

        var recipe = new ArrayList<Item.RecipeEntry>();
        recipeNode.fields()
                .forEachRemaining(entry -> recipe.add(new Item.RecipeEntry(
                        entry.getKey(),
                        entry.getValue()
                                .intValue())));
        return unmodifiableList(recipe);
    }

    private Function<String, Item> getItem(Map<String, Item> allItemsById) {
        return itemId -> {
            var item = allItemsById.get(itemId);
            if (item == null) {
                log.warn("missing recipe ingredient with ID " + itemId);
                return new Item(itemId, itemId, null, null, null);
            }
            return item;
        };
    }
}
