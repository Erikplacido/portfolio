# Case 01 · Blue Services

Part of the portfolio in `../`. Uses the shared frame (`../shared/`) and is listed in `../shared/cases.js`.

```
blue-services/
  index.html   # the whole case study (HTML + CSS + vanilla JS, no build step)
  assets/      # public brand images, 2 real artefacts, real-*.webp booking captures
```

Paths in the tables below (`booking.php`, `connectblue/…`, `docs/…`) point to the **blue2026 product repository**, not to this folder.

## What's on the page

| Section | What it shows | Type |
|---|---|---|
| Hero | Customer phone cycling Book → Track → Rate, desktop summary with a counting total, 3D tilt on hover | Animated recreation |
| Booking | **Interactive booking demo**, drawn after the real captures (`real-*.webp`): address with date and time fields, Bedroom/Bathroom steppers, the four real extras with steppers, Subscription/One-time toggle with the weekly/fortnightly/monthly plans, the "Select Service Date" picker (Sunday first, Oct 2026, available/limited/unavailable days), the "Select Your Starting Preferred Time" morning windows, the "Booking Summary" sheet and the bottom bar with the live total and Proceed to Checkout. A ghost cursor plays one path, then hands over to the visitor. "Replay" restarts it | Interactive recreation |
| Booking | Real desktop capture of the booking page under the interactive demo | **Real screenshot** |
| Booking | Phone cycling the real mobile wizard (step 1 → 2 → 3 → summary), step buttons take over on first tap | **Real screenshots** |
| Booking | "The real flow on a phone": 6 captures in order (where & when, calendar, arrival windows, rooms & extras, preferences, summary). Grid on desktop, swipe strip under 1000 px | **Real screenshots** |
| Booking | Before/after slider, both sides filling the same frame: a category quote-form page vs. the real booking page (`real-desktop-booking.webp`; `real-m1-address.webp` under 640 px) | Interactive. "Before" is the category pattern, **not** an old Blue version; "After" is a **real screenshot** |
| Field app | Professional "My Jobs" with the "New Job Available!" push, checklist with BEFORE/AFTER photo points, customer tracking (Follow/Route/Home, Distance/ETA/Speed/Accuracy) and the admin "Live Professional Tracking" map with its status legend and job popup. Rebuilt from `connectblue/professional/jobs.php` and `checklist.php`, `customer/track-professional.php` and `admin/live-tracking.php`: real labels, statuses and colours, placeholder names and amounts, drawn maps. The old "area abandonment" flag was removed: `checkGeofences()` is still a stub | Animated recreation (not screenshots: these screens run on live data) |
| UI proposals (new) | 4 tabs that auto-advance (click to stop): postpone a subscription clean, ratings that open a ticket, Referral Club progress ring, night "Liquid Glass" theme | **Proposals**, not shipped UI |

Each proposal states what exists in the code today and what would change, so reviewers can tell the shipped product from the next iteration.

## Before you publish: 5 things only you can do

1. **Replace the recreations with real screenshots where you can.** The page includes two real artefacts (`flow-swimlanes.png`, `board-tokens.png`). The device frames are recreations built from the real tokens. Keep the interactive booking demo (it's a strong piece), but put a real capture next to it. Suggested shot list:
   - ~~Booking page, desktop~~, ~~calendar modal~~, ~~mobile wizard~~: done (`assets/real-*.webp`, captured 2026-10-19 from the local build at `localhost:8080/booking`, 390 px @2x, test data). Stripe checkout was not captured: the local API failed to save the booking (database timeout)
   - Calendar with a *limited* day visible (none was limited on the capture date)
   - Professional job list, checklist and route screens (iOS simulator or device)
   - Customer live-tracking screen
   - Admin live map and subscriptions table
   - Design-system board: open `docs/booking-design-system-board.html` and capture it full-page

   Put files in `assets/` and swap the `.phone` / `.desk` block for an `<img>` (keep the `<figcaption>`).
2. **Add outcomes.** The page still has no conversion or revenue numbers because the repo can't prove them. If you have real ones (completion rate, time to book, support tickets saved, jobs per week), add a `.stats` row in the "Booking" or "Field app" section. The `data-count` attribute animates the number.
3. **Check what you may show.** Confirm with the business that the brand, UI and any customer/professional data can be public. Names in the mockups (Maria, Ana, João, Lee) and the address are placeholders. Blur real names, addresses and phone numbers in screenshots. Team photos in `/images/team` were intentionally not copied.
4. **Confirm the story is accurate.** I inferred the narrative from the code, docs and commit history. Edit anything that doesn't match, especially "Role", the problem statement, the process steps and the "Exists today" lines in the proposals.
5. **Language.** It's in English (the product serves Australia and senior roles are often international). Translate `index.html` text if you want a PT-BR version.

## Demo data vs. real rules

| In the demo | Real or illustrative |
|---|---|
| Live total, live duration, available/limited/full days, arrival windows | Real behaviour of `booking.php` |
| Prices ($60 base + $40/bed + $30/bath, extra prices) and which days are limited or unavailable | Illustrative |
| Labels, recurrence discounts (Weekly 12%, Fortnightly 10%, Monthly 5%), extra names and durations (60/30/30/35 min) | Real (booking captures) |
| Postpone moves the next clean to the end; max 3 per subscription; cancel has a fee | Real (`connectblue/customer/subscriptions.php`, `checkPauseLimit`) |
| Rating under 3★ opens a ticket | Real (lifecycle flow) |
| Referral levels with earnings range, icon and commission % | Real structure (`referralclub.php`); values shown are samples |
| Dark theme | Proposal, depends on the token consolidation in the trade-offs table |

## What was deliberately left out of this folder

`.env`, `.env.cache.php`, `config/`, payment and API code. Nothing in this portfolio contains secrets. Do not publish the product repository.

## Where the facts come from

| Claim | Source |
|---|---|
| Tokens, components, breakpoints, z-index scale, tech debt table | `docs/booking-design-system.md` |
| Customer / professional / admin surfaces | `connectblue/customer`, `connectblue/professional`, `connectblue/admin` |
| Subscription postpone rules | `connectblue/customer/subscriptions.php` |
| Referral levels | `referralclub.php` |
| Native shell for background GPS | `app-professional/README.md` |
| 206 commits | `git log --oneline \| wc -l` |

## Ideas to level it up

- Add a 60–90 s screen recording of the real booking flow (muted MP4 next to the interactive demo).
- If you have the old Blue flow, swap the "category pattern" side of the before/after slider for it.
- Turn one proposal into a real shipped change and update its tab to "Shipped".

## Motion and accessibility

- Motion is CSS, SVG and a small amount of vanilla JS (count-ups, autoplay, FLIP reordering in the postpone demo). Body text never moves.
- Loops pause while their section is off-screen.
- `prefers-reduced-motion` turns off all animation and autoplay and shows each demo in its final state; every control in the booking demo still works.
- The 3D tilt only runs on devices with a fine pointer.
- Tabs support arrow keys; the before/after slider is a native range input, so it works with the keyboard.
