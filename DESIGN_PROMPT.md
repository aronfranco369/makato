# Design prompt — Makato mobile app

Design a minimal but effective UI for **Makato**, a **mobile app** (not a website).
Below is only what the app does. Every layout, component, visual and interaction
decision is yours to make.

## Purpose

Makato lets people in **Tanzania** compare what **mobile money operators charge** to
**withdraw cash** or **send money**, so they can choose the cheapest option.

It answers one question: *"If I move this amount of money this way, what will each
operator charge me, and which one is cheapest?"*

## Users

Everyday Tanzanian mobile money users. Many of them are not technical.

## Data

- The app downloads a catalog of **operators** and their **official published tariffs**
  from a server.
- Each operator has a name, a logo, a brand colour and the network behind it. The
  current operators are M-Pesa, Airtel Money, Mixx by Yas, HaloPesa, AzamPesa, T-Pesa
  and Selcom Pesa. The list can change.
- Tariffs are published in amount bands. Each band gives an **operator fee** and a
  **government levy**. Together they make the **total charge**.
- The catalog has a **revision number** and a **last-updated date**.
- The app never estimates. If an operator has not published a tariff for a
  transaction, the app says so and shows no figure.

## What the user provides

1. **An amount** in Tanzanian shillings (TZS). It cannot go above the largest amount
   that any operator's tariffs cover.
2. **The transaction type:** either **withdraw** cash at an agent, or **send** money.
3. **Their operator:** the wallet they are transacting from.
4. **The destination** (for sending only). This is one of:
   - a wallet on any operator. It counts as *same network* if it is the user's own
     operator, and as *cross network* otherwise.
   - a **bank account**.
   - a **merchant**, paid through Lipa Namba.

   Nothing can be priced for sending until a destination is chosen.

Results recalculate immediately whenever any of these inputs change.

## What the app tells the user

### 1. The cost with their chosen operator

- the **total charge**, or "free" if it is zero
- the **operator fee** and the **government levy**
- the **rate**, which is the total charge as a percentage of the amount
- for withdrawing, **how much they need in their balance** (amount + total charge)
- for sending, **how much they pay in total** (amount + total charge)

### 2. A one-sentence verdict

Show the first of these that applies:
- The operator has **no published tariff** for this transaction.
- The transaction is **free** on this operator.
- **Another operator is cheaper.** Name it and state exactly how much the user would
  save by switching.
- The user's operator **is already the cheapest**.

### 3. A comparison of all operators

- Every operator is priced for the same amount and the same transaction, and they are
  ranked cheapest first. Operators without a published tariff come last.
- Each operator shows its fee, levy and total.
- Each operator is also marked as either:
  - **the cheapest** (more than one can tie),
  - **how much more** it costs than the cheapest, or
  - **no published tariff**.

### 4. A disclaimer

The figures are published tariffs including the government levy, and users should
confirm with their operator before transacting. Show it with the catalog revision.

## Other capabilities

- **Two languages: English and Swahili.** The user can switch between them at any time,
  and the choice is remembered.
- **Light and dark appearance.**

## Situations the design must handle

- A withdrawal.
- A send before any destination is chosen.
- A send to each kind of destination: same network, cross network, bank, merchant.
- The user's operator is the cheapest, and the user's operator is not the cheapest.
- A free transaction.
- A transaction the user's operator has no tariff for.
- Some or all operators have no tariff for a transaction.
- No amount entered.
- The catalog is loading, fails to load, or the device is offline.
- Swahili text, which is often longer than English.
