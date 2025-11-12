# Orient Configurator

A modern, interactive 3D watch configurator for the Orient Bambino watch series. This web application allows users to customize various watch components in real-time, including dial colors, straps, crowns, and indicators, with a 3D visualization powered by React Three Fiber.

## Description

The Orient Configurator is an immersive web experience that combines 3D visualization with an intuitive customization interface. Users can explore different watch configurations through an interactive scroll-based showcase, then customize their preferred watch components in a dedicated configurator view. The application features smooth camera animations, realistic 3D models, and a seamless checkout experience.

## Technologies Used

### Core Technologies

- **React** - UI framework
- **TypeScript** - Type-safe development
- **Vite** - Build tool and development server
- **React Router DOM** - Client-side routing

### 3D & Graphics

- **React Three Fiber** - React renderer for Three.js
- **Three.js** - 3D graphics library
- **@react-three/drei** - Useful helpers for React Three Fiber
- **useGLTF** - GLTF model loading and optimization
- **useFrame** - Animation loop hook for React Three Fiber
- **Suspense** - React Suspense for loading logic

### State Management & Animation

- **Zustand** - Lightweight state management
- **GSAP** - Professional animation library for smooth transitions

### 3D Modeling

- **Blender** - 3D model creation

### Styling & UI

- **Tailwind CSS** - CSS framework
- **Radix UI** - Accessible UI component primitives
- **Lucide React** - Icon library

## Project Structure

```
src/
├── components/          # React components
│   ├── models/         # 3D model components (Watch, Straps, Crowns, etc.)
│   ├── ui/             # Reusable UI components (Button, Card, etc.)
│   └── ...             # Feature components (ProductWatch, ComponentOptions, etc.)
├── pages/              # Page-level components
│   ├── Home.tsx        # Configurator page
│   └── Product.tsx     # Product showcase page
├── hooks/              # Custom React hooks
│   ├── useCameraAnimation.ts
│   ├── useScrollCameraAnimation.ts
│   ├── useIsMobile.ts
│   └── usePreloadStraps.ts
├── store/              # Zustand state stores
│   ├── componentStore.ts
│   ├── cartStore.ts
│   └── cameraStore.ts
├── data/               # Static data
│   └── componentOptions.json
└── lib/                # Utility functions
    └── utils.ts
```

## Key Features

- **3D Product Showcase**: Scroll-based interactive experience showcasing watch features
- **Real-time Customization**: Live preview of watch components (dial, strap, crown, indicators)
- **Smooth Animations**: GSAP-powered transitions and camera movements
- **Responsive Design**: Mobile and desktop optimized experience
- **State Management**: Centralized state with Zustand for component selections and cart
- **Model Optimization**: Preloaded GLTF models for smooth performance

## Design Choices

### State Management

- **Zustand** was chosen for its simplicity and minimal boilerplate compared to Redux, while still providing a robust solution for managing component selections, cart state, and camera positions.

### 3D Rendering

- **React Three Fiber** provides a declarative approach to Three.js, making it easier to integrate 3D models with React's component lifecycle and state management.
- **Suspense** is used for handling async model loading, providing a better user experience during asset loading.

### Animation Strategy

- **GSAP** handles complex animations and transitions for UI elements, while **useFrame** from React Three Fiber manages camera animations that need to run every frame for smooth 3D interactions.

### Model Organization

- 3D models are split into modular components (Watch base, Straps, Crowns, Face variants) to enable dynamic composition and efficient loading.
- Models are preloaded to minimize loading times during user interactions.
- Some models are heavy to load, like the straps. To reduce initial load time, we only load the models when the user clicks on the relevant hotspot.

### Responsive Design

- Custom hooks (`useIsMobile`) are used to adapt camera positions, controls, and UI layouts for different screen sizes.
- Touch-friendly controls and navigation for mobile devices.

## Assets & Credits

### 3D Models

- All 3D watch models were created in **Blender** specifically for this project.
- Models include: Watch base, various strap options (Black Leather, Brown Leather, Stainless Steel), face variants, crown options, and indicator styles.

### Brand Assets

- **Orient Logo**: Orient brand logo and assets used for branding purposes

### Component Images

- Dial color preview images
- Strap preview images
- Crown design images
- Indicator style images

## Development

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

```bash
npm install
```

### Development Server

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## License

This project is created for educational purposes.

## Credits

- Niels Minne: feedback
- Blender watch tutorial: https://www.youtube.com/watch?v=Fy-9-QuEzE8
- Blender hole cutting (strap): https://www.youtube.com/shorts/TdJgL8UYz_w
- Blender curves: https://www.youtube.com/watch?v=-CCWJ85vVlU
- Blender glass shading: https://www.youtube.com/watch?v=0G9-Txjns1k

Created by Bram Criel
