# Dabba

An AI driven wellbeing companion for Mumbai local train commuters - a quick, private moment to check in with yourself during the ride, plus a small anonymous wall of shared good moments.

## Why

Commuters spend real time on Mumbai local scrolling reels on autopilot. Dabba is a faster, low-effort alternative: tap a mood or vent for a few seconds, get something back that actually responds to what you wrote, and move on with your day.

## What it does

- **Check in** - tap a mood or write what's on your mind (up to 250 characters). A small language model and sentiment classifier run entirely on-device - the classifier reads your text for positive/negative sentiment, which maps to your mood, while tapping a mood icon directly covers the full range (stressed, tired, neutral, good).
- **Cheer Wall** - share something good anonymously, taggable with `!#tags`, and browse posts by tag or your own posts.
- **Private by design** - private check-ins are processed entirely on device. Your vented text never leaves your device and is never stored in the database.

## Privacy

Dabba treats private check-ins and shared posts differently.

- **Check in & vents** - processed entirely on device using Transformers.js. Your text never leaves your device, is never sent to an API, and is never stored in the database.
- **Cheer Wall & tags** - stored only when you explicitly choose to share them. These are used to display on the anonymous wall and support tag based filtering.

The AI runs locally in your browser using `SmolLM2-360M-Instruct` and DistilBERT sentiment classifier. No server side AI processing is involved for private check-ins.

## Stack

- **Backend:** Rails 8.1 + PostgreSQL
- **Frontend:** React + Vite
- **Authentication:** Passwordless email OTP auth via Resend
- **Client-side AI:** `@huggingface/transformers` running `SmolLM2-360M-Instruct` for generation + a DistilBERT sentiment classifier
- **Styling:** Tailwind CSS v4
- **Design:** Custom "torn ticket stub" design system

## Local setup

```bash
git clone git@github.com:mayankagnihotri7/dabba.git
cd dabba
bundle install
npm install
rails db:create db:migrate
bin/dev
```

Requires a `RESEND_API_KEY` env variable for email OTP

## Testing

```bash
bundle exec rspec
```
