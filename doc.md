# RRR (Rare • Rich • Right) - Project Documentation

## 1. Project Info

**Brand Name:** RRR (Rare, Rich, Right)  
**Industry:** Fashion & Apparel  
**Brand Personality:** 
* **Rare:** Unique designs
* **Rich:** Premium feel
* **Right:** Perfect choice for the modern generation

**Brand Feel:** Modern + Premium + Minimal + Youthful  
**Design Style Reference:** Zara, H&M, The Souled Store, Urbanic, Culture Circle, Snitch, Uniqlo

**Key Characteristics:**
* Fashion-first ecommerce with large hero banners
* Center-aligned logo
* Search on top navigation
* Category-focused browsing
* Product grid heavy with lifestyle photography
* Clean white background with minimal luxury feel

**Target Audience:**
* Men & Women (Age 16–35)
* Fashion-conscious youth, streetwear lovers, and casual wear shoppers
* Premium affordable fashion buyers

---

## 2. Development Instructions

### Tech Stack & Architecture
* **Frontend Framework:** Next.js 15 (App Router)
* **Language:** TypeScript
* **Styling:** Tailwind CSS
* **UI Components:** Shadcn UI
* **Icons:** Lucide Icons
* **Animations:** Framer Motion
* **State Management:** Zustand
* **Backend:** NO BACKEND (Mock API using dummy JSON data)

### Project Initialization
```bash
# 1. Initialize Next.js project
npx create-next-app@latest rrr-ecommerce --typescript --tailwind --eslint --app

# 2. Install essential libraries
npm install zustand framer-motion lucide-react

# 3. Initialize Shadcn UI
npx shadcn@latest init
```

### Recommended Folder Structure
```text
src/
├── app/                  # Next.js App Router (Pages, Layouts, API routes)
├── components/           # Reusable UI components
│   ├── ui/               # Shadcn UI base components
│   ├── layout/           # Header, Footer, Sidebar, BottomNav
│   ├── product/          # ProductCard, ProductGrid, ProductDetails
│   └── shared/           # Reusable blocks (Banners, Modals)
├── lib/                  # Utilities (Tailwind cn, formatters)
├── services/             # API layer (Mock fetch functions)
├── store/                # Zustand stores (cartStore, wishlistStore, uiStore)
├── types/                # TypeScript interfaces (Product, User, Category)
├── styles/               # Global CSS and Tailwind directives
└── data/                 # Dummy JSON files
```

### Data & API Layer Guidelines
Since there is no backend, all data fetching must be routed through a dedicated API layer (`src/services/api.ts`). This ensures easy transition to a real backend in the future.

**Dummy Data Sources:**
Create the following files in `src/data/`:
* `products.json`
* `categories.json`
* `banners.json`
* `users.json`

**Mock API Implementation Example:**
```ts
// src/services/api.ts
import products from '@/data/products.json';
import { Product } from '@/types';

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const getProducts = async (): Promise<Product[]> => {
  await delay(500);
  return products;
};

export const getProductBySlug = async (slug: string): Promise<Product | undefined> => {
  await delay(500);
  return products.find(p => p.slug === slug);
};

export const getCategories = async () => { /* ... */ };
export const getFeaturedProducts = async () => { /* ... */ };
```
*Later, this can be seamlessly replaced with actual fetch calls without modifying the UI components.*

### State Management Guidelines
Use **Zustand** for global state. Separate stores logically:
* `useCartStore`: Manage cart items, quantities, and totals.
* `useWishlistStore`: Manage saved products.
* `useUIStore`: Manage mobile sidebar toggle, search overlay, and modal states.

### Styling & Animation Guidelines
* **Mobile-First Approach:** Always start styling for mobile (`320px` to `767px`), then apply responsive prefixes (`md:`, `lg:`) for larger screens.
* **Component Modularity:** Build small, reusable components. Use Shadcn UI for base components and customize them to fit the luxury aesthetic.
* **Animations:** Use Framer Motion extensively but keep it premium. Focus on smooth page transitions, scroll reveals, product hover effects, and button micro-interactions. Avoid overwhelming bouncy animations.

---

## 3. Product Requirements Document (PRD)


# Theme

### Primary Colors

```css
Gold: #D4AF37
Soft Gold: #E5C66B
White: #FFFFFF
Off White: #FAF8F5
Black: #111111
Charcoal: #222222
```

### Accent

Luxury Gold should be visible throughout the website.

Use:

* borders
* hover states
* buttons
* loading animations
* section dividers

---

# Layout

Desktop First

Responsive:

* Desktop
* Laptop
* Tablet
* Mobile

---

# Navigation

Reference:
Center logo like image provided.

### Header Layout

Left:

```text
Men
Women
New Arrivals
Collections
```

Center:

```text
RRR
Rare Rich Right
```

Right:

```text
Search Bar
Wishlist
Cart
Profile
```

Sticky Header

Features:

* Shrink on scroll
* Glass morphism effect
* Smooth animation

---

# Homepage

## Hero Section

Full-width slider.

Slides:

1. Summer Collection
2. Streetwear Collection
3. Premium Essentials
4. New Arrival Drop

Each slide:

* Fashion photography
* CTA button
* Motion animations
* Auto slide
* Manual navigation

---

# Trust Bar

Under hero.

Example:

```text
Premium Quality
Fast Delivery
Easy Returns
Secure Payments
```

Animated icons.

---

# Featured Collections

Large fashion cards.

Examples:

```text
Streetwear
Oversized
Minimal Basics
Premium Linen
Athleisure
```

Hover effects:

* zoom image
* gold border
* text animation

---

# New Arrivals

Horizontal slider.

Features:

* quick add
* wishlist
* hover image swap
* ratings

---

# Categories Section

Like the provided image.

Grid:

```text
T-Shirts
Shirts
Oversized
Jeans
Joggers
Hoodies
Jackets
Accessories
```

Large image cards.

---

# Trending Now

Pinterest-style fashion inspiration section.

Show:

```text
Celebrity Inspired
Campus Looks
Summer Fits
Street Essentials
```

---

# Product Grid

Main shopping section.

Features:

### Product Card

Image

Brand

Title

Price

Discount

Rating

Wishlist

Quick View

Add To Cart

Hover:

Second image appears.

---

# Product Details Page

Sections:

### Gallery

* Image carousel
* Zoom

### Product Info

* Name
* Price
* Description
* Sizes
* Colors
* Quantity

### Actions

```text
Add To Cart
Buy Now
Wishlist
```

---

# Search Experience

Search bar always visible.

Features:

* Instant search
* Suggestions
* Recent searches
* Trending searches

Dummy JSON source.

---

# Collections Pages

Examples:

```text
Men
Women
Oversized
Streetwear
Summer
Premium
```

Filter sidebar:

### Category

### Size

### Price

### Color

### Rating

### Availability

---

# Cart

Drawer + Page

Features:

* Quantity control
* Remove item
* Coupon input
* Price breakdown

---

# Wishlist

Grid layout.

Move to cart.

---

# Profile Page

Dummy user.

Sections:

```text
Orders
Wishlist
Addresses
Account Settings
```

---

# Footer

Luxury layout.

Columns:

### Shop

Men

Women

New Arrivals

Collections

### Support

Help Center

Returns

Shipping

FAQs

### Company

About RRR

Careers

Contact

### Social

Instagram

YouTube

Pinterest

TikTok

---

# Animations

Use Framer Motion extensively.

### Include

* Page transitions
* Scroll reveal
* Stagger animations
* Product hover effects
* Hero transitions
* Button micro interactions
* Loading skeletons

Everything should feel smooth and premium.

---

# Dummy Data Structure

### Product

```json
{
  "id": 1,
  "name": "Oversized Graphic Tee",
  "slug": "oversized-graphic-tee",
  "category": "T-Shirts",
  "gender": "Unisex",
  "price": 1499,
  "discount": 20,
  "rating": 4.8,
  "sizes": ["S", "M", "L", "XL"],
  "colors": ["Black", "White"],
  "images": [
    "/products/1-1.jpg",
    "/products/1-2.jpg"
  ],
  "featured": true,
  "newArrival": true
}
```

Create:

* 100 sample products
* 10 categories
* 8 collections
* 4 homepage banners

---

