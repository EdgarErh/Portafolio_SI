document.addEventListener('DOMContentLoaded', () => {
    const dynamicBg = document.querySelector('.dynamic-background');
    const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+-=[]{}|;:,.<>?';
    const numberOfParticles = 300; // Puedes ajustar este número para más o menos partículas

    function createParticle() {
        const particle = document.createElement('span');
        particle.classList.add('particle');
        particle.textContent = characters[Math.floor(Math.random() * characters.length)];

        // Posición inicial aleatoria
        particle.style.left = `${Math.random() * 100}vw`;
        particle.style.top = `${Math.random() * 100}vh`;

        // Duración de la animación ligeramente aleatoria para que no todo pase al mismo tiempo
        particle.style.animationDuration = `${Math.random() * 8 + 5}s`; // entre 5 y 13 segundos
        
        // Retraso de la animación para que aparezcan en momentos diferentes
        particle.style.animationDelay = `${Math.random() * 10}s`; // hasta 10 segundos de retraso

        dynamicBg.appendChild(particle);

        // Opcional: Eliminar partículas después de su animación para evitar sobrecarga del DOM
        particle.addEventListener('animationend', () => {
            particle.remove();
            // Y crear una nueva para mantener el flujo constante
            createParticle();
        });
    }

    // Crear un número inicial de partículas
    for (let i = 0; i < numberOfParticles; i++) {
        createParticle();
    }
});

window.onscroll = function() {
    const header = document.querySelector("header");
    
    // Si bajamos más de 80px
    if (window.pageYOffset > 80) {
        header.classList.add("scrolled");
        header.style.padding = "15px 5%"; 
    } else {
        header.classList.remove("scrolled");
        header.style.padding = "30px 5%"; 
    }

};

document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const btn = document.getElementById('button-send');
    btn.innerText = 'ENVIANDO...';

    // Capturamos los valores reales del formulario
    const params = {
        user_name: document.getElementById('user_name').value,
        user_email: document.getElementById('user_email').value,
        message: document.getElementById('message').value
    };

    // Usamos tus IDs que ya probaste y funcionaron
    emailjs.send("service_u6go4bg", "template_qnoyf82", params)
    .then(function() {
        btn.innerText = 'MENSAJE ENVIADO';
        alert('¡Confirmación enviada! Revisa tu correo.');
        document.getElementById('contact-form').reset();
    }, function(error) {
        btn.innerText = 'ERROR';
        alert('Fallo en el envío: ' + JSON.stringify(error));
    });
});


