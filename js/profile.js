async function loadProfile() {
    const token = localStorage.getItem('token');
    const BACKEND_URL = "https://backendtest-8qmy.onrender.com";

    // Redirect to login if token doesn't exist
    if (!token) {
        window.location.href = 'login.html';
        return;
    }

    try {
        // Fetch user data from the backend
        const response = await fetch(`${BACKEND_URL}/api/users/profile`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await response.json();

        if (response.ok) {
            // Display user's email on the profile page
            document.getElementById('user-email').textContent = `Email: ${data.data.user.email}`;
        } else {
            // If unauthorized, clear token and redirect to login
            localStorage.removeItem('token');
            window.location.href = 'login.html';
        }
    } catch (error) {
        console.error('Error loading profile:', error);
        localStorage.removeItem('token');
        window.location.href = 'login.html';
    }
}

// Logout function to clear token and redirect to login
function logout() {
    localStorage.removeItem('token');
    window.location.href = 'login.html';
}

// Load profile when the page loads
window.onload = loadProfile;