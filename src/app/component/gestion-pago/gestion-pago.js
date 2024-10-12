// INCIO MODAL REALIZAR PAGO

document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('modalRealizarPago');
    const openModalBtn = document.getElementById('modalRealizarPago');
    const closeModalBtns = document.querySelectorAll('.close-btn, #btnCancelar');

    // Función para cerrar el modal
    const cerrarModal = () => {
        modal.style.display = 'none';
    };

    // Abrir modal
    openModalBtn.addEventListener('click', (event) => {
        event.preventDefault();
        modal.style.display = 'flex'; // Usamos 'flex' para centrar el modal
    });

    // Cerrar modal al hacer clic en los botones de cierre
    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', cerrarModal);
    });

    // Cerrar modal si el usuario hace clic fuera del contenido modal
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            cerrarModal();
        }
    });
});

// FIN MODAL REALIZAR PAGO
