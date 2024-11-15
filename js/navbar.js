const navbar = document.getElementById('navbar');

function renderNavbar() {
    const isAuthenticated = localStorage.getItem('token') !== null;

    navbar.innerHTML = `
        <nav class="flex flex-col md:flex-row items-center justify-between p-4 max-w-6xl mx-auto">
            <div class="flex items-center justify-between w-full md:w-auto mb-4 md:mb-0">
                <a href="index.html" class="text-2xl font-bold text-blue-600 flex items-center space-x-2">
                    <i class="fas fa-home"></i>
                    <span>AI Company</span>
                </a>
                <button id="mobileMenuBtn" class="md:hidden relative w-10 h-10 text-blue-600 focus:outline-none bg-white rounded-full">
                    <div class="absolute w-5 h-5 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <span class="absolute h-0.5 w-5 bg-current transform transition duration-500 ease-in-out -translate-y-1.5"></span>
                        <span class="absolute h-0.5 w-5 bg-current transform transition duration-500 ease-in-out"></span>
                        <span class="absolute h-0.5 w-5 bg-current transform transition duration-500 ease-in-out translate-y-1.5"></span>
                    </div>
                </button>
            </div>
            <div id="navLinks" class="hidden md:flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 items-center w-full md:w-auto">
                ${isAuthenticated ? `
                    <a href="#about" class="w-full md:w-auto text-center py-2 md:py-0">About</a>
                    <a href="#pricing" class="w-full md:w-auto text-center py-2 md:py-0">Pricing</a>
                    <a href="#demo" class="w-full md:w-auto text-center py-2 md:py-0">Demo</a>
                    <a href="#contact" class="w-full md:w-auto text-center py-2 md:py-0">Contact</a>
                    <a href="profile.html" class="w-full md:w-auto text-center py-2 md:py-0 text-lg hover:text-blue-500 transition">
                        <i class="fas fa-user-circle"></i> Profile
                    </a>
                    <button id="logoutBtn" class="w-full md:w-auto mt-2 md:mt-0 bg-blue-600 text-white px-4 py-2 rounded hover:bg-red-500 transition">
                        <i class="fas fa-sign-out-alt"></i> Logout
                    </button>
                ` : `
                    <a href="login.html" class="w-full md:w-auto text-center py-2 md:py-0 text-lg hover:text-blue-500 transition">
                        <i class="fas fa-sign-in-alt"></i> Login
                    </a>
                    <a href="signup.html" class="w-full md:w-auto text-center py-2 md:py-0 text-lg bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500 transition">
                        <i class="fas fa-user-plus"></i> Sign Up
                    </a>
                `}
            </div>
        </nav>
    `;

    if (isAuthenticated) {
        document.getElementById('logoutBtn').addEventListener('click', () => {
            localStorage.removeItem('token');
            renderNavbar();
        });
    }

    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');

    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('hidden');
        mobileMenuBtn.classList.toggle('open');
    });
}

renderNavbar();

// Re-render navbar on window resize
window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) { // 768px is the 'md' breakpoint in Tailwind
        document.getElementById('navLinks').classList.remove('hidden');
    } else {
        document.getElementById('navLinks').classList.add('hidden');
    }
});

// Add CSS for hamburger animation
const style = document.createElement('style');
style.textContent = `
    #mobileMenuBtn span {
        transform-origin: center;
    }
    #mobileMenuBtn.open span:nth-child(1) {
        transform: translateY(0.375rem) rotate(45deg);
    }
    #mobileMenuBtn.open span:nth-child(2) {
        opacity: 0;
    }
    #mobileMenuBtn.open span:nth-child(3) {
        transform: translateY(-0.375rem) rotate(-45deg);
    }
`;
document.head.appendChild(style);