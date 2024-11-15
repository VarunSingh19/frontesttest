const form = document.getElementById('login-form');
const email = document.getElementById('email');
const password = document.getElementById('password');
const showPassword = document.getElementById('show-password');
const successMessage = document.getElementById('success-message');
const closeSuccess = document.getElementById('close-success');
const errorMessage = document.getElementById('error-message');
const errorText = document.getElementById('error-text');
const closeError = document.getElementById('close-error');


showPassword.addEventListener('change', function () {
    password.type = this.checked ? 'text' : 'password';
});

const BACKEND_URL = "https://backendtest-8qmy.onrender.com";

form.addEventListener('submit', async function (e) {
    e.preventDefault();
    try {
        const response = await fetch(`${BACKEND_URL}/api/users/login`, {
            method: 'POST',
            headers: {
                // 'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email.value,
                password: password.value,
            }),
        });

        const data = await response.json();

        if (response.ok) {
            // Store the token in localStorage
            localStorage.setItem('token', data.token);
            successMessage.classList.remove('hidden');
            errorMessage.classList.add('hidden');
            // Delay redirection by 2 seconds (2000 milliseconds)
            setTimeout(() => {
                window.location.href = 'index.html'; // Redirect after 2 seconds
            }, 2000);
            form.reset();
        } else {
            throw new Error(data.message || 'Login failed');
        }
    } catch (error) {
        errorText.textContent = error.message;
        errorMessage.classList.remove('hidden');
        successMessage.classList.add('hidden');
    }
});


closeSuccess.addEventListener('click', function () {
    successMessage.classList.add('hidden');
});

closeError.addEventListener('click', function () {
    errorMessage.classList.add('hidden');
});