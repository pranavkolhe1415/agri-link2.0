Modify the existing AgriLink project according to the requirements below.

IMPORTANT — DO NOT REDESIGN THE UI
This is an existing completed Figma design. I do NOT want any visual redesign.

STRICTLY PRESERVE THE EXISTING:
- UI design
- Layout
- Colors
- Color palette
- Typography
- Font sizes
- Font weights
- Cards
- Buttons
- Icons
- Images
- Borders
- Border radius
- Shadows
- Spacing
- Padding
- Margins
- Sections that are not explicitly requested to be removed
- Responsive behavior
- Existing visual style
- English, Marathi, and Hindi language functionality

Do NOT introduce new colors.
Do NOT change the existing green theme.
Do NOT redesign or recreate cards.
Do NOT change the appearance of existing buttons.
Do NOT change the navbar styling.
Do NOT change the existing page styling.

Only make the functional, navigation, visibility, and page-flow changes described below.

==================================================
1. INITIAL WEBSITE STATE — BEFORE LOGIN
==================================================

When a user first opens the AgriLink website, they must land on the existing Home page.

Before login, the navbar must contain ONLY:

1. Language selector
2. Get Started

Remove/hide every other navigation option from the navbar before the user logs in.

Do NOT change the visual appearance of the navbar.
Keep the existing navbar design, logo, typography, colors, spacing, and styling exactly the same.

The language selector must continue to support:

- English
- Marathi
- Hindi

DO NOT remove, redesign, rename, or break the existing language functionality.

==================================================
2. HOME PAGE — REMOVE SPECIFIC SECTIONS
==================================================

Keep the existing Home page design exactly as it is, except for the sections explicitly listed below.

REMOVE the entire "Featured Products" section from the Home page.

This includes ALL of the following:

- "Featured Products" heading
- "Fresh from farm to table" subtitle
- Vegetables category
- Fruits category
- Grains category
- Dairy category
- Organic category
- Spices category
- All featured product cards
- Fresh Tomatoes card
- Organic Bananas card
- Basmati Rice card
- Fresh Milk card
- Turmeric Powder card
- Fresh Spinach card
- Product ratings
- Product prices
- Add to Cart buttons
- Buy Now buttons
- Product images
- "View All Products" button

Remove the complete section, not just the heading.

Also REMOVE the entire Home-page section shown in the provided screenshot:

"Ready to Transform Your Agricultural Business?"

This includes:
- The complete green CTA container
- "Ready to Transform Your Agricultural Business?" heading
- Its subtitle
- "Start as Farmer" button
- "Start as Buyer" button
- Free to Join
- Mobile App
- Secure Payments
- Their icons and supporting text

Do NOT remove or modify any other Home-page section unless explicitly mentioned above.

After removing these sections, maintain the existing design quality and spacing. Do not redesign the remaining Home page.

==================================================
3. GET STARTED FLOW
==================================================

The existing "Get Started" button must work from both locations where it currently exists:

- Get Started button on the Home page
- Get Started button in the navbar

When the user clicks Get Started, navigate to the Login page.

Flow:

Home Page
    ↓
Get Started
    ↓
Login Page

Do not change the appearance of the Get Started button.

==================================================
4. LOGIN PAGE
==================================================

Create/use the existing Login page while preserving the existing visual design language.

The Login page must provide exactly TWO user-type options:

1. Login with Farmer
2. Login with Industry

The purpose is to determine which version of the website the user will access.

Flow:

Login Page
    ├── Login with Farmer
    │       ↓
    │   Farmer Website
    │
    └── Login with Industry
            ↓
        Industry Website

Do not add unnecessary login roles.

==================================================
5. FARMER USER FLOW
==================================================

When the user selects/logs in as Farmer, they should enter the Farmer version of AgriLink.

After Farmer login, the navbar must show ONLY:

- For Farmers
- About
- Language selector

The Farmer navbar must NOT show:

- For Industry
- All Products
- Marketplace
- Get Started
- Login
- Any other public/industry navigation option

The language selector must continue to contain:

- English
- Marathi
- Hindi

The existing Farmer pages/design should remain visually unchanged.

Farmer navigation:

Farmer
├── For Farmers
├── About
└── Language

==================================================
6. INDUSTRY USER FLOW
==================================================

When the user selects/logs in as Industry, they should enter the Industry version of AgriLink.

After Industry login, the navbar must show ONLY:

- For Industry
- All Products
- About
- Language selector

The Industry navbar must NOT show:

- For Farmers
- Marketplace
- Get Started
- Login
- Any other public/farmer-only navigation option

The language selector must continue to contain:

- English
- Marathi
- Hindi

The existing Industry pages/design should remain visually unchanged.

Industry navigation:

Industry
├── For Industry
├── All Products
├── About
└── Language

==================================================
7. MARKETPLACE MUST BE REMOVED
==================================================

Remove the Marketplace functionality/navigation from the website.

Marketplace must NOT appear:

- In the public Home-page navbar
- In the Farmer navbar
- In the Industry navbar
- As a standalone navigation option
- As a button/link from the Home page
- As a route accessible through normal website navigation

IMPORTANT:

"All Products" for the Industry user is NOT the same as the old Marketplace navigation.

Industry users must still have:

All Products

in their navbar after login.

Do NOT remove the All Products functionality just because Marketplace is being removed.

==================================================
8. ROLE-BASED NAVIGATION
==================================================

Implement role-based navigation/visibility.

State 1 — Not logged in:

Navbar:
- Language
- Get Started

State 2 — Farmer logged in:

Navbar:
- For Farmers
- About
- Language

State 3 — Industry logged in:

Navbar:
- For Industry
- All Products
- About
- Language

The navbar should automatically update based on the user's login role.

==================================================
9. LANGUAGE FUNCTIONALITY
==================================================

VERY IMPORTANT:

Do NOT modify the existing language system.

The website must continue supporting:

English
Marathi
Hindi

All new navigation labels and login-related text should also support the existing language system.

When the user changes language, the new pages/navigation should use the selected language consistently.

Do not remove any existing translations.

Do not replace the language selector with a new component.

Do not change its appearance.

==================================================
10. NAVIGATION SECURITY / ACCESS CONTROL
==================================================

Do not only hide navigation items visually.

Ensure the page flow also respects the user's role.

Before login:
- User should not have access to Farmer-only navigation.
- User should not have access to Industry-only navigation.
- User should not have access to All Products.
- User should not have access to Marketplace.

After Farmer login:
- Farmer pages/navigation are available.
- Industry-only pages/navigation are not shown or accessible through normal navigation.

After Industry login:
- Industry pages/navigation are available.
- Farmer-only pages/navigation are not shown or accessible through normal navigation.

==================================================
11. FINAL USER FLOW
==================================================

The final website flow must be:

                    HOME PAGE
                        |
                        |
                 Get Started
                        |
                        ↓
                   LOGIN PAGE
                   /         \
                  /           \
                 ↓             ↓
          LOGIN AS FARMER   LOGIN AS INDUSTRY
                 |             |
                 ↓             ↓
             FARMER         INDUSTRY
             WEBSITE        WEBSITE
                 |             |
                 |             |
        ┌────────┴──────┐   ┌──┴────────────────┐
        |               |   |        |           |
    For Farmers      About  For Industry  All Products  About
        |               |   |        |           |
        └───────────────┴───┴────────┴───────────┘
                        |
                    Language
                 English / Marathi / Hindi

==================================================
12. VERY IMPORTANT — DO NOT CHANGE UI
==================================================

Treat the existing visual design as LOCKED.

The task is NOT to redesign AgriLink.

Only change:
- Navigation visibility
- Login flow
- Role selection
- Role-based navigation
- Page routing
- Home-page section removal
- Marketplace removal
- Language support for newly added navigation/text

Everything else must remain exactly as currently designed.

DO NOT:
- Change colors
- Change green shades
- Change fonts
- Change font sizes
- Change cards
- Change button designs
- Change icons
- Change images
- Change shadows
- Change border radius
- Change spacing
- Change layouts
- Change page backgrounds
- Change existing sections
- Redesign the navbar
- Redesign the Home page
- Create a new visual theme
- Replace existing components unnecessarily

If an existing component can be reused, REUSE IT.

If an existing page already exists, modify its functionality instead of recreating the page.

==================================================
13. RESPONSIVE DESIGN
==================================================

Preserve the existing responsive behavior.

The changes must work correctly on:
- Desktop
- Tablet
- Mobile

Do not introduce visual changes to the existing responsive design.

==================================================
14. FINAL VERIFICATION
==================================================

After implementing the changes, verify the following:

✓ First visit opens Home page
✓ Before login navbar contains only Language + Get Started
✓ Home-page Featured Products section is completely removed
✓ Home-page "Ready to Transform Your Agricultural Business?" section is completely removed
✓ Get Started from Home works
✓ Get Started from navbar works
✓ Login page has Farmer and Industry options
✓ Farmer login shows only For Farmers + About + Language
✓ Industry login shows only For Industry + All Products + About + Language
✓ Marketplace is removed
✓ Industry All Products remains available
✓ English works
✓ Marathi works
✓ Hindi works
✓ Existing UI remains visually unchanged
✓ Existing colors remain unchanged
✓ Existing cards remain unchanged
✓ Existing buttons remain unchanged
✓ Existing typography remains unchanged
✓ Existing images remain unchanged
✓ Existing sections not mentioned in this prompt remain unchanged

IMPORTANT FINAL RULE:

DO NOT make any visual improvements or design decisions that were not explicitly requested.

Preserve the existing AgriLink UI exactly and make ONLY the functional and structural changes described above.