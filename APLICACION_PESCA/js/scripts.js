
console.log('javascript funcionando');

document.addEventListener('DOMContentLoaded', function() {
    let formulario = document.getElementsByTagName('form');
    let dniInput = document.getElementById('input[name="dni');
    let telefonoInput = document.getElementById('jstelf');
    let emailInput = document.querySelector('input[name="email"]');

    formulario.addEventListener('submit', function(event) {
        let errores = [];

        if (!/^\d{1,8}[A-Za-z]$/.test(dniInput.value)) {
            errores.push('Por favor, introduce un DNI válido (8 números seguidos de una letra).');
        }

        if (!/^\d{9}$/.test(telefonoInput.value)) {
            errores.push('Por favor, introduce un teléfono válido (9 números).');
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) {
            errores.push('Por favor, introduce un email válido.');
        }

        if (errores.length > 0) {
            event.preventDefault();
            alert(errores.join('\n'));
        }
    });
});