import { GAME_STATUS, PLATFORM_GAME } from "../enums";
import { Games } from "@/utils/types/games";

export const games: Games[] = [
    {
        name: 'The Last Of Us™ Remastered',
        type: PLATFORM_GAME.PS4,
        link: 'https://store.playstation.com/pt-br/product/UP9000-CUSA00552_00-THELASTOFUS00000',
        status: GAME_STATUS.PLATINUM,
        rating: 5,
        genres: ["Ação", "Terror", "Narrativo"],
        developer: "Naughty Dog",
        releaseYear: 2014
    },
    {
        name: 'The Last Of Us™ Parte II',
        type: PLATFORM_GAME.PS4,
        link: 'https://store.playstation.com/pt-br/product/UP9000-CUSA07820_00-THELASTOFUSPART2',
        status: GAME_STATUS.PLATINUM,
        rating: 5,
        genres: ["Ação", "Terror", "Narrativo"],
        developer: "Naughty Dog",
        releaseYear: 2020
    },
    {
        name: 'Hellblade: Senua’s Sacrifice',
        type: PLATFORM_GAME.PS4,
        link: 'https://store.playstation.com/pt-br/product/UP3064-CUSA07527_00-HELLBLAD00000000',
        status: GAME_STATUS.FINISHED,
        rating: 4,
        genres: ["Ação", "Psicológico"],
        developer: "Ninja Theory",
        releaseYear: 2017
    },
    {
        name: 'Horizon Chase Turbo',
        type: PLATFORM_GAME.PS4,
        link: 'https://store.playstation.com/pt-br/product/UP0002-CUSA10903_00-HORIZONCHASE0000',
        status: GAME_STATUS.FINISHED,
        rating: 4,
        genres: ["Corrida", "Arcade"],
        developer: "Aquiris",
        releaseYear: 2018
    },
    {
        name: 'Diablo® IV',
        type: PLATFORM_GAME.PS4,
        link: 'https://store.playstation.com/pt-br/concept/231761',
        status: GAME_STATUS.PLAYING,
        rating: 4,
        genres: ["RPG de Ação", "Hack and Slash"],
        developer: "Blizzard",
        releaseYear: 2023
    },
    {
        name: 'Horizon Forbidden West™',
        type: PLATFORM_GAME.PS4,
        link: 'https://store.playstation.com/pt-br/product/UP9000-CUSA24705_00-FORBIDDENWESTPS4',
        status: GAME_STATUS.FINISHED,
        rating: 5,
        genres: ["RPG de Ação", "Mundo Aberto"],
        developer: "Guerrilla Games",
        releaseYear: 2022
    },
    {
        name: 'Horizon Zero Dawn: Complete Edition',
        type: PLATFORM_GAME.PS4,
        link: 'https://store.playstation.com/pt-br/product/UP9000-CUSA10237_00-HRZCE00000000000',
        status: GAME_STATUS.FINISHED,
        rating: 5,
        genres: ["RPG de Ação", "Mundo Aberto"],
        developer: "Guerrilla Games",
        releaseYear: 2017
    },
    {
        name: 'Cuphead',
        type: PLATFORM_GAME.PS4,
        link: 'https://store.playstation.com/pt-br/product/UP0002-CUSA12345_00-CUPHEAD000000000',
        status: GAME_STATUS.FINISHED,
        rating: 5,
        genres: ["Plataforma", "Run and Gun"],
        developer: "Studio MDHR",
        releaseYear: 2017
    },
    {
        name: 'Crash Bandicoot™ N. Sane Trilogy',
        type: PLATFORM_GAME.PS4,
        link: 'https://store.playstation.com/pt-br/product/UP0002-CUSA07402_00-CRASHNSANETRLOGY',
        status: GAME_STATUS.FINISHED,
        rating: 4,
        genres: ["Plataforma"],
        developer: "Vicarious Visions",
        releaseYear: 2017
    },
    {
        name: 'SHADOW OF THE COLOSSUS',
        type: PLATFORM_GAME.PS4,
        link: 'https://store.playstation.com/pt-br/product/UP9000-CUSA08034_00-SOTC000000000000',
        status: GAME_STATUS.FINISHED,
        rating: 5,
        genres: ["Ação", "Aventura"],
        developer: "Bluepoint Games",
        releaseYear: 2018
    },
    {
        name: 'Rise of the Tomb Raider',
        type: PLATFORM_GAME.PS4,
        link: 'https://store.playstation.com/pt-br/product/UP0082-CUSA05794_00-RISEOFTOMBRAIDER',
        status: GAME_STATUS.FINISHED,
        rating: 4,
        genres: ["Ação", "Aventura"],
        developer: "Crystal Dynamics",
        releaseYear: 2015
    },
    {
        name: 'Shadow of the Tomb Raider',
        type: PLATFORM_GAME.PS4,
        link: 'https://store.playstation.com/pt-br/product/UP0082-CUSA10938_00-SHADOWTOMBRAIDER',
        status: GAME_STATUS.FINISHED,
        rating: 4,
        genres: ["Ação", "Aventura"],
        developer: "Eidos-Montréal",
        releaseYear: 2018
    },
    {
        name: 'Tomb Raider: Definitive Edition',
        type: PLATFORM_GAME.PS4,
        link: 'https://store.playstation.com/pt-br/product/UP0082-CUSA00107_00-000000TOMBRAIDER',
        status: GAME_STATUS.FINISHED,
        rating: 4,
        genres: ["Ação", "Aventura"],
        developer: "Crystal Dynamics",
        releaseYear: 2014
    },
    {
        name: 'Wolfenstein: The New Order',
        type: PLATFORM_GAME.PS4,
        link: 'https://store.playstation.com/pt-br/product/UP1003-CUSA00305_00-WOLFENSTEINNEWOR',
        status: GAME_STATUS.FINISHED,
        rating: 4,
        genres: ["FPS", "Ação"],
        developer: "MachineGames",
        releaseYear: 2014
    },
    {
        name: 'God of War',
        type: PLATFORM_GAME.PS4,
        link: 'https://store.playstation.com/pt-br/product/UP9000-CUSA07408_00-00000000GODOFWAR',
        status: GAME_STATUS.PLATINUM,
        rating: 5,
        genres: ["Ação", "Aventura"],
        developer: "Santa Monica Studio",
        releaseYear: 2018
    },
    {
        name: 'Marvels Spider-Man Remastered',
        type: PLATFORM_GAME.PS4,
        link: 'https://store.playstation.com/pt-br/product/UP9000-CUSA36569_00-MARVELSSPIDERMAN',
        status: GAME_STATUS.PLATINUM,
        rating: 5,
        genres: ["Ação", "Mundo Aberto"],
        developer: "Insomniac Games",
        releaseYear: 2020
    },
    {
        name: 'Marvels Spider-Man: Miles Morales',
        type: PLATFORM_GAME.PS4,
        link: 'https://store.playstation.com/pt-br/product/UP9000-CUSA24660_00-MARVELSSMMORALES',
        status: GAME_STATUS.FINISHED,
        rating: 4,
        genres: ["Ação", "Mundo Aberto"],
        developer: "Insomniac Games",
        releaseYear: 2020
    },
    {
        name: 'Red Dead Redemption 2',
        type: PLATFORM_GAME.PS4,
        link: 'https://store.playstation.com/pt-br/product/UP1004-CUSA03041_00-REDDEADREDEMPTION2',
        status: GAME_STATUS.FINISHED,
        rating: 5,
        genres: ["Ação", "Mundo Aberto"],
        developer: "Rockstar Games",
        releaseYear: 2018
    },
    {
        name: 'Terra-média™: Sombras da Guerra™',
        type: PLATFORM_GAME.PS4,
        link: 'https://store.playstation.com/pt-br/product/UP1018-CUSA04408_00-SHADOWOFWAR00000',
        status: GAME_STATUS.FINISHED,
        rating: 4,
        genres: ["RPG de Ação", "Mundo Aberto"],
        developer: "Monolith Productions",
        releaseYear: 2017
    },
    {
        name: 'Terra-média™: Sombras de Mordor',
        type: PLATFORM_GAME.PS4,
        link: 'https://store.playstation.com/pt-br/product/UP1018-CUSA00133_00-SHADOWOFMORDOR01',
        status: GAME_STATUS.FINISHED,
        rating: 4,
        genres: ["RPG de Ação", "Mundo Aberto"],
        developer: "Monolith Productions",
        releaseYear: 2014
    },
    {
        name: 'Mighty No. 9',
        type: PLATFORM_GAME.PS4,
        link: 'https://store.playstation.com/pt-br/product/UP2047-CUSA02008_00-MIGHTYNO90000000',
        status: GAME_STATUS.DROPPED,
        rating: 2,
        genres: ["Plataforma"],
        developer: "Comcept",
        releaseYear: 2016
    },
    {
        name: 'Tom Clancy’s The Division™',
        type: PLATFORM_GAME.PS4,
        link: 'https://store.playstation.com/pt-br/product/UP0001-CUSA01810_00-DIVTHEGAME000001',
        status: GAME_STATUS.FINISHED,
        rating: 4,
        genres: ["Shooter", "RPG"],
        developer: "Massive Entertainment",
        releaseYear: 2016
    },
    {
        name: 'Tom Clancys The Division® 2',
        type: PLATFORM_GAME.PS4,
        link: 'https://store.playstation.com/pt-br/product/UP0001-CUSA12639_00-TCTHEVISION20000',
        status: GAME_STATUS.PLAYING,
        rating: 4,
        genres: ["Shooter", "RPG"],
        developer: "Massive Entertainment",
        releaseYear: 2019
    },
    {
        name: 'Uncharted: The Lost Legacy™',
        type: PLATFORM_GAME.PS4,
        link: 'https://store.playstation.com/pt-br/product/UP9000-CUSA07737_00-UNCHD4LOSTLEGACY',
        status: GAME_STATUS.FINISHED,
        rating: 4,
        genres: ["Ação", "Aventura"],
        developer: "Naughty Dog",
        releaseYear: 2017
    },
    {
        name: 'UNCHARTED The Nathan Drake Collection',
        type: PLATFORM_GAME.PS4,
        link: 'https://store.playstation.com/pt-br/product/UP9000-CUSA02320_00-UNCHARTEDTRILOGY',
        status: GAME_STATUS.FINISHED,
        rating: 5,
        genres: ["Ação", "Aventura"],
        developer: "Naughty Dog",
        releaseYear: 2015
    },
    {
        name: 'Rayman® Legends',
        type: PLATFORM_GAME.PS4,
        link: 'https://store.playstation.com/pt-br/product/UP0001-CUSA00031_00-RAYMANLEGENDS001',
        status: GAME_STATUS.FINISHED,
        rating: 5,
        genres: ["Plataforma"],
        developer: "Ubisoft Montpellier",
        releaseYear: 2013
    },
    {
        name: 'Outlast',
        type: PLATFORM_GAME.PS4,
        link: 'https://store.playstation.com/pt-br/product/UP2113-CUSA00325_00-OUTLAST000000000',
        status: GAME_STATUS.FINISHED,
        rating: 4,
        genres: ["Terror", "Survival"],
        developer: "Red Barrels",
        releaseYear: 2013
    },
    {
        name: 'FAR CRY 4',
        type: PLATFORM_GAME.PS4,
        link: 'https://store.playstation.com/pt-br/product/UP0001-CUSA00168_00-FARCRY4000000001',
        status: GAME_STATUS.FINISHED,
        rating: 4,
        genres: ["FPS", "Mundo Aberto"],
        developer: "Ubisoft Montreal",
        releaseYear: 2014
    },
    {
        name: 'FAR CRY PRIMAL',
        type: PLATFORM_GAME.PS4,
        link: 'https://store.playstation.com/pt-br/product/UP0001-CUSA03309_00-FARCRYPRIMAL0001',
        status: GAME_STATUS.FINISHED,
        rating: 3,
        genres: ["FPS", "Mundo Aberto"],
        developer: "Ubisoft Montreal",
        releaseYear: 2016
    },
    {
        name: 'Battlefield™ 2042',
        type: PLATFORM_GAME.STEAM,
        link: 'https://store.steampowered.com/app/1517290/Battlefield_2042/',
        status: GAME_STATUS.PLAYING,
        rating: 3,
        genres: ["FPS", "Multiplayer"],
        developer: "DICE",
        releaseYear: 2021
    },
    {
        name: 'Grand Theft Auto V Legacy',
        type: PLATFORM_GAME.STEAM,
        link: 'https://store.steampowered.com/app/271590/Grand_Theft_Auto_V/',
        status: GAME_STATUS.FINISHED,
        rating: 5,
        genres: ["Ação", "Mundo Aberto"],
        developer: "Rockstar North",
        releaseYear: 2013
    },
    {
        name: 'Among Us',
        type: PLATFORM_GAME.STEAM,
        link: 'https://store.steampowered.com/app/945360/Among_Us/',
        status: GAME_STATUS.PLAYING,
        rating: 4,
        genres: ["Social", "Casual"],
        developer: "Innersloth",
        releaseYear: 2018
    },
    {
        name: 'Left 4 Dead 2',
        type: PLATFORM_GAME.STEAM,
        link: 'https://store.steampowered.com/app/550/Left_4_Dead_2/',
        status: GAME_STATUS.FINISHED,
        rating: 5,
        genres: ["FPS", "Co-op"],
        developer: "Valve",
        releaseYear: 2009
    },
    {
        name: 'Age of Empires II: Definitive Edition',
        type: PLATFORM_GAME.STEAM,
        link: 'https://store.steampowered.com/app/813780/Age_of_Empires_II_Definitive_Edition/',
        status: GAME_STATUS.PLAYING,
        rating: 5,
        genres: ["RTS", "Estratégia"],
        developer: "Forgotten Empires",
        releaseYear: 2019
    },
    {
        name: 'Fall Guys',
        type: PLATFORM_GAME.STEAM,
        link: 'https://store.steampowered.com/app/1097150/Fall_Guys/',
        status: GAME_STATUS.PLAYING,
        rating: 4,
        genres: ["Battle Royale", "Plataforma"],
        developer: "Mediatonic",
        releaseYear: 2020
    },
    {
        name: 'Return to Castle Wolfenstein',
        type: PLATFORM_GAME.STEAM,
        link: 'https://store.steampowered.com/app/9010/Return_to_Castle_Wolfenstein/',
        status: GAME_STATUS.FINISHED,
        rating: 5,
        genres: ["FPS"],
        developer: "Gray Matter",
        releaseYear: 2001
    },
    {
        name: 'BlackShot: Mercenary Warfare FPS',
        type: PLATFORM_GAME.STEAM,
        link: 'https://store.steampowered.com/app/433350/BlackShot_Mercenary_Warfare_FPS/',
        status: GAME_STATUS.DROPPED,
        rating: 2,
        genres: ["FPS"],
        developer: "Vertigo Games",
        releaseYear: 2016
    },
    {
        name: 'Homefront',
        type: PLATFORM_GAME.STEAM,
        link: 'https://store.steampowered.com/app/55100/Homefront/',
        status: GAME_STATUS.FINISHED,
        rating: 3,
        genres: ["FPS"],
        developer: "Kaos Studios",
        releaseYear: 2011
    },
    {
        name: 'Diablo III',
        type: PLATFORM_GAME.STEAM,
        link: 'https://us.shop.battle.net/pt-br/product/diablo-iii', 
        status: GAME_STATUS.FINISHED,
        rating: 4,
        genres: ["RPG de Ação"],
        developer: "Blizzard",
        releaseYear: 2012
    }
];