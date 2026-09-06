# SODFA Style

SODFA Electronics Store — Complete Premium Bilingual E-Commerce Website

Build a premium, modern, minimalist, cinematic, fully responsive bilingual customer-facing e-commerce website for SODFA (صدفة).

The website is for SODFA's mobile electronics and accessories business in Egypt.

The website must be:

Arabic + English

with:

Arabic as the DEFAULT language.

The majority of customers are in Egypt, so the Arabic experience must be the primary experience.

The English version must also be complete and professional.

1. CORE OBJECTIVE

This website is NOT an independent inventory system.

SODFA already has an existing management dashboard where products, inventory, warehouses, prices, images, and business data are managed.

The long-term architecture is:

SODFA Dashboard → Supabase → SODFA Customer Store

The existing SODFA Dashboard remains the main source of truth.

The new website is the public-facing customer storefront.

For the first phase, build a complete, high-quality frontend prototype using realistic mock data if necessary.

However, the architecture and components must be designed so the mock data can later be replaced with the real Supabase data without rebuilding the UI.

2. LANGUAGE SYSTEM — VERY IMPORTANT

The website must support:

Arabic

Default language.

English

Secondary language.

The website must be built with a proper internationalization architecture from the beginning.

Do NOT simply hard-code Arabic text.

Do NOT create two separate websites.

Use one application with a complete translation system.

3. ARABIC DEFAULT

When a new customer opens the website for the first time:

Arabic must be selected automatically.

The entire website should appear in Arabic.

Arabic must use:

RTL — Right To Left

English must use:

LTR — Left To Right

The layout must automatically adapt when changing language.

This includes:

Header

Navigation

Hero

Product grids

Product details

Filters

Search

Cart

Checkout

Forms

Buttons

Notifications

Modals

Order tracking

Footer

4. LANGUAGE SWITCHER

Create a beautiful, simple language switcher.

Example:

العربية | English

or:

AR | EN

It should be easily accessible from the header/menu.

When the customer changes language:

Direction changes automatically

Text changes

Layout mirrors where appropriate

Form alignment changes

Navigation changes

Icons/arrows that indicate direction should adapt

Validation messages change

Checkout content changes

Order status labels change

The experience must feel native in both languages.

5. LANGUAGE PERSISTENCE

Remember the customer's language preference.

If the customer chooses English, keep English when navigating through the website.

If the customer returns later, preserve the selected language where technically appropriate.

However:

Arabic remains the default for new users.

6. BILINGUAL DATA

The architecture should support translated dynamic content from Supabase.

For example:

Product:

Arabic name: جراب فاخر آيفون 17 برو ماكس

English name: Premium iPhone 17 Pro Max Case

Category:

Arabic: جرابات الموبايل

English: Phone Cases

Hero:

Arabic title: اختار ستايلك

English title: Choose Your Style

Design the data model so products/categories/hero content can eventually contain Arabic and English fields.

7. RTL/LTR QUALITY

Arabic must NOT feel like an English website with Arabic text added.

The Arabic layout must be professionally designed for RTL.

Pay special attention to:

Typography

Spacing

Alignment

Icon positioning

Breadcrumbs

Dropdown arrows

Search

Filters

Product cards

Cart

Checkout

Forms

Order tracking

When switching to English, the layout should properly become LTR.

8. BRAND IDENTITY

Brand:

SODFA — صدفة

The website must use the exact SODFA visual identity provided below.

Do NOT invent another color palette.

Do NOT replace the purple/black identity with generic e-commerce colors.

The visual direction should be:

Premium

Dark

Cinematic

Modern

Minimal

Elegant

Technological

Clean

Professional

Fast

Easy to use

The website should feel like:

Premium mobile accessories brand + cinematic product presentation + SODFA identity.

The design must be impressive but extremely easy to understand.

9. EXACT SODFA DESIGN SYSTEM

Use this exact design system throughout the website.

