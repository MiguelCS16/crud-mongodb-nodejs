const deleteButtons = document.querySelectorAll('.btnDelete');
const updateButtons = document.querySelectorAll('.btnUpdateRestaurant');

const confirmarBorrado = (restauranteId) => {
  Swal.fire({
    title: '¿Estás seguro?',
    text: "No podrás recuperar el restaurante borrado",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Borrar',
    cancelButtonText: 'Cancelar',
    dangerMode: true,
  }).then((result) => {
    if (result.isConfirmed) {
        window.location.href = `/deleteRestaurant/${restauranteId}`;
        Swal.fire('El restaurante ha sido borrado','', 'success');
    } else {
      Swal.fire('El restaurante no ha sido borrado');
    }
  });
};

const confirmarActualizacion = (restauranteId) => {
Swal.fire({
  title: '¿Estás seguro?',
  text: "Los datos del restaurante serán actualizados",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonText: 'Actualizar',
  cancelButtonText: 'Cancelar',
  dangerMode: true,
    }).then((result) => {
      if (result.isConfirmed) {
        // Realizar solicitud POST al servidor
        fetch(`/updateRestaurant`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ id: restauranteId })
        })
        .then((response) => {
          if (response.ok) {
            Swal.fire('El restaurante ha sido actualizado', '', 'success');
            window.location.href = '/restaurants';
          } else {
            Swal.fire('Hubo un error al actualizar el restaurante');
          }
        })
        .catch((error) => {
          Swal.fire('Hubo un error al actualizar el restaurante');
        });
      } else {
        Swal.fire('El restaurante no ha sido actualizado');
      }
    });
};
  
deleteButtons.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const restauranteId = btn.getAttribute('data-restaurant-id');
    confirmarBorrado(restauranteId);
  });
});

updateButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const restauranteId = btn.getAttribute('data-restaurant-id');
      confirmarActualizacion(restauranteId);
    });
});

document.querySelector('form').addEventListener('submit', (event) => {
    event.preventDefault();

    const clickedButton = event.submitter;
    
    if (clickedButton.classList.contains('search-button')) {
    event.target.submit();
    return;
}
  
Swal.fire({
    title: 'Guardar Restaurante',
    text: '¿Estás seguro de guardar el restaurante?',
    icon: 'info',
    showCancelButton: true,
    confirmButtonText: 'Guardar',
    cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
          const submitButton = document.querySelector('.btnSaveRestaurant');
          submitButton.disabled = true;

          Swal.fire('Restaurante agregado', 'El restaurante ha sido guardado correctamente', 'success');

          event.target.submit();
        } else {
      Swal.fire('Acción cancelada', 'El restaurante no ha sido guardado', 'info');
    }
  });
});