# Wedding Website Project Context

This document serves as the central context and architectural overview for the wedding website project, built with PayloadCMS v3.

## Overview
- **Purpose**: Wedding website for the user and their partner.
- **Tech Stack**: PayloadCMS v3 (Next.js app router integrated).
- **Hosting**: Vercel (using Cloudflare D1 for Database and R2 for Storage/Receipt Uploads).
- **Privacy**: Publicly indexable (No robots.txt restrictions).

## UI / UX Design
- **Single Page Architecture**: Instead of traditional navigation to separate pages, the site will consist of one main page displaying multiple **Cards** (representing Home, Tentative, Dresscode, RSVP, Wishlist).
- **Interaction**: Clicking a card triggers an animation (e.g., flipping over and growing into a full-screen or large modal) to display the respective content. This requires a library like **Framer Motion**.

## Personalization & Variations
The website will serve content dynamically based on three different visitor variations:
1. **Groom-side**
2. **Bride-side**
3. **Public/Friends**

**Mechanism**: Deployed across 3 separate subdomains (e.g., `groom.`, `bride.`, and root). Content variations for sections like **Tentative** and **Dresscode** will be handled globally via environment variables (`.env`) injected at build/runtime for each respective subdomain.

## Content Management (CMS)
Only specific features will utilize CMS collections:

### 1. RSVP
- **Logic**: Open RSVP format (no pre-populated guest list required).
- **Data**: Guests simply fill out a form with their details (name, attendance, dietary requirements, etc.), which creates a record in the database.
- **UX Flow**: After submitting the initial RSVP, guests are given an option to write a personal message. Upon submitting the message, a custom "cutesy dialog box" toast will appear as a thank you (avoiding standard UI toast notifications).

### 2. Wishlist
- **Logic**: Features a "Looking into it" counter instead of immediate locking. 
- **Mechanism**:
  - Multiple guests can express interest, incrementing the counter (e.g., "2 guests looking into it").
  - The item is fully locked/claimed ONLY when a guest successfully uploads a "proof of purchase" (e.g., receipt image).
  - Requires R2 storage integration on the frontend to handle receipt uploads.

## Infrastructure
- **Frontend / CMS Hosting**: Vercel
- **Database**: Cloudflare D1 (via `@payloadcms/db-d1-sqlite`)
- **Object Storage**: Cloudflare R2 (via `@payloadcms/storage-s3`)
