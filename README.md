# 🚀 Pranshul Threja - MERN Stack Personal Portfolio

> A production-ready, visually stunning personal portfolio built with **MERN Stack** (MongoDB, Express, React, Node.js) + **React Three Fiber** for 3D graphics. Dark cyberpunk/tech noir theme with smooth animations and interactive features.

## 📋 Features

✨ **Frontend**
- ⚡ **React 18** with **Vite** for blazing-fast development
- 🎨 **Custom cyberpunk theme** with cyan/violet gradients
- 🎯 **Smooth animations** using Framer Motion
- 🌐 **3D graphics** with React Three Fiber (Torus Knot, particle effects)
- 📱 **Fully responsive** design (mobile, tablet, desktop)
- ⌨️ **Custom cursor** with hover effects
- 💨 **Loading screen** with glitch animation
- 🎬 **Scroll animations** and progress bar
- 📊 **Stats counters** with CountUp animations
- 🔍 **SEO optimized** with meta tags

🔧 **Backend**
- 🚀 **Node.js + Express** REST API
- 💾 **MongoDB** for data persistence
- 📧 **Nodemailer** for automated emails
- 📊 **Google Sheets** API integration
- 🛡️ **Rate limiting** to prevent spam
- ✅ **Form validation** with express-validator
- 🔐 **CORS configured** for security

## 📁 Project Structure

```
pranshul-portfolio/
├── frontend/                          
│   ├── public/
│   │   ├── Pranshul_Resume.pdf       
│   │   └── assets/
│   │       ├── profile/              
│   │       └── achievements/         
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Experience.jsx
│   │   │   ├── TechStack.jsx
│   │   │   ├── Projects.jsx
│   │   │   ├── Education.jsx
│   │   │   ├── Certifications.jsx
│   │   │   ├── Achievements.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Loader.jsx
│   │   │   ├── CustomCursor.jsx
│   │   │   └── 3D/
│   │   │       ├── HeroCanvas.jsx
│   │   │       └── ParticleField.jsx
│   │   ├── constants/
│   │   │   └── data.js               
│   │   ├── hooks/
│   │   │   └── useScrollReveal.js
│   │   ├── styles/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── backend/                           
│   ├── controllers/
│   │   └── contactController.js
│   ├── models/
│   │   └── Contact.js
│   ├── routes/
│   │   └── contactRoutes.js
│   ├── utils/
│   │   ├── sendEmail.js             
│   │   └── appendToSheet.js         
│   ├── server.js
│   ├── .env
│   ├── .env.example
│   └── package.json
│
└── README.md
```

## 🛠️ Installation & Setup

### Prerequisites
- **Node.js** (v16+) and **npm** (v8+)
- **MongoDB** Atlas account (free tier)
- **Gmail** account with App Password enabled
- **Google Cloud** Project with Sheets API enabled (optional)

### 1️⃣ Clone Repository

```bash
git clone https://github.com/PranshulCSE/portfolio.git
cd pranshul-portfolio
```

### 2️⃣ Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file (use .env.example as template)
cp .env.example .env

# Edit .env with your credentials
nano .env
# OR edit in your editor of choice
```

**Configure `.env` file:**

```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio
FRONTEND_URL=http://localhost:5173

# Gmail Configuration
EMAIL_USER=threjapranshul@gmail.com
EMAIL_PASS=your_16_character_app_password
OWNER_EMAIL=threjapranshul@gmail.com

# Google Sheets (Optional)
GOOGLE_SHEET_ID=your_sheet_id
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"

NODE_ENV=development
```

**Start backend server:**

```bash
npm start
# Server runs at http://localhost:5000
```

### 3️⃣ Frontend Setup

```bash
cd ../frontend

# Install dependencies
npm install

# Place your resume PDF here
# Copy your resume to: frontend/public/Pranshul_Resume.pdf

# Place profile photo here
# Copy photo to: frontend/public/assets/profile/profile.jpg

# Place achievement images here
# Copy images to: frontend/public/assets/achievements/

# Start development server
npm run dev
# Frontend runs at http://localhost:5173
```

### 4️⃣ Build for Production

```bash
# Frontend build
cd frontend
npm run build
# Creates optimized build in dist/

# Backend is ready as-is (no build step needed)
```

## 🔧 Configuration

### Gmail App Password Setup

1. Enable 2-Step Verification on your Google Account
2. Go to [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
3. Select "Mail" and "Windows Computer"
4. Copy the 16-character password to `.env` as `EMAIL_PASS`

### MongoDB Setup

1. Create a free cluster at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a database user with username and password
3. Whitelist your IP address
4. Copy connection string to `.env` as `MONGODB_URI`

### Google Sheets Integration (Optional)

1. Create a Google Cloud Project
2. Enable Google Sheets API
3. Create a Service Account and download JSON key
4. Share the spreadsheet with the service account email
5. Add credentials to `.env`

## 📊 Data Management

All portfolio data is centralized in `/frontend/src/constants/data.js`:

```javascript
export const portfolioData = {
  personal: { ... },
  socials: { ... },
  about: { ... },
  experience: [ ... ],
  skills: { ... },
  projects: [ ... ],
  education: [ ... ],
  certifications: [ ... ],
  achievements: [ ... ]
};
```

**To update content:**
1. Edit `data.js`
2. Changes reflect immediately in development mode
3. Data flows to all components automatically

## 🎨 Customization

### Theme Colors

Edit CSS variables in `/frontend/src/index.css`:

```css
:root {
  --cyan: #00d4ff;           /* Primary accent */
  --violet: #7b2ff7;         /* Secondary accent */
  --coral: #ff6b6b;          /* Highlights */
  --gold: #f5a623;           /* Certifications */
  /* ... more colors ... */
}
```

### Fonts

All fonts are imported from Google Fonts in `index.html`:
- **Orbitron** - Display/Logo
- **Syne** - Headings
- **DM Sans** - Body text
- **JetBrains Mono** - Code/Tags

## 📱 Browser Support

- ✅ Chrome/Chromium (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🚀 Deployment

### Deploy Frontend (Vercel/Netlify)

**Vercel:**
```bash
cd frontend
npm install -g vercel
vercel
# Follow prompts, set VITE_API_URL for production
```

**Netlify:**
```bash
cd frontend
npm run build
# Drag dist/ folder to Netlify
```

### Deploy Backend (Render/Railway)

1. Push to GitHub
2. Connect to Render/Railway
3. Set environment variables in dashboard
4. Deploy automatically from main branch

## 📧 Contact Form Flow

```
User fills form
    ↓
Frontend validation
    ↓
POST to /api/contact
    ↓
Backend validation
    ↓
Save to MongoDB
    ↓
Send thank-you email ← Gmail SMTP
    ↓
Send notification email → Owner
    ↓
Append to Google Sheets (optional)
    ↓
Return success response
    ↓
Show success toast
```

## 🛡️ Security Features

- ✅ **CORS** configured for frontend origin only
- ✅ **Rate limiting** on contact form (10 requests/15 min)
- ✅ **Input validation** with express-validator
- ✅ **Email validation** for contact submissions
- ✅ **Password protection** via App Passwords (not real passwords)
- ✅ **Environment variables** for sensitive data
- ✅ **MongoDB** connection with authentication

## 📈 Performance Optimization

- ⚡ **Vite** for fast builds and HMR
- 🎯 **Lazy loading** for components
- 🖼️ **Image optimization** with compression
- 💾 **Caching** strategies with sessionStorage
- 🔄 **Request debouncing** on scroll events
- 📦 **Tree shaking** in production build
- 🎨 **GPU-accelerated** animations with CSS transforms

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 💬 Contact & Social

- 📧 **Email:** threjapranshul@gmail.com
- 📱 **Phone:** +91 9992560407
- 🐙 **GitHub:** [PranshulCSE](https://github.com/PranshulCSE)
- 💼 **LinkedIn:** [Pranshul Threja](https://www.linkedin.com/in/pranshul-threja-4a278237a)
- 🎯 **LeetCode:** [Pranshul_Threja](https://leetcode.com/Pranshul_Threja)

## 📚 Technologies Used

### Frontend
- React 18, Vite, Framer Motion
- Three.js, React Three Fiber
- Tailwind CSS (alternative to custom CSS)
- Lucide React (icons)
- React Intersection Observer
- React Type Animation
- React Countup
- React Hot Toast

### Backend
- Node.js, Express.js
- MongoDB with Mongoose
- Nodemailer (Gmail SMTP)
- Google Sheets API
- Express Validator
- CORS, Rate Limit

## 🎯 Future Enhancements

- [ ] Dark/Light mode toggle
- [ ] Multi-language support
- [ ] Blog section with CMS
- [ ] Project filter with search
- [ ] Admin dashboard
- [ ] Analytics dashboard
- [ ] Social media embed
- [ ] Portfolio timeline interactive experience
- [ ] More 3D animations
- [ ] PWA support

## 🐛 Troubleshooting

**Issue: "Cannot find module"**
```bash
# Clear node_modules and reinstall
rm -rf node_modules
npm install
```

**Issue: "MongoDB connection failed"**
- Check MONGODB_URI in `.env`
- Verify IP whitelist in MongoDB Atlas
- Ensure credentials are correct

**Issue: "Email not sending"**
- Verify Gmail App Password (not regular password)
- Enable "Less secure app access" if needed
- Check spam folder

**Issue: "CORS error"**
- Verify FRONTEND_URL in backend `.env`
- Check that frontend is running on correct port
- Clear browser cache

## 📞 Support

For issues or questions:
1. Check the troubleshooting section above
2. Open an issue on GitHub
3. Contact via email: threjapranshul@gmail.com

---

**Made with ❤️ by Pranshul Threja | © 2026**

