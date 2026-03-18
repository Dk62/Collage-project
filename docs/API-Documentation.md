# API Documentation

## Auth
- POST /api/auth/student/register
- POST /api/auth/student/login
- POST /api/auth/admin/login

## Users
- GET /api/users/profile
- PUT /api/users/profile

## Companies
- GET /api/companies
- GET /api/companies/:id
- POST /api/companies
- PUT /api/companies/:id
- DELETE /api/companies/:id

## Questions
- GET /api/questions
- GET /api/questions/:id
- POST /api/questions
- PUT /api/questions/:id
- DELETE /api/questions/:id

## Quizzes
- GET /api/quizzes
- GET /api/quizzes/:id
- POST /api/quizzes
- PUT /api/quizzes/:id
- DELETE /api/quizzes/:id
- POST /api/quizzes/:id/submit

## Results
- POST /api/results
- GET /api/results/my
- GET /api/results/stats/me

## Interviews
- POST /api/interviews
- GET /api/interviews/my
- PUT /api/interviews/:id