:root {

  --sodfa-black: #000000;
  --sodfa-white: #FFFFFF;

  --sodfa-purple: #8E2AA8;
  --sodfa-purple-light: #C06BCF;
  --sodfa-purple-dark: #74218F;

  --sodfa-purple-soft: #D69BDF;

  --sodfa-gradient: linear-gradient(
    135deg,
    #C06BCF 0%,
    #9A3CAF 45%,
    #74218F 100%
  );

  --sodfa-gradient-horizontal: linear-gradient(
    90deg,
    #C06BCF 0%,
    #9A3CAF 50%,
    #74218F 100%
  );

  --sodfa-gradient-vertical: linear-gradient(
    180deg,
    #C06BCF 0%,
    #9A3CAF 50%,
    #74218F 100%
  );

  --bg-primary: #000000;

  --bg-secondary: #0A0A0A;

  --bg-card: #111111;

  --bg-card-hover: #181818;

  --bg-elevated: #1C1C1C;

  --bg-input: #0D0D0D;

  --border-primary: #272727;

  --border-secondary: #333333;

  --border-purple: #8E2AA8;

  --border-purple-light: #B45CC5;

  --text-primary: #FFFFFF;

  --text-secondary: #B8B8B8;

  --text-muted: #777777;

  --text-disabled: #4D4D4D;

  --text-purple: #C06BCF;

  --button-primary: #8E2AA8;

  --button-primary-hover: #A63DBD;

  --button-primary-active: #74218F;

  --button-secondary: #181818;

  --button-secondary-hover: #242424;

  --success: #22C55E;

  --success-bg: rgba(34, 197, 94, 0.12);

  --warning: #F59E0B;

  --warning-bg: rgba(245, 158, 11, 0.12);

  --danger: #EF4444;

  --danger-bg: rgba(239, 68, 68, 0.12);

  --info: #3B82F6;

  --info-bg: rgba(59, 130, 246, 0.12);

  --purple-bg: rgba(142, 42, 168, 0.12);

  --purple-bg-hover: rgba(142, 42, 168, 0.18);

  --purple-border: rgba(142, 42, 168, 0.45);

  --purple-glow: rgba(142, 42, 168, 0.30);

  --sodfa-glow:
    0 0 20px rgba(142, 42, 168, 0.25),
    0 0 60px rgba(142, 42, 168, 0.10);

  --sodfa-glow-small:
    0 0 15px rgba(142, 42, 168, 0.20);

  --sodfa-glow-strong:
    0 0 30px rgba(142, 42, 168, 0.35),
    0 0 80px rgba(142, 42, 168, 0.15);

  --shadow-sm:
    0 2px 8px rgba(0, 0, 0, 0.35);

  --shadow-md:
    0 8px 24px rgba(0, 0, 0, 0.45);

  --shadow-lg:
    0 15px 45px rgba(0, 0, 0, 0.55);

  --card-background: #111111;

  --card-border: #272727;

  --card-hover-border: #8E2AA8;

  --input-background: #0D0D0D;

  --input-border: #272727;

  --input-focus-border: #8E2AA8;

  --input-focus-glow:
    0 0 0 3px rgba(142, 42, 168, 0.15);

  --accent: #8E2AA8;

  --accent-light: #C06BCF;

  --accent-dark: #74218F;

  --accent-gradient: var(--sodfa-gradient);
}


Global:

body {
  background: var(--bg-primary);
  color: var(--text-primary);
}


Cards:

.sodfa-card {
  background: var(--card-background);
  border: 1px solid var(--card-border);
  color: var(--text-primary);
  box-shadow: var(--shadow-sm);
  transition: all 0.25s ease;
}

.sodfa-card:hover {
  background: var(--bg-card-hover);
  border-color: var(--card-hover-border);
  box-shadow: var(--sodfa-glow);
}


Primary buttons:

.sodfa-button {
  background: var(--sodfa-gradient);
  color: var(--sodfa-white);
  border: none;
  box-shadow: var(--sodfa-glow-small);
  transition: all 0.25s ease;
}

.sodfa-button:hover {
  box-shadow: var(--sodfa-glow);
  transform: translateY(-1px);
}

.sodfa-button:active {
  background: var(--button-primary-active);
  transform: translateY(0);
}


Secondary buttons:

.sodfa-button-secondary {
  background: var(--button-secondary);
  color: var(--text-primary);
  border: 1px solid var(--border-primary);
  transition: all 0.25s ease;
}

.sodfa-button-secondary:hover {
  background: var(--button-secondary-hover);
  border-color: var(--sodfa-purple);
}


Inputs:

.sodfa-input {
  background: var(--input-background);
  color: var(--text-primary);
  border: 1px solid var(--input-border);
  transition: all 0.2s ease;
}

.sodfa-input::placeholder {
  color: var(--text-muted);
}

.sodfa-input:focus {
  outline: none;
  border-color: var(--input-focus-border);
  box-shadow: var(--input-focus-glow);
}


