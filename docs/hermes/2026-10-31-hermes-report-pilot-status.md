# Group site: new Pilot status, Evsider moved to it

Date: 31 October 2026
Task: `docs/hermes/2026-10-31-task-evsider-pilot-status.md` (part B)
Site: https://dnycrossbordergroup.com
Commits: `babd2af` (Pilot status), `bf9a736` (Evsider card line), `+ docs commit`

## Changes

- `src/data/ventures.ts`: `Status` union gains `Pilot`; `STATUS_DEFS` gains `'Pilot': 'Live and taking orders in a pilot phase while operations are proven.'`; the `ev-accessories` venture is `status: 'Pilot'` with the new summary "Fitted accessories for electric vehicles, supplied to dealers, retailers, detailers and fleets. Now taking trade orders at evsider.com."
- `src/data/faqs.ts`: the status-sentence answer now reads "Operating means live with customers; Pilot means live and taking orders in a pilot phase; In Development means…"; the Evsider FAQ answer says the business is "now in a pilot phase and taking trade orders".
- `src/lib/ai-text.ts`: "Ventures are labelled Operating, Pilot, In Development, Proposed, Research or Partnership Opportunity."
- `public/assets/css/group.css`: `.status-badge.s-pilot` uses the cyan text with a cyan border and no fill, so it reads apart from Operating's filled cyan badge. Every other status keeps its existing colour.
- `src/data/ventures.ts` relation line for Evsider no longer mentions a retail channel, since the venture is trade only.

## Where Pilot had to be added

`Status` is one union feeding `StatusBadge`, `VentureCard`, the ventures page legend, `ventures.json`, the AI text dump and the venture page status fact, so the new value flows through all of them without further edits. No page carries a status filter or a status count, so nothing else needed a branch. `StatusBadge` derives its class from the label, which produces `s-pilot` and picks up the new CSS.

## B5 verification

- `/ventures` lists ten badges: nine `In Development` and one `Pilot` (Evsider). No other venture changed status.
- `/ventures/ev-accessories` shows the Pilot badge in the status fact; the definition is in the badge `title` and in a screen-reader span, so hovering gives "Live and taking orders in a pilot phase while operations are proven."
- `/ventures` "What each status means" table lists Pilot with the new definition; `ventures.json` and `llms.txt` carry the same definition (2 hits each).
- `npm run build` 71 pages, `npm run check:links` 72 pages, 0 problems. No whitelist change was needed for the word Pilot.
- Home page and `llms.txt` contain no status counts, so no numbers to reconcile.

## Screenshots

- `docs/screenshots/pilot-status-ventures-card-1440.png`: the Evsider card on `/ventures`.
- `docs/screenshots/pilot-status-venture-page-1440.png`: the status row on `/ventures/ev-accessories`.

## Same-day note

evsider.com shipped its pilot wording at `43be2f5` on the same day; the group site and the brand site now say the same thing.
