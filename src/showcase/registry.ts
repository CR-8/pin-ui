import { type ComponentType } from "react"
import Auth1 from "../components/auth-screen/auth-1/auth-1"
import Auth2 from "../components/auth-screen/auth-2/auth-2"
import Navbar1 from "../components/navbars/nav-1/nav-1"
import Navbar2 from "../components/navbars/nav-2/nav-2"
import Navbar3 from "../components/navbars/nav-3/nav-3"
import Navbar4 from "../components/navbars/nav-4/nav-4"
import Navbar5 from "../components/navbars/nav-5/nav-5"
import Footer1 from "../components/footers/footer-1/footer-1"
import Footer2 from "../components/footers/footer-2/footer-2"
import Footer3 from "../components/footers/footer-3/footer-3"
import Footer4 from "../components/footers/footer-4/footer-4"
import Footer5 from "../components/footers/footer-5/footer-5"
import Footer6 from "../components/footers/footer-6/footer-6"

export type ComponentEntry = {
  id: string
  name: string
  description: string
  category: string
  component: ComponentType
}

export type Category = {
  id: string
  label: string
  components: ComponentEntry[]
}

export const REGISTRY: Category[] = [
  {
    id: "navbars",
    label: "Navbars",
    components: [
      { id: "nav-1", name: "Navbar 1", description: "Goodfolio-style — centered logo, mega menu with image cards, mobile drawer", category: "navbars", component: Navbar1 },
      { id: "nav-2", name: "Navbar 2", description: "Left-aligned links, gradient card + team list mega menu", category: "navbars", component: Navbar2 },
      { id: "nav-3", name: "Navbar 3", description: "Ramp-style — centered links, active pill highlight, featured card dropdown", category: "navbars", component: Navbar3 },
      { id: "nav-4", name: "Navbar 4", description: "dotCMS-style — logo + links + CTA, three-panel persona mega menu", category: "navbars", component: Navbar4 },
      { id: "nav-5", name: "Navbar 5", description: "GSAP fullscreen overlay menu with clip-path animation and Lenis smooth scroll", category: "navbars", component: Navbar5 },
    ],
  },
  {
    id: "auth",
    label: "Auth Screens",
    components: [
      { id: "auth-1", name: "Auth 1", description: "Dark green sign up / sign in with step indicators", category: "auth", component: Auth1 },
      { id: "auth-2", name: "Auth 2", description: "Light mesh gradient sign up with provider buttons", category: "auth", component: Auth2 },
    ],
  },
  {
    id: "footers",
    label: "Footers",
    components: [
      { id: "footer-1", name: "Footer 1", description: "Clean minimal — white bg, 4 link columns, social row, Vercel/Linear style", category: "footers", component: Footer1 },
      { id: "footer-2", name: "Footer 2", description: "Dark — #0a0a0a bg, large brand watermark, 3 columns, gradient brand name, newsletter CTA", category: "footers", component: Footer2 },
      { id: "footer-3", name: "Footer 3", description: "Split layout — left brand + social, right 3 link columns, light mode default", category: "footers", component: Footer3 },
      { id: "footer-4", name: "Footer 4", description: "Bold editorial — large CTA heading, big email link, dark bg, minimal links below", category: "footers", component: Footer4 },
      { id: "footer-5", name: "Footer 5", description: "Grid-heavy — 5 columns, dense links, newsletter bar, light bg with subtle borders", category: "footers", component: Footer5 },
      { id: "footer-6", name: "Footer 6", description: "Colorful gradient — purple-to-blue bg, white text, social icons prominent, newsletter", category: "footers", component: Footer6 },
    ],
  },
]

export const ALL_COMPONENTS = REGISTRY.flatMap(c => c.components)