Purple badge:

.sodfa-badge {
  background: var(--purple-bg);
  color: var(--sodfa-purple-light);
  border: 1px solid var(--purple-border);
}


Gradient text:

.sodfa-gradient-text {
  background: var(--sodfa-gradient);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}


Gradient border:

.sodfa-gradient-border {
  position: relative;
  border: 1px solid transparent;
  background:
    linear-gradient(var(--bg-card), var(--bg-card)) padding-box,
    var(--sodfa-gradient) border-box;
}


Glow:

.sodfa-glow {
  box-shadow: var(--sodfa-glow);
}


Dividers:

.sodfa-divider {
  height: 1px;
  background: var(--border-primary);
}

.sodfa-divider-purple {
  height: 1px;
  background: var(--sodfa-gradient-horizontal);
}


Selection:

::selection {
  background: var(--sodfa-purple);
  color: var(--sodfa-white);
}


Scrollbar:

::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: var(--bg-secondary);
}

::-webkit-scrollbar-thumb {
  background: var(--sodfa-purple-dark);
  border-radius: 999px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--sodfa-purple);
}


Use these styles consistently throughout the entire website.

10. CINEMATIC HERO SECTION

The Hero is one of the most important sections.

Do NOT create a generic e-commerce slider.

Create a cinematic premium hero experience.

The hero should contain multiple images that automatically change.

The transition must feel like a premium commercial.

Use combinations of:

Crossfade

Slow zoom

Ken Burns effect

Subtle parallax

Depth movement

Blur-to-focus

Layered opacity

Gentle scaling

Cinematic overlays

Example:

Slide 1:

Image slowly zooms.

Text appears.

Then:

Image gradually fades.

Next image starts slightly zoomed.

It slowly reaches normal scale.

Text transitions smoothly.

Then next slide.

Do NOT use aggressive horizontal sliding.

Do NOT make it look like a cheap banner carousel.

11. HERO CONTENT

Each slide supports:

Background image

Mobile image

Small label

Main title

Subtitle

CTA

Optional secondary CTA

Both Arabic and English content must be supported.

Example Arabic:

وصل حديثًا

اختار ستايلك

إكسسوارات مميزة لموبايلك كل يوم.

Button:

تسوق الآن

English:

NEW COLLECTION

Choose Your Style

Premium accessories designed for your everyday life.

Button:

Shop Now

12. HERO PERFORMANCE

Use:

WebP

Responsive images

Preload first hero image

Lazy load future slides

Proper mobile images

Optimized file sizes

The cinematic animation must not negatively affect performance.

13. HERO MOBILE

Mobile must have a specially optimized composition.

Do not simply shrink desktop.

Use:

Mobile-specific images

Correct cropping

Readable text

Touch-friendly CTA

Smooth cinematic transitions

14. STORE CATEGORIES

Initial categories:

Phone Cases

Chargers

Charging Cables

Power Banks

Wireless Chargers

Phone Holders

Screen Protectors

Car Accessories

Audio Accessories

Earphones

Adapters

Mobile Accessories

Other Electronics

Arabic and English names must be supported.

Categories should eventually be controlled dynamically from Supabase/SODFA Dashboard.

15. WAREHOUSE ACCESS

The website must display products only from warehouses assigned to this store.

Example:

Store A:

Warehouse 1 Warehouse 3

Store B:

Warehouse 2 Warehouse 4

The customer must NEVER see:

Warehouse names

Warehouse IDs

Internal locations

Internal inventory structure

Customers only see:

In Stock

Limited Stock

Out of Stock

16. EXISTING SODFA PRODUCTS

Products already exist inside SODFA Dashboard.

Do NOT create duplicate products.

Future workflow:

SODFA Dashboard

→ Search existing product

→ Select product

→ Add to Store

→ Assign category

→ Configure variants

→ Configure visibility

→ Publish

The store product remains linked to the original SODFA product.

17. PRODUCT VARIANTS

Support:

Product → Model → Color → Variant

Example:

Product:

Premium Phone Case

Models:

iPhone 17 Pro Max

iPhone 17 Pro

iPhone 17

iPhone 16 Pro Max

iPhone 16 Pro

iPhone 16

Samsung models

Xiaomi models

Other supported devices

Colors:

Black

Pink

Blue

Clear

Beige

etc.

Each variant can contain:

Product ID

Variant ID

SKU

Barcode

Model

Color

Price

Stock

Warehouse availability

Images

Availability

The customer must clearly select the correct model/color before adding to cart.

18. STORE VISIBILITY

Each product supports:

Show on Store: ON/OFF

Only enabled products appear publicly.

19. HEADER

Create a premium sticky header.

Desktop:

SODFA logo

Home

Categories

Offers

Search

Cart

WhatsApp/Contact

Language Switcher

Mobile:

Logo

Search

Cart

Menu

The header must adapt correctly between RTL and LTR.

20. CATEGORY SECTION

Create:

Arabic:

تسوق حسب الفئة

English:

Shop by Category

Use premium category cards.

Cards should be simple, visual and easy to understand.

21. FIND YOUR PHONE

Create a major feature:

Arabic:

اختار موبايلك

English:

Find the Perfect Accessory for Your Phone

Flow:

Brand

→ Apple / Samsung / Xiaomi / Huawei / etc.

Then:

Model

→ iPhone 17 Pro Max / iPhone 17 / etc.

Then display only compatible products.

This must eventually be driven by Supabase compatibility data.

22. PRODUCT DISCOVERY

Homepage sections:

Featured Products

Best Sellers

New Arrivals

Trending

Special Offers

All sections should eventually be configurable from Dashboard.

23. PRODUCT CARDS

Each card contains:

Image

Product name

Price

Old price if discounted

Discount badge

Available colors

Availability

Add to Cart

Quick View if useful

Use subtle premium hover effects.

On mobile prioritize:

Image

Product name

Price

Add to Cart

24. PRODUCT DETAILS

Product page includes:

Image gallery

Main image

Thumbnails

Product name

Price

Old price

Discount

Description

Specifications

Compatibility

Model selector

Color selector

Quantity selector

Availability

Add to Cart

Buy Now

The page must remain clean and easy to use.

25. IMAGE OPTIMIZATION

Original images may be uploaded through SODFA Dashboard.

Website delivery must use:

Original → WebP → Responsive Size → Browser

Use:

WebP

Responsive dimensions

Lazy loading

Proper compression

High quality

Low file size

Do not unnecessarily load original high-resolution files.

26. IMAGE LOADING

Every product image must have a SODFA-branded loading state.

Use:

Skeleton

Subtle shimmer

Purple accent

Smooth fade-in

Never show ugly blank spaces or broken image icons.

27. GLOBAL LOADING SCREEN

Create a premium SODFA loading screen.

Concept:

SODFA logo

with a subtle purple glow/animation.

It must be short and fast.

Do not unnecessarily delay the customer.

28. SKELETON LOADERS

Create consistent skeleton states for:

Products

Categories

Product details

Search

Cart

Checkout

Use the SODFA dark/purple visual identity.

29. SEARCH

Search by:

Product name

Category

Phone brand

Phone model

Compatibility

SKU when appropriate

Search interface must support Arabic and English.

30. FILTERS

Filters:

Category

Brand

Phone model

Color

Price

Availability

Offers

New arrivals

Desktop:

Sidebar or clean dropdown.

Mobile:

Bottom sheet/drawer.

Filters must adapt correctly to RTL/LTR.

31. CART

Cart item:

Product

Model

Color

Quantity

Unit price

Total

Remove

Edit variant

Show:

Subtotal

Shipping

Total

CTA:

Arabic:

إتمام الطلب

English:

Proceed to Checkout

32. GUEST CHECKOUT

Do NOT require:

Account registration

Login

Email

Password

The customer should be able to order quickly as a guest.

The checkout must be extremely simple.

33. CUSTOMER INFORMATION — FIRST ORDER

On the customer's first order, collect:

Full name

Mobile phone

Governorate

Area

Full address

Building

Floor

Apartment

Delivery notes

The form should be short, clean and easy.

34. SAVED CUSTOMER INFORMATION

After the first order, save customer information in Supabase.

Use the customer's mobile phone as the practical customer identifier.

Save:

Name

Phone

Governorate

Area

Address

Building

Floor

Apartment

Notes

For future orders:

Automatically retrieve the customer's saved information when possible.

Allow the customer to edit it before submitting a new order.

Do NOT introduce passwords or traditional accounts.

35. CUSTOMER DATABASE

Prepare:

customers

id

name

phone

governorate

area

address

building

floor

apartment

notes

created_at

updated_at

Avoid unnecessary duplicate customer records.

36. ORDER NUMBER

Every order receives a unique public order number.

Example:

SODFA-000001

The order number must be searchable later from the SODFA Dashboard.

37. ORDER DATA

Each order should contain:

Internal order ID

Public order number

Customer ID

Customer name

Phone

Address

Products

Variants

Quantities

Prices

Subtotal

Shipping

Total

Payment method

Deposit amount

Remaining amount

Payment proof

Order status

Created at

Updated at

38. INSTAPAY FULL PAYMENT

Payment option:

Arabic:

الدفع بالكامل عبر InstaPay

English:

Pay Full Amount via InstaPay

Current InstaPay number:

01100090629

Customer pays the entire order amount.

Then:

Upload payment proof

Create order

Save payment information

Save proof securely

Set payment status to awaiting verification

Generate WhatsApp order message

39. CASH ON DELIVERY

COD requires an initial deposit via InstaPay.

Example:

Order total:

1,000 EGP

Required deposit:

200 EGP

Remaining:

800 EGP

Customer flow:

Select COD

Display required deposit

Transfer deposit via InstaPay

Upload payment proof

Submit order

Store:

Payment Method = COD

Deposit = 200 EGP

Remaining = 800 EGP

Deposit Status = Awaiting Verification

40. PAYMENT PROOF

Create an elegant upload component.

Features:

Upload

Preview

Remove

Replace

Validation

Loading

Upload progress if possible

Production version should use:

Supabase Storage

Payment proof must not be publicly exposed.

41. WHATSAPP ORDER MESSAGE

Current WhatsApp number:

01041243135

After order creation, generate a WhatsApp message containing:

SODFA Order #XXXXXX

Customer:

Name

Phone:

Phone

Address:

Full address

Products:

Product

Model

Color

Quantity

Price

Payment:

Payment method

Total

Deposit

Remaining COD amount

Provide a button:

Arabic:

تأكيد الطلب عبر واتساب

English:

Confirm Order via WhatsApp

The WhatsApp message should use the customer's selected language.

42. PHONE NUMBER CONFIGURATION

Current values:

InstaPay

01100090629

WhatsApp

01041243135

IMPORTANT:

Do NOT hard-code these values in many frontend components.

Create a centralized configuration system.

Future:

SODFA Dashboard → Store Settings

or:

Supabase → Store Settings

Changing the numbers should not require changing frontend components.

43. ORDER SUCCESS

After checkout show:

Arabic:

تم استلام طلبك بنجاح

English:

Order Received Successfully

Show:

Order:

SODFA-000123

Payment status:

في انتظار مراجعة الدفع

or:

Awaiting Payment Verification

Display:

Order summary

Customer information

Payment method

Total

Deposit

Remaining COD

Buttons:

Confirm via WhatsApp

Continue Shopping

Both bilingual.

44. ORDER STATUS

Support:

Pending

Payment Verification

Confirmed

Preparing

Ready for Delivery

Out for Delivery

Delivered

Cancelled

Provide Arabic and English labels for every status.

45. ORDER TRACKING

Create:

Arabic:

تتبع طلبك

English:

Track Your Order

Customer enters:

Order Number

Optionally:

Phone Number

Show:

Order status

Products

Total

Payment status

Delivery information

46. FUTURE SODFA DASHBOARD STORE MANAGEMENT

Future Dashboard section:

Store Management

Stores

Warehouse Access

Store Settings

Store Products

Store Categories

Store Variants

Featured Products

Best Sellers

New Arrivals

Offers

Hero Slides

Homepage Sections

Payment Settings

WhatsApp Settings

Orders

Customers

47. HERO MANAGEMENT

Future Dashboard functionality:

Admin can manage hero slides.

Each slide:

Arabic title

English title

Arabic subtitle

English subtitle

Desktop image

Mobile image

Arabic CTA

English CTA

CTA link

Active/inactive

Sort order

Display duration

The website automatically displays active slides.

48. PRODUCT MANAGEMENT

Future Dashboard workflow:

Add Product to Store

→ Search existing SODFA product

→ Select it

→ Configure:

Category

Models

Colors

Variants

Visibility

Featured

Best Seller

New Arrival

Offer

Do NOT recreate the original SODFA product.

49. DATABASE STRUCTURE

Potential entities:

stores

id

name_ar

name_en

slug

active

created_at

updated_at

warehouses

Existing SODFA warehouses.

store_warehouses

store_id

warehouse_id

products

Existing SODFA products.

