# Hero Particle System Configuration

## Overview
The hero section features a custom particle animation system that creates twinkling stars and neon colored bubbles behind the content without blocking it.

## Configuration Variables
All particle effects can be easily customized by modifying the CSS variables in the `:root` section of `index.html`:

```css
:root {
    /* Hero background settings */
    --hero-bg-img: url("/assets/bg-space-1600.webp");
    --hero-bg-tint: rgba(0,0,0,.3);           /* Dark overlay for content readability */
    --hero-overlay-brightness: rgba(255,255,255,.08); /* Bright overlay effect */
    
    /* Particle system configuration */
    --particle-count: 50;                      /* Number of particles */
    --particle-speed: 0.5;                     /* Movement speed multiplier */
    --particle-size-min: 1;                    /* Minimum particle size */
    --particle-size-max: 3;                    /* Maximum particle size */
    --particle-color-primary: #00e5ff;         /* Cyan particles */
    --particle-color-secondary: #ff6b6b;       /* Pink/red particles */
    --particle-color-tertiary: #4ecdc4;        /* Teal particles */
    --particle-twinkle-speed: 2;               /* Twinkle animation speed */
}
```

## Easy Customization Examples

### Change Particle Colors
```css
--particle-color-primary: #ff0080;     /* Hot pink */
--particle-color-secondary: #00ff80;   /* Green */
--particle-color-tertiary: #8000ff;    /* Purple */
```

### Adjust Particle Density
```css
--particle-count: 30;    /* Fewer particles (performance) */
--particle-count: 80;    /* More particles (dramatic effect) */
```

### Modify Movement Speed
```css
--particle-speed: 0.2;   /* Slower, calmer movement */
--particle-speed: 1.0;   /* Faster, more dynamic */
```

### Change Particle Sizes
```css
--particle-size-min: 2;  /* Larger minimum size */
--particle-size-max: 5;  /* Larger maximum size */
```

### Adjust Twinkle Effect
```css
--particle-twinkle-speed: 1;   /* Slower twinkling */
--particle-twinkle-speed: 4;   /* Faster twinkling */
```

## Features

### Particle Types
- **Stars (70%)**: 5-pointed star shapes that twinkle
- **Bubbles (30%)**: Circular particles with inner glow effects

### Responsiveness
- Automatically reduces particle count on mobile devices
- Background attachment changes to `scroll` on mobile for better performance

### Accessibility
- Respects `prefers-reduced-motion` settings
- Automatically disables particles for users who prefer reduced motion

### Performance
- Canvas-based rendering for smooth animations
- Automatic cleanup on component destruction
- Optimized particle wrapping at screen edges

## Technical Implementation
The particle system is implemented as a JavaScript class `HeroParticleSystem` that:
1. Creates a canvas element overlaying the hero section
2. Reads configuration from CSS variables
3. Generates particles with random properties
4. Animates them in a continuous loop
5. Handles resize and cleanup events

The system only affects the hero section and doesn't interfere with the rest of the page.