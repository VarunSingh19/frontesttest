const form = document.getElementById('account-form');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirm-password');
const showPassword = document.getElementById('show-password');
const submitButton = form.querySelector('button[type="submit"]');
const successMessage = document.getElementById('success-message');
const closeSuccess = document.getElementById('close-success');
const errorMessage = document.getElementById('error-message');
const errorText = document.getElementById('error-text');
const closeError = document.getElementById('close-error');
const requirements = {
    length: document.getElementById('req-length'),
    uppercase: document.getElementById('req-uppercase'),
    number: document.getElementById('req-number'),
    special: document.getElementById('req-special')
};

function updateRequirements() {
    const value = password.value;
    updateRequirement(requirements.length, value.length >= 8 && value.length <= 64);
    updateRequirement(requirements.uppercase, /(?=.*[a-z])(?=.*[A-Z])/.test(value));
    updateRequirement(requirements.number, /\d/.test(value));
    updateRequirement(requirements.special, /[^A-Za-z0-9]/.test(value));

    const allMet = Object.values(requirements).every(req => req.classList.contains('met'));
    const passwordsMatch = password.value === confirmPassword.value && password.value !== '';
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value);
    submitButton.disabled = !(allMet && passwordsMatch && emailValid);
}

function updateRequirement(element, isMet) {
    element.classList.toggle('met', isMet);
    const icon = element.querySelector('span');
    icon.textContent = isMet ? '✓' : '×';
    icon.className = isMet ? 'text-green-500 mr-2' : 'text-red-500 mr-2';
}

email.addEventListener('input', updateRequirements);
password.addEventListener('input', updateRequirements);
confirmPassword.addEventListener('input', updateRequirements);

showPassword.addEventListener('change', function () {
    const type = this.checked ? 'text' : 'password';
    password.type = type;
    confirmPassword.type = type;
});
const BACKEND_URL = "https://backendtest-8qmy.onrender.com";


form.addEventListener('submit', async function (e) {
    e.preventDefault();
    try {
        const response = await fetch(`${BACKEND_URL}/api/users/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email.value,
                password: password.value,
            }),
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem('token', data.token);
            successMessage.classList.remove('hidden');
            errorMessage.classList.add('hidden');
            form.reset();
        } else {
            throw new Error(data.message || 'Something went wrong');
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