product_variants

id

product_id

model

color

sku

barcode

price

etc.

categories

id

name_ar

name_en

slug

image

active

store_products

store_id

product_id

visible

featured

bestseller

new_arrival

offer

product_categories

product_id

category_id

customers

Customer information.

orders

Order information.

order_items

Individual order items and selected variants.

payments

Payment information.

payment_proofs

Secure payment proof references.

store_settings

InstaPay number

WhatsApp number

Store name Arabic

Store name English

Logo

Store status

Default language

Other settings

hero_slides

id

store_id

image

mobile_image

title_ar

title_en

subtitle_ar

subtitle_en

cta_ar

cta_en

cta_link

sort_order

active

duration

50. STOCK LOGIC

Example:

Variant:

iPhone 17 Pro Max Case — Pink

Warehouse A:

10

Warehouse B:

5

Store access:

Warehouse A only.

Website stock:

10

Never 15.

Warehouse information remains internal.

51. STOCK SAFETY

Before confirming an order:

Validate product

Validate variant

Validate stock

Validate allowed warehouse

Validate quantity

Prepare the architecture for stock reservation to prevent overselling during simultaneous orders.

52. SECURITY

Customers must never be able to:

Access Dashboard

Modify products

Modify prices

Modify inventory

Modify warehouse data

Access other customers

Access other orders

Access payment proofs

Access private Supabase credentials

Use proper backend/API security.

Use Supabase Row Level Security where appropriate.

Never expose Supabase service-role credentials in frontend code.

53. RESPONSIVE DESIGN

The website must work perfectly on:

Small mobile phones

Large mobile phones

Tablets

Laptops

Desktop

Large monitors

Mobile-first.

54. SIMPLE USER EXPERIENCE

This is extremely important.

The website must look premium without making the customer work.

The user should always understand:

Where am I?

What can I buy?

How much does it cost?

Which model do I need?

How do I order?

How do I pay?

The UI should be visually impressive but extremely simple.

Avoid unnecessary:

Popups

Forms

Steps

Registration

Complicated menus

Excessive animations

Unnecessary information

The customer journey must feel effortless.

55. MOBILE UX

Prioritize:

Fast search

Easy navigation

Large product images

Easy model selection

Easy color selection

Large touch targets

Short checkout

Clear payment instructions

Easy payment proof upload

Easy WhatsApp confirmation

The website should feel almost like a premium shopping application.

56. PERFORMANCE

Prioritize:

WebP

Responsive images

Lazy loading

Image preloading where useful

Skeleton loading

Efficient queries

Caching

Code splitting

Minimal unnecessary JavaScript

Do not load the entire product catalog unnecessarily.

57. SEO

Prepare:

SEO-friendly URLs

Arabic SEO

English SEO

Product title

Meta description

Structured product data

Canonical URL

Open Graph

Category SEO

Examples:

/products/premium-magsafe-case

/categories/phone-cases

/collections/best-sellers

If bilingual routing is used, support a clean architecture such as:

/ar/...

/en/...

or another SEO-friendly equivalent.

58. ACCESSIBILITY

Use:

Semantic HTML

Accessible controls

Keyboard navigation

Proper labels

Good contrast

Alt text

Accessible forms

Accessibility must work in both RTL and LTR.

59. ANIMATIONS

Animations should feel premium.

Use:

Cinematic hero transitions

Smooth product image transitions

Subtle hover effects

Button feedback

Skeleton shimmer

Fade transitions

Soft page transitions

Cart feedback

Modal transitions

Avoid:

Excessive bouncing

Aggressive sliding

Long animations

Cheap effects

Excessive glassmorphism

Animations should enhance the experience, not distract from shopping.

60. REQUIRED PAGES

Build:

Home

All Products

Category

Search Results

Product Details

Cart

Checkout

Order Success

Order Tracking

Offers

About SODFA

Contact

Privacy Policy

Terms & Conditions

Shipping & Returns

All pages must support:

Arabic + English

61. REUSABLE COMPONENTS

Create reusable components:

Header

Mobile Navigation

Footer

Language Switcher

Hero Slider

Hero Slide

Product Card

Product Grid

Category Card

Product Gallery

Variant Selector

Model Selector

Color Selector

Search

Filters

Cart Item

Checkout Form

Payment Selector

Payment Proof Upload

Order Summary

Loading Screen

Skeleton Loader

Image Loader

Toast

WhatsApp Confirmation

