export const locations = [
  "Rajshahi",
  "Chapainawabganj",
  "Dinajpur",
  "Naogaon",
  "Satkhira"
];

export const varieties = [
  "Langra",
  "Himsagar",
  "Fazli",
  "Amrupali",
  "Gopalbhoj",
  "Khirsapat"
];

const baseProducts = [
  {
    id: "1",
    name: "Rajshahi Langra Mango",
    slug: "rajshahi-langra-mango",
    variety: "Langra",
    description: "Premium quality, chemical-free fresh Langra mangoes directly from the gardens of Rajshahi.",
    price: 120,
    unit: "kg",
    image: "https://picsum.photos/seed/mango1/800/600",
    location: "Rajshahi",
    stock: 500,
    rating: 4.8,
    reviews: 124,
  },
  {
    id: "2",
    name: "Chapainawabganj Himsagar",
    slug: "chapainawabganj-himsagar-mango",
    variety: "Himsagar",
    description: "Authentic Himsagar known for its sweet taste and aroma, hand-picked from Chapainawabganj.",
    price: 130,
    unit: "kg",
    image: "https://picsum.photos/seed/mango2/800/600",
    location: "Chapainawabganj",
    stock: 300,
    rating: 4.9,
    reviews: 210,
  },
  {
    id: "3",
    name: "Dinajpur Fazli Mango",
    slug: "dinajpur-fazli-mango",
    variety: "Fazli",
    description: "Large, sweet, and fleshy Fazli mangoes from the renowned orchards of Dinajpur.",
    price: 100,
    unit: "kg",
    image: "https://picsum.photos/seed/mango3/800/600",
    location: "Dinajpur",
    stock: 200,
    rating: 4.7,
    reviews: 85,
  },
  {
    id: "4",
    name: "Premium Amrupali",
    slug: "premium-amrupali-mango",
    variety: "Amrupali",
    description: "Incredibly sweet and fiberless Amrupali mangoes for the best mango eating experience.",
    price: 150,
    unit: "kg",
    image: "https://picsum.photos/seed/mango4/800/600",
    location: "Rajshahi",
    stock: 450,
    rating: 4.9,
    reviews: 156,
  }
];

// Generate 200 dummy products for extensive UI testing
export const products = [ ...baseProducts, ...Array.from({ length: 200 }).map((_, i) => {
   const variety = varieties[i % varieties.length];
   const location = locations[i % locations.length];
   return {
      id: `mock-${i + 10}`,
      name: `Premium ${variety} Selection #${i+5}`,
      slug: `premium-selection-${i+5}`,
      variety: variety,
      description: `Farm-fresh mango from ${location}. Hand-picked and organically protected. Batch #${i+5}`,
      price: 100 + (i % 50),
      unit: 'kg',
      image: `https://picsum.photos/seed/mango${i+10}/800/600`, // Guaranteed non-timeout seed images
      location: location,
      stock: 50 + (i * 2),
      rating: Number((4.0 + (i % 10) / 10).toFixed(1)),
      reviews: i * 3
   };
})];

export const blogPosts = [
  {
    id: "1",
    title: "Best Mango in Bangladesh: A Complete Guide",
    slug: "best-mango-in-bangladesh",
    category: "Mango Guide",
    excerpt: "Discover the top varieties of mangoes in Bangladesh, their origin, taste profiles, and when to buy them for the ultimate fruit experience.",
    publishDate: "2024-05-15",
    author: "Digital Orchard Team",
    image: "https://picsum.photos/seed/blog1/800/600",
    content: "Bangladesh is a land famous for its incredibly sweet and diverse varieties of mangoes...",
  },
  {
    id: "2",
    title: "Langra vs Himsagar Mango: Which one should you buy?",
    slug: "langra-vs-himsagar-mango",
    category: "Buying Tips",
    excerpt: "A detailed comparison between the two most popular mango varieties in Bangladesh - Langra and Himsagar. Find out which suits your taste buds better.",
    publishDate: "2024-05-20",
    author: "Fruit Expert",
    image: "https://picsum.photos/seed/blog2/800/600",
    content: "When the summer arrives in Bangladesh, the debate begins: Langra or Himsagar? Both are exceptional...",
  },
  {
    id: "3",
    title: "Where to buy mango online in Bangladesh safely",
    slug: "where-to-buy-mango-online-in-bangladesh",
    category: "Buying Tips",
    excerpt: "Learn how to identify authentic sellers and safely buy chemical-free, garden-fresh mangoes online in Bangladesh.",
    publishDate: "2024-05-25",
    author: "Digital Orchard Team",
    image: "https://picsum.photos/seed/blog3/800/600",
    content: "With the rise of e-commerce, buying mangoes online has become convenient. However, avoiding chemical-treated fruits...",
  },
  {
    id: "4",
    title: "Rajshahi Mango Price Today: Market Update",
    slug: "rajshahi-mango-price-today",
    category: "Market Watch",
    excerpt: "Get the latest updates on the current market prices for different varieties of Rajshahi mangoes. Stay informed before you buy.",
    publishDate: "2024-06-01",
    author: "Market Analyst",
    image: "https://picsum.photos/seed/blog4/800/600",
    content: "The mango market is highly dynamic. Today, the prices in the famous Rajshahi wholesale markets are...",
  }
];
