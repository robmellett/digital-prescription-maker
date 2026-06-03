# ℞ Prescription Maker

A little Astro + React app that lets a doctor type prescription details on the left and watch a tidy, printable prescription render on the right. Fill it in, hit **Print / Save PDF**, done.

You can view live demo at:

[https://prescription-maker.robmellett.dev/](https://prescription-maker.robmellett.dev/)

---

## Why on earth would you need to make your own prescription abroad?

Excellent question. Let me paint you some pictures.

### 🧳 The Suitcase That Went to Lisbon Without You

You're in Tokyo. Your blood pressure meds are in a checked bag currently enjoying a solo holiday in Lisbon. The airline assures you it'll be reunited with you "soon," which in airline means somewhere between Thursday and the heat death of the universe. A local pharmacist is happy to help — they just need it written down properly, in a way that doesn't look like you scrawled it on a napkin. Which, to be fair, you did.

### 🗣️ "Just Take Two of the Round Ones"

You attempt to describe your medication to a pharmacist who speaks no English, using only interpretive dance and the universal hand gesture for "small white pill." Forty minutes later you have purchased what you're fairly sure is either an antihistamine or a breath mint. A written prescription with the actual drug name, strength, and dose would have spared everyone this performance.

### 🏔️ The "I Definitely Packed Enough" Miscalculation

You packed exactly enough tablets for the trip. Then the trip got extended. Then it got extended *again*, because you fell in love with a small mountain village and a person who runs a cheese shop there. The heart wants what it wants. The pharmacy, however, wants paperwork.

### 🐕 The Customs Beagle Incident

A very good dog at the border took a *very* keen interest in your unlabelled baggie of loose pills rattling around your toiletries kit. Pro tip: medication that travels with a clear, legible prescription raises far fewer eyebrows than "trust me, officer, it's for my thyroid."

### ✈️ The Three-Connection Odyssey

Your meds are in the bag. The bag is at the gate. The gate is closing. You make the flight; the bag makes a different, more relaxing journey. By the time you land you've crossed four time zones and your dosing schedule has filed for divorce. A fresh prescription helps the local doc get you sorted without re-diagnosing you from scratch.

### 🌊 The "It Seemed Like a Good Idea" Snorkelling Trip

Waterproof dry bag: not as dry as advertised. Your pills are now a single cohesive paste. The fish enjoyed the salt. You did not.

---

## So what is this thing, *actually*?

It's a **demo / UI mock**. It produces a nice-looking prescription form so you can:

- prototype a clinical tool,
- show a designer what the layout could be,
- or just enjoy watching text appear on the right when you type on the left (genuinely soothing).

## What it is **not**

- **Not** a way to write yourself a real prescription. That requires an actual licensed prescriber, and "I made it in a web app" is not a defence that has historically gone well in court.
- **Not** clinically validated. It does zero checking for drug interactions, dose limits, allergies, or whether the thing you typed is even a real medicine. It will cheerfully let you prescribe "47 kg of Vitamin Vibes, three times daily."
- **Not** a substitute for, you know, *a doctor*. If you're actually stuck overseas without your medication: contact a local clinic, a pharmacist, your travel insurer, or your embassy. They've seen it all, including the snorkelling thing.

> **TL;DR:** Real meds → real doctor. This app → pretty pixels and gentle comedy.

---

## Running it

```bash
pnpm install
pnpm dev        # http://localhost:4321
pnpm build      # static output → dist/
pnpm preview    # preview the build
```

### Printing tip

When saving to PDF, choose **"No Margins"** in the print dialog to drop the browser's header/footer. The app already blanks the document title so your PDF doesn't shout "Prescription Maker" across the top like an overeager intern. (There's also a little **?** button in the corner that reminds you of this, in case you, too, left your memory in Lisbon.)

---

## Stack

- [Astro](https://astro.build) — static shell
- [React](https://react.dev) — the interactive island (one component, `client:load`)
- Plain CSS, no framework, no nonsense

---

## ⚖️ Legal & responsible use

A quick, genuine note (the comedy takes a break here):

- This project is a **demonstration tool only**. It is **not a medical device**, not certified, and not approved by any regulatory body.
- It does **not** create valid prescriptions. Writing or issuing a real prescription is restricted to **licensed healthcare professionals** acting within their jurisdiction. Forging, altering, or self-issuing prescriptions is **illegal** in most places and can carry serious criminal penalties.
- Nothing here is medical advice. If you need medication or care, **see a qualified doctor or pharmacist.**
- The authors and contributors accept **no liability** for any use, misuse, or consequences arising from this software. Provided "as is", without warranty of any kind.

**Please use this responsibly.** It exists to show off a tidy form UI — not to play doctor. 🙏

---

Safe travels. Pack your meds in your carry-on. 🧳💊

Built with <3 by [Rob Mellett](https://robmellett.com)
