import model, * as Model from "./model"

export function initialize() {
    model.characters.forEach(character => {
        const levelString = localStorage.getItem(getLevelKey(character))
        if (levelString) {
            character.level = parseInt(levelString)
        }
    })
}

export function pickBattle() {
    const map = model.maps[Math.floor(Math.random() * model.maps.length)]
    const rowIndex = Math.floor(Math.random() * map.columnCounts.length)
    model.selectedMapName = map.name
    model.selectedMapRowNumber = rowIndex + 1
    model.selectedMapColumnNumber = Math.ceil(Math.random() * map.columnCounts[rowIndex])
    model.battleElements = ["", ""]
    model.selectedCharacterName = ""
    model.selectedCharacterWeaponName = ""
    model.selectedCharacterCostume = ""
}

export function setCharacterLevel(character: Model.Character, level: number) {
    character.level = level
    localStorage.setItem(getLevelKey(character), level.toString())
}

export function pickCharacter() {
    const selectedElements = model.battleElements
        .filter(element => element)
        .map(element => element as Model.Element)
    const elementWeaponCharacters = selectedElements.length <= 0 ? model.characters
        : model.characters.filter(character =>
            character.weapons.some(weapon => selectedElements.includes(weapon.element)))
    const lowestLevel = elementWeaponCharacters.reduce(
        (minLevel, character) => Math.min(character.level, minLevel), 999)
    const characters = elementWeaponCharacters.filter(character => character.level === lowestLevel)
    const character = characters[Math.floor(Math.random() * characters.length)]
    const elementWeapons = selectedElements.length <= 0 ? character.weapons
        : character.weapons.filter(weapon => selectedElements.includes(weapon.element))
    model.selectedCharacterName = character.name
    model.selectedCharacterCostume = character.costumes.length <= 0 ? ""
        : character.costumes[Math.floor(Math.random() * character.costumes.length)]
    model.selectedCharacterWeaponName =
        elementWeapons[Math.floor(Math.random() * elementWeapons.length)].name
}

function getLevelKey(character: Model.Character) {
    return `hwde-battle-picker.level[${character.name}]`
}
