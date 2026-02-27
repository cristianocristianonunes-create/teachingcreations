

# Fix Logo and Redesign Landing Page Hero with Prominent Branding

## Problem
1. The "Coming Soon" page shows the logo with a visible square/checkered background -- the PNG transparency isn't working properly with `logo-full.png`
2. On the main landing page (Index.tsx), the logo is too small (w-40/w-48) to see the details

## Solution

### 1. Fix Coming Soon page (`src/pages/ComingSoon.tsx`)
- Switch from `logo-emblem-clean.png` to `logo-icon-transparent.png` (which should have proper transparency)
- If that asset also has issues, use `logo-transparent.png` instead
- Keep the large size (w-48 / w-64) so details are visible

### 2. Redesign Hero Section on Landing Page (`src/pages/Index.tsx`)
**Suggestion: Replace the logo+triangle combo in the hero with just the logo at a much larger size, and keep the triangle diagram only in section 5 (The Model section) where it already appears with full explanations.**

This approach:
- Gives the logo maximum visual impact in the hero (w-64 to w-80 on desktop)
- Avoids redundancy (the triangle diagram already appears further down with proper context)
- Maintains intellectual authority -- the logo becomes the dominant branded visual
- Keeps the hero clean and editorial

Changes to the hero right column:
- Remove `TriangleDiagram` from the hero
- Display `logo-icon-transparent.png` at a large size (w-56 md:w-72 lg:w-80) with a subtle drop shadow
- Center it vertically in the right column for a balanced, elegant composition

### Files to Change
1. **`src/pages/ComingSoon.tsx`** -- switch to a properly transparent logo asset
2. **`src/pages/Index.tsx`** -- hero section: remove triangle diagram, use large transparent logo as the sole visual

### Technical Details
- Import `logo-icon-transparent.png` instead of `logo-full.png` in both files
- In Index.tsx hero, replace the flex-col container (logo + TriangleDiagram) with just the logo image at `w-56 md:w-72 lg:w-80`
- Add a subtle glow effect via `drop-shadow` to give it depth against the light background
- The TriangleDiagram import stays in Index.tsx since it's still used in section 5
