# output video: 

Cyro Movie Library

A movie discovery web application built with React and Vite. Browse popular movies, search for titles, view movie details, and access a profile page after login.

Features

Browse popular movies

Search movies by title

View movie details and cast information

Login and profile pages

Client-side routing with React Router

Redux state management

Movie data from The Movie Database (TMDB)

Tech Stack

React

Vite

React Router

Redux / React Redux

Axios

Bootstrap

Getting Started

1. Requirements

Install a recent version of Node.js and npm.

2. Install dependencies

Open a terminal in the project folder and run:

npm install

3. Configure the TMDB API key

Create a .env file in the project root (the same folder as package.json) and add your TMDB API key:

VITE_TMDB_API_KEY=your_tmdb_api_key_here

Get an API key from The Movie Database (TMDB). Do not commit real API keys or other secrets to a public repository.

4. Start the development server

npm run dev

Open the local URL printed in your terminal by Vite (usually http://localhost:5173).

Available Scripts

npm run dev — start the development server

npm run build — create a production build

npm run preview — preview the production build locally

Main Routes

/ — Home / popular movies

/movies — Movies listing

/search — Search movies

/movie/:id — Movie details

/login — Login

/profile — Profile (protected route)

Project Structure

src/
├── components/   # Reusable UI components
├── pages/        # Home, Login, and Profile pages
├── redux/        # Redux store and reducers
├── services/     # TMDB API requests
├── utils/        # Helper functions
├── App.jsx       # Application routes and shared layout
├── main.jsx      # React entry point
└── index.css     # Global styles
public/           # Static assets and icons

Troubleshooting

If movie data does not load, check that VITE_TMDB_API_KEY is set correctly in .env, then restart the development server.

If npm run dev fails, confirm that all project dependencies are installed and that the Vite configuration matches the React app.

Never share your private API key publicly.

Notes

This README describes the app based on the current source files. Ensure the project dependencies and Vite configuration are set up for React before running the app.