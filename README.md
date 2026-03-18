# College Placement Preparation Portal

Enhanced MERN stack final year BCA project using MVC structure.

## Local Run
```bash
npm install
npm run install-all
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
npm run seed --prefix backend
npm run dev
```

For local development, set `backend/.env` with your MongoDB Atlas connection string before running the seed or the server.

Example Atlas URI format:
```bash
MONGO_URI=mongodb+srv://<db_username>:<db_password>@<cluster-url>/placement_portal?retryWrites=true&w=majority&appName=Cluster0
```

Atlas checklist:
- create a cluster
- create a database user
- allow your current IP address in Network Access
- replace the placeholder `MONGO_URI` in `backend/.env`
- keep the database name as `placement_portal` unless you also want to change your seed target

## Demo accounts
- Admin: admin@portal.com / admin123
- Student: student@portal.com / student123

## Deployment
### Backend on Render
- create a new Web Service
- root directory: `backend`
- build command: `npm install`
- start command: `npm start`
- add environment variables from `backend/.env.example`
- set `MONGO_URI` to the MongoDB Atlas URI for your production database

### Frontend on Vercel
- import the `frontend` folder as project
- set `VITE_API_URL` to your Render backend URL + `/api`
- add SPA rewrite using `vercel.json`

## Final cleanup in this step
- fixed `Companies.jsx` loading bug
- improved protected route redirects
- improved admin route redirects
- login now redirects by role
- register flow logs in new student automatically

## Suggested final submission
Use this zip as the cleanest project build among the generated versions.

# Collage-project
this is my collage project for last semester.
