#  Library Wall

A full-stack book discovery and social review platform built using **React + Vite** on the frontend and **Spring Boot + PostgreSQL** on the backend.

---

## Live Demo (optional)

**Frontend:** (https://clonev2-jm7v.vercel.app/)  
**Backend:** https://boiling-dawn-30287-3780ff100e79.herokuapp.com/

---

##  Features

- **User Auth & Profiles** – Register, log in, and view your profile with post history and avatar  
-  **Library Wall** – Post about books, like and comment on posts, explore trending themes  
-  **Trending Keywords** – Automatic keyword extraction based on real-time posts  
-  **Theme Toggle** – Switch between light and dark modes with persistent theme setting  
-  **Comment System** – Comment on posts with instant feedback and visibility  
-  **Quote of the Day** – Random daily quote from classic literature/philosophy  
-  **Search & Filter** – Instantly filter content using live search and trending topics  
-  **Frontend Unit Tests** – Includes logic tests with **Vitest** for maintainability  
-  **Seeded Data** – Backend auto-generates starter content for demo purposes

---

##  Tech Stack

### Frontend:
- React + Vite
- React Router
- CSS Modules / Custom Styling
- Vitest (Unit Testing)

### Backend:
- Java Spring Boot
- Spring MVC + Spring Data JPA
- PostgreSQL
- Spring Boot DevTools (Hot Reload)
- DataSeeder.java (demo content)

### DevOps:
- Git + GitHub
- Heroku (backend deployment)
- Vercel (frontend deployment)

---

##  Running Locally

### Clone the repo:
```bash
git clone https://github.com/Butler839/clonev2
cd clonev2
```

### Backend:
```bash
./mvnw spring-boot:run
```

### Frontend:
```bash
cd clonev2-frontend
npm install
npm run dev
```
### Create .env file
```
VITE_API_BASE_URL=http://localhost:8080
```
### update api.js
```
const BASE = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080').replace(/\/+$/, '');  #change top line
```
