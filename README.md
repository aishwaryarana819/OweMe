# OweMe!
## Overview
OweMe is a webapp to track borrowings & lendings but with a focus on stuff rather than money; though you can track money too if you'd like.

## Features
- Add borrwoings/lendings
- Add date, before/after photos & more.
- View borrowings/lendings
- Complete borrowings/lendings
- View archive
- & more!

## Tech Stack
- React (vite)
- Tailwind css
- Supabase (used for auth and database)

## How to run it locally
First make sure you have node installed on your machine. Then just clone this repo and run:

npm install
npm run dev

You will also need to setup a .env.local file in the root directory. It needs two variables to work properly:
VITE_SUPABASE_URL=your_project_url
VITE_SUPABASE_ANON_KEY=your_anon_key

You can get these from the supabase dashboard under the api settings.

Note: just for testing right now email confirmation is turned off, so you can sign up with any fake email and get right in to the dashboard.