# AI Generation Instruction

Generate a complete modern ecommerce web app named **RRR (Rare, Rich, Right)** inspired by premium fashion brands and the attached reference design. Create a fully responsive Next.js + TypeScript + Tailwind application with reusable components, Framer Motion animations, dummy JSON APIs, realistic product data, advanced filtering, search, cart, wishlist, profile, collections, hero sliders, luxury gold accents, premium typography, smooth transitions, loading states, SEO optimization, and a scalable architecture so the dummy APIs can later be replaced with real backend APIs without changing the UI layer. The design should feel modern, luxurious, fast, fashion-focused, and targeted toward 16–35-year-old users.

---

# Mobile UI & Header Reference (Very Important)

## Mobile-First Navigation Behavior

Take inspiration from the provided mobile fashion ecommerce reference.

The mobile header must be compact, premium, and optimized for shopping.

### Top Announcement Bar

Show a thin promotional strip at the very top.

Example:

```text
🔥 Download Our App & Get 10% Extra Cashback
```

Behavior:

* Fixed at top
* Closable
* Auto-scroll marquee optional
* Gold accent styling

---

## Main Mobile Header

Structure:

```text
☰        RRR Logo        🔍 ♡ 🛒
```

### Left Side

Hamburger Menu

Features:

* Slide-in navigation drawer
* Smooth animation
* Backdrop blur overlay

### Center

Brand logo must always stay perfectly centered.

Layout:

```text
RRR
Rare • Rich • Right
```

Requirements:

* Center aligned on all mobile screens
* Never shift when icons change
* Logo remains visible while scrolling
* Premium gold accent
* Custom fashion-brand styling

### Right Side

Icons:

```text
Search
Wishlist
Cart
```

Optional:

```text
Profile
```

Use Lucide icons.

---

# Sticky Header

Header remains fixed during scroll.

Behavior:

### Initial State

```text
White background
Thin border
```

### Scrolled State

```text
Glassmorphism
Blur effect
Slight shadow
Reduced height
```

Animation:

```text
300ms smooth transition
```

---

# Mobile Search Experience

When search icon is clicked:

Open full-width search overlay.

Layout:

```text
← Back

[ Search products... ]

Trending Searches
Recent Searches
Suggested Products
```

Features:

* Instant search
* Product suggestions
* Categories suggestions
* Debounced search

Use dummy JSON data.

---

# Mobile Category Navigation

Directly below header.

Horizontal scroll tabs.

Example:

```text
MEN
WOMEN
NEW ARRIVALS
OVERSIZED
HOODIES
JOGGERS
ACCESSORIES
```

Behavior:

* Scrollable horizontally
* Active tab highlighted
* Gold underline animation

---

# Mobile Hero Banner

Inspired by the reference image.

Requirements:

### Layout

Full width

Aspect ratio:

```text
4:5
```

### Features

* Auto slider
* Swipe support
* Pagination dots
* CTA button
* Fashion photography

Example Slides:

```text
Explore Tops
Streetwear Collection
Summer Essentials
Premium Basics
```

### Animation

Use Framer Motion:

* Fade
* Slide
* Zoom

---

# Mobile Homepage Sections

Order:

```text
Announcement Bar

Header

Category Tabs

Hero Slider

Trust Badges

New In Collection

Categories Grid

Trending Collection

Featured Products

Recently Viewed

Newsletter

Footer
```

---

# Mobile Categories Grid

Inspired by the reference.

Layout:

```text
2 Columns
```

Card Style:

```text
Image
Category Name
```

Examples:

```text
T-Shirts
Shirts
Oversized
Jeans
Joggers
Hoodies
Accessories
Footwear
```

Animation:

```text
Hover (desktop)
Tap scale (mobile)
```

---

# Mobile Product Cards

Design Priority:

Large images similar to modern fashion apps.

Card Layout:

```text
Image

Brand Name

Product Title

Price

Discount

Wishlist Icon
```

Features:

* Image lazy loading
* Quick add button
* Image swap on hover (desktop)
* Tap interactions on mobile

---

# Mobile Bottom Navigation

Show on mobile only.

Fixed bottom.

Layout:

