# ParentBuddy

**ParentBuddy** is an AI-based application designed to help parents discover and plan activities for their children, based on location and personal preferences. With a user-friendly design and AI-driven recommendations, ParentBuddy offers a personalized experience, making it easier to create unforgettable moments with your children.

## Description

ParentBuddy allows users to:

- **Get activity recommendations based on geolocation and personal preferences.**
- **Save favorites and track activity history.**
- **Switch between light and dark mode using a smooth theme toggle button.**
- **Interact with a chatbot to get activity recommendations directly.**
- **Access detailed information about privacy policies, terms of service, and contact details.**

The app combines modern web development technology with powerful AI to provide parents with relevant and exciting activities, no matter where they are. Even if location sharing is denied, the app will continue to provide general recommendations.

## Features

- **AI-driven recommendations:** Using OpenAI, users get personalized activity suggestions based on location, preferences, and their child's age.
- **Geolocation support:** Enable location sharing to get personalized activities near the user’s location. If location sharing is denied, the app will still provide general activity recommendations.
- **Favorites and history:** Users can save favorite activities and keep track of past activities.
-**Scroll to top button:** For better user experience.
- **Dark/Light mode:** Easily switch between light and dark themes with a toggle button.
- **Responsive design:** Designed to work seamlessly on both desktop and mobile devices.
- **Comprehensive documentation:** Includes easy access to Privacy Policy, Terms of Service, and Contact Information.

## Technical Architecture
### Frontend
- **Framework:** React + TypeScript
- **UI Components:** Shadcn/ui and Tailwind CSS for styling.
- **State Management:** Hooks are used to manage user activity history and favorites.
- **Geolocation:** Uses the browser's built-in JavaScript Geolocation API to obtain the user's location for personalized activity recommendations.
- **AI Integration:** OpenAI API is used to generate activity recommendations based on user input.

### Backend
- **Express.js:** Backend API handles user data, activities, and favorites.
- **MongoDB:** Database for storing user information, activity history, and recommendations.
- **JWT Authentication:** Secure login and registration using JSON Web Tokens.
- **bcrypt:** Used to securely hash passwords before saving them to the database, protecting users' sensitive information.

## Installation and Configuration

### Prerequisites

- **Node.js (v14 or higher)**.
- **Npm or yarn**.

### Steps

1. Clone the repository:
```
git clone https://github.com/Luayasaadsson/ParentBuddy
```

2. Navigate to the project directory:
```
cd parentbuddy
```

3. Install dependencies
```
npm install 

or
 
yarn install
```

4. Start the development server:
```
npm run dev 

or

yarn dev
```

5. Open the app in your browser:
```
http://localhost:5173
```

## Environment Variables
To run the application, you will need to set up environment variables for both the backend and frontend. Below are the steps:

### Backend

Create a config.env file in the root of your backend directory and add the following variables:

```
DATABASE=your_mongodb_connection_string
DB_NAME=ParentBuddy
DATABASE_PASSWORD=YOUR_DB_PASSWORD
PORT=6006
OPENAI_API_KEY=YOUR_OPENAI_API_KEY
JWT_SECRET=yoursecretkey
```

These variables are used to connect to the MongoDB database, authenticate users, and integrate with OpenAI.

### Frontend
For the frontend, you need to configure environment variables based on whether you are in a development or production environment:

1. Create a ```.env.local``` file for local development:
```
REACT_APP_API_URL=http://localhost:6006/api
```
2. Create a ```.env.production``` file for production deployment:
```
REACT_APP_API_URL=https://parentbuddy.onrender.com/api
```

These variables ensure that the frontend communicates with the correct backend server, depending on the environment.

## Usage

### Starting the Application

Once the server is running, users can interact with the ParentBuddy app by:

1. **Registering or Log In**: Create an account or log in to get personalized activity recommendations.

2. **Exploring Activities**: Select your preferences and child's age, and allow location sharing to get recommendations for nearby activities.

3. **Save Favorites**: Save activities you like for easy access in the future.

## Example

**Get Activity Suggestions**: When you fill in the form with your child’s age and preferences, submit the form to receive AI-generated activity suggestions.

**Save Favorite Activities**: Click on the heart icon next to activities to save them for future use.

## Components and Structure

The app is organized as follows:

- **components/pages:** Contains pages like ```AboutPage```, ```ContactPage```, ```DevelopersPage```, ```LandingPage```, ```PrivacyPolicy```, and ```TermsOfService```.

- **components/shared:** Shared components like ```ChatLoader```, ```Layout```, ```Footer```, ```ScrollButton```, and ```ThemeToggleButton```.

- **components/activity:** Forms and recommendation features, including ```ActivityForm```, ```ActivityHistory```, ```FavoriteActivities``` and ```RecommendationDisplay```.

- **hooks:** Custom hooks like ```useActivityForm```, ```useActivityHistory```, ```useAuth``` and ```useAuthStatus```.

- **lib:** Helper functions such as ```utils```.

## Deployment

1. Build for production:

```
npm run build 

or 

npm yarn
```

2. Deploy to your preferred hosting service, such as Vercel, Netlify, or Heroku.

## Contributing

All contributions are welcome! If you'd like to contribute with code or improvements:

1. Fork the repository.
2. Create a new branch for your changes.
3. Submit a pull request when your changes are ready.

## Contact

For questions or feedback, contact me at:

- **Email: luay.asaadsson@chasacademy.com**