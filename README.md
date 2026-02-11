# Cinema App

A cinema scheduling application built with React and TypeScript. This project displays upcoming movie screenings in the Netherlands from the Cineville API with filtering, searching, and detailed event information.

## Deployment

[https://eakameneva.github.io/cineville/](https://eakameneva.github.io/cineville/)

## Features

- Display a list of film screenings from today up to 7 days ahead with date and time filtering
- Search for a screening by film title
- Each screening has a page showing detailed information
- Responsive design using Tailwind CSS
- Error handling with user-friendly feedback
- Cross-browser support ensures compatibility across major modern browsers

## Tech Stack

- **React**
- **TypeScript**
- **Vite**
- **React Query**
- **React Router**
- **Tailwind CSS**
- **date-fns**

## API

This application uses the [Cineville Schedule Service API](https://api.cineville.nl) to fetch events and venue information.

### API Endpoints Used

- `GET /events` - Fetch events with date/time filters
- `GET /events/:id` - Fetch single event details

## AI Usage

AI was used during the implementation of this task for writing formatLanguages function, for placeholder poster generation and for refactoring suggestions (for example, toSorted non-mutating method instead of sort)

## Installation and setup

Follow these steps to set up and run the project locally:

1. **Clone the repository:**

   ```sh
   git clone https://github.com/eakameneva/cineville.git
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

3. **Start the development server:**

   ```sh
   npm run dev
   ```

4. The app will be available at **[http://localhost:5173](http://localhost:5173)**.
