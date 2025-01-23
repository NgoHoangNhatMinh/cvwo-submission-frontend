# CVWO 2025 Assignment - [Forum](https://cvwoforum.netlify.app/)

## About This Project

This project is an assignment for NUS Computing for Voluntary Welfare Organisations (CVWO) for 2025.

- Name: Ngo Hoang Nhat Minh
- [Final Writeup](https://www.overleaf.com/project/677e8854889d2d77a85bbdb1)
- [Heroku Link](https://cvwoforum.netlify.app/)

## Local Installation
This is the directory for the frontend of the forum. To start the backend, clone the repo at [Forum Backend](https://github.com/NgoHoangNhatMinh/cvwo-submission) and follow the instructions to run the app locally.

1. You need the following prerequisites:
   - [Node.js 22.13.1](https://nodejs.org/en/download)

2. Clone the repo:
   ```console
   $ git clone https://github.com/NgoHoangNhatMinh/cvwo-submission-frontend.git
   ```

3. Installing dependencies:
   ```console
   $ npm install
   ```

4. Start the Vite server:
   ```console
   $ npm run dev
   ```

5. Open the web application from the link `localhost:5173`

## User Manual
### Getting Started
- Access the Forum: Open the forum here. If a “Network Error” appears, wait a minute
for the backend server to start and retry.
### Account Management
- Sign Up:
   1. Click “Sign Up” (top-right corner).
   2. Enter your email, username, and password.
   3. If the email is already in use, try a different one.
   4. Successful sign-up redirects you to the homepage.

- Log In:
   1. Click “Log In” (top-right corner).
   2. Enter your email/username and password, then click “Log In.”

- Log Out:
   1. Click the profile icon (top-right corner).
   2. Select “Log Out.”
### Navigation
- Navigation Bar (at the top of the page):

   - Logo (top-left): Redirects to the homepage.

   - Search Bar: Enter keywords to search posts. Filter categories using the dropdown
   menu.

   - Profile & Settings: Toggle light/dark mode, view/create a profile, or access
   settings.
### Profile Management
- View Profile:
   1. Click the profile icon (top-right corner).
   2. Select “Profile” to see your posts and comments.

- Edit Profile:
   1. Click the profile icon and select “Settings.”
   2. Update your username or upload an avatar, then click “Update.”
### Homepage
- View Posts: Click the logo (top-left) to go to the homepage, where posts are listed.

- Sort Posts: Use the “Sort By” option to order posts by newest or oldest.

- View Post: Click on a post to view its details.
### Posts
- Create Post:
   1. Click “+ CREATE” (top-right, when logged in).
   2. Fill in the topic, content, and category, then click “Submit.”
   3. A pop-up confirms successful post creation.

- Edit/Delete Post:
   1. Navigate to your post.
   2. Select “Edit” to update or “Delete” to remove the post.
### Comments
- View Comments: Comments and their authors appear under each post.

- Create Comment: Type in the comment box under a post and press “Comment.”

- Edit/Delete Comment: Navigate to your comment and select “Edit” or “Delete.”