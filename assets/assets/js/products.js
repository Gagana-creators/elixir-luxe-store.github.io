/**
 * ÉLIXIR & SOIE — Maison de Haute Beauté & Joaillerie
 * Product Catalog Data Store (Local High-Resolution Imagery)
 */

const LUXURY_PRODUCTS = [
  // CATEGORY: BEAUTY SETS
  {
    id: "bs-01",
    name: "POPFEEL All In One Makeup Kit",
    category: "beauty-sets",
    categoryLabel: "Beauty Sets",
    price: 7000 ,
    originalPrice: 21000,
    rating: 4.0,
    reviewsCount: 78,
    badge: "ORIGINAL",
    isBestseller: true,
    image: "assets/images/popfeel2.jpg",
    secondaryImage: "assets/images/popfeel.jpg",
    gallery: [
      "assets/images/popfeel.jpg",
      "assets/images/spotlight-coffret.jpg",
      "assets/images/popfeel2.jpg"
    ],
    shortDescription: "All In One Makeup Kit for Women Full Kit Set.",
    description: "POPFEEL All In One Makeup Kit for Women Full Kit Set, All in One Makeup Sets Include Eyebrow Eyeliner Eyeshadow.කාන්තාවන් සඳහා POPFEEL 'All-in-One' මේකප් කට්ටලය - ඇහි බැම ආලේපන, අයි ලයිනර් (eyeliner) සහ අයි ෂැඩෝ (eyeshadow) ඇතුළත් සම්පූර්ණ මේකප් කට්ටලයකි.",
    details: [
      "All-in-one makeup solution for women",
      "Comprehensive makeup essentials included This makeup set includes eyebrow, eyeliner, and eyeshadow products",
      "Available in multiple stylish colors",
      "Safe and skin-friendly formula Formulated without high-concerned chemicals",
      "Trusted brand with quality manufacturing Crafted by POPFEL COSMETICS, a reputable manufacturer based in Mainland China"
    ],
    craftsmanship: "China",
    stockStatus: "Rare Atelier Stock (Only 6 sets remain)"
  },
{
  id: "bs-02",
  name: "Pecolovers liners",
  category: "beauty-sets",
  categoryLabel: "Liners",
  price: 653,
  originalPrice: 1724.03,
  rating: 4.9,
  reviewsCount: 114,
  badge: "Collector's Edition",
  isBestseller: false,
  image: "assets/images/m25.jpg",
  secondaryImage: "assets/images/m23.jpg",
  gallery: [
    "assets/images/m25.jpg",
    "assets/images/m23.jpg",
    "assets/images/m24.png",
  ],
  shortDescription: "Best selling eye liners.",
  description: "5pcs Black Eyeliner, Quick-drying Extremely Thin Eyeliner, Waterproof and Sweat-proof, Not Easy To Smudge, Eye Cosmetics. කළු අයිලයිනර් (Eyeliner), ඉතා ඉක්මනින් වියළෙන සහ අතිශය සිහින් අයිලයිනර්; ජලයට සහ දහඩියට ඔරොත්තු දෙන, පහසුවෙන් නොමැකෙන/නොපැල්ලම් වන, ඇස් සඳහා වන රූපලාවණ්‍ය නිෂ්පාදනයකි.",
  details: [
    "5pcs Premium Liquid Eyeliner Set",
    "Quick-Drying & Ultra-Thin Formula Designed with a quick-drying and extremely thin liquid formula",
    "Waterproof & Sweat-Proof Performance Engineered to be waterproof and sweat-proof",
    "Smudge-Resistant for All-Day Wear"
  ],
  craftsmanship: "Made in china.",
  stockStatus: "In Stock"
},
  {
    id: "bs-03",
    name: "ELF ",
    category: "beauty-sets",
    categoryLabel: "Beauty Sets",
    price: 1000,
    originalPrice: null,
    rating: 4.9,
    reviewsCount: 52,
    badge: "Maison Icon",
    isBestseller: false,
    image: "assets/images/elf.png",
    secondaryImage: "assets/images/elf2.png",
    gallery: [
      "assets/images/elf.png",
      "assets/images/elf2.png",
      "assets/images/elf3.png",
    ],
    shortDescription: "ELF LIP OIL.",
    description: "New Elf Nutritious Lip Oil Plump Lip Makeup Cosmetics Glow Reviver Lip Gloss Candy Divine Wine Tinted Lightweight Moisturizing.",
    details: [
      "NUMBER OF PIECES :One Unit",
      "BENEFIT :Moisturizer, Long-lasting, Hydrating, Nutritious, Easy to apply, Waterproof",
      "TYPE :Lip Gloss",
      "NET WT :24ML"
    ],
    craftsmanship: "Mainland: China , Shelf life:3years",
    stockStatus: "In Stock"
  },
    {
  id: "bs-04",
  name: " Brushes Kit",
  category: "beauty-sets",
  categoryLabel: "Beauty Sets",
  price: 2050,
  originalPrice: 6039,
  rating: 4.6,
  reviewsCount: 89,
  badge: "Trusted",
  isBestseller: true,
  image: "assets/images/Screenshot 2026-10-23 145416.png",
  secondaryImage: "assets/images/Screenshot 2026-10-23 145430.png",
  gallery: [
    "assets/images/Screenshot 2026-10-23 145416.jpg",
    "assets/images/Screenshot 2026-10-23 145430.jpg",
    "assets/images/Screenshot 2026-10-23 145457.jpg"
  ],
  shortDescription: "18 highly pigmented eyeshadows in matte and shimmer finishes.",
  description: "16Pcs Multi-function Cosmetic Brushes Kit For Full Face Eye Daily Makeup For Beginners.",
  details: [
    "16-piece multi-functional makeup brush set",
    "High-quality nylon bristles Crafted with Nylon brush material",
    "Classic black plastic handles Featuring Black handle color and Plastic handle material",
    "Safe and chemical-free design Made with High-concerned chemical"
  ],
  craftsmanship: "Made in China",
  stockStatus: "In Stock"
},
{
  id: "bs-05",
  name: "6pcs Makeup Brush Set",
  category: "beauty-sets",
  categoryLabel: "Beauty Sets",
  price: 990,
  originalPrice: 1800,
  rating: 4.7,
  reviewsCount: 156,
  badge: "Hot",
  isBestseller: true,
  image: "assets/images/brush1.jpg",
  secondaryImage: "assets/images/brush2.jpg",
  gallery: [
    "assets/images/brush1.jpg",
    "assets/images/brush2.jpg",
    "assets/images/brush3.jpg"
  ],
  shortDescription: "Soft synthetic bristle makeup brush set with pouch.",
  description: "Complete 6pcs professional makeup brush set for face and eyes. Soft, fluffy and beginner-friendly.",
  details: [
    "6 essential brushes",
    "Soft synthetic bristles",
    "Includes storage pouch",
    "Perfect for beginners"
  ],
  craftsmanship: "Made in China",
  stockStatus: "In Stock"
},
{
  id: "bs-06",
  name: "Matte Liquid Lipstick Set (6 Colors)",
  category: "beauty-sets",
  categoryLabel: "Beauty Sets",
  price: 1450,
  originalPrice: 2400,
  rating: 4.5,
  reviewsCount: 203,
  badge: "Popular",
  isBestseller: false,
  image: "assets/images/lipstick1.jpg",
  secondaryImage: "assets/images/lipstick2.jpg",
  gallery: [
    "assets/images/lipstick1.jpg",
    "assets/images/lipstick2.jpg",
    "assets/images/lipstick3.jpg"
  ],
  shortDescription: "6 velvet matte liquid lipsticks in trendy shades.",
  description: "Long-lasting matte liquid lipstick set. Non-drying formula with rich color payoff.",
  details: [
    "6 beautiful matte shades",
    "Long-lasting up to 8 hours",
    "Lightweight and non-sticky",
    "Waterproof formula"
  ],
  craftsmanship: "Made in China",
  stockStatus: "In Stock"
},
{
  id: "bs-07",
  name: "BB Cream + Concealer Duo",
  category: "beauty-sets",
  categoryLabel: "Beauty Sets",
  price: 1200,
  originalPrice: 1950,
  rating: 4.4,
  reviewsCount: 67,
  badge: "New",
  isBestseller: false,
  image: "assets/images/bbcream1.jpg",
  secondaryImage: "assets/images/bbcream2.jpg",
  gallery: [
    "assets/images/bbcream1.jpg",
    "assets/images/bbcream2.jpg",
    "assets/images/bbcream3.jpg"
  ],
  shortDescription: "Lightweight BB cream with matching concealer.",
  description: "Natural coverage BB cream + concealer duo. Perfect for everyday natural makeup look.",
  details: [
    "Light to medium coverage",
    "Hydrating formula",
    "Includes concealer",
    "Suitable for most skin tones"
  ],
  craftsmanship: "Made in China",
  stockStatus: "In Stock"
},
{
  id: "bs-08",
  name: "Highlighter & Contour Palette",
  category: "beauty-sets",
  categoryLabel: "Beauty Sets",
  price: 1350,
  originalPrice: 2200,
  rating: 4.6,
  reviewsCount: 94,
  badge: "Trending",
  isBestseller: false,
  image: "assets/images/contour1.jpg",
  secondaryImage: "assets/images/contour2.jpg",
  gallery: [
    "assets/images/contour1.jpg",
    "assets/images/contour2.jpg",
    "assets/images/contour3.jpg"
  ],
  shortDescription: "4-color highlighter and contour palette for sculpted look.",
  description: "Easy-to-use contour and highlighter palette. Create natural definition and glowing skin.",
  details: [
    "2 contour + 2 highlighter shades",
    "Soft and blendable powder",
    "Buildable color",
    "Beginner friendly"
  ],
  craftsmanship: "Made in China",
  stockStatus: "In Stock"
},

  // CATEGORY: FINE JEWELRY
  {
    id: "jw-01",
    name: "Exquisite Zircon Ring",
    category: "jewelry",
    categoryLabel: "Fine Jewelry",
    price: 1900,
    originalPrice: 4557,
    rating: 4.9,
    reviewsCount: 39,
    badge: "Haute Joaillerie",
    isBestseller: true,
    image: "assets/images/r1.png",
    secondaryImage: "assets/images/r1.png",
    gallery: [
      "assets/images/r1.png",
      "assets/images/r2.png",
      "assets/images/r3.png"
    ],
    shortDescription: "Exquisite Zircon Ring for Women Gold Color Wedding Jewelry Opening Adjustable Index Finger Rings Retro Aesthetic Accessories.",
    description: "An architectural masterpiece designed in our Place Vendôme studio. Each diamond is hand-selected and micro-set under microscope by our master gem setters to create an uninterrupted river of fire.",
    details: [
      "Ring Type :Wedding Bands",
      "Shape :Waterdrop",
      "Classic style",
      "Material :Cubic zirconia",
      "For women"
    ],
    craftsmanship: "Made in china.",
    stockStatus: "Available"
  },
  {
    id: "jw-02",
    name: "Émeraude Royale Drop Pendant Necklace",
    category: "jewelry",
    categoryLabel: "Fine Jewelry",
    price: 2450,
    originalPrice: 2800,
    rating: 5.0,
    reviewsCount: 24,
    badge: "One-of-a-Kind",
    isBestseller: false,
    image: "assets/images/m1.jpg",
    secondaryImage: "assets/images/m2.jpg",
    gallery: [
      "assets/images/jw-02-emerald-necklace.jpg",
      "assets/images/jw-02-emerald-necklace-alt.jpg",
      "assets/images/jw-01-diamond-ring.jpg"
    ],
    shortDescription: "A hypnotic Colombian pear-cut emerald framed by brilliant tapered diamond baguettes on an 18K gold wheat chain.",
    description: "A testament to enduring grace. The vivid green emerald radiates pure chromatic vibrancy, crowned by brilliant diamond accents that catch light from every angle.",
    details: [
      "1.85 ct Certified Natural Colombian Emerald",
      "0.45 ct Baguette and Round Brilliant Cut Diamonds",
      "18K Solid Yellow Gold 18-inch adjustable wheat chain",
      "Custom safety lobster clasp with É&S hallmark seal"
    ],
    craftsmanship: "Individually certified and assembled in Geneva, Switzerland.",
    stockStatus: "Only 2 specimens in private stock"
  },
  {
    id: "jw-03",
    name: "Vendôme Baroque Pearl & Gold Cuff",
    category: "jewelry",
    categoryLabel: "Fine Jewelry",
    price: 1350,
    originalPrice: null,
    rating: 4.8,
    reviewsCount: 31,
    badge: "Artisanal",
    isBestseller: false,
    image: "assets/images/jw-03-pearl-cuff.jpg",
    secondaryImage: "assets/images/jw-03-pearl-cuff-alt.jpg",
    gallery: [
      "assets/images/jw-03-pearl-cuff.jpg",
      "assets/images/jw-03-pearl-cuff-alt.jpg",
      "assets/images/jw-01-diamond-ring.jpg"
    ],
    shortDescription: "Hammered 18k gold vermeil sculpted cuff featuring two lustrous organic Australian South Sea baroque pearls.",
    description: "Each baroque pearl is completely unique, grown in the warm waters of the Southern Ocean, nestled into molten-textured golden embrace.",
    details: [
      "Sustainably harvested 12-13mm South Sea Baroque Pearls",
      "Heavy 18K Gold Vermeil over 925 Sterling Silver base",
      "Flexible ergonomic opening to gently fit any wrist",
      "Signature brushed satin finish"
    ],
    craftsmanship: "Hand-forged by our silversmiths using ancestral lost-wax casting.",
    stockStatus: "In Stock"
  },

  // CATEGORY: HAUTE COUTURE & FASHION
  {
    id: "fs-01",
    name: "Sovereign Mulberry Silk Evening Cape",
    category: "fashion",
    categoryLabel: "Haute Couture",
    price: 1450,
    originalPrice: 1700,
    rating: 4.9,
    reviewsCount: 45,
    badge: "Atelier Signature",
    isBestseller: true,
    image: "assets/images/fs-01-silk-cape.jpg",
    secondaryImage: "assets/images/fs-01-silk-cape-alt.jpg",
    gallery: [
      "assets/images/fs-01-silk-cape.jpg",
      "assets/images/fs-01-silk-cape-alt.jpg",
      "assets/images/fs-03-cashmere-trench.jpg"
    ],
    shortDescription: "A floor-skimming silhouette in 30-momme heavy mulberry silk with tailored structured shoulders and gilded horn closures.",
    description: "Created in our Parisian couture atelier. Designed to drape effortlessly over evening wear or tailored suiting, whispering of unapologetic grandeur with every stride.",
    details: [
      "100% Pure Mulberry Silk Crepe de Chine",
      "Interior fully lined with tonal French silk habotai",
      "Hand-carved horn buttons plated in 14K gold",
      "Concealed side arm slits and inner secret pocket",
      "Tailored garment bag and cedar hanger included"
    ],
    craftsmanship: "Cut and sewn by single master tailors in Paris with hand-finished hemline.",
    stockStatus: "Bespoke & Ready to Ship (Sizes 34 - 44 FR)"
  },
  {
    id: "fs-02",
    name: "L'Ombre Noir Liquid Satin Slip Gown",
    category: "fashion",
    categoryLabel: "Haute Couture",
    price: 980,
    originalPrice: null,
    rating: 5.0,
    reviewsCount: 62,
    badge: "Red Carpet",
    isBestseller: false,
    image: "assets/images/fs-02-satin-slip.jpg",
    secondaryImage: "assets/images/fs-02-satin-slip-alt.jpg",
    gallery: [
      "assets/images/fs-02-satin-slip.jpg",
      "assets/images/fs-02-satin-slip-alt.jpg",
      "assets/images/fs-01-silk-cape.jpg"
    ],
    shortDescription: "Bias-cut liquid silk satin in midnight obsidian with delicate French chantilly lace insets at the low plunge back.",
    description: "Cascades along the curves of the body like molten glass. The bias cut offers natural flexibility and an intoxicating liquid drape that demands attention.",
    details: [
      "100% Grade 6A Silk Charmeuse",
      "Antique French Chantilly lace inserts",
      "Adjustable micro spaghetti straps with gold bead toggles",
      "Floor length with soft sweep train"
    ],
    craftsmanship: "Hand-cut on the true bias in Lyon, France.",
    stockStatus: "In Stock"
  },
  {
    id: "fs-03",
    name: "Palais Royal Structured Cashmere Trench",
    category: "fashion",
    categoryLabel: "Haute Couture",
    price: 2150,
    originalPrice: 2450,
    rating: 4.9,
    reviewsCount: 18,
    badge: "Heritage Outerwear",
    isBestseller: false,
    image: "assets/images/fs-03-cashmere-trench.jpg",
    secondaryImage: "assets/images/fs-03-cashmere-trench-alt.jpg",
    gallery: [
      "assets/images/fs-03-cashmere-trench.jpg",
      "assets/images/fs-03-cashmere-trench-alt.jpg",
      "assets/images/fs-01-silk-cape.jpg"
    ],
    shortDescription: "Double-faced Mongolian cashmere tailored with sharp military lapels, storm flap, and a belted cinched waist.",
    description: "The pinnacle of cold-weather elegance. Impeccably insulated yet whisper-light, woven from virgin white cashmere fibers gathered from the Himalayan highlands.",
    details: [
      "100% Double-Faced Mongolian Cashmere (480gsm)",
      "Unlined clean finish with hand-stitched invisible hems",
      "Tortoiseshell resin and brushed gold buckles",
      "Removable sash tie belt with topstitch detailing"
    ],
    craftsmanship: "Woven in Biella, Italy; assembled by master coatmakers in Paris.",
    stockStatus: "Atelier Made to Order (Ships within 7 days)"
  },

  // CATEGORY: LUXURY FRAGRANCE
  {
    id: "fg-01",
    name: "Oud Royal & Ambre Gris Extrait de Parfum",
    category: "fragrance",
    categoryLabel: "Haute Parfumerie",
    price: 420,
    originalPrice: null,
    rating: 5.0,
    reviewsCount: 93,
    badge: "Extrait 35%",
    isBestseller: true,
    image: "assets/images/fg-01-oud-extrait.jpg",
    secondaryImage: "assets/images/fg-01-oud-extrait-alt.jpg",
    gallery: [
      "assets/images/fg-01-oud-extrait.jpg",
      "assets/images/fg-01-oud-extrait-alt.jpg",
      "assets/images/fg-02-rose-parfum.jpg"
    ],
    shortDescription: "A hypnotic distillation of 30-year wild Cambodian agarwood, white ambergris, Bulgarian saffron, and smoked honey.",
    description: "An intoxicating, multi-layered olfactive journey. Possesses an extraordinary 35% oil concentration that lingers on the skin and silk scarves for days with a regal sillage.",
    details: [
      "Top Notes: Saffron Royale, Sicilian Blood Mandarin, Cardamom",
      "Heart Notes: Turkish Rose Absolute, Wild Honeycomb, Smoky Incense",
      "Base Notes: 30-Year Wild Oud, Natural Ambergris, Mysore Sandalwood",
      "Hand-blown heavy crystal flacon with magnetic gold stopper (100ml)"
    ],
    craftsmanship: "Matured in oak barrels for 12 months in Grasse, France.",
    stockStatus: "In Stock"
  },
  {
    id: "fg-02",
    name: "Rose Éternelle & Pivoine Blanche Flacon",
    category: "fragrance",
    categoryLabel: "Haute Parfumerie",
    price: 340,
    originalPrice: null,
    rating: 4.8,
    reviewsCount: 57,
    badge: "Pure Nectar",
    isBestseller: false,
    image: "assets/images/fg-02-rose-parfum.jpg",
    secondaryImage: "assets/images/fg-02-rose-parfum-alt.jpg",
    gallery: [
      "assets/images/fg-02-rose-parfum.jpg",
      "assets/images/fg-02-rose-parfum-alt.jpg",
      "assets/images/fg-01-oud-extrait.jpg"
    ],
    shortDescription: "Hand-picked May roses from Grasse intertwined with white peony petals, spun sugar, and silky cashmeran musk.",
    description: "Light-filled, ethereal, and aristocratic. Captures the morning dew on private French rose gardens just as the first sunbeam strikes the petals.",
    details: [
      "Top Notes: Bergamot di Calabria, Lychee Blossom, Morning Dew",
      "Heart Notes: Centifolia Rose de Grasse, White Peony, Violet Leaves",
      "Base Notes: White Amber, Cashmeran, Cedarwood Atlas",
      "100ml Eau de Parfum in faceted cut-glass flacon"
    ],
    craftsmanship: "Hand-blended during the May harvest season in the hills of Provence.",
    stockStatus: "In Stock"
  },

  // CATEGORY: HIGH-END SKINCARE RITUALS
  {
    id: "sk-01",
    name: "Élixir Sublime 24K Cellular Serum",
    category: "skincare",
    categoryLabel: "Skincare Rituals",
    price: 380,
    originalPrice: null,
    rating: 5.0,
    reviewsCount: 142,
    badge: "Best Beauty Award 2026",
    isBestseller: true,
    image: "assets/images/sk-01-gold-serum.jpg",
    secondaryImage: "assets/images/sk-01-gold-serum-alt.jpg",
    gallery: [
      "assets/images/sk-01-gold-serum.jpg",
      "assets/images/sk-01-gold-serum-alt.jpg",
      "assets/images/sk-02-caviar-creme.jpg"
    ],
    shortDescription: "Targeted bio-cellular serum suspended with 24-karat microscopic gold colloidal suspension, copper peptides, and hyaluronic matrix.",
    description: "Our crown jewel formulation. Penetrates the deeper epidermis to dramatically smooth fine lines, restore elastic tension, and produce an unmatched radiant glass-skin luminosity.",
    details: [
      "24K Colloidal Gold Flakes for micro-circulation and collagen synthesis",
      "Multi-molecular weight triple Hyaluronic Acid (2.5%)",
      "Copper Tripeptide-1 for cellular repair and firmness",
      "Fragrance-free, hypoallergenic, non-comedogenic",
      "50ml / 1.7 fl. oz. dropper bottle with gold metallic collar"
    ],
    craftsmanship: "Formulated in clinical labs in Zurich, Switzerland.",
    stockStatus: "In Stock"
  },
  {
    id: "sk-02",
    name: "Crème Royale Caviar & Truffle Infusion",
    category: "skincare",
    categoryLabel: "Skincare Rituals",
    price: 460,
    originalPrice: 520,
    rating: 4.9,
    reviewsCount: 88,
    badge: "Cellular Renewal",
    isBestseller: false,
    image: "assets/images/sk-02-caviar-creme.jpg",
    secondaryImage: "assets/images/sk-02-caviar-creme-alt.jpg",
    gallery: [
      "assets/images/sk-02-caviar-creme.jpg",
      "assets/images/sk-02-caviar-creme-alt.jpg",
      "assets/images/sk-01-gold-serum.jpg"
    ],
    shortDescription: "An ultra-nourishing rich restorative crème formulated with pure Caspian sturgeon caviar extract and white winter truffle bioferment.",
    description: "Imparts an immediate velvet cushion to the skin barrier. Replenishes essential fatty acids, amino complexes, and vital trace minerals for profound anti-aging revitalization.",
    details: [
      "Potent Sturgeon Caviar Extract (rich in Omega-3 and phospholipids)",
      "Piedmont White Truffle Enzyme ferment",
      "Niacinamide (5%) & Microalgae Bio-active complex",
      "60ml heavy glass jar with custom brass application spatula"
    ],
    craftsmanship: "Sustainably cultured caviar peptides compounded in Geneva.",
    stockStatus: "In Stock"
  }
];

