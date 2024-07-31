

### Note 

my git hub bakend repository url is :
 https://github.com/DaveedGangi/technoKartBackendDaveed.git

and Hoisting backend url is : https://technokartbackenddaveed.onrender.com
and hoisting frontend url is : https://technokartblogappdaveed.onrender.com
inside userData.db 
i have performed the following operations


### created a post table 
CREATE TABLE posts(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT,
  content TEXT,
  image BLOB,
  author_id INTEGER,
  STATUS TEXT CHECK(STATUS IN ('draft', 'published')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(author_id) REFERENCES users(id)
);

### login for users table
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT,
  PASSWORD TEXT,
  role TEXT CHECK(role IN ('admin', 'author', 'reader')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);




### login 

The `Login` component is part of a React application that handles user authentication and registration. This component allows users to log in or register with their credentials.

### Features

- **Login Form**: Allows existing users to log in using their username and password.
- **Registration Form**: Enables new users to register by providing a username, password, and role.
- **Role Selection**: Users can select a role (Admin, Author, or Reader) during registration.
- **Error Handling**: Displays appropriate error messages for login and registration failures.

### State Management

The component maintains the following state variables:
- `register`: A boolean flag to toggle between the login and registration forms.
- `username`, `password`: Credentials for logging in.
- `newUserName`, `newUserPassword`, `confirmPassword`: Information for user registration.
- `errorMessage`, `errorMessageRegister`: Error messages for login and registration.
- `selectedOptions`: The selected user role during registration.

### Methods

- **`registerUser`**: Switches the form to registration mode.
- **`loginUser`**: Switches the form to login mode.
- **`userName`**, **`userPassword`**: Updates login form state.
- **`submitLogin`**: Handles login form submission, sends a POST request to the server, and stores the JWT token in cookies and localStorage upon successful login.
- **`registerUserName`**, **`registerPassword`**, **`registerConfirmPassword`**: Updates registration form state.
- **`submitNewUserDetails`**: Handles registration form submission, sends a POST request to the server, and redirects to the home page upon successful registration.
- **`selectOption`**: Updates the selected user role in the registration form.

### Styling

The component's styling is defined in `index.css` and includes responsive design adjustments for mobile devices. It features a simple, clean layout with a focus on usability and accessibility.

Here’s a summary of the packages and their purpose:

react: Required for creating and managing React components.
js-cookie: Used for managing cookies, particularly for storing the JWT token.


### Home



### Packages Used


1. **React**: Core library for building user interfaces. The `Component` class from React is used to create the `Home` class component.

2. **React-Bootstrap**: A library that provides Bootstrap components as React components. In your code:
   - `Offcanvas` is used for creating off-canvas sidebars.
   - You are using Bootstrap classes for styling (e.g., `btn`, `btn-primary`).

3. **React Icons**: A library for including various icons in your application. You are using:
   - `IoMenuOutline` from `react-icons/io5`
   - `GoSearch` from `react-icons/go`
   - `FaImage` from `react-icons/fa`
   - `RiDraftFill` from `react-icons/ri`
   - `MdPublishedWithChanges` from `react-icons/md`
   - `PiNotePencilBold` from `react-icons/pi`

4. **js-cookie**: A library for handling cookies. You are using it to get the JWT token from cookies.

5. **React Router DOM**: A library for routing in React applications. In your code:
   - `Redirect` is used to redirect users to the login page if they are not authenticated.
   - `Link` is used for navigation within the app.

### Concepts Used

1. **Component Lifecycle**:
   - `componentDidMount()`: Used to fetch posts and comments after the component mounts.

2. **State Management**:
   - The `state` object is used to manage various aspects of the component such as user information, post data, comments, and UI visibility.

3. **Asynchronous Operations**:
   - `fetchAllPosts`, `fetchAllComments`, and other methods use `fetch` to make HTTP requests to your backend API.

4. **Event Handling**:
   - Methods like `handleShow`, `handleClose`, `addItem`, and `userInputSearch` handle various user interactions such as opening the sidebar, adding posts, and searching.

5. **Conditional Rendering**:
   - Different parts of the UI are conditionally rendered based on the state, such as showing the sidebar, drafts, published posts, and edit forms.

6. **CRUD Operations**:
   - Methods for creating, reading, updating, and deleting posts and comments (`addingNewPost`, `deleteItem`, `updatePost`, `approveComment`, etc.).

7. **Form Handling**:
   - Methods for handling form inputs and updates (`titleInput`, `textareaInput`, `imageFileInput`, etc.).

8. **Authentication Check**:
   - Checks if a JWT token exists in cookies and redirects to the login page if not.

9. **Routing**:
   - `Redirect` and `Link` components manage navigation and redirection in the application.

10. **Styling and Layout**:
    - Inline styles and class-based styling are used for layout and presentation. Bootstrap and custom CSS styles are applied.

This setup involves a combination of React concepts, state management, asynchronous operations, and component-based design, with a focus on interacting with a backend API.


### profile 

### Overview

The `Profile` component provides a user profile page with functionalities for logging out and navigating back to the home page. Here’s a breakdown of the packages used and the concepts implemented in this component:

#### Packages Used

1. **React**:
   - `import {Component} from "react"`: Imports the `Component` class from the React library to create class-based components.
   - `import {Link, Redirect} from "react-router-dom"`: Imports `Link` for navigation and `Redirect` for redirecting users based on certain conditions.

2. **js-cookie**:
   - `import Cookies from "js-cookie"`: A utility to handle cookies. Here it is used to remove the authentication token when logging out.

3. **CSS**:
   - `import "./index.css"`: Imports the CSS file for styling the component.

#### Concepts Used

1. **Component-Based Architecture**:
   - The `Profile` component is a class-based component that extends `React.Component`. It handles the user profile UI and functionality.

2. **State Management**:
   - The component doesn't explicitly use state, but it does rely on local storage and cookies for managing user authentication and data.

3. **Routing**:
   - `Redirect` is used to navigate the user to the login page if the JWT token is not present, indicating that the user is not authenticated.
   - `Link` is used to navigate back to the home page from the profile page.

4. **Cookies**:
   - `Cookies.remove("jwtToken")`: Removes the JWT token from cookies, effectively logging the user out.
   - `localStorage.removeItem("user")`: Clears user data from local storage upon logout.

5. **Conditional Rendering**:
   - The component conditionally renders the profile UI or redirects to the login page based on the presence of the JWT token.

6. **Event Handling**:
   - `logoutUser` method: Handles user logout by clearing cookies and local storage, then redirecting to the login page.

7. **Styling**:
   - The component uses an external CSS file for styling (`index.css`), which likely contains styles for classes like `profile-container`, `home-profile-button`, and `user-logout-button`.

### Summary

The `Profile` component ensures that only authenticated users can access the profile page by checking for the presence of a JWT token. It allows users to log out, which clears authentication data and redirects them to the login page. It also provides navigation back to the home page via a link.

































































# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
