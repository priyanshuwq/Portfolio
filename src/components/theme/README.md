# ThemeSwitch Component

Advanced theme toggle component with animated transitions using the View Transitions API.

## Features

- 🎨 Multiple animation variants (circle, rectangle, polygon, circle-blur, gif)
- 📍 Configurable start positions for animations
- 🌊 Optional blur effects
- ⚡ Graceful fallback for browsers without View Transitions API
- 🎭 Smooth easing curves (expo-in, expo-out)

## Basic Usage

```tsx
import { ThemeToggleButton } from "@/components/theme/ThemeSwitch";

// Default circle animation from center
<ThemeToggleButton />
```

## Animation Variants

### Circle (Default)
Circular wipe transition expanding from a point.

```tsx
<ThemeToggleButton variant="circle" start="center" />
<ThemeToggleButton variant="circle" start="top-left" />
<ThemeToggleButton variant="circle" start="bottom-right" />
```

### Rectangle
Directional wipe transitions - great for slide effects.

```tsx
<ThemeToggleButton variant="rectangle" start="bottom-up" />
<ThemeToggleButton variant="rectangle" start="top-down" />
<ThemeToggleButton variant="rectangle" start="left-right" />
<ThemeToggleButton variant="rectangle" start="right-left" />
```

### Polygon
Diamond/polygon-shaped transition.

```tsx
<ThemeToggleButton variant="polygon" start="top-left" />
<ThemeToggleButton variant="polygon" start="top-right" />
```

### Circle-Blur
Circular transition with a blur effect for a dreamy look.

```tsx
<ThemeToggleButton variant="circle-blur" start="center" />
<ThemeToggleButton variant="circle-blur" start="bottom-right" />
```

### GIF (Custom Mask)
Use a custom GIF as a transition mask.

```tsx
<ThemeToggleButton 
  variant="gif" 
  start="center" 
  gifUrl="https://example.com/mask.gif" 
/>
```

## Adding Blur

Add a blur effect to any animation (except gif):

```tsx
<ThemeToggleButton variant="circle" start="center" blur={true} />
<ThemeToggleButton variant="rectangle" start="bottom-up" blur={true} />
```

## Start Positions

Available start positions depend on the variant:

### For Circle & Circle-Blur:
- `center` - Center of viewport
- `top-left` - Top left corner
- `top-right` - Top right corner
- `bottom-left` - Bottom left corner
- `bottom-right` - Bottom right corner
- `top-center` - Top center
- `bottom-center` - Bottom center

### For Rectangle:
- `bottom-up` - Slides up from bottom
- `top-down` - Slides down from top
- `left-right` - Slides right from left
- `right-left` - Slides left from right
- `top-left`, `top-right`, `bottom-left`, `bottom-right` - Corner origins

### For Polygon:
- `top-left` - Diamond expands from top-left
- `top-right` - Diamond expands from top-right

## Advanced Hook Usage

Use the `useThemeToggle` hook for custom implementations:

```tsx
import { useThemeToggle } from "@/components/theme/ThemeSwitch";

function CustomThemeButton() {
  const { isDark, toggleTheme, setCrazyLightTheme, setCrazyDarkTheme } = useThemeToggle({
    variant: 'circle',
    start: 'center',
    blur: false,
  });

  return (
    <div>
      <button onClick={toggleTheme}>Toggle Theme</button>
      <button onClick={setCrazyLightTheme}>Force Light</button>
      <button onClick={setCrazyDarkTheme}>Force Dark</button>
      <p>Current: {isDark ? 'Dark' : 'Light'}</p>
    </div>
  );
}
```

## Browser Support

The component uses the View Transitions API, which is supported in:
- Chrome 111+
- Edge 111+
- Safari (in Technology Preview as of 2024)

For unsupported browsers, the theme switches instantly without animation (graceful degradation).

## Customization

The component uses CSS custom properties for easing curves. These are defined in `globals.css`:

```css
:root {
  --expo-out: cubic-bezier(0.16, 1, 0.3, 1);
  --expo-in: cubic-bezier(0.7, 0, 0.84, 0);
}
```

You can adjust these values to change the animation feel globally.

## Examples in Context

### Navbar Implementation (Current)
```tsx
// In navbar.tsx
<ThemeToggleButton variant="circle" start="center" blur={false} />
```

### Try These Cool Alternatives:
```tsx
// Smooth bottom-up reveal
<ThemeToggleButton variant="rectangle" start="bottom-up" blur={true} />

// Dreamy blur from corner
<ThemeToggleButton variant="circle-blur" start="bottom-right" />

// Sharp polygon transition
<ThemeToggleButton variant="polygon" start="top-left" />

// Classic circle with blur
<ThemeToggleButton variant="circle" start="center" blur={true} />
```

## Technical Details

The component works by:
1. Dynamically injecting CSS keyframe animations into the document head
2. Using `document.startViewTransition()` to trigger the transition
3. Applying clip-path or mask animations to the view transition pseudo-elements
4. Falling back to instant theme switching if View Transitions aren't supported

The animations are optimized for performance using:
- GPU-accelerated properties (clip-path, mask)
- Proper transform origins
- Efficient CSS custom properties
