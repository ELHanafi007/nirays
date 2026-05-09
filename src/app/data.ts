export interface MenuItem {
  id: string;
  name: string;
  jpName: string;
  description: string;
  price: string;
  category: string;
  image: string;
  tags?: string[];
}

const generateItems = () => {
  const items: MenuItem[] = [];

  const data = {
    "Small Plates": [
      { name: "Wagyu Gyoza", jp: "和牛餃子", desc: "Hand-crafted A5 Wagyu dumplings, black truffle soy.", price: "240 MAD" },
      { name: "Yellowtail Jalapeño", jp: "はまちハラペーニョ", desc: "Hamachi sashimi, cilantro, yuzu soy sauce.", price: "220 MAD" },
      { name: "Crispy Rice Tuna", jp: "ツナクリスピーライス", desc: "Spicy tuna, crispy rice, serrano, eel sauce.", price: "190 MAD" },
      { name: "Truffle Edamame", jp: "トリュフ枝豆", desc: "Steamed soybeans, truffle salt, garlic oil.", price: "120 MAD" },
      { name: "Rock Shrimp Tempura", jp: "ロックシュリンプ", desc: "Creamy spicy mayo, chives, yuzu juice.", price: "210 MAD" },
      { name: "Miso Black Cod Bites", jp: "銀だら西京焼き", desc: "Marinated black cod in butter lettuce wraps.", price: "260 MAD" },
      { name: "Soft Shell Crab", jp: "ソフトシェルクラブ", desc: "Deep fried crab, watermelon, ponzu sauce.", price: "230 MAD" },
      { name: "Beef Tataki", jp: "牛たたき", desc: "Seared beef, garlic chips, momiji oroshi.", price: "250 MAD" },
    ],
    "Signature Rolls": [
      { name: "Golden Dragon", jp: "ゴールデンドラゴン", desc: "Tempura shrimp, eel, avocado, 24k gold leaf.", price: "320 MAD" },
      { name: "Midnight Sun", jp: "真夜中の太陽", desc: "Spicy salmon, lemon, black caviar, gold flakes.", price: "280 MAD" },
      { name: "Volcano Roll", jp: "ボルケーノロール", desc: "Baked scallops, crab, spicy mayo, masago.", price: "260 MAD" },
      { name: "Imperial Wagyu", jp: "インペリアル和牛", desc: "A5 Wagyu, asparagus, truffle, garlic ponzu.", price: "450 MAD" },
      { name: "Rainbow Zen", jp: "レインボー禅", desc: "Crab, cucumber, topped with 7 types of fish.", price: "240 MAD" },
      { name: "Snow Crab Truffle", jp: "ズワイガニトリュフ", desc: "Real snow crab, avocado, truffle butter.", price: "300 MAD" },
      { name: "Spicy Lobster", jp: "スパイシーロブスター", desc: "Lobster tempura, mango, spicy aioli.", price: "340 MAD" },
      { name: "Zen Forest", jp: "禅の森", desc: "Vegetarian roll with asparagus, shiitake, avocado.", price: "180 MAD" },
      { name: "Kyoto Garden", jp: "京都の庭", desc: "Pickled radish, shiso leaf, plum paste.", price: "160 MAD" },
      { name: "Red Velvet", jp: "レッドベルベット", desc: "Beet-infused rice, spicy tuna, red pepper.", price: "220 MAD" },
    ],
    "Nigiri & Sashimi": [
      { name: "Bluefin Otoro", jp: "大トロ", desc: "Fattiest belly of bluefin tuna.", price: "220 MAD / 2pc" },
      { name: "Bluefin Akami", jp: "赤身", desc: "Lean bluefin tuna loin.", price: "140 MAD / 2pc" },
      { name: "King Salmon", jp: "キングサーモン", desc: "Premium New Zealand King Salmon.", price: "120 MAD / 2pc" },
      { name: "Uni Hokkaido", jp: "北海道うに", desc: "Hokkaido sea urchin, creamy and sweet.", price: "350 MAD / 2pc" },
      { name: "A5 Wagyu Nigiri", jp: "和牛握り", desc: "Seared A5 Wagyu with garlic chips.", price: "280 MAD / 2pc" },
      { name: "Botan Ebi", jp: "ボタン海老", desc: "Spotted sweet shrimp with deep fried head.", price: "180 MAD / 2pc" },
      { name: "Anago", jp: "穴子", desc: "Saltwater eel with sweet reduction.", price: "150 MAD / 2pc" },
      { name: "Hamachi Hara", jp: "はまち腹", desc: "Yellowtail belly sashimi.", price: "160 MAD / 2pc" },
      { name: "Tai Seabream", jp: "真鯛", desc: "Japanese Red Seabream with sea salt.", price: "140 MAD / 2pc" },
      { name: "Ikura", jp: "いくら", desc: "Salmon roe marinated in soy.", price: "140 MAD / 2pc" },
    ],
    "Robata Grill": [
      { name: "Lamb Chops", jp: "ラムチョップ", desc: "Korean spice, pickled onions.", price: "380 MAD" },
      { name: "Asparagus Kushiyaki", jp: "アスパラ串焼き", desc: "Wakamatsu soy, sesame seeds.", price: "120 MAD" },
      { name: "Chicken Yakitori", jp: "焼き鳥", desc: "Tare sauce, scallions.", price: "140 MAD" },
      { name: "Shiitake Mushroom", jp: "椎茸焼き", desc: "Ginger soy, bonito flakes.", price: "110 MAD" },
      { name: "Tiger Prawns", jp: "大虎海老", desc: "Yuzu kosho, lime.", price: "280 MAD" },
      { name: "Skirt Steak", jp: "ハラミ", desc: "Chimichurri Shiso sauce.", price: "320 MAD" },
      { name: "Corn Ribs", jp: "コーンリブ", desc: "Spicy miso butter, lime.", price: "140 MAD" },
      { name: "Sea Bass", jp: "スズキ", desc: "Cherry tomato, shiso pesto.", price: "340 MAD" },
    ],
    "Desserts": [
      { name: "Mochi Ice Cream", jp: "持ちアイス", desc: "Assorted seasonal flavors.", price: "120 MAD" },
      { name: "Matcha Lava Cake", jp: "抹茶ラヴァケーキ", desc: "Warm matcha center, vanilla bean ice cream.", price: "160 MAD" },
      { name: "Yuzu Cheesecake", jp: "柚子チーズケーキ", desc: "Graham cracker crust, yuzu curd.", price: "140 MAD" },
      { name: "Black Sesame Brûlée", jp: "黒胡麻ブリュレ", desc: "Toasted sesame, sugar crust.", price: "150 MAD" },
      { name: "Japanese Whiskey Cake", jp: "ウィスキーケーキ", desc: "Hibiki infused, dark chocolate.", price: "180 MAD" },
    ],
    "Cocktails": [
      { name: "The Shogun", jp: "将軍", desc: "Hibiki whiskey, ginger, lemon, honey.", price: "220 MAD" },
      { name: "Yuzu Spritz", jp: "柚子スプリッツ", desc: "Gin, yuzu, sparkling sake, mint.", price: "190 MAD" },
      { name: "Tokyo Mule", jp: "東京ミュール", desc: "Sake, vodka, ginger beer, lime.", price: "180 MAD" },
      { name: "Matcha Martini", jp: "抹茶マティーニ", desc: "Vodka, matcha, white chocolate.", price: "200 MAD" },
      { name: "Sakura Blossom", jp: "桜の花", desc: "Cherry blossom gin, vermouth, rose.", price: "210 MAD" },
      { name: "Lychee Martini", jp: "ライチマティーニ", desc: "Vodka, fresh lychee, lemon.", price: "180 MAD" },
      { name: "Wasabi Mary", jp: "わさびメアリー", desc: "Tomato, vodka, wasabi, soy garnish.", price: "190 MAD" },
      { name: "Kyoto Sour", jp: "京都サワー", desc: "Bourbon, plum wine, egg white.", price: "200 MAD" },
    ]
  };

  const images = [
    "photo-1579871494447-9811cf80d66c",
    "photo-1617196034183-421b4917c92d",
    "photo-1583623025817-d180a2221d0a",
    "photo-1553621042-f6e147245754",
    "photo-1541696432-82c6da8ce7bf",
    "photo-1563612116625-3012372fccce",
    "photo-1625938146369-adc83368bda7",
    "photo-1582450871972-ab5ca641643d",
    "photo-1558985250-27a406d64cb3",
    "photo-1611143669185-af224c5e3252",
    "photo-1540648639573-8c848de23f0a",
    "photo-1559314809-0d155014e29e"
  ];

  let id = 1;
  Object.entries(data).forEach(([category, categoryItems]) => {
    categoryItems.forEach((item) => {
      const imgId = images[id % images.length];
      items.push({
        id: `item-${id++}`,
        name: item.name,
        jpName: item.jp,
        description: item.desc,
        price: item.price,
        category: category,
        image: `https://images.unsplash.com/${imgId}?q=80&w=1000&auto=format&fit=crop`
      });
    });
  });

  return items;
};

export const MENU_DATA = generateItems();
export const CATEGORIES = ["All", "Small Plates", "Signature Rolls", "Nigiri & Sashimi", "Robata Grill", "Desserts", "Cocktails"];
