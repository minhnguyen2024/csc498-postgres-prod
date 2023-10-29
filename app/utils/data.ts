export const MONTH_IN_MILISECONDS: number = 2592000000
export const WEEK_IN_MILISECONDS: number = 604800000
export const DAY_IN_MILISECONDS: number = 86400000
export const TIME_ARR: number[] = [8, 10, 12, 14, 16, 18, 20]
export const DATE_IN_WEEK = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export const imageURLs = [
  "https://globalassets.starbucks.com/digitalassets/products/bev/SBX20211210_MochaCookieCrumbleFrapp.jpg?impolicy=1by1_tight_288",
  "https://globalassets.starbucks.com/digitalassets/products/bev/SBX20210903_AppleCrispFrapp.jpg?impolicy=1by1_wide_topcrop_630",
  "https://globalassets.starbucks.com/digitalassets/products/bev/SBX20221216_FrozenStrawberryAcaiRefresherLemonade.jpg?impolicy=1by1_wide_topcrop_630",
  "https://globalassets.starbucks.com/digitalassets/products/bev/SBX20211210_MangoDragonfruitLemonadeRefreshers.jpg?impolicy=1by1_wide_topcrop_630",
  "https://globalassets.starbucks.com/digitalassets/products/bev/SBX20190628_GalvaninaSparklingWater.jpg?impolicy=1by1_medium_630",
  "https://globalassets.starbucks.com/digitalassets/products/bev/SBX20211115_MatchaTeaLatte.jpg?impolicy=1by1_wide_topcrop_630",
  "https://globalassets.starbucks.com/digitalassets/products/bev/SBX20190624_%20MintMajestyHerbalTea.jpg?impolicy=1by1_wide_topcrop_630",
  "https://globalassets.starbucks.com/digitalassets/products/bev/SBX20190617_CaffeMisto.jpg?impolicy=1by1_wide_topcrop_630",
  "https://globalassets.starbucks.com/digitalassets/products/bev/SBX20190617_BlondeRoast.jpg?impolicy=1by1_wide_topcrop_630",
];

export const users = [
  {
    id: 1,
    username: "minhnguyen_2024",
    password: "pass",
    admin: 0,
  },
  {
    id: 2,
    username: "thaohoang_2024",
    password: "password",
    admin: 0,
  },
  {
    id: 3,
    username: "johndoe_2027",
    password: "password",
    admin: 0,
  },
  {
    id: 4,
    username: "bamlak_2024",
    password: "password",
    admin: 0,
  },
  {
    id: 5,
    username: "clg_2025",
    password: "password",
    admin: 0,
  },
  {
    id: 6,
    username: "admin",
    password: "password",
    admin: 1,
  },
  {
    id: 7,
    username: "cafe_roy_1",
    password: "password",
    admin: 2,
  },
  {
    id: 8,
    username: "cafe_roy_2",
    password: "password",
    admin: 2,
  },
  {
    id: 9,
    username: "ben_2025",
    password: "password",
    admin: 0,
  },
  {
    id: 10,
    username: "hoang_2024",
    password: "password",
    admin: 0,
  },
  {
    id: 11,
    username: "max_2024",
    password: "password",
    admin: 0,
  },
  {
    id: 12,
    username: "cole_2025",
    password: "password",
    admin: 0,
  },
  {
    id: 13,
    username: "erik_2024",
    password: "password",
    admin: 0,
  },
  {
    id: 14,
    username: "raj_2026",
    password: "password",
    admin: 0,
  },
  {
    id: 15,
    username: "anton_2026",
    password: "password",
    admin: 0,
  },
  {
    id: 16,
    username: "david_2025",
    password: "password",
    admin: 0,
  },
];

export const rooms = [
  {
    id: 1,
    display: 1,
    table: 0,
  },
  {
    id: 2,
    display: 0,
    table: 0,
  },
  {
    id: 3,
    display: 1,
    table: 1,
  },
];

export const blocks = [
  {
    room_id: 1,
    time: 1,
    booked_user_id: 0,
  },
  {
    room_id: 1,
    time: 2,
    booked_user_id: 0,
  },
  {
    room_id: 1,
    time: 3,
    booked_user_id: 0,
  },
  {
    room_id: 1,
    time: 4,
    booked_user_id: 0,
  },
  {
    room_id: 1,
    time: 5,
    booked_user_id: 0,
  },
  {
    room_id: 1,
    time: 6,
    booked_user_id: 0,
  },
  {
    room_id: 1,
    time: 7,
    booked_user_id: 0,
  },
  {
    room_id: 2,
    time: 1,
    booked_user_id: 0,
  },
  {
    room_id: 2,
    time: 2,
    booked_user_id: 0,
  },
  {
    room_id: 2,
    time: 3,
    booked_user_id: 0,
  },
  {
    room_id: 3,
    time: 1,
    booked_user_id: 0,
  },
  {
    room_id: 3,
    time: 2,
    booked_user_id: 0,
  },
  {
    room_id: 3,
    time: 3,
    booked_user_id: 0,
  },
];

