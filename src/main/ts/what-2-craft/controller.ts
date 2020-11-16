import * as Xhr from "../xhr"
import model, * as Model from "./model"

export async function requestItems() {
    model.itemsLoaded = false
    model.itemsErrored = false

    const serverItems = await (async () => {
        try {
            const items: Array<ServerItem> = await Xhr.request("/what-2-craft/items")
            model.itemsLoaded = true
            return items
        } catch (error) {
            model.itemsErrored = true
            throw error
        }
    })()
    const serverItemsById: Map<string, ServerItem> = new Map
    serverItems.forEach(serverItem => serverItemsById.set(serverItem.id, serverItem))

    const computeNestedRecipe = (itemId: string, previousItemIds: Array<string>): Array<Model.RecipeEntry> => {
        const item = serverItemsById.get(itemId)
        if (!item?.recipe || previousItemIds.includes(itemId)) {
            return []
        }
        previousItemIds.push(itemId)

        const recipe = item.recipe.map(ingredient => {
            return {
                itemId: ingredient.itemId,
                quantity: ingredient.quantity,
                recipe: computeNestedRecipe(ingredient.itemId, previousItemIds)
            }
        })
        previousItemIds.pop()
        return recipe
    }
    const computeCost = (itemId: string, previousItemIds: Array<string>) => {
        const item = serverItemsById.get(itemId)
        if (!item) {
            return 1
        } else if (item.recipe && item.recipe.length > 0 && !previousItemIds.includes(itemId)) {
            let costSum = 0
            previousItemIds.push(itemId)
            item.recipe.forEach(recipeEntry => {
                const quantity = recipeEntry.quantity
                costSum += computeCost(recipeEntry.itemId, previousItemIds) * quantity
            })
            previousItemIds.pop()
            return costSum
        } else if (!item.buyPrice) {
            return item.sellPrice ? item.sellPrice : 1
        } else {
            return item.buyPrice
        }
    }
    serverItems.forEach(serverItem => {
        const item: Model.Item = {
            id: serverItem.id,
            name: serverItem.name,
            sellPrice: serverItem.sellPrice ? serverItem.sellPrice : 0,
            profit: 0,
            markup: 1,
            recipe: computeNestedRecipe(serverItem.id, []),
            cost: computeCost(serverItem.id, [])
        }
        onSellPriceUpdated(item)
        model.allItemsById.set(item.id, item)
        if (item.recipe.length > 0) {
            model.allRecipeItems.push(item)
        } else {
            const quantity = parseInt(localStorage.getItem(getQuantityKey(item.id)) || "0")
            model.ingredientItems.push(item)
            model.ingredientQuantities.set(item.id, quantity)
        }
        if (localStorage.getItem(getHiddenKey(item.id))) {
            model.hiddenRecipeItemIds.push(item.id)
        }
    })
    sortRecipes()
    model.ingredientItems
        .sort((item1, item2) => item1.name > item2.name ? 1 : -1)
}

export function setIngredientQuantity(itemId: string, quantity?: number) {
    if (quantity) {
        model.ingredientQuantities.set(itemId, quantity)
        localStorage.setItem(getQuantityKey(itemId), quantity.toString())
    } else {
        model.ingredientQuantities.delete(itemId)
        localStorage.removeItem(getQuantityKey(itemId))
    }
}

export function setHotItemRecipe(hotItemNumber: number, hotItemId: string) {
    const hotItemIndex = hotItemNumber - 1
    const previousHotItemId = model.hotItemIds[hotItemIndex]
    model.hotItemIds[hotItemIndex] = hotItemId
    if (previousHotItemId) {
        const previousHotItem = model.allRecipeItems.find(item => item.id == previousHotItemId)
        if (previousHotItem) {
            previousHotItem.sellPrice /= 2
            onSellPriceUpdated(previousHotItem)
        }
    }
    if (hotItemId) {
        const hotItem = model.allRecipeItems.find(item => item.id == hotItemId)
        if (hotItem) {
            hotItem.sellPrice *= 2
            onSellPriceUpdated(hotItem)
        }
    }
    sortRecipes()
}

export function getHotItemRecipes() {
    return model.allRecipeItems.slice(0, -1)
        .sort((item1, item2) => item1.name > item2.name ? 1 : -1)
}

export function hideRecipe(itemId: string) {
    if (!model.hiddenRecipeItemIds.includes(itemId)) {
        model.hiddenRecipeItemIds.push(itemId)
        localStorage.setItem(getHiddenKey(itemId), "true")
    }
}

export function unhideRecipe(itemId: string) {
    const index = model.hiddenRecipeItemIds.indexOf(itemId)
    if (index >= 0) {
        model.hiddenRecipeItemIds.splice(index, 1)
        localStorage.removeItem(getHiddenKey(itemId))
    }
}

export function getCraftableRecipeItems() {
    return model.allRecipeItems
        .filter(item => !model.hiddenRecipeItemIds.includes(item.id))
        .filter(recipe => {
            const totalQuantityByItemId = new Map<string, number>()
            const addQuantity = (ingredient: Model.RecipeEntry) => {
                const previousTotal = totalQuantityByItemId.get(ingredient.itemId)
                const newTotal = previousTotal ? previousTotal + ingredient.quantity : ingredient.quantity
                totalQuantityByItemId.set(ingredient.itemId, newTotal)
                ingredient.recipe.forEach(addQuantity)
            }
            recipe.recipe.forEach(addQuantity)
            return Array.from(totalQuantityByItemId.keys()).every(itemId => {
                const haveQuantity = model.ingredientQuantities.get(itemId)
                const needQuantity = totalQuantityByItemId.get(itemId)
                return haveQuantity && needQuantity && haveQuantity >= needQuantity
            })
        })
}

export function getAllRecipeItems() {
    return model.allRecipeItems
        .filter(item => !model.hiddenRecipeItemIds.includes(item.id))
}

export function getHiddenRecipeItems() {
    return model.allRecipeItems
        .filter(item => model.hiddenRecipeItemIds.includes(item.id))
}

interface ServerItemRecipeEntry {
    itemId: string
    quantity: number
}

interface ServerItem {
    id: string
    name: string
    buyPrice?: number
    sellPrice?: number
    recipe?: Array<ServerItemRecipeEntry>
}

function onSellPriceUpdated(item: Model.Item) {
    item.profit = item.sellPrice - item.cost
    item.markup = item.sellPrice / item.cost
}

function sortRecipes() {
    model.allRecipeItems.sort((item1, item2) => {
        if (item1.markup != item2.markup) {
            return item2.markup - item1.markup
        } else if (item1.profit != item2.profit) {
            return item2.profit - item1.profit
        } else {
            return item1.name > item2.name ? 1 : -1
        }
    })
}

function getQuantityKey(itemId: string) {
    return `what-2-craft.${itemId}.quantity`
}

function getHiddenKey(itemId: string) {
    return `what-2-craft.${itemId}.hidden`
}
