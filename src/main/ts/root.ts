import m from "mithril"

const listGroupLinkAttr = (href: string) => ({
    href,
    class: "list-group-item list-group-item-action"
})

export function getDropdownItems(): m.Children {
    return [
        m("h6.dropdown-header", "Animal Crossing: New Horizons"),
        m(m.route.Link, { class: "dropdown-item", href: "/what-2-craft" }, "What-2-Craft"),
        // m(".dropdown-divider"),
        // m("h6.dropdown-header", "Hyrule Warriors"),
        // m(m.route.Link, { class: "dropdown-item", href: "/" }, "Adventure Mode Battle Picker")
    ]
}

export const component: m.Component = {
    view: () => m(".d-flex", m(".mx-auto", [
        m("h1.d-none.d-sm-block.text-center.font-family-syne-mono", "vydaeon.net"),
        m("h2.d-block.d-sm-none.text-center.font-family-syne-mono", "vydaeon.net"),
        m(".list-group", [
            m(".lead", "Animal Crossing: New Horizons"),
            m("dl", [
                m(m.route.Link, listGroupLinkAttr("/what-2-craft"), [
                    m("dt", "What-2-Craft"),
                    m("dd", "Determine what you can craft (for the most bells), given what materials you have.")
                ])
            ]),
            // m(".lead", "Hyrule Warriors"),
            // m("dl", [
            //     m(m.route.Link, listGroupLinkAttr("/"), [
            //         m("dt", "Adventure Mode Battle Picker"),
            //         m("dd", "Randomly select adventure mode battles, and which characters & weapons to play.")
            //     ])
            // ])
        ])
    ]))
}
