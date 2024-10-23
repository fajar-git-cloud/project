document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('adminLoginForm');
    const adminContent = document.getElementById('adminContent');
    const logoutButton = document.getElementById('logoutButton');

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        login(username, password);
    });

    logoutButton.addEventListener('click', function(e) {
        e.preventDefault();
        logout();
    });

    checkLoginStatus();
});

function login(username, password) {
    fetch('login.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            document.getElementById('loginForm').style.display = 'none';
            document.getElementById('adminContent').style.display = 'block';
            loadAdminData();
        } else {
            alert('Login gagal. Silakan coba lagi.');
        }
    });
}

function logout() {
    fetch('logout.php')
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            document.getElementById('loginForm').style.display = 'block';
            document.getElementById('adminContent').style.display = 'none';
        }
    });
}

function checkLoginStatus() {
    fetch('check_login.php')
    .then(response => response.json())
    .then(data => {
        if (data.loggedIn) {
            document.getElementById('loginForm').style.display = 'none';
            document.getElementById('adminContent').style.display = 'block';
            loadAdminData();
        }
    });
}

function loadAdminData() {
    // Load services, testimonials, and about content
    loadServices();
    loadTestimonials();
    loadAboutContent();
}

// ... (rest of the admin-panel.js code for managing services, testimonials, and about content)

function loadServices() {
    fetch('get_services.php')
        .then(response => response.json())
        .then(data => {
            const tbody = document.querySelector('#servicesTable tbody');
            tbody.innerHTML = '';
            data.forEach(service => {
                tbody.innerHTML += `
                    <tr>
                        <td>${service.title}</td>
                        <td>${service.description}</td>
                        <td>
                            <button class="btn btn-sm btn-warning" onclick="editService(${service.id})">Edit</button>
                            <button class="btn btn-sm btn-danger" onclick="deleteService(${service.id})">Hapus</button>
                        </td>
                    </tr>
                `;
            });
        });
}

function loadTestimonials() {
    fetch('get_testimonials.php')
        .then(response => response.json())
        .then(data => {
            const tbody = document.querySelector('#testimonialsTable tbody');
            tbody.innerHTML = '';
            data.forEach(testimonial => {
                tbody.innerHTML += `
                    <tr>
                        <td>${testimonial.name}</td>
                        <td>${testimonial.content}</td>
                        <td>
                            <button class="btn btn-sm btn-warning" onclick="editTestimonial(${testimonial.id})">Edit</button>
                            <button class="btn btn-sm btn-danger" onclick="deleteTestimonial(${testimonial.id})">Hapus</button>
                        </td>
                    </tr>
                `;
            });
        });
}

function loadAboutContent() {
    fetch('get_about.php')
        .then(response => response.json())
        .then(data => {
            document.getElementById('aboutContent').value = data.content;
        });
}

// ... (rest of the admin-panel.js code for managing services, testimonials, and about content)