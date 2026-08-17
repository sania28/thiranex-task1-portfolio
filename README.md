# 👩‍💻 Sania Mujtaba — Full Stack Developer Portfolio

<p align="center">
  <strong>Personal Portfolio Website</strong>
</p>

<p align="center">
  A modern, responsive portfolio showcasing my skills, projects, education, and development experience.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5">
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript">
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React">
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js">
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js">
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB">
</p>

---

## 🌐 Portfolio

🚀 **Live Demo:** Coming Soon

🔗 **GitHub:**  
https://github.com/sania28

🔗 **LinkedIn:**  
https://www.linkedin.com/in/sania-mujtaba-20806a394

---

## 📌 About The Project

This is my personal Full Stack Developer portfolio website created to showcase my professional profile, technical skills, projects, education, and development experience.

The portfolio provides a clean and responsive interface that allows visitors to learn about my background, explore my projects, view my technical skills, and get in touch with me.

This project was developed as part of my **Full Stack Development Internship — Task 1 at Thiranex**.

---

## ✨ Features

- 👩‍💻 Professional developer profile
- 🎨 Modern and clean user interface
- 📱 Fully responsive design
- 🛠️ Technical skills section
- 🚀 Projects showcase
- 💼 Experience section
- 🎓 Education section
- 📧 Contact form
- 🔗 GitHub integration
- 🔗 LinkedIn integration
- 📄 Resume access
- 🗄️ MongoDB database integration
- ⚡ Node.js & Express backend
- 🔐 Environment variable based configuration

---

## 🛠️ Technologies Used

### Frontend

- HTML5
- CSS3
- JavaScript
- React
- TypeScript

### Backend

- Node.js
- Express.js

### Database

- MongoDB
- MongoDB Atlas
- Mongoose

### Development Tools

- Visual Studio Code
- Git
- GitHub
- npm

---

## 📂 Project Structure

```text
Thiranex_Task1_Sania_Mujtaba_Portfolio/
│
├── models/
│   ├── Contact.js
│   └── Project.js
│
├── routes/
│   ├── contactRoutes.js
│   └── projectRoutes.js
│
├── public/
│   ├── images/
│   ├── css/
│   └── js/
│
├── server.js
├── seed.js
├── package.json
├── package-lock.json
├── Procfile
├── render.yaml
├── .gitignore
└── .env.example
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- MongoDB local installation OR a MongoDB Atlas connection

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/sania28/thiranex-task1-portfolio.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create `.env` from `.env.example`:
   ```bash
   cp .env.example .env
   ```
4. Set `MONGODB_URI` in `.env` to your MongoDB connection string.
5. Seed the database:
   ```bash
   npm run seed
   ```
6. Start the development server:
   ```bash
   npm run dev
   ```
7. Open [http://localhost:5000](http://localhost:5000) in your browser.

---

## ☁️ Deploy to Render

### Option 1: Blueprint (render.yaml) — Recommended

1. Push this repository to GitHub.
2. Go to [render.com](https://render.com) and sign up / log in.
3. Click **New → Blueprint**.
4. Connect your GitHub repo. Render will detect `render.yaml` automatically.
5. When prompted, set the `MONGODB_URI` environment variable to your MongoDB Atlas connection string.
6. Click **Apply** — Render will build and deploy the app.

### Option 2: Manual Web Service

1. Push this repository to GitHub.
2. Go to [render.com](https://render.com) and sign up / log in.
3. Click **New → Web Service**.
4. Connect your GitHub repo.
5. Configure:
   - **Name:** `thiranex-task1-portfolio`
   - **Runtime:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Plan:** Free
6. Add environment variables:
   - `MONGODB_URI` = your MongoDB Atlas connection string
   - `NODE_ENV` = `production`
7. Click **Create Web Service**.
8. Once deployed, open the provided URL (e.g. `https://thiranex-task1-portfolio.onrender.com`).

### Important Notes for Render

- The `.env` file is **not** committed to git (it's in `.gitignore`), so you **must** set `MONGODB_URI` in Render's environment variables.
- The server binds to `0.0.0.0` so Render can route traffic to it.
- After deployment, seed the database once by running `npm run seed` locally (or via a one-off script in Render's shell).

---

## 📧 Email Notifications for Contact Form

When someone submits the contact form, you'll receive an email notification. To set this up:

### 1. Create a Gmail App Password

1. Go to [myaccount.google.com](https://myaccount.google.com) and sign in with the Gmail account you want to send from.
2. Go to **Security** → **2-Step Verification** → enable it (required for app passwords).
3. Go to **Security** → **App passwords**.
4. Select **Mail** as the app and **Other** as the device, then click **Generate**.
5. Copy the 16-character app password (e.g., `abcd efgh ijkl mnop`).

### 2. Set environment variables

In your `.env` file (locally) and in Render's **Environment** tab:
- `EMAIL_USER` = the Gmail address that sends the notification (e.g., `saniamujtaba778@gmail.com`)
- `EMAIL_PASS` = the 16-character app password (with or without spaces)
- `EMAIL_TO` = the email where you receive messages (e.g., `saniamujtaba778@gmail.com`)

> **Note:** `EMAIL_PASS` is an **App Password**, NOT your regular Gmail password. Your regular password will not work.

---

## 📝 Before Submission

- Replace the placeholder GitHub/LinkedIn links in `public/index.html`.
- Replace the sample project links in `seed.js`.
- Add your real project descriptions.
- Take screenshots of the working website and keep the GitHub repository public if required by the internship.

---

## 🗺️ Task Mapping

| Layer | Technology |
|-------|-----------|
| Frontend | HTML/CSS/JavaScript |
| Backend | Node.js + Express |
| Database | MongoDB |
| Integration | REST API + contact form persistence |
| Deployment | Render (render.yaml blueprint included) |

---

## 📄 License

This project is created for the **Thiranex Full Stack Development Internship — Task 1**.