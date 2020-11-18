import m from "mithril"
import * as Controller from "./controller"
import model, * as Model from "./model"

export function getDropdownItems(): m.Children {
    return [
        m(m.route.Link, { class: "dropdown-item", href: "/hwde-battle-picker" }, "Adventure Mode Battle Picker")
    ]
}

export const root: m.Component = {
    view: () => {
        const pickButtonAttr = {
            onclick: Controller.pickBattle
        }
        const selectedBattleDescription = model.selectedMapName
            ? `${model.selectedMapName}, Row ${model.selectedMapRowNumber}, Column ${model.selectedMapColumnNumber}`
            : undefined
        const getElementSelectRows = () => {
            const getElementSelectRow = (rowIndex: number) => {
                const getOption = (element?: Model.Element) => {
                    const value: string = element || ""
                    return {
                        attr: {
                            value,
                            selected: model.battleElements[rowIndex] === value ? "selected" : undefined
                        },
                        name: element || "(None)"
                    }
                }
                return {
                    rowNumber: rowIndex + 1,
                    selectAttr: {
                        onchange: (e: Event) =>
                            model.battleElements[rowIndex] = ((e.target as HTMLSelectElement).value as Model.Element | "")
                    },
                    options: [
                        getOption(),
                        getOption("Fire"),
                        getOption("Water"),
                        getOption("Lightning"),
                        getOption("Light"),
                        getOption("Darkness")
                    ]
                }
            }
            return [
                getElementSelectRow(0),
                getElementSelectRow(1)
            ]
        }
        const getCharacterInputAttr = (character: Model.Character) => ({
            value: character.level || "",
            onchange: (e: Event) => {
                const levelString = (e.target as HTMLInputElement).value || "0"
                Controller.setCharacterLevel(character, parseInt(levelString))
            }
        })
        const pickCharacterAttr = {
            onclick: Controller.pickCharacter
        }
        return m(".d-flex", m(".mx-auto", [
            m("h2.text-center.mb-5", [
                m("small.text-muted", "Hyrule Warriors: Definitive Edition"),
                m("br"),
                "Adventure Mode Battle Picker"
            ]),
            m(".row.d-block.text-center.mb-1", m("button.btn.btn-primary", pickButtonAttr, "Pick Battle")),
            m("h5.text-center.mb-5", selectedBattleDescription),
            !model.selectedMapName ? undefined : [
                m("#settingsAccordian.accordian.mb-5", [
                    m(".card", [
                        m("#battleElementsCardHeader.card-header",
                            m("button.btn.btn-link.btn-block.text-decoration-none[type=button][data-toggle=collapse][data-target=#battleElementsCollapse][aria-expanded=true][aria-controls=battleElementsCollapse]",
                                m("h5", "Recommended Elements"))),
                        m("#battleElementsCollapse.collapse.show[aria-labelledby=battleElementsCardHeader][data-parent=#settingsAccordian]",
                            m(".card-body", getElementSelectRows().map(row =>
                                m(".row.mb-1", [
                                    m(".col-sm.text-center.text-sm-right",
                                        m("h6.mb-0.pt-1", `Element ${row.rowNumber}:`)),
                                    m(".col-sm.text-center.text-sm-left",
                                        m("select", row.selectAttr, row.options.map(option =>
                                            m("option", option.attr, option.name))))
                                ]))))
                    ]),
                    m(".card", [
                        m("#characterLevelCardHeader.card-header",
                            m("button.btn.btn-link.btn-block.text-decoration-none[type=button][data-toggle=collapse][data-target=#characterLevelCollapse][aria-expanded=false][aria-controls=characterLevelCollapse]",
                                m("h5", "Character Levels"))),
                        m("#characterLevelCollapse.collapse[aria-labelledby=characterLevelCardHeader][data-parent=#settingsAccordian]",
                            m(".card-body", model.characters.map(character =>
                                m(".row.mb-1", [
                                    m(".col-sm.text-center.text-sm-right",
                                        m("h6.mb-0.pt-1", `${character.name}:`)),
                                    m(".col-sm.text-center.text-sm-left",
                                        m("input[type=number][min=1][max=255]", getCharacterInputAttr(character)))
                                ]))))
                    ])
                ]),
                m(".row.d-block.text-center.mb-1", m("button.btn.btn-primary", pickCharacterAttr, "Pick Character")),
                !model.selectedCharacterName ? undefined : m("h5.text-center", [
                    model.selectedCharacterName,
                    m("br"),
                    model.selectedCharacterCostume ? [model.selectedCharacterCostume, m("br")] : undefined,
                    model.selectedCharacterWeaponName
                ])
            ]
        ]))
    }
}