Order Status

Order Tracking

62. EMPTY STATES

Create polished empty states for:

Empty cart

No search results

No products

No offers

No order found

Out of stock

Every empty state must support Arabic and English.

63. ERROR STATES

Create friendly bilingual error states for:

Failed product loading

Failed image loading

Payment proof upload failure

Checkout failure

Order creation failure

Network errors

Never expose raw technical errors to customers.

64. STORE DATA FLOW

The final architecture:

SODFA Dashboard

↓

Supabase Database

↓

Store Configuration

↓

Allowed Warehouses

↓

Existing SODFA Products

↓

Store Products

↓

Categories

↓

Variants

↓

Customer Store

↓

Customer

↓

Cart

↓

Checkout

↓

Payment

↓

Order

↓

WhatsApp Confirmation

↓

Supabase

↓

SODFA Dashboard

The Dashboard remains the operational source of truth.

The website is the premium public sales channel.

65. CURRENT PROTOTYPE

For the first phase:

Build the visual prototype and complete user experience.

Mock data is acceptable.

However, structure everything for future Supabase integration.

Do NOT build throwaway UI.

Priorities:

Premium UI

Arabic default

English support

RTL/LTR

SODFA dark/purple identity

Cinematic hero

Product browsing

Categories

Find Your Phone

Search

Filters

Product variants

Cart

Guest checkout

Customer information

Saved customer information

InstaPay

COD deposit

Payment proof

WhatsApp

Order number

Order tracking

Loading system

WebP images

Responsive design

Premium animations

Simple UX

66. DO NOT DO

Do NOT:

Create a second independent product system

Duplicate existing products unnecessarily

Require customer registration

Require customer email

Require password

Hard-code warehouses

Hard-code product inventory

Hard-code product lists

Hard-code payment numbers throughout components

Hard-code WhatsApp numbers throughout components

Expose warehouse data

Expose internal SODFA information

Rebuild the existing SODFA Dashboard

Change the existing Dashboard workflow

Copy another website directly

Create a generic Shopify-like template

Make the interface unnecessarily complicated

Make Arabic feel like an afterthought

Create a separate disconnected English website

Use English as the default language

Overload the customer with forms

Add unnecessary registration steps

Use excessive animations

Sacrifice performance for visual effects

67. CORE CUSTOMER JOURNEY

The ideal journey:

Homepage

↓

Cinematic Hero

↓

Find Your Phone / Categories

↓

Product Listing

↓

Product Details

↓

Select Model

↓

Select Color

↓

Select Quantity

↓

Add to Cart

↓

Cart

↓

Checkout

↓

Customer Information

↓

Choose Payment

OPTION 1 — FULL INSTAPAY

Pay Full Amount

↓

Upload Payment Proof

↓

Submit Order

OR

OPTION 2 — COD

Pay Required Deposit via InstaPay

↓

Upload Payment Proof

↓

Submit Order

↓

Generate SODFA Order Number

↓

Order Success

↓

Confirm Order via WhatsApp

68. DESIGN PHILOSOPHY

The final website should communicate:

SODFA — Premium Mobile Accessories

Arabic:

إكسسوارات مميزة لموبايلك

English:

Premium Accessories for Your Everyday Life

The customer should immediately understand the brand.

The website should feel:

Premium

but remain:

Simple

Fast

Comfortable

Clear

Easy

The customer should never feel like they are interacting with an inventory management system.

All complexity should remain behind the scenes.

69. FINAL INSTRUCTION

Build the first version of the:

SODFA Electronics Store

as a production-quality premium bilingual frontend prototype.

The visual quality is extremely important.

Pay special attention to:

Arabic-first experience

RTL/LTR support

Language switching

Cinematic hero

SODFA purple/black identity

Typography

Spacing

Product photography

Product cards

Mobile experience

Variant selection

Checkout simplicity

Loading states

Image loading

WebP optimization

Smooth interactions

Premium animations

Fast performance

Supabase-ready architecture

The final result should look like a real premium Egyptian mobile electronics brand ready to become a complete production e-commerce platform.

Do not simply build a standard e-commerce template.

Build a distinctive:

SODFA EXPERIENCE

with:

Arabic as the default language

and

English as a complete secondary language.

The website must be beautiful enough to impress the customer, but simple enough that anyone can place an order without confusion.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://sodfa-premium-express.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/c783d8c6-99e0-4276-8fc5-94a7f69e5960).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
