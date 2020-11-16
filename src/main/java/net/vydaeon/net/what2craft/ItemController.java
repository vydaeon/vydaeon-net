package net.vydaeon.net.what2craft;

import io.micronaut.http.annotation.Controller;
import io.micronaut.http.annotation.Get;
import io.reactivex.Flowable;
import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
class ItemController {

    private final ItemRepository repository;

    @Get("/what-2-craft/items")
    Flowable<Item> getAllItems() {
        return repository.findAll();
    }
}