```text
🏠 Home

🛍 Shop

♡ Wishlist

🛒 Cart

👤 Profile
```

Behavior:

* Always visible
* Active state highlighted in gold
* Blur background

---

# Responsive Rules

### Mobile

```text
320px - 767px
```

* 2-column products
* Bottom navigation enabled
* Hamburger menu
* Horizontal category tabs

### Tablet

```text
768px - 1024px
```

* 3-column products
* Expanded header
* No bottom navigation

### Desktop

```text
1025px+
```

* Center logo layout
* Full navigation visible
* Mega menus
* 4–6 column product grids

````

### Desktop Header Structure

```text
MEN | WOMEN | NEW ARRIVALS | COLLECTIONS

                RRR

Search Bar | Wishlist | Cart | Profile
````

Logo must remain perfectly centered on desktop exactly like premium fashion brands.

---

# UI Quality Requirements

The entire website should feel like a premium modern fashion brand, combining the clean structure of Zara, the category browsing of The Souled Store, and the luxury gold identity of RRR (Rare • Rich • Right). All animations should be smooth, responsive, and performance-optimized. The logo must always be visually centered, navigation should feel app-like on mobile, and the experience should be designed for Gen-Z and young millennials (16–35 years).

## Mobile Sidebar / Hamburger Menu Prompt (RRR - Rare, Rich, Right)

Create a premium mobile slide-out sidebar inspired by modern fashion ecommerce brands like Zara, H&M, Urbanic, and The Souled Store. The sidebar should slide from the left side of the screen when the hamburger menu is clicked and feel smooth, luxurious, and app-like.

---

# Sidebar Behavior

### Opening Animation

* Slide in from left
* Duration: 300ms
* Framer Motion animation
* Backdrop blur overlay
* Background dimmed to 60%
* Click outside to close
* Swipe left to close on mobile

### Width

```text
Mobile: 85% width
Tablet: 400px max width
```

### Background

```css
Background: White
Border-right: Light Gold
Shadow: Premium soft shadow
```

---

# Sidebar Header

Top section should contain:

### Brand Logo

```text
RRR
Rare • Rich • Right
```

Style:

* Center aligned
* Premium luxury typography
* Gold accent
* Fashion brand appearance

### User Section

Large CTA card:

```text
👤 Log In / Register
```

Features:

* Gold outlined button
* Hover animation
* Rounded corners
* Premium card design

Subtext:

```text
Track orders
Save wishlist
Faster checkout
```

---

# Loyalty Banner

Below login section:

```text
Earn 10% Cashback on Every App Order
```

Style:

* Full width banner
* Gold gradient background
* White text
* Small gift icon

---

# Gender Navigation Tabs

Horizontal tabs:

```text
MEN
WOMEN
UNISEX
```

Behavior:

* Active tab highlighted
* Gold underline
* Smooth tab transition

Default:

```text
WOMEN
```

---

# Quick Collection Grid

Display image categories similar to the reference.

Layout:

```text
3 Columns
```

Example Categories:

```text
Trending
New Arrivals
Streetwear
Oversized
Summer Collection
Premium Basics
```

Card Style:

```text
Rounded corners
Fashion image
Category label
```

Interaction:

* Scale on tap
* Gold border hover

---

# Seasonal Collections Section

Title:

```text
Summer '26
```

Grid:

```text
2 Columns
```

Items:

```text
Summer Picks
Dresses
Cotton Linen
Vacation Fits
Beachwear
Lightweight Shirts
```

Use fashion photography cards.

---

# Shop All Section

Accordion menu.

Default:

```text
Expanded
```

---

# Categories List

Display category cards.

Layout:

```text
3 Columns
```

Categories:

```text
All Topwear
T-Shirts
Oversized T-Shirts
Shirts
Polo T-Shirts
Tank Tops
Crop Tops
Dresses
Jumpsuits
Jeans
Joggers
Cargo Pants
Shorts
Skirts
Hoodies
Sweatshirts
Jackets
Accessories
Footwear
Bags
Caps
```

Each category card:

```text
Image
Category Name
```

---

# Expandable Navigation Sections

Accordion style.

### New Arrivals

```text
Latest Drops
Trending Now
Fresh Arrivals
Best Sellers
```

### Collections

```text
Streetwear
Minimal
Premium
Athleisure
Campus Fits
Party Wear
```

### Sale

```text
Under ₹999
Under ₹1499
Under ₹1999
Flat 40% Off
Clearance
```

### Accessories

```text
Caps
Bags
Socks
Belts
Wallets
```

---

# Footer Area

Show:

### Help

```text
Help Center
FAQs
Shipping
Returns
Contact Us
```

### Social

```text
Instagram
YouTube
Pinterest
TikTok
```

### App Download CTA

```text
Download RRR App
```

Button Style:

* Gold gradient
* Full width
* Premium look

---

# UI Design Requirements

* Fashion-first design
* Large touch targets
* Smooth animations
* Rounded cards
* Luxury gold accents (#D4AF37)
* Clean white background
* High-quality lifestyle imagery
* Premium spacing
* Modern ecommerce experience
* Feels like a native mobile shopping app rather than a traditional website
* Fully responsive and optimized for 320px–767px mobile screens

---

# Component Structure

```text
Sidebar
├── Logo Section
├── Login/Register Card
├── Cashback Banner
├── Men/Women/Unisex Tabs
├── Quick Collection Grid
├── Seasonal Collections
├── Shop All
│   ├── Categories Grid
│   ├── New Arrivals Accordion
│   ├── Collections Accordion
│   ├── Sale Accordion
│   └── Accessories Accordion
├── Help Links
├── Social Links
└── Download App CTA
```

The sidebar should feel premium, visually rich, and highly engaging, encouraging users to browse categories immediately after opening the menu.

---

## 4. Current Implementation Details (Updated June 2026)

The RRR (Rare · Rich · Right) premium fashion ecommerce web app has been fully built and is running locally at: **http://localhost:3000**

### Modern Responsive Layout Constraints
- **Tailwind CSS v4 Compatibility**: The project is styled using Tailwind CSS v4. Standard screen-based max-width classes are replaced with `max-w-7xl` (`1280px`) across all pages (Header, Homepage, Collection list, Product Detail, Wishlist, Profile, Footer) to guarantee perfect grid symmetry and responsive boundaries.
- **Content Padding**: Constrained layout sections use `px-6 lg:px-10` to ensure balanced, premium margins across all device sizes.
- **Centering Enforcements**: Elements like the header wrapper are centered using inline auto margins (`marginLeft: 'auto', marginRight: 'auto'`) alongside `w-full` to prevent flex-alignment shifts or horizontal scrolling.

### Premium Design Enhancements
1. **Header Layout & Aesthetics**:
   - Styled with a clean white/glassmorphism background (`bg-white` / `.glass`).
   - Wishlist and cart count badges use a solid gold background (`var(--gold)`) with white text.
   - The brand logo **"RRR"** is styled using the high-end serif Google Font **Playfair Display** (`var(--font-serif)`) to mirror the luxury print aesthetic of premium fashion brands.
   - Includes a desktop and mobile hamburger menu icon with a dedicated left margin (`ml-2 lg:ml-4`) to prevent it from clipping or sticking to the screen border.
2. **Dynamic Bottom Announcement Bar**:
   - Placed fixed at the bottom of the screen to optimize reading experience and keep top navigation clean.
   - Tied to a React `useEffect` hook that dynamically sets the `--announcement-h` CSS variable to `36px` when visible and `0px` when closed.
   - Toggles spacing for page contents and pushes the mobile bottom navigation bar (`MobileBottomNav`) up by `36px` when active, sliding it flush to the bottom with unmounting exit animations when closed.
3. **3-Panel Brand Pillars Hero Section**:
   - Displays a split screen grid of three panels on desktop representing the RRR brand identity:
     - **RARE**: Lifestyle image with a yellow crop top track suit.
     - **RICH**: Professional closeup image of a suit and tie, with a centered "R R R" title and gold border "ENTER ATELIER" CTA button overlay.
     - **RIGHT**: Close-up details of a brown/orange sneaker.
   - Features subtle dark overlays, bottom gradients, and smooth hover zoom scaling.
   - Automatically adapts into a swipeable single-slide carousel on mobile viewports.
