package net.vydaeon.net.what2craft;

import lombok.Value;

import java.util.List;

@Value
public class Item {

    String id;
    String name;
    Integer buyPrice;
    Integer sellPrice;
    List<RecipeEntry> recipe;

    @Value
    public static class RecipeEntry {

        String itemId;
        Integer quantity;
    }
}
