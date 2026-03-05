<<<<<<< HEAD
# MERN Beauty Booking App

## troubleshooting

### 1. "Connect ECONNREFUSED 127.0.0.1:27017" Error
This error means **MongoDB is not running**.
- Open a new terminal window.
- Type `mongod` and press Enter.
- If command not found, you need to install MongoDB Community Server from [mongodb.com](https://www.mongodb.com/try/download/community).
- Keep that terminal window open while running the app.

### 2. CSS Not Working / Weird Styles
If the page looks unstyled:
- We fixed a configuration issue (added `postcss.config.js`).
- Stop the current `npm run dev` (Ctrl+C).
- Run `npm run dev` again.

### 3. How to Run
1. Make sure MongoDB is running.
2. Open terminal in `mern-beauty-booking` folder.
3. Run:
   ```bash
   npm run dev
   ```
4. Open browser to `http://localhost:5173`

### 4. Admin Access
- URL: `http://localhost:5173/admin`
- Email: `admin@bellabeauty.com`
- Password: `admin123`
=======
# Sims
>>>>>>> 96efec1606f47639a1668e9174c7f9d4a5531d08
