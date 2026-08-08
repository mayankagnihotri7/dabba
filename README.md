# Dabba

An AI-driven wellbeing companion for Mumbai local train commuters - a quick, private, moment to check in with yourself during the ride, and a small anonymous wall of shared good moments.

## Why

Commuters spend real time on Mumbai local scrolling reels on autopilot. Dabba is a faster, low-effort alternative. Tap a mood or vent for a few seconds, get something back that actually responds to what you wrote, and move on with your day.

## What it does

- **Check in** - tap a mood or write what's on your mind (upto 250 characters). A small AI model running entirely on your browser reads it, classifies your mood, and generates a short, specific response. No data ever leaves your device for this part.
- **Cheer Wall** - share something good anonymously, taggable with `!#tags`, filterable by tag or just your own posts.
- **Private by design** - the AI runs 100% client side (Transformers.js, SmolLM2-360M + a sentiment classifier), chosen specifically to keep mobile data usage low for commuters on limited daily data plans.

## Stack
- Rails 8.1 (Postgres) serving a single deploy React frontend via Vite
- Phone less email OTP auth (Resend)
- Client-side AI: `@huggingface/transformers` running SmolLM2-360M-Instruct (generation) + a DistilBERT sentiment classifier

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
