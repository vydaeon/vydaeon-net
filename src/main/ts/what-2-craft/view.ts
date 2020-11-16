import m from "mithril"
import model, * as Model from "./model"
import * as Controller from "./controller"

export function getDropdownItems(): m.Children {
    return [
        m(m.route.Link, { class: "dropdown-item", href: "/what-2-craft" }, "How to Use"),
        m(m.route.Link, { class: "dropdown-item", href: "/what-2-craft/ingredients" }, "Ingredients"),
        m(m.route.Link, { class: "dropdown-item", href: "/what-2-craft/hot" }, "Hot Items"),
        m(m.route.Link, { class: "dropdown-item", href: "/what-2-craft/craftable" }, "Craftable Recipes"),
        m(m.route.Link, { class: "dropdown-item", href: "/what-2-craft/all" }, "All Recipes"),
        m(m.route.Link, { class: "dropdown-item", href: "/what-2-craft/hidden" }, "Hidden Recipes")
    ]
}

export const root: m.Component = {
    view: () => {
        const listGroupLinkAttr = (href: string) => ({
            href,
            class: "list-group-item list-group-item-action"
        })
        return m(".d-flex", m(".mx-auto", [
            getHeader2(),
            m("h3.text-center", [
                m("button.btn.btn-lg.disabled", "«"),
                " How to Use ",
                m(m.route.Link, { href: "/what-2-craft/ingredients", class: "btn btn-lg" }, "»")
            ]),
            m(".list-group", m("dl", [
                m(m.route.Link, listGroupLinkAttr("/what-2-craft/ingredients"), [
                    m("dt", "Ingredients"),
                    m("dd",
                        "Lists non-craftable items used to craft, and allows you to enter how many of each you have."
                    )
                ]),
                m(m.route.Link, listGroupLinkAttr("/what-2-craft/hot"), [
                    m("dt", "Hot"),
                    m("dd",
                        "List all recipes, and allows you to select which one(s) are your island's current hot items."
                    )
                ]),
                m(m.route.Link, listGroupLinkAttr("/what-2-craft/craftable"), [
                    m("dt", "Craftable"),
                    m("dd",
                        "Lists recipes you can craft, given how many of each \"Ingredients\" items you have."
                    )
                ]),
                m(m.route.Link, listGroupLinkAttr("/what-2-craft/all"), [
                    m("dt", "All"),
                    m("dd",
                        "Lists all recipes (minus any you choose to hide)."
                    )
                ]),
                m(m.route.Link, listGroupLinkAttr("/what-2-craft/hidden"), [
                    m("dt", "Hidden"),
                    m("dd",
                        "Lists recipes you've previously hidden, allowing you to un-hide them."
                    )
                ])
            ]))
        ]))
    }
}

export const ingredients: m.Component = {
    view: () => m(".d-flex", m(".mx-auto", [
        getHeader2(),
        m("h3.text-center", [
            m(m.route.Link, { href: "/what-2-craft", class: "btn btn-lg" }, "«"),
            " Ingredients ",
            m(m.route.Link, { href: "/what-2-craft/hot", class: "btn btn-lg" }, "»")
        ]),
        getLoadingOrErrorContent(),
        model.ingredientItems.map(item => {
            const inputId = `ingredient_${item.id}`
            const inputAttributes = {
                id: inputId,
                value: model.ingredientQuantities.get(item.id) || "",
                oninput: (e: Event) => {
                    const quantityString = (e.target as HTMLInputElement).value
                    const quantity = quantityString ? parseInt(quantityString) : undefined
                    Controller.setIngredientQuantity(item.id, quantity)
                }
            }
            return m(".form-group.row", { key: inputId }, [
                m("label.col-7.col-form-label", { "for": inputId }, item.name),
                m(".col-5", m("input.form-control[type=number][min=0]", inputAttributes))
            ])
        })
    ]))
}

export const hot: m.Component = {
    view: () => m(".d-flex", m(".mx-auto", [
        getHeader2(),
        m("h3.text-center", [
            m(m.route.Link, { href: "/what-2-craft/ingredients", class: "btn btn-lg" }, "«"),
            " Hot Items ",
            m(m.route.Link, { href: "/what-2-craft/craftable", class: "btn btn-lg" }, "»")
        ]),
        getLoadingOrErrorContent(),
        renderHotItemSelection(1),
        renderHotItemSelection(2)
    ]))
}

export const craftable: m.Component = {
    view: () => [
        getHeader2(),
        m("h3.text-center", [
            m(m.route.Link, { href: "/what-2-craft/hot", class: "btn btn-lg" }, "«"),
            " Craftable Recipes ",
            m(m.route.Link, { href: "/what-2-craft/all", class: "btn btn-lg" }, "»")
        ]),
        getLoadingOrErrorContent(),
        Controller.getCraftableRecipeItems()
            .map(recipeItem => renderRecipeItem("craftableRecipe", recipeItem, true))
    ]
}

