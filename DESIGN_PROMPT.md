# Design prompt — Makato mobile app

You are a senior product designer. Design the complete UI for **Makato**, a native
**mobile app** (iOS and Android, phone-first, portrait). It is not a website: use
native mobile patterns such as a bottom sheet, segmented control, native numeric
keypad, tap targets at least 44pt, safe areas and thumb-reachable primary actions.
The style should be **minimal but effective**. Every element must help the user
answer one question quickly. Design every screen and state listed below, in both
light and dark mode.

## What the app does

Makato helps people in **Tanzania** see what each **mobile money operator charges**
to **withdraw cash** or **send money**, side by side, so they can pick the cheapest
option. All figures are the operators' official published tariffs, including the
government levy. The app never estimates. If an operator hasn't published a tariff
for a transaction, the app says so and shows no number.

Core question the user is answering:
**"If I move X shillings this way, what will it cost me on each operator, and which is cheapest?"**

## Users

Everyday Tanzanian mobile money users. They are often on mid-range Android phones and
slow connections, and often not highly technical. They are comfortable with M-Pesa-style
apps. The app must be fully usable in **English and Swahili**.

## Operators (data comes from a server catalog)

M-Pesa, Airtel Money, Mixx by Yas, HaloPesa, AzamPesa, T-Pesa, Selcom Pesa. The list
can change. Each operator has a **name**, a **logo**, a **brand colour** (used as an
accent or as a fallback tile when the logo is missing) and the **network** behind it.

## Inputs the user controls

1. **Amount (TZS)**
   - A large, prominent number entry field using a numeric keypad. Show thousands
     separators as the user types (e.g. 100,000).
   - **Quick presets:** 10K, 50K, 100K, 500K, 1M.
   - Default value: 100,000.
   - The amount is capped at the highest amount any operator publishes a tariff for.
   - Results update **instantly** on every keystroke. There is no "Calculate" button.

2. **Transaction type**: a two-option switch
   - **Withdraw** (Kutoa): cash out at an agent. This is the default.
   - **Send** (Kutuma): transfer money.

3. **"My operator"**: the wallet the user is using
   - **In Withdraw mode:** a horizontal row of selectable operator logos/chips.
   - **In Send mode:** a **"Sending from"** operator picker.

4. **"Sending to"**: destination (only in Send mode)
   - Options: any operator wallet, **Bank account**, or **Lipa Namba** (paying a merchant).
   - Show a short label for the kind of route the user picked:
     *Same network* (sending to the same operator), *Cross network*,
     *Wallet to bank*, or *Paying a merchant*.
   - Before a destination is chosen, show an empty-state prompt instead of results:
     "Pick where the money is going to see the charges."

## Outputs

### A. Summary for the selected operator (the hero result)

- Operator logo and name, plus a route label: "Withdrawing" or "To {destination}".
- **Total charge**, shown largest. Show "Free" when the total is 0.
- Breakdown:
  - **Charge**: the operator fee.
  - **Levy**: the government levy.
  - **Rate**: the total as a percentage of the amount, e.g. 1.25%.
  - **"You need in balance"** (Withdraw) or **"You pay in total"** (Send): the
    amount plus the total charge.
- **Verdict message.** Show one short sentence, the first of these that applies:
  - The operator has no published tariff: "{Operator} has not published a tariff for this route."
  - The route is free: "This route is free on {Operator} — nothing is charged."
  - A cheaper operator exists: "Switching to {Cheapest} saves you TZS {X} on this transaction."
  - Otherwise: "{Operator} is the cheapest way to withdraw/send this amount."

  This is the main insight. Make it stand out, but keep it calm.

### B. Comparison of all operators

- Every operator for the same amount and the same route, **sorted cheapest first**.
  Operators with no published tariff go last.
- Each row shows the logo, the name and the **total**. If there is room, it also shows
  the charge and levy separately.
- Under each name, show a status line:
  - **"Cheapest"** in a positive/success colour. More than one operator can tie.
  - **"+{X} more"** than the cheapest.
  - **"No published tariff"**, with a dash instead of numbers.
- Tapping a row should make that operator the selected one. Treat this as a suggested
  interaction.
- Footer disclaimer: "Published operator tariffs including the government levy.
  Confirm with your operator before transacting." Also show the **catalog revision
  number**. The data's last-updated date is available too.

## Global settings

- **Language switch:** ENG / SWA. It changes every string instantly and is remembered
  between sessions.
- **Theme:** light / dark, following the system by default.
- App name/brand: **Makato** (Swahili for "deductions/charges").

## States to design

1. Default: Withdraw, 100,000 TZS, first operator selected, results showing.
2. Send mode with no destination selected (empty state).
3. Send mode, cross-network route, with a "switch and save" verdict.
4. The selected operator is the cheapest.
5. A free route (total = 0).
6. The selected operator has no published tariff for this route.
7. Amount is 0 or empty: results show dashes.
8. Loading the catalog on first launch, and an error or offline state with retry.
9. The Swahili version of a key screen, to check that longer text fits.
10. Dark mode of the main screen.

## Design principles

- **One screen does the job.** Amount, then type, then route, then answer. Avoid
  deep navigation. Use bottom sheets for pickers such as destination and operator.
- **Numbers first.** Make figures large and easy to scan. Use tabular numerals and
  always label currency as TZS.
- **Trust and honesty.** Never imply estimated data. Make "no published tariff" clear
  but not alarming.
- **Colour.** Use operator brand colours only as small accents. Use one calm primary
  colour for the app and one success colour for "cheapest".
- **Accessibility.** Meet WCAG AA contrast, support dynamic type, and never use colour
  as the only signal.

## Deliverables

High-fidelity mobile screens for every state above, with a small component set:
amount input, preset chips, segmented toggle, operator chip, operator picker sheet,
summary card, verdict banner, comparison row, and empty/loading/error states. Include
brief notes on interactions and transitions.
