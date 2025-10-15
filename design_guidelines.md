# Design Guidelines - Muhammad Fahril Birthday Web App

## Design Source & Approach
**Critical**: This project uses 100% design and styling from the existing "FahrilBirthdayBash" repository. Do NOT create new design elements. Extract and replicate all visual styling, color schemes, typography, spacing, and component designs from the repository files exactly as they appear.

## Design Implementation Strategy
1. **Extract from Repository**: Pull all CSS/styling from the repository's existing files
2. **Maintain Visual Consistency**: Keep all colors, fonts, spacing, borders, shadows, and animations identical to the repository version
3. **Focus on Features**: Design effort should concentrate on implementing functional requirements, not visual redesign

## Color Palette (From Repository)
Use the exact color scheme from the repository files:
- Background: Cream/soft neutral base with gradient accents (purple/orange as defined in repo)
- Accent Colors: Sharp contrasting colors (orange, red, purple) for buttons, cards, and text
- Validation Feedback: Green for success states ("Yay, kamu sudah mengisi...")

## Typography & Spacing
- Font families: Use exact font stacks from repository
- Text sizes: Maintain all heading and body text sizes from repo
- Spacing system: Use the same Tailwind spacing units defined in repository

## Component Design Reference
All UI components must match repository styling:
- Buttons: Same shape, colors, hover states, and sizing
- Input fields: Identical styling, borders, focus states
- Cards: Same shadows, borders, padding, and corner radius
- Section containers: Maintain padding, margins, and layout structure

## Section-Specific Guidelines

### Section 1 (Welcome)
- Replicate exact hero/welcome design from repository
- No Play Audio button (audio only plays in Section 9)

### Section 2 (Birth Date)
- Use repository's input field styling
- Display calculated age with same typography treatment

### Section 3 (Personal Message)
- Textarea/input styling from repository
- Green validation text: "Yay, kamu sudah mengisi kata-katanya!" when ≥10 chars
- Next button: Disabled/hidden until validation passes

### Sections 4-7 (Doa & Interactive Games)
- Section 4: Arabic doa with translation in repository's card style
- Sections 5-7: Word matching games with blank boxes pattern:
  - Example: "KEBAHAGIAAN" → "K_B_H_G_ _ _N"
  - User fills boxes sequentially
  - Apply repository's input/box styling
  - Validation: ≥10 characters with green feedback

### Section 8 (Quote Carousel)
- 9+ wisdom quotes in carousel format from repository design
- Icon-based navigation (Next/Previous)
- Track viewed quotes - show all before enabling Next button
- Confirmation card: "Kamu sudah melihat semua kata-kata bijak"
- Tooltip/guide text to instruct viewing all quotes
- Smooth transition animations between quotes

### Section 9 (Summary & Download)
- Summary display using repository's layout
- Confetti & balloon animations (dynamic and prominent)
- Birthday card download feature (PNG/JPG format)
- October birth characteristics with sweet messages
- Auto-play audio from HuggingFace link
- All elements styled per repository design

## Animations & Transitions
- Section transitions: NO fade effects
- Use creative animations from repository (slide, bounce, paper crumple, flip)
- Maintain repository's animation timing and easing
- Quote carousel: Smooth transition effects between items
- Confetti/balloons: Dynamic, visible, celebratory animations

## Input Validation System
- All inputs accept multiple characters simultaneously (no single-character bug)
- Minimum 10 characters per input field
- Real-time validation feedback in green text
- Next button behavior: Disabled/hidden until all validations pass
- Clear error states when input is invalid

## Interactive Elements
- Buttons: Repository's hover and active states
- Form controls: Same focus indicators and interactions
- Game elements: Interactive boxes with repository styling
- Navigation: Icon-based with repository's icon treatment

## Technical Requirements
- Frontend-only (localStorage or state management for temporary data)
- No backend or database needed
- Download feature: Generate image file (PNG/JPG) client-side
- Audio: Auto-play on Section 9 reach using provided HuggingFace URL

## Personalization
- All content personalized for "Muhammad Fahril" only
- Not a generic card sender platform
- Exclusive birthday experience for the recipient

## Key Principle
**Replicate, Don't Redesign**: Every visual element, spacing, color, and component should be extracted and copied from the FahrilBirthdayBash repository. Innovation should be in feature implementation, not visual design.