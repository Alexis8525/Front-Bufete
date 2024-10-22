// document.addEventListener('DOMContentLoaded', () => {
//     const modal = document.getElementById('modalRealizarPago');
//     const closeModalBtn = document.getElementById('closeModalBtn');
//     const btnCancelar = document.getElementById('btnCancelar');

//     // No necesitas abrir el modal manualmente, Bootstrap lo hace automáticamente
//     // Si necesitas alguna acción extra cuando se cierre el modal:
    
//     modal.addEventListener('hidden.bs.modal', () => {
//         console.log('Modal cerrado');
//         // Aquí puedes añadir más acciones después de que el modal se cierre
//     });

//     // No es necesario manejar el clic para cerrar manualmente si usas Bootstrap, 
//     // pero en caso de que quieras hacerlo con JavaScript:
//     if (closeModalBtn) {
//         closeModalBtn.addEventListener('click', () => {
//             const modalInstance = bootstrap.Modal.getInstance(modal); 
//             modalInstance.hide();
//         });
//     }

//     if (btnCancelar) {
//         btnCancelar.addEventListener('click', () => {
//             const modalInstance = bootstrap.Modal.getInstance(modal); 
//             modalInstance.hide();
//         });
//     }
// });
