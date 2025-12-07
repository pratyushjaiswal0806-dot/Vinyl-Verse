export interface ProductReview {
  id: number;
  name: string;
  rating: number;
  comment: string;
  date: string;
  avatar: string;
}

export interface Product {
  id: number;
  title: string;
  artist: string;
  price: number;
  originalPrice?: number;
  image: string;
  genre: string;
  year: number;
  description: string;
  tracklist: string[];
  inStock: boolean;
  isNew?: boolean;
  isBestSeller?: boolean;
  isSale?: boolean;
  reviews: ProductReview[];
}

const generateReviews = (productId: number): ProductReview[] => {
  const reviewPool = [
    { name: "Alex Thompson", comment: "Incredible pressing quality! The sound is warm and rich.", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" },
    { name: "Maria Garcia", comment: "Shipped quickly and arrived in perfect condition.", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face" },
    { name: "James Wilson", comment: "A must-have for any serious collector. Absolutely love it!", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" },
    { name: "Emily Chen", comment: "The artwork is stunning and the vinyl sounds amazing.", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face" },
    { name: "David Brown", comment: "Great value for money. Will definitely buy more!", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face" },
  ];

  const numReviews = 2 + (productId % 3);
  const reviews: ProductReview[] = [];
  
  for (let i = 0; i < numReviews; i++) {
    const reviewer = reviewPool[(productId + i) % reviewPool.length];
    reviews.push({
      id: i + 1,
      name: reviewer.name,
      rating: 4 + (i % 2),
      comment: reviewer.comment,
      date: `${['Jan', 'Feb', 'Mar', 'Apr', 'May'][i % 5]} ${10 + i}, 2024`,
      avatar: reviewer.avatar,
    });
  }
  
  return reviews;
};

export const products: Product[] = [
  {
    id: 1,
    title: "Cosmic Echoes",
    artist: "The Stardust Crusaders",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?w=500&h=500&fit=crop",
    genre: "Electronic",
    year: 2023,
    description: "A mesmerizing journey through cosmic soundscapes, blending ambient textures with pulsating electronic beats.",
    tracklist: ["Nebula Dawn", "Stellar Drift", "Cosmic Highway", "Dark Matter", "Event Horizon", "Supernova", "Gravity Wells", "Light Years Away"],
    inStock: true,
    isNew: true,
    reviews: generateReviews(1),
  },
  {
    id: 2,
    title: "Midnight Moods",
    artist: "Luna Simone",
    price: 34.99,
    image: "https://images.unsplash.com/photo-1500099817043-86d46000d58f?w=500&h=500&fit=crop",
    genre: "Jazz",
    year: 2022,
    description: "Sultry jazz vocals meet sophisticated instrumentals in this late-night masterpiece.",
    tracklist: ["After Hours", "Velvet Moon", "City Lights", "Whispered Secrets", "Nocturnal", "Blue Reverie", "Starlit Café"],
    inStock: true,
    isBestSeller: true,
    reviews: generateReviews(2),
  },
  {
    id: 3,
    title: "Urban Legends",
    artist: "Street Poets",
    price: 27.99,
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=500&fit=crop",
    genre: "Hip Hop",
    year: 2024,
    description: "Raw storytelling meets hard-hitting production from the concrete jungle.",
    tracklist: ["Block Stories", "Rising Sun", "Concrete Dreams", "Street Philosophy", "Night Shift", "Crown Heights", "Legacy"],
    inStock: true,
    isNew: true,
    reviews: generateReviews(3),
  },
  {
    id: 4,
    title: "Neon Dreams",
    artist: "Synthwave Collective",
    price: 32.99,
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&h=500&fit=crop",
    genre: "Synthwave",
    year: 2023,
    description: "Retro-futuristic soundscapes that transport you to neon-lit streets.",
    tracklist: ["Digital Sunset", "Chrome Heart", "Arcade Runner", "Night Drive", "Electric City", "Laser Grid", "Retro Future", "Endless Highway"],
    inStock: true,
    isBestSeller: true,
    reviews: generateReviews(4),
  },
  {
    id: 5,
    title: "Acoustic Sessions",
    artist: "Emma Hartley",
    price: 22.99,
    originalPrice: 26.99,
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&h=500&fit=crop",
    genre: "Folk",
    year: 2023,
    description: "Intimate acoustic performances recorded live in a single session.",
    tracklist: ["Homeward Bound", "Autumn Leaves", "River Song", "Mountain High", "Simple Days", "Wanderer"],
    inStock: true,
    isSale: true,
    reviews: generateReviews(5),
  },
  {
    id: 6,
    title: "Electric Soul",
    artist: "The Voltage Band",
    price: 31.99,
    image: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=500&h=500&fit=crop",
    genre: "Rock",
    year: 2024,
    description: "High-energy rock infused with soul and funk influences.",
    tracklist: ["Thunder Road", "Soul Fire", "Electric Avenue", "Power Surge", "Midnight Rider", "Voltage Drop", "Final Countdown"],
    inStock: true,
    isNew: true,
    reviews: generateReviews(6),
  },
  {
    id: 7,
    title: "Ocean Waves",
    artist: "Ambient Dreams",
    price: 24.99,
    originalPrice: 29.99,
    image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=500&h=500&fit=crop",
    genre: "Electronic",
    year: 2023,
    description: "Peaceful ambient soundscapes inspired by the rhythm of the ocean.",
    tracklist: ["Tidal Flow", "Deep Blue", "Coral Reef", "Sunset Horizon", "Moonlit Shore", "Pacific Dreams"],
    inStock: true,
    isSale: true,
    reviews: generateReviews(7),
  },
  {
    id: 8,
    title: "Golden Hour",
    artist: "The Sunset Collective",
    price: 28.99,
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=500&h=500&fit=crop",
    genre: "Jazz",
    year: 2024,
    description: "Warm, melodic jazz perfect for sunset listening sessions.",
    tracklist: ["Amber Light", "Twilight Serenade", "Evening Breeze", "Golden Memories", "Dusk Dance"],
    inStock: true,
    isBestSeller: true,
    reviews: generateReviews(8),
  },
  {
    id: 9,
    title: "Vintage Vibes",
    artist: "Retro Revival",
    price: 19.99,
    originalPrice: 25.99,
    image: "https://images.unsplash.com/photo-1484755560615-a4c64e778a6c?w=500&h=500&fit=crop",
    genre: "Rock",
    year: 2022,
    description: "Classic rock sounds with a modern twist.",
    tracklist: ["Time Machine", "Old School", "Vinyl Days", "Retro Groove", "Classic Feel"],
    inStock: true,
    isSale: true,
    reviews: generateReviews(9),
  },
  {
    id: 10,
    title: "City Nights",
    artist: "Metro Sound",
    price: 33.99,
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&h=500&fit=crop",
    genre: "Hip Hop",
    year: 2024,
    description: "Urban beats that capture the energy of the city after dark.",
    tracklist: ["Neon Streets", "Midnight Metro", "Urban Pulse", "City Anthem", "Night Crawler", "Downtown"],
    inStock: true,
    isNew: true,
    reviews: generateReviews(10),
  },
  {
    id: 11,
    title: "Forest Whispers",
    artist: "Nature Sound",
    price: 26.99,
    image: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=500&h=500&fit=crop",
    genre: "Folk",
    year: 2023,
    description: "Organic folk melodies inspired by the tranquility of nature.",
    tracklist: ["Morning Dew", "Woodland Path", "River Flow", "Mountain Echo", "Sunset Trail"],
    inStock: true,
    isBestSeller: true,
    reviews: generateReviews(11),
  },
  {
    id: 12,
    title: "Digital Horizon",
    artist: "Cyber Wave",
    price: 35.99,
    image: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=500&h=500&fit=crop",
    genre: "Synthwave",
    year: 2024,
    description: "Futuristic synthwave pushing the boundaries of electronic music.",
    tracklist: ["Binary Dreams", "Cyber City", "Digital Dawn", "Neon Pulse", "Future State", "Virtual Reality"],
    inStock: true,
    isNew: true,
    reviews: generateReviews(12),
  },
];

export const genres = ["All", "Electronic", "Jazz", "Hip Hop", "Synthwave", "Folk", "Rock"];

export const getProductById = (id: number): Product | undefined => {
  return products.find((p) => p.id === id);
};

export const getRelatedProducts = (product: Product, limit: number = 3): Product[] => {
  return products.filter((p) => p.genre === product.genre && p.id !== product.id).slice(0, limit);
};

export const getBundleProducts = (product: Product): Product[] => {
  const sameGenre = products.filter((p) => p.genre === product.genre && p.id !== product.id);
  const differentGenre = products.filter((p) => p.genre !== product.genre);
  return [...sameGenre.slice(0, 1), ...differentGenre.slice(0, 1)];
};