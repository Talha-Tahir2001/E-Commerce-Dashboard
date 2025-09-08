# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

------------------

# 🛍️ E-Shop Dashboard

![GitHub Repo stars](https://img.shields.io/github/stars/Talha-Tahir2001/E-Commerce-Dashboard?style=social)  
![GitHub forks](https://img.shields.io/github/forks/Talha-Tahir2001/E-Commerce-Dashboard?style=social)  
![GitHub last commit](https://img.shields.io/github/last-commit/Talha-Tahir2001/E-Commerce-Dashboard)  
![License](https://img.shields.io/github/license/Talha-Tahir2001/E-Commerce-Dashboard)  
![Made with React](https://img.shields.io/badge/Made%20with-React-61DAFB?logo=react&logoColor=white&style=flat)  
![Vite](https://img.shields.io/badge/Powered%20by-Vite-B73BFE?logo=vite&logoColor=yellow)

A modern **E-Shop Dashboard** built with **React 19 + Vite**.  
It demonstrates **React fundamentals** such as **state management with Redux Toolkit, routing, hooks, forms, API integration, and reusable UI components**.

----------

## ✨ Features

-   🏠 Landing page with **navigation**
    
-   🛒 Products page fetching items from **FakeStore API**
    
-   🧾 Cart with checkout flow
    
-   👤 Profile page & **protected Admin page**
    
-   🔗 Routing with **React Router DOM v7**
    
-   📦 State management using **Redux Toolkit**
    
-   🎨 Clean, responsive UI with **Tailwind + Shadcn UI**
    
-   ⭐ Reusable components (Header, Footer, Cards, Buttons)
    
-   📱 Fully responsive design (mobile-first)
    

----------

## 📦 Prerequisites

-   **Node.js** → [Download here](https://nodejs.org/)
    
-   **npm** → Comes with Node.js
    
-   **Vite** → Scaffold a project with:
     ```bash
    npx create-vite@latest
    ```

----------

## 📸 Screenshots

### 🏠 Landing Page

Modern home page with hero section, categories, featured products, and testimonials.

### 🛒 Products Page

Displays products fetched from **FakeStore API**, with skeleton loading states, error retries, and “Add to Cart” button.

### 👤 Profile Page

Shows user profile details and order history.

### 🔐 Admin Page

Protected route accessible only to admins.

----------

## 🛠️ Tech Stack

-   ⚛️ [React 19](https://react.dev/) — UI library
    
-   ⚡ [Vite](https://vite.dev/) — Next-gen build tool
    
-   🎨 [Tailwind CSS](https://tailwindcss.com/) — Utility-first styling
    
-   🧩 [Shadcn/UI](https://ui.shadcn.com/) — Accessible, modern UI components
    
-   🖼️ [Lucide Icons](https://lucide.dev/) — Icon set for React
    
-   🔄 [Redux Toolkit](https://redux-toolkit.js.org/) — State management
    
-   ☁️ Deployment: [Vercel](https://vercel.com/), [Firebase](firebase.google.com/docs/), [Netlify](https://netlify.com)
    

----------

## 📂 Project Structure

```
E-Commerce-Dashboard/
│── public/               # Static assets
│── src/
|── store.js
│   ├── components/       # Shared UI components
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── Mode-Toggle.jsx
|   |   ├── Theme-Provider.jsx
│   │   └── ui/
|   |       ├── alert-dialog.jsx
|   |       ├── button.jsx
│   ├── pages/            # App pages
│   │   ├── HomePage.jsx
│   │   ├── ProductsPage.jsx
│   │   ├── CartPage.jsx
│   │   ├── ProfilePage.jsx
│   │   └── AdminPage.jsx
│   ├── slices/           # Redux slices (auth, cart, etc.)
│   ├── App.jsx           # Routes
│   └── main.jsx          # React entry point
│── package.json
│── vite.config.js
│── README.md
```




----------

## ⚙️ Installation & Setup  
### Clone the project repository to your local machine:

```bash
git clone https://github.com/Talha-Tahir2001/E-Commerce-Dashboard
```
### Navigate to Project
```bash
cd E-Commerce-Dashboard
```
### Install dependencies
```bash
npm install
```
### Run the development server:
```bash
npm run dev
```
### Build the project:
```bash
npm run build
```
### Preview the production build:
```bash
npm run preview
```
This will run the application at `http://localhost:5173/`. 

----------

## 🚀Deployment 
### Firebase Hosting
```bash
npm install -g firebase-tools
firebase login
firebase init
npm run build 
firebase deploy
```
### Vercel
```bash
Push your Code to Github
Go to [Vercel](https://vercel.com/) and create your account
Just connect your github account with vercel
Import a project and hit Deploy
```
### Netlify
```bash
Push your code to GitHub
Go to [Netlify](https://netlify.com) and import your repository
Set the build command: `npm run build`
Set the publish directory: `dist/you-directory`
Click **Deploy**
```

----------

## 📖 Usage

1.  Visit the **Home Page** → Explore categories & popular products
    
2.  Go to **Products Page** → Browse items
    
3.  Add products to **Cart** and checkout
    
4.  View orders & details in **Profile Page**
    
5.  Access **Admin Page** if logged in as admin
    

----------

## 📌 Roadmap

This roadmap outlines the planned development milestones for the project.  
You can track progress here — checked boxes represent completed tasks.  

---
### 🚀 Phase 1: Setup

-   [X] Initialize project with **Vite + React**
    
-  [X] Configure ESLint & Prettier
    
-  [X] Setup Redux Toolkit
    
-  [ ] Add TypeScript support
    
---

### 🎨 Phase 2: UI & Styling

-  [X] Integrate **Tailwind CSS**
    
-  [X] Add **Shadcn UI** components
    
-  [X] Add **dark/light mode toggle**
    
---

### 🛠️ Phase 3: Features

- [X]  Products page (API + Skeleton loading)
    
-  [X] Cart & Checkout
    
-  [X] Profile & Order history
    
- [ ]  Wishlist & Favorites
    
-  [X] Search & Filters
    
---

### 🔐 Phase 4: Advanced Features

- [ ]  JWT/Firebase Authentication
    
- [ ]  Admin panel with CRUD for products
    
-  [ ] Real-time updates (WebSockets)
    
---

### 🌍 Phase 5: Deployment

- [X]  Deploy on Vercel / Netlify
    
-  [X] Setup CI/CD with GitHub Actions
    
- [ ]  Custom domain
    

----------

## 🤝 Contributing

Contributions are welcome! 🎉


### How to Contribute

1. **Fork the repository**
   - Click the "Fork" button on the top right of this page.
2. **Clone your forked repo**
   ```bash
   git clone https://github.com/Talha-Tahir2001/E-Commerce-Dashboard.git
   cd E-Commerce-Dashboard
   ```
3. **Create a new branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```
4. **Make your changes and commit**
   ```bash
   git commit -m "Add your message"
   ```
5. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```
6. **Open a pull request**
   ```bash
   Go to the original repo and click "Compare & pull request".
   ```

----------

## 📄 License

This project is open-source and available under the [MIT License](https://github.com/Talha-Tahir2001/E-Commerce-Dashboard/blob/main/LICENSE).

----------

## 👨‍💻 Author

**Talha Tahir**

-   GitHub: [@Talha-Tahir2001](https://github.com/Talha-Tahir2001)
    
-   LinkedIn: [Talha Tahir](https://www.linkedin.com/in/talha-tahir2001/)
