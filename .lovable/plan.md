

# Add Logo Next to Triangle Diagram in Hero Section

## What Will Change
The hero section on the homepage currently shows only the triangle diagram on the right side. We will add the Teaching Creations logo (the triangle with the head/brain silhouette) next to the diagram, creating a harmonious visual composition.

## Design Approach
- Copy the uploaded logo image (`ChatGPT_Image_25_de_fev._de_2026_22_38_00-2.png`) into `src/assets/` as `logo-full.png`
- In the hero section of `Index.tsx`, arrange the logo and the triangle diagram vertically stacked (logo on top, diagram below) or side-by-side, centered together in the right column
- The logo will be displayed at a size large enough to show detail (around w-40 to w-48) with the triangle diagram below it, creating a cohesive branded visual
- Both elements will share the same fade-in animation for a smooth entrance

## Files to Change
1. **Copy asset**: `user-uploads://ChatGPT_Image_25_de_fev._de_2026_22_38_00-2.png` to `src/assets/logo-full.png`
2. **Edit `src/pages/Index.tsx`**: Update the hero right column to include the logo image above the triangle diagram in a vertically centered flex layout

## Technical Details
- Import the new logo asset in Index.tsx
- Replace the single `<TriangleDiagram />` in the hero with a flex-column container holding both the logo and the diagram
- Use consistent spacing (gap-6) and centering to keep the composition balanced
- The logo gets a subtle drop shadow for depth, matching the brand aesthetic

