import imgJuicyFront from '../assets/IMG_7.png'
import imgJuicyCouple from '../assets/IMG_3.png'
import imgJuicyPromo from '../assets/IMG_6.png'
import imgEssentialsLife from '../assets/IMG_10.png'
import imgEssentialsMockup from '../assets/IMG_8.png'

export const products = [
  {
    id: 1,
    name: "JUICY DREAMS TEE",
    price: 89,
    category: "tees",
    image: imgJuicyFront,
    tag: "NUEVO",
    colors: ["Marrón"],
    sizes: ["S", "M", "L", "XL", "2XL"],
    description: "Oversize tee de algodón premium 100%. Gráfico 'JUICY DREAMS' serigrafiado en espalda, logo 'DONT BREAK' en pecho. Fit oversize, tela suave y cómoda. Essentials Collection — Never Stop Exploring.",
  },
  {
    id: 2,
    name: "JUICY DREAMS TEE — COLECCIÓN",
    price: 89,
    category: "tees",
    image: imgJuicyCouple,
    tag: null,
    colors: ["Marrón"],
    sizes: ["S", "M", "L", "XL", "2XL"],
    description: "Oversize tee de algodón premium 100%. Gráfico 'JUICY DREAMS' serigrafiado en espalda, logo 'DONT BREAK' en pecho. Fit oversize, tela suave y cómoda. Essentials Collection — Never Stop Exploring.",
  },
  {
    id: 3,
    name: "JUICY DREAMS TEE — CAMPAÑA",
    price: 89,
    category: "tees",
    image: imgJuicyPromo,
    tag: null,
    colors: ["Marrón"],
    sizes: ["S", "M", "L", "XL", "2XL"],
    description: "Oversize tee de algodón premium 100%. Gráfico 'JUICY DREAMS' serigrafiado en espalda, logo 'DONT BREAK' en pecho. Fit oversize, tela suave y cómoda. Essentials Collection — Never Stop Exploring.",
  },
  {
    id: 4,
    name: "ESSENTIALS TEE",
    price: 79,
    category: "tees",
    image: imgEssentialsLife,
    tag: "NUEVO",
    colors: ["Blanco"],
    sizes: ["S", "M", "L", "XL", "2XL"],
    description: "'DONTBREAK ESSENTIALS COLLECTION' en el pecho, 'Good things are fucking coming' en la espalda. Where imagination meets reality. Algodón premium oversize.",
  },
  {
    id: 5,
    name: "ESSENTIALS TEE — MOCKUP",
    price: 79,
    category: "tees",
    image: imgEssentialsMockup,
    tag: null,
    colors: ["Blanco"],
    sizes: ["S", "M", "L", "XL", "2XL"],
    description: "'DONTBREAK ESSENTIALS COLLECTION' en el pecho, 'Good things are fucking coming' en la espalda. Where imagination meets reality. Algodón premium oversize.",
  },
]

export const categories = [
  { id: "all", label: "TODO" },
  { id: "tees", label: "TEES" },
  { id: "hoodies", label: "HOODIES" },
  { id: "jackets", label: "JACKETS" },
  { id: "pants", label: "PANTALONES" },
  { id: "accessories", label: "ACCESORIOS" },
]

export const featuredIds = [1, 4, 2]
