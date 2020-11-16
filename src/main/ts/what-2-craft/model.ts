export interface Item {
    id: string
    name: string
    profit: number
    markup: number
    sellPrice: number
    recipe: Array<RecipeEntry>
    cost: number
}

export interface RecipeEntry {
    itemId: string
    quantity: number
    recipe: Array<RecipeEntry>
}

class Model {
    itemsLoaded = false
    itemsErrored = false
    ingredientItems: Array<Item> = []
    ingredientQuantities: Map<string, number> = new Map
    hotItemIds: Array<string> = ["", ""]
    allRecipeItems: Array<Item> = []
    allItemsById: Map<string, Item> = new Map
    hiddenRecipeItemIds: Array<string> = []
}
export default new Model