export const all: m.Component = {
    view: () => [
        getHeader2(),
        m("h3.text-center", [
            m(m.route.Link, { href: "/what-2-craft/craftable", class: "btn btn-lg" }, "«"),
            " All Recipes ",
            m(m.route.Link, { href: "/what-2-craft/hidden", class: "btn btn-lg" }, "»")
        ]),
        getLoadingOrErrorContent(),
        Controller.getAllRecipeItems()
            .map(recipeItem => renderRecipeItem("recipe", recipeItem, true))
    ]
}

export const hidden: m.Component = {
    view: () => [
        getHeader2(),
        m("h3.text-center", [
            m(m.route.Link, { href: "/what-2-craft/all", class: "btn btn-lg" }, "«"),
            " Hidden Recipes ",
            m("button.btn.btn-lg.disabled", "»")
        ]),
        getLoadingOrErrorContent(),
        Controller.getHiddenRecipeItems()
            .map(recipeItem => renderRecipeItem("hiddenRecipe", recipeItem, false))
    ]
}

function getHeader2() {
    return m("h2.text-center", [
        m("small.text-muted", "Animal Crossing: New Horizons"),
        m("br"),
        "What-2-Craft"
    ])
}

function getLoadingOrErrorContent(): m.Children {
    return model.itemsErrored
        ? m(".alert.alert-danger.text-center", "Error loading data.")
        : model.itemsLoaded
            ? undefined
            : m(".text-center", m(".spinner-border[role=status]", m("span.sr-only", "Loading...")))
}

function renderHotItemSelection(hotItemNumber: number): m.Children {
    if (!model.itemsLoaded) {
        return undefined
    }

    const inputId = `hotItem${hotItemNumber}`
    const selectAttributes = {
        id: inputId,
        oninput: (e: Event) => {
            const itemId = (e.target as HTMLInputElement).value
            Controller.setHotItemRecipe(hotItemNumber, itemId)
        }
    }
    return m(".form-group.row", [
        m("label.col-sm.col-form-label", { "for": inputId }, "Hot Item " + hotItemNumber),
        m(".col-sm", m("select.form-control", selectAttributes, [
            m("option[value=]", "(None)"),
            Controller.getHotItemRecipes().map(recipeItem => {
                const key = `hotItem${hotItemNumber}_option_${recipeItem.id}`
                const isHotItem = model.hotItemIds[hotItemNumber - 1] == recipeItem.id
                const optionAttributes = {
                    key,
                    value: recipeItem.id,
                    selected: isHotItem ? "selected" : undefined
                }
                return m("option", optionAttributes, recipeItem.name)
            })
        ]))
    ])
}

function renderRecipeItem(type: string, item: Model.Item, hide: boolean) {
    const renderNestedRecipe = (recipeEntry: Model.RecipeEntry): m.Children => {
        return [
            model.allItemsById.get(recipeEntry.itemId)?.name || "???",
            " ",
            m("span.badge.badge-secondary.align-text-bottom", recipeEntry.quantity),
            m("ul", recipeEntry.recipe.map(nestedRecipeEntry => {
                return m("li", renderNestedRecipe(nestedRecipeEntry))
            }))
        ]
    }
    return m(".card.mb-3", { key: `${type}_${item.id}` }, [
        m(".card-header.bg-primary.text-light.clearfix", [
            m("h5.m-0.float-left", item.name),
            m("button.close.float-right[type=button][aria-label=Close]",
                {
                    onclick: () => {
                        if (hide) {
                            Controller.hideRecipe(item.id)
                        } else {
                            Controller.unhideRecipe(item.id)
                        }
                    }
                },
                m("span.text-light.h5[aria-hidden=true]", "×")
            )
        ]),
        m(".card-body", [
            m("table.table.table-sm", [
                m("thead", m("tr", [
                    m("th[scope=col]", "Profit"),
                    m("th[scope=col]", "Markup"),
                    m("th[scope=col]", "Sell Price")
                ])),
                m("tbody", m("tr", [
                    m("td", item.profit),
                    m("td", item.markup.toFixed(2)),
                    m("td", item.sellPrice)
                ]))
            ]),
            m("strong", "Recipe:"),
            m("ul.list-inline.m-0", item.recipe.map(ingredient => {
                return m("li.list-inline-item.border.rounded.p-1.mb-2", renderNestedRecipe(ingredient))
            }))
        ])
    ])
}
