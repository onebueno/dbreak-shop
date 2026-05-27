import imgTeddyFront from '../assets/IMG_7.png'
import imgTeddyCouple from '../assets/IMG_3.png'
import imgTeddyPromo from '../assets/IMG_6.png'
import imgWhiteLife from '../assets/IMG_10.png'
import imgWhiteMockup from '../assets/IMG_8.png'

export const products = [
  {
    id: 1,
    name: "ESSENTIALS TEDDY",
    price: 110,
    category: "tees",
    image: imgTeddyFront,
    tag: "NUEVO",
    colors: ["Marrón"],
    sizes: ["S", "M", "L", "XL", "2XL"],
    description: "Oversize tee de algodón premium 100%. Gráfico 'JUICY DREAMS' serigrafiado en espalda, logo 'DONT BREAK' en pecho. Fit oversize, tela suave y cómoda. Essentials Collection — Never Stop Exploring.",
  },
  {
    id: 2,
    name: "ESSENTIALS WHITE",
    price: 110,
    category: "tees",
    image: imgWhiteLife,
    tag: "NUEVO",
    colors: ["Blanco"],
    sizes: ["S", "M", "L", "XL", "2XL"],
    description: "'DONTBREAK ESSENTIALS COLLECTION' en el pecho, 'Good things are fucking coming' en la espalda. Where imagination meets reality. Algodón premium oversize.",
  },
]

export const categories = [
  { id: "all", label: "TODO" },
  { id: "tees", label: "T-SHIRT" },
  { id: "hoodies", label: "HOODIES" },
  { id: "jackets", label: "JACKETS" },
  { id: "pants", label: "PANTALONES" },
  { id: "accessories", label: "ACCESORIOS" },
]

export const featuredIds = [1, 2]
