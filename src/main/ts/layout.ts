import m from "mithril"

interface Attrs {
    dropdownItems: m.Children
}

export const component: m.Component<Attrs, {}> = {
    view: (vnode: m.Vnode<Attrs, {}>) => {
        const dropdownItems = vnode.attrs.dropdownItems
        return [
            m("nav.navbar.navbar-light.bg-primary.border-bottom.px-0.mb-2.sticky-top", m(".container", [
                m(m.route.Link, { href: "/", class: "navbar-brand font-family-syne-mono font-weight-bold" }, [
                    m("img.d-sm-inline.rounded-circle.border.mr-1[src=/favicon-192.png][height=36]"),
                    "vydaeon.net"
                ]),
                m(".dropdown", [
                    m("button#navbarDropdown.navbar-toggler.bg-dark.p-1[type=button][data-toggle=dropdown][aria-haspopup=true][aria-expanded=false]",
                        m("span.navbar-toggler-icon")),
                    m(".dropdown-menu.dropdown-menu-right[aria-labelledby=navbarDropdown]", dropdownItems)
                ])
            ])),
            m(".container", vnode.children)
        ]
    }
}