export const features = [
  {
    id: 1,
    featureName: "reserveStudyRoom",
    enabled: 1,
  },
  {
    id: 2,
    featureName: "orderCafeRoy",
    enabled: 1,
  },
  {
    id: 3,
    featureName: "adminCafeRoy",
    enabled: 1,
  },
];

export const orders = [
  {
    userId: 3,
    invId: 1,
  },
  {
    userId: 1,
    invId: 3,
  },
  {
    userId: 2,
    invId: 4,
  },
];

export const inventory = [
  {
    name: "Mocha Cookie Crumble Frapp",
    iced: 1,
    size: "M",
    image:
      "https://globalassets.starbucks.com/digitalassets/products/bev/SBX20211210_MochaCookieCrumbleFrapp.jpg?impolicy=1by1_tight_288",
    price: 7.99,
  },
  {
    name: "Mocha Cookie Crumble Frapp",
    iced: 1,
    size: "L",
    image:
      "https://globalassets.starbucks.com/digitalassets/products/bev/SBX20211210_MochaCookieCrumbleFrapp.jpg?impolicy=1by1_tight_288",
    price: 8.99,
  },
  {
    name: "Apple Crisp Frapp",
    iced: 1,
    size: "M",
    image:
      "https://globalassets.starbucks.com/digitalassets/products/bev/SBX20210903_AppleCrispFrapp.jpg?impolicy=1by1_wide_topcrop_630",
    price: 6.99,
  },
  {
    name: "Apple Crisp Frapp",
    iced: 1,
    size: "L",
    image:
      "https://globalassets.starbucks.com/digitalassets/products/bev/SBX20210903_AppleCrispFrapp.jpg?impolicy=1by1_wide_topcrop_630",
    price: 7.99,
  },
  {
    name: "Frozen Strawberry Acai Refresher Lemonade",
    iced: 1,
    size: "M",
    image:
      "https://globalassets.starbucks.com/digitalassets/products/bev/SBX20221216_FrozenStrawberryAcaiRefresherLemonade.jpg?impolicy=1by1_wide_topcrop_630",
    price: 4.99,
  },
  {
    name: "Frozen Strawberry Acai Refresher Lemonade",
    iced: 1,
    size: "L",
    image:
      "https://globalassets.starbucks.com/digitalassets/products/bev/SBX20221216_FrozenStrawberryAcaiRefresherLemonade.jpg?impolicy=1by1_wide_topcrop_630",
    price: 5.99,
  },
  {
    name: "Mango Dragonfruit Lemonade",
    iced: 1,
    size: "M",
    image:
      "https://globalassets.starbucks.com/digitalassets/products/bev/SBX20211210_MangoDragonfruitLemonadeRefreshers.jpg?impolicy=1by1_wide_topcrop_630",
    price: 4.99,
  },
  {
    name: "Mango Dragonfruit Lemonade",
    iced: 1,
    size: "L",
    image:
      "https://globalassets.starbucks.com/digitalassets/products/bev/SBX20211210_MangoDragonfruitLemonadeRefreshers.jpg?impolicy=1by1_wide_topcrop_630",
    price: 5.99,
  },
  {
    name: "Galvanina Sparkling Water",
    iced: 1,
    size: "M",
    image:
      "https://globalassets.starbucks.com/digitalassets/products/bev/SBX20190628_GalvaninaSparklingWater.jpg?impolicy=1by1_medium_630",
    price: 3.99,
  },
  {
    name: "Galvanina Sparkling Water",
    iced: 1,
    size: "L",
    image:
      "https://globalassets.starbucks.com/digitalassets/products/bev/SBX20190628_GalvaninaSparklingWater.jpg?impolicy=1by1_medium_630",
    price: 4.99,
  },
  {
    name: "Oleato Golden Foam Cold Brew",
    iced: 1,
    size: "M",
    image:
      "https://globalassets.starbucks.com/digitalassets/products/bev/Oleato_GoldenFoam_ColdBrew.jpg?impolicy=1by1_wide_topcrop_630",
    price: 6.99,
  },
  {
    name: "Oleato Golden Foam Cold Brew",
    iced: 1,
    size: "L",
    image:
      "https://globalassets.starbucks.com/digitalassets/products/bev/Oleato_GoldenFoam_ColdBrew.jpg?impolicy=1by1_wide_topcrop_630",
    price: 7.99,
  },
  {
    name: "Cold Brew",
    iced: 1,
    size: "M",
    image:
      "https://globalassets.starbucks.com/digitalassets/products/bev/SBX20190607_ReserveColdBrew-onGreen.jpg?impolicy=1by1_wide_topcrop_630",
    price: 3.99,
  },
  {
    name: "Cold Brew",
    iced: 1,
    size: "L",
    image:
      "https://globalassets.starbucks.com/digitalassets/products/bev/SBX20190607_ReserveColdBrew-onGreen.jpg?impolicy=1by1_wide_topcrop_630",
    price: 4.99,
  },
  {
    name: "Cold Brew With Milk",
    iced: 1,
    size: "M",
    image:
      "https://globalassets.starbucks.com/digitalassets/products/bev/SBX20190416_ColdBrewWithMilk.jpg?impolicy=1by1_wide_topcrop_630",
    price: 4.49,
  },
  {
    name: "Cold Brew With Milk",
    iced: 1,
    size: "L",
    image:
      "https://globalassets.starbucks.com/digitalassets/products/bev/SBX20190416_ColdBrewWithMilk.jpg?impolicy=1by1_wide_topcrop_630",
    price: 5.49,
  },

  {
    name: "Signature Hot Chocolate",
    iced: 0,
    size: "M",
    image:
      "https://globalassets.starbucks.com/digitalassets/products/bev/SBX20190617_SignatureHotChocolate.jpg?impolicy=1by1_wide_topcrop_630",
    price: 3.99,
  },
  {
    name: "Matcha Tea Latte",
    iced: 0,
    size: "M",
    image:
      "https://globalassets.starbucks.com/digitalassets/products/bev/SBX20211115_MatchaTeaLatte.jpg?impolicy=1by1_wide_topcrop_630",
    price: 4.99,
  },
  {
    name: "Mint Majesty Herbal Tea",
    iced: 0,
    size: "M",
    image:
      "https://globalassets.starbucks.com/digitalassets/products/bev/SBX20190624_%20MintMajestyHerbalTea.jpg?impolicy=1by1_wide_topcrop_630",
    price: 4.99,
  },
  {
    name: "Caffe Misto",
    iced: 0,
    size: "M",
    image:
      "https://globalassets.starbucks.com/digitalassets/products/bev/SBX20190617_CaffeMisto.jpg?impolicy=1by1_wide_topcrop_630",
    price: 4.99,
  },
  {
    name: "Pumpkin Spice Creme",
    iced: 0,
    size: "M",
    image:
      "https://globalassets.starbucks.com/digitalassets/products/bev/SBX20190716_PumpkinSpiceCreme.jpg?impolicy=1by1_wide_topcrop_630",
    price: 4.99,
  },
  {
    name: "Steamed Milk",
    iced: 0,
    size: "M",
    image:
      "https://globalassets.starbucks.com/digitalassets/products/bev/SBX20190617_SteamedMilk.jpg?impolicy=1by1_wide_topcrop_630",
    price: 0.99,
  },
  {
    name: "Caramel Apple Spice",
    iced: 0,
    size: "M",
    image:
      "https://globalassets.starbucks.com/digitalassets/products/bev/SBX20190624_CaramelAppleSpice.jpg?impolicy=1by1_wide_topcrop_630",
    price: 3.99,
  },
  {
    name: "Jade Citrus MintTea",
    iced: 0,
    size: "M",
    image:
      "https://globalassets.starbucks.com/digitalassets/products/bev/SBX20190628%20JadeCitrusMintTea.jpg?impolicy=1by1_wide_topcrop_630",
    price: 4.99,
  },

  {
    name: "Signature Hot Chocolate",
    iced: 0,
    size: "L",
    image:
      "https://globalassets.starbucks.com/digitalassets/products/bev/SBX20190617_SignatureHotChocolate.jpg?impolicy=1by1_wide_topcrop_630",
    price: 4.99,
  },
  {
    name: "Matcha Tea Latte",
    iced: 0,
    size: "L",
    image:
      "https://globalassets.starbucks.com/digitalassets/products/bev/SBX20211115_MatchaTeaLatte.jpg?impolicy=1by1_wide_topcrop_630",
    price: 5.99,
  },
  {
    name: "Mint Majesty Herbal Tea",
    iced: 0,
    size: "L",
    image:
      "https://globalassets.starbucks.com/digitalassets/products/bev/SBX20190624_%20MintMajestyHerbalTea.jpg?impolicy=1by1_wide_topcrop_630",
    price: 5.99,
  },
  {
    name: "Caffe Misto",
    iced: 0,
    size: "L",
    image:
      "https://globalassets.starbucks.com/digitalassets/products/bev/SBX20190617_CaffeMisto.jpg?impolicy=1by1_wide_topcrop_630",
    price: 5.99,
  },
  {
    name: "Pumpkin Spice Creme",
    iced: 0,
    size: "L",
    image:
      "https://globalassets.starbucks.com/digitalassets/products/bev/SBX20190716_PumpkinSpiceCreme.jpg?impolicy=1by1_wide_topcrop_630",
    price: 5.99,
  },
  {
    name: "Steamed Milk",
    iced: 0,
    size: "L",
    image:
      "https://globalassets.starbucks.com/digitalassets/products/bev/SBX20190617_SteamedMilk.jpg?impolicy=1by1_wide_topcrop_630",
    price: 1.99,
  },
  {
    name: "Caramel Apple Spice",
    iced: 0,
    size: "L",
    image:
      "https://globalassets.starbucks.com/digitalassets/products/bev/SBX20190624_CaramelAppleSpice.jpg?impolicy=1by1_wide_topcrop_630",
    price: 4.99,
  },
  {
    name: "Jade Citrus MintTea",
    iced: 0,
    size: "L",
    image:
      "https://globalassets.starbucks.com/digitalassets/products/bev/SBX20190628%20JadeCitrusMintTea.jpg?impolicy=1by1_wide_topcrop_630",
    price: 5.99,
  },
];
