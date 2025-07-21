# Family Travel Tracker

A web application that allows families to track and visualize countries visited by different family members on an interactive world map.

## Features
- Track visited countries for multiple users
- Color-coded visualization on world map
- Add new family members with custom colors
- PostgreSQL database for persistent storage
- Real-time updates when adding new countries
- User-friendly interface for country input

## Prerequisites
- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm (Node Package Manager)

## Setup
1. Clone the repository:
```bash
git clone https://github.com/vishal-tamhane/Family-Travel-Tracker.git
cd Family-Travel-Tracker
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables in `.env`:
```env
DB_USER=postgres
DB_HOST=localhost
DB_NAME=world
DB_PASSWORD=your_password
DB_PORT=5432
```

4. Set up the PostgreSQL database:
- Create a database named 'world'
- Import the provided SQL schema
- Ensure the database user has appropriate permissions

5. Run the application:
```bash
node solution.js
```

6. Access the application:
Open your browser and navigate to `http://localhost:3000`

## Technologies Used
- Node.js - Backend runtime environment
- Express - Web application framework
- PostgreSQL - Database management
- EJS - Template engine
- dotenv - Environment variable management
- body-parser - Request parsing middleware

## Project Structure
```
family-travel-tracker/
├── public/
│   ├── styles/
│   └── images/
├── views/
│   ├── index.ejs
│   └── new.ejs
├── solution.js
├── .env
├── .gitignore
└── README.md
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](https://choosealicense.com/licenses/mit/)