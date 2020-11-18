export interface Map {
    name: string
    columnCounts: Array<number>
}

export type Element = "Fire" | "Water" | "Lightning" | "Light" | "Darkness"

export interface Weapon {
    name: string
    element: Element
}

export interface Character {
    name: string
    level: number
    weapons: Array<Weapon>
    costumes: Array<string>
}

class Model {
    maps: Array<Map> = [
        {
            name: "Adventure Map",
            columnCounts: [16, 16, 16, 16, 16, 16, 16, 16]
        },
        {
            name: "Great Sea Map",
            columnCounts: [14, 14, 14, 14, 14, 14, 14]
        },
        {
            name: "Master Quest Map",
            columnCounts: [16, 16, 16, 16, 16, 16, 16, 16]
        },
        {
            name: "Master Wind Waker Map",
            columnCounts: [14, 14, 14, 14, 14, 14, 14]
        },
        {
            name: "Twilight Map",
            columnCounts: [9, 11, 12, 14, 14, 15, 10, 8]
        },
        {
            name: "Termina Map",
            columnCounts: [11, 11, 13, 12, 11, 11, 9, 7]
        },
        {
            name: "Koholint Island Map",
            columnCounts: [14, 14, 14, 14, 14, 14]
        },
        {
            name: "Grand Travels Map",
            columnCounts: [16, 16, 16, 16, 16, 16, 16, 16]
        },
        {
            name: "Lorule Map",
            columnCounts: [16, 16, 16, 16, 16, 16, 16, 16]
        }
    ]
    selectedMapName: string = ""
    selectedMapRowNumber: number = 0
    selectedMapColumnNumber: number = 0
    battleElements: Array<Element | ""> = ["", ""]
    characters: Array<Character> = [
        {
            name: "Link",
            level: 0,
            weapons: [
                {
                    name: "Hylian Sword",
                    element: "Light"
                },
                {
                    name: "Magic Rod",
                    element: "Fire"
                },
                {
                    name: "Great Fairy",
                    element: "Water"
                },
                {
                    name: "Gauntlets",
                    element: "Lightning"
                },
                {
                    name: "Master Sword",
                    element: "Light"
                },
                {
                    name: "Horse",
                    element: "Light"
                },
                {
                    name: "Spinner",
                    element: "Lightning"
                }
            ],
            costumes: [
                "Hero's Clothes",
                "Trainee Tunic",
                "Zora Tunic",
                "Goron Tunic",
                "Kokiri Tunic",
                "Era of Twilight Tunic",
                "Knight of Skyloft Tunic",
                "Hero's Clothes (Master Quest)",
                "Dark Link",
                "Postman Uniform",
                "Hero's Clothes (Twilight)",
                "Fierce Deity Link",
                "Hero's Clothes (Boss)",
                "Hero's Clothes (Great Sea)",
                "Era of the Wilds Tunic",
                "Classic Tunic",
                "Hero's Clothes (Wind Waker)",
                "Hero's Clothes (Koholint)",
                "Hero's Clothes (Grand Travels)"
            ]
        },
        {
            name: "Impa",
            level: 0,
            weapons: [
                {
                    name: "Giant Blade",
                    element: "Water"
                },
                {
                    name: "Naginata",
                    element: "Fire"
                }
            ],
            costumes: [
                "Standard Outfit",
                "Standard Outfit (Master Quest)",
                "Standard Outfit (Twilight)",
                "Era of the Hero of Time Outfit",
                "Mask of Truth",
                "Standard Outfit (Great Sea)",
                "Standard Outfit (Grand Travels)",
                "Standard Outfit (Lorule)"
            ]
        },
        {
            name: "Sheik",
            level: 0,
            weapons: [
                {
                    name: "Harp",
                    element: "Lightning"
                }
            ],
            costumes: [
                "Standard Outfit",
                "Standard Outfit (Master Quest)",
                "Standard Outfit (Twilight)",
                "Era of the Hero of Time Outfit",
                "Kafei's Mask",
                "Standard Outfit (Great Sea)",
                "Standard Outfit (Wind Waker)",
                "Standard Outfit (Koholint)"
            ]
        },
        {
            name: "Lana",
            level: 0,
            weapons: [
                {
                    name: "Book of Sorcery",
                    element: "Lightning"
                },
                {
                    name: "Spear",
                    element: "Water"
                },
                {
                    name: "Summoning Gate",
                    element: "Fire"
                }
            ],
            costumes: [
                "Standard Outfit",
                "Standard Outfit (Master Quest)",
                "Guardian of Time",
                "Standard Outfit (Twilight)",
                "Skull Kid's Clothes",
                "Deku Mask",
                "Standard Outfit (Boss)",
                "Standard Outfit (Great Sea)",
                "Standard Outfit (Wind Waker)",
                "Standard Outfit (Koholint)",
                "Standard Outfit (Lorule)"
            ]
        },
        {
            name: "Zelda",
            level: 0,
            weapons: [
                {
                    name: "Rapier",
                    element: "Light"
                },
                {
                    name: "Baton",
                    element: "Lightning"
                },
                {
                    name: "Dominion Rod",
                    element: "Darkness"
                }
            ],
            costumes: [
                "Standard Robes",
                "Era of the Hero of Time Robes",
                "Era of Twilight Robes",
                "Skyloft Robes",
                "Standard Robes (Master Quest)",
                "Ilia's Clothes",
                "Standard Outfit (Twilight)",
                "Bunny Hood",
                "Standard Robes (Boss)",
                "Standard Robes (Great Sea)",
                "Era of the Wilds Outfit",
                "Standard Robes (Wind Waker)",
                "Standard Robes (Koholint)",
                "Standard Robes (Grand Travels)"
            ]
        },
        {
            name: "Ganondorf",
            level: 0,
            weapons: [
                {
                    name: "Great Swords",
                    element: "Darkness"
                },
                {
                    name: "Trident",
                    element: "Lightning"
                }
            ],
            costumes: [
                "Standard Outfit",
                "Era of the Hero of Time Armor",
                "Era of Twilight Armor",
                "Standard Outfit (Master Quest)",
                "Standard Outfit (Twilight)",
                "Odolwa's Remains",
                "Standard Outfit (Boss)",
                "Standard Outfit (Great Sea)",
                "Wind Waker Robes",
                "Standard Outfit (Koholint)",
                "Standard Outfit (Grand Travels)",
                "Standard Outfit (Lorule)"
            ]
        },
        {
            name: "Darunia",
            level: 0,
            weapons: [
                {
                    name: "Hammer",
                    element: "Fire"
                }
            ],
            costumes: [
                "Standard Outfit",
                "Standard Outfit (Master Quest)",
                "Standard Outfit (Twilight)",
                "Goron Mask",
                "Standard Outfit (Great Sea)",
                "Standard Outfit (Wind Waker)",
                "Standard Outfit (Grand Travels)",
                "Standard Outfit (Lorule)"
            ]
        },
        {
            name: "Ruto",
            level: 0,
            weapons: [
                {
                    name: "Zora Scale",
                    element: "Water"
                }
            ],
            costumes: [
                "Standard Outfit",
                "Standard Outfit (Master Quest)",
                "Standard Outfit (Twilight)",
                "Zora Mask",
                "Standard Outfit (Great Sea)",
                "Standard Outfit (Wind Waker)",
                "Standard Outfit (Grand Travels)",
                "Standard Outfit (Lorule)"
            ]
        },
        {
            name: "Agitha",
            level: 0,
            weapons: [
                {
                    name: "Parasol",
                    element: "Light"
                }
            ],
            costumes: [
                "Standard Outfit",
                "Standard Outfit (Master Quest)",
                "Standard Outfit (Twilight)",
                "Don Gero's Mask",
                "Standard Outfit (Great Sea)",
                "Standard Outfit (Koholint)",
                "Standard Outfit (Lorule)"
            ]
        },
        {
            name: "Midna",
            level: 0,
            weapons: [
                {
                    name: "Shackle",
                    element: "Darkness"
                }
            ],
            costumes: [
                "Standard Outfit",
                "Standard Outfit (Master Quest)",
                "Standard Outfit (Twilight)",
                "Ordon Shield",
                "Standard Outfit (Great Sea)",
                "Standard Outfit (Wind Waker)",
                "Standard Outfit (Lorule)"
            ]
        },
        {
            name: "Zant",
            level: 0,
            weapons: [
                {
                    name: "Scimitars",
                    element: "Darkness"
                }
            ],
            costumes: [
                "Standard Outfit",
                "Standard Outfit (Master Quest)",
                "Standard Outfit (Twilight)",
                "Troupe Leader's Mask",
                "Standard Outfit (Great Sea)",
                "Standard Outfit (Koholint)",
                "Standard Outfit (Lorule)"
            ]
        },
        {
            name: "Fi",
            level: 0,
            weapons: [
                {
                    name: "Goddess Blade",
                    element: "Light"
                }
            ],
            costumes: [
                "Standard Outfit",
                "Standard Outfit (Boss)",
                "Standard Outfit (Twilight)",
                "Stone Mask",
                "Standard Outfit (Great Sea)",
                "Standard Outfit (Wind Waker)",
                "Standard Outfit (Grand Travels)",
                "Standard Outfit (Lorule)"
            ]
        },
        {
            name: "Ghirahim",
            level: 0,
            weapons: [
                {
                    name: "Demon Blade",
                    element: "Darkness"
                }
            ],
            costumes: [
                "Standard Outfit",
                "Standard Outfit (Master Quest)",
                "Standard Outfit (Twilight)",
                "Kamaro's Mask",
                "Standard Outfit (Great Sea)",
                "Standard Outfit (Wind Waker)",
                "Standard Outfit (Koholint)",
                "Standard Outfit (Lorule)"
            ]
        },
        {
            name: "Cia",
            level: 0,
            weapons: [
                {
                    name: "Scepter",
                    element: "Darkness"
                }
            ],
            costumes: [
                "Masked",
                "Unmasked",
                "Hatless",
                "Masked (Master Quest)",
                "Unmasked (Master Quest)",
                "Hatless (Master Quest)",
                "Guardian of Time",
                "Masked (Twilight)",
                "Unmasked (Twilight)",
                "Hatless (Twilight)",
                "Majora's Mask",
                "Masked (Boss)",
                "Unmasked (Boss)",
                "Hatless (Boss)",
                "Masked (Great Sea)",
                "Unmasked (Great Sea)",
                "Hatless (Great Sea)",
                "Masked (Wind Waker)",
                "Unmasked (Wind Waker)",
                "Hatless (Wind Waker)",
                "Masked (Koholint)",
                "Unmasked (Koholint)",
                "Hatless (Koholint)",
                "Masked (Lorule)",
                "Unmasked (Lorule)",
                "Hatless (Lorule)"
            ]
        },
        {
            name: "Volga",
            level: 0,
            weapons: [
                {
                    name: "Dragon Spear",
                    element: "Fire"
                }
            ],
            costumes: [
                "Standard Outfit",
                "Standard Outfit (Master Quest)",
                "Standard Outfit (Twilight)",
                "Giant's Mask",
                "Standard Outfit (Great Sea)",
                "Standard Outfit (Wind Waker)",
                "Standard Outfit (Grand Travels)"
            ]
        },
        {
            name: "Wizzro",
            level: 0,
            weapons: [
                {
                    name: "Ring",
                    element: "Darkness"
                }
            ],
            costumes: [
                "Standard Outfit",
                "Standard Outfit (Master Quest)",
                "Standard Outfit (Twilight)",
                "Captain's Hat",
                "Standard Outfit (Great Sea)",
                "Standard Outfit (Koholint)",
                "Standard Outfit (Grand Travels)"
            ]
        },
        {
            name: "Twili Midna",
            level: 0,
            weapons: [
                {
                    name: "Mirror",
                    element: "Darkness"
                }
            ],
            costumes: [
                "Standard Outfit",
                "Standard Outfit (Great Sea)",
                "Standard Outfit (Wind Waker)",
                "Standard Outfit (Grand Travels)",
                "Standard Outfit (Lorule)"
            ]
        },
        {
            name: "Young Link",
            level: 0,
            weapons: [
                {
                    name: "Mask",
                    element: "Darkness"
                }
            ],
            costumes: [
                "Standard Outfit",
                "Standard Outfit (Great Sea)",
                "Standard Outfit (Koholint)",
                "Standard Outfit (Grand Travels)",
                "Standard Outfit (Lorule)"
            ]
        },
        {
            name: "Tingle",
            level: 0,
            weapons: [
                {
                    name: "Balloon",
                    element: "Fire"
                }
            ],
            costumes: [
                "Standard Outfit",
                "Standard Outfit (Great Sea)",
                "Standard Outfit (Wind Waker)",
                "Standard Outfit (Koholint)",
                "Standard Outfit (Grand Travels)",
                "Standard Outfit (Lorule)"
            ]
        },
        {
            name: "Linkle",
            level: 0,
            weapons: [
                {
                    name: "Crossbows",
                    element: "Fire"
                },
                {
                    name: "Boots",
                    element: "Lightning"
                }
            ],
            costumes: [
                "Standard Outfit",
                "Standard Outfit (Great Sea)",
                "Standard Outfit (Koholint)",
                "Standard Outfit (Grand Travels)",
                "Standard Outfit (Lorule)"
            ]
        },
        {
            name: "Skull Kid",
            level: 0,
            weapons: [
                {
                    name: "Ocarina",
                    element: "Darkness"
                }
            ],
            costumes: [
                "Standard Outfit",
                "Standard Outfit (Great Sea)",
                "Standard Outfit (Koholint)",
                "Standard Outfit (Grand Travels)",
                "Standard Outfit (Lorule)"
            ]
        },
        {
            name: "Toon Link",
            level: 0,
            weapons: [
                {
                    name: "Light Sword",
                    element: "Light"
                },
                {
                    name: "Sand Wand",
                    element: "Fire"
                }
            ],
            costumes: [
                "Standard Outfit",
                "Standard Outfit (Great Sea)",
                "Standard Outfit (Wind Waker)",
                "Standard Outfit (Koholint)",
                "Standard Outfit (Grand Travels)"
            ]
        },
        {
            name: "Tetra",
            level: 0,
            weapons: [
                {
                    name: "Cutlass",
                    element: "Water"
                }
            ],
            costumes: [
                "Standard Outfit",
                "Standard Outfit (Great Sea)",
                "Standard Outfit (Wind Waker)",
                "Standard Outfit (Koholint)",
                "Standard Outfit (Grand Travels)"
            ]
        },
        {
            name: "King Daphnes",
            level: 0,
            weapons: [
                {
                    name: "Sail",
                    element: "Water"
                }
            ],
            costumes: [
                "Standard Outfit",
                "Standard Outfit (Great Sea)",
                "Standard Outfit (Wind Waker)",
                "Standard Outfit (Grand Travels)",
                "Standard Outfit (Lorule)"
            ]
        },
        {
            name: "Medli",
            level: 0,
            weapons: [
                {
                    name: "Rito Harp",
                    element: "Light"
                }
            ],
            costumes: []
        },
        {
            name: "Marin",
            level: 0,
            weapons: [
                {
                    name: "Bell",
                    element: "Water"
                }
            ],
            costumes: []
        },
        {
            name: "Toon Zelda",
            level: 0,
            weapons: [
                {
                    name: "Phantom Arms",
                    element: "Light"
                }
            ],
            costumes: []
        },
        {
            name: "Ravio",
            level: 0,
            weapons: [
                {
                    name: "Rental Hammer",
                    element: "Darkness"
                }
            ],
            costumes: []
        },
        {
            name: "Yuga",
            level: 0,
            weapons: [
                {
                    name: "Picture Frame",
                    element: "Lightning"
                }
            ],
            costumes: []
        }
    ]
    selectedCharacterName: string = ""
    selectedCharacterWeaponName: string = ""
    selectedCharacterCostume: string = ""
}
export default new Model
