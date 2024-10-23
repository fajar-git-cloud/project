document.addEventListener('DOMContentLoaded', function() {
    loadTestimonials();

    document.getElementById('testimonialForm').addEventListener('submit', function(e) {
        e.preventDefault();
        saveTestimonial();
    });
});

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

function saveTestimonial() {
    const id = document.getElementById('testimonialId').value;
    const name = document.getElementById('testimonialName').value;
    const content = document.getElementById('testimonialContent').value;
    const image = document.getElementById('testimonialImage').value;

    fetch('save_testimonial.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, name, content, image }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Testimonial berhasil disimpan!');
            document.getElementById('testimonialForm').reset();
            document.getElementById('testimonialId').value = '';
            loadTestimonials();
        } else {
            alert('Terjadi kesalahan saat menyimpan testimonial.');
        }
    });
}

function editTestimonial(id) {
    fetch(`get_testimonial.php?id=${id}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('testimonialId').value = data.id;
            document.getElementById('testimonialName').value = data.name;
            document.getElementById('testimonialContent').value = data.content;
            document.getElementById('testimonialImage').value = data.image;
        });
}

function deleteTestimonial(id) {
    if (confirm('Apakah Anda yakin ingin menghapus testimonial ini?')) {
        fetch(`delete_testimonial.php?id=${id}`, { method: 'DELETE' })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('Testimonial berhasil dihapus!');
                    loadTestimonials();
                } else {
                    alert('Terjadi kesalahan saat menghapus testimonial.');
                }
            });
    }
}