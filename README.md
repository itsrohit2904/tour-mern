
# Tour Management App

This is a full-stack web application for managing tours. It allows users to create, update, view, and delete tours. The application is built using React for the front end and connects to a backend API for data storage.
This app allows users to manage their tours. The main features include:

- Creating new tours
- Viewing and searching existing tours
- Updating and deleting tours
- Authentication for logging in and registering users
- CreateTourForm Component
The CreateTourForm component is used to allow the user to create or update a tour. The form accepts details about the tour, such as:



## Features

- Create New Tour: The user can fill in a form with tour details and submit to create a new tour.
- Update Existing Tour: If the user is editing an existing tour, the form is pre-populated with the current tour data, allowing for updates.
- Form Validation: Ensures that all fields are filled before submitting the form.
- User Authentication: Users can log in and register to manage their tours.
- Loading State: A spinner is shown while the form is loading or submitting the data.
- Success and Error Toasts: Toast notifications are used to display feedback for successful or failed operations.





## Installation

1. Clone the repository:

```bash
  git clone https://github.com/your-username/tour-management-app.git

```
2. Install the dependencies:
```bash
  npm install

```
3. Start the development server:
```bash
  npm start
```
The app will run at http://localhost:3000.




# Usage
1. Login / Signup:

- When you visit the app, you'll be prompted to log in or sign up.
- You need to create an account to manage tours.

2. Create a New Tour:

- Once logged in, you can create a new tour by filling out the required fields in  the "Create Tour" form.

3. Update an Existing Tour:

- If you want to update an existing tour, click on the "Update" button next to the tour in the list. The form will be populated with the current data for that tour.

4. Delete a Tour:

- You can also delete a tour by clicking the "Delete" button next to the tour in the list.

5. Search for Tours:

- The app includes a search functionality, where users can search for tours based on the title.
##  Technologies Used

- Frontend: React, React Router, Axios, Bootstrap, React Toastify
- Backend: Node.js, Express (API for handling user and tour data)
