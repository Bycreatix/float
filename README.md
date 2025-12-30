# float. | Premium Beverage Landing Page

> "Cold-Pressed & Sun-Kissed."

A high-fidelity, immersive landing page for a concept fruit juice brand. This project showcases modern front-end techniques including complex GSAP animations, glassmorphism UI, and state-managed e-commerce interactions, all wrapped in a "chill luxury" aesthetic.

## 🌊 Overview

"float" is designed to capture the "vibe generation" audience. It moves away from standard static layouts into a fluid, scroll-driven experience. The application features a fully responsive Bento-grid layout, a parallax atmosphere system (clouds/waves), and a functional shopping cart state.

**Live Demo:** [https://float-chi.vercel.app/](#)

## ✨ Key Features

* **GSAP Powered Animations:**
    * Scroll-triggered entrance animations for elements.
    * Parallax scrolling effects for background clouds and waves.
    * High-performance GPU-accelerated transitions.
* **Interactive 3D Hero:** A stabilized, glitch-free product showcase that scales on scroll.
* **Glassmorphism UI:** Custom "frosted glass" components (`GlassCard`) used for product displays and navigation.
* **Shopping Cart State:** Fully functional slide-out cart drawer with logic for adding items, updating quantities, and calculating subtotals.
* **Liquid Motion Effects:** CSS keyframe animations simulating liquid movement inside product cards.
* **Responsive Design:** Fluid typography and layouts that adapt from mobile phones to 4k desktops.

## 🛠️ Tech Stack

* **Core:** React (Vite architecture recommended)
* **Styling:** Tailwind CSS
* **Animation:** GSAP (GreenSock Animation Platform) + ScrollTrigger Plugin
* **Icons:** Lucide React

## 🚀 Getting Started

### Prerequisites

* Node.js (v16.0.0 or higher)
* npm or yarn

### Installation

1.  **Clone the repository**
    ```bash
    git clone [https://github.com/your-username/float-landing-page.git](https://github.com/your-username/float-landing-page.git)
    cd float-landing-page
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Run the development server**
    ```bash
    npm run dev
    ```

4.  Open `http://localhost:5173` in your browser.

## 🎨 Customization Guide

### Changing the Brand Colors
The project uses specific hex codes for the "Float" identity. You can find and replace these in `App.jsx` or extend your `tailwind.config.js`:

* **Deep Pacific (Primary):** `#0E3B43`
* **Sea Salt (Background):** `#F9F7F3`
* **Driftwood (Accent):** `#D8C3A5`

### Updating Product Images
To use your own bottle renders:

1.  Place your images in the `public/assets/` folder.
2.  Update the constants at the top of `App.jsx`:

```javascript
const HERO_MOCKUP = "/assets/your-hero-image.jpg";
const BOTTLE_MOCKUP = "/assets/your-bottle.jpg";    
```
* Designed & Developed by Bycreatix — Graphic Designer & Web Developer.

