import m from "mithril"
import * as Layout from "./layout"
import * as Root from "./root"
import "./style.scss"

const cache = <T>(loader: () => T): () => T => {
    let tArray: Array<T> = []
    return () => {
        if (tArray.length <= 0) {
            tArray = [loader()]
        }
        return tArray[0]
    }
}
const getWhat2Craft = cache(async () =>
    await import(/*webpackChunkName:"what-2-craft"*/ "./what-2-craft/index"))

import(/*webpackChunkName:"bootstrap"*/ "bootstrap")

m.route(document.body, "/", {
    "/": {
        render: () => {
            const attr = { dropdownItems: Root.getDropdownItems() }
            return m(Layout.component, attr, m(Root.component))
        }
    },
    "/what-2-craft": {
        onmatch: async () => {
            const what2Craft = await getWhat2Craft()
            const attr = { dropdownItems: what2Craft.View.getDropdownItems() }
            return { view: () => m(Layout.component, attr, m(what2Craft.View.root)) }
        }
    },
    "/what-2-craft/ingredients": {
        onmatch: async () => {
            const what2Craft = await getWhat2Craft()
            const attr = { dropdownItems: what2Craft.View.getDropdownItems() }
            return { view: () => m(Layout.component, attr, m(what2Craft.View.ingredients)) }
        }
    },
    "/what-2-craft/hot": {
        onmatch: async () => {
            const what2Craft = await getWhat2Craft()
            const attr = { dropdownItems: what2Craft.View.getDropdownItems() }
            return { view: () => m(Layout.component, attr, m(what2Craft.View.hot)) }
        }
    },
    "/what-2-craft/craftable": {
        onmatch: async () => {
            const what2Craft = await getWhat2Craft()
            const attr = { dropdownItems: what2Craft.View.getDropdownItems() }
            return { view: () => m(Layout.component, attr, m(what2Craft.View.craftable)) }
        }
    },
    "/what-2-craft/all": {
        onmatch: async () => {
            const what2Craft = await getWhat2Craft()
            const attr = { dropdownItems: what2Craft.View.getDropdownItems() }
            return { view: () => m(Layout.component, attr, m(what2Craft.View.all)) }
        }
    },
    "/what-2-craft/hidden": {
        onmatch: async () => {
            const what2Craft = await getWhat2Craft()
            const attr = { dropdownItems: what2Craft.View.getDropdownItems() }
            return { view: () => m(Layout.component, attr, m(what2Craft.View.hidden)) }
        }
    }
})