// Curated Category Definitions
const LUXURY_CATEGORIES = [
  {
    id: "all",
    name: "All Creations",
    count: 10,
    description: "Explore the comprehensive catalog of haute beauty, fine jewelry, and couture."
  },
  {
    id: "beauty-sets",
    name: "Beauty Sets & Coffrets",
    count: 4,
    description: "Artisan coffrets and curated multi-piece rituals presented in keepsake trunks."
  },
  {
    id: "jewelry",
    name: "Fine Jewelry",
    count: 3,
    description: "Handcrafted 18-karat gold, conflict-free diamonds, and certified natural gemstones."
  },
  {
    id: "fashion",
    name: "Haute Couture",
    count: 3,
    description: "Pure mulberry silks, double-faced cashmere, and bespoke Parisian tailoring."
  },
  {
    id: "fragrance",
    name: "Haute Parfumerie",
    count: 2,
    description: "High-concentration extraits and masterwork flacons from Grasse."
  },
  {
    id: "skincare",
    name: "Skincare Rituals",
    count: 2,
    description: "Bio-cellular formulas infused with 24K gold, caviar, and botanical elixirs."
  }
];

// Curated Currency Conversion Rates (Base USD)
const CURRENCY_RATES = {
  USD: { symbol: "Rs", rate: 1.0, label: "lkr (Rs)" },
  EUR: { symbol: "€", rate: 0.92, label: "EUR (€)" },
  GBP: { symbol: "£", rate: 0.79, label: "GBP (£)" },
  AED: { symbol: "AED ", rate: 3.67, label: "AED (د.إ)" },
  JPY: { symbol: "¥", rate: 152.0, label: "JPY (¥)" }
};
