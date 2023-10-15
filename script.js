document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('login-form');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const loginButton = document.getElementById('login-button');
    const userInfo = document.getElementById('user-info');
    const accountName = document.getElementById('account-name');
    const logoutButton = document.getElementById('logout-button');

    // Check if the user is logged in (you can use Django Rest Auth tokens or sessions)
    const isLoggedIn = false; // You need to implement this logic

    if (isLoggedIn) {
        // User is already logged in
        userInfo.classList.remove('hidden');
        accountName.textContent = 'John Doe'; // Replace with the actual user's name
    } else {
        // Show the login form
        loginForm.classList.remove('hidden');

        // Handle login button click
        loginButton.addEventListener('click', function () {
            const username = usernameInput.value;
            const password = passwordInput.value;

            // Send a POST request to your Django server for login
            // Replace 'http://0.0.0.0:8000/api/v1/dj-rest-auth/login/' with the actual URL
            fetch('http://127.0.0.1:8000/api/v1/dj-rest-auth/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                }),
            })
                .then(response => response.json())
                .then(data => {
                    // Check if login was successful
                    if (data.key) {
                        // On successful login, hide the login form and show user info
                        loginForm.classList.add('hidden');
                        userInfo.classList.remove('hidden');
                        accountName.textContent = username; // Display the actual user's name
                    } else {
                        // Handle login error, e.g., display an error message
                        alert('Login failed. Please check your credentials.');
                    }
                })
                .catch(error => {
                    console.error('Login error:', error);
                });
        });

        // Handle logout button click
        logoutButton.addEventListener('click', function () {
            // Send a request to your Django server to log the user out
            // Implement this using fetch or another AJAX method
            // After successful logout, you can clear the session/token and show the login form again
            userInfo.classList.add('hidden');
            loginForm.classList.remove('hidden');
        });
    }
});
