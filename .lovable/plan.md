

# "Under Construction" Page for teachingcreations.com

## Goal
Show a professional "Coming Soon / Under Construction" page when visitors access `teachingcreations.com`, while the full site remains accessible via `testing.teachingcreations.com` for private review.

## Approach
Detect the hostname in the app and conditionally render either the full site or a "Coming Soon" page.

## Changes

### 1. Create a ComingSoon page (`src/pages/ComingSoon.tsx`)
- Clean, elegant page with the Teaching Creations logo
- "Coming Soon" / "Under Construction" messaging in English
- Minimalist design consistent with the brand (dark background, serif typography, gold accent)
- No navigation or links to the full site

### 2. Update App routing (`src/App.tsx`)
- Add hostname detection logic
- If the hostname is the main domain (`teachingcreations.com` or `www.teachingcreations.com`), render only the ComingSoon page for all routes
- If the hostname is `testing.teachingcreations.com` or localhost/preview, render the full site normally

### 3. Domain setup
- Connect `testing.teachingcreations.com` in Lovable Settings for private access to the full site
- Later, when ready to launch, simply remove the hostname check to make the full site live on the main domain

## Technical Details
- The hostname check uses `window.location.hostname`
- A simple conditional in `App.tsx` will switch between the full router and the ComingSoon page
- When you're ready to go live, we just remove the condition and all routes work on the main domain

