$(document).ready(function() {  
        
    $(document).on("click", ".editarModalUsuario", function(){		            
       fila = $(this).closest("tr");	        
       id = fila.find('td:eq(0)').text();
       nombre = fila.find('td:eq(1)').text();
       apellidop = fila.find('td:eq(2)').text();
       apellidom = fila.find('td:eq(3)').text();
       nomusuario = fila.find('td:eq(4)').text();
       password = fila.find('td:eq(5)').text();
       rol = fila.find('td:eq(6)').text();
       $("#ideditar").val(id);
       $("#nombreeditar").val(nombre);
       $("#apellidopeditar").val(apellidop);
       $("#apellidomeditar").val(apellidom);
       $("#nusuarioeditar").val(nomusuario);
       $("#passwordeditar").val(password);
       $("#roleditar").val(rol);
       $("#ideditar").prop( "disabled", true );
       $('#editarModalUsuario').modal('show');	
    });
    $(document).on("click", ".deleteItemUsuario", function(){

            fila = $(this).closest("tr");	        
            id = fila.find('td:eq(0)').text();
            usuario = fila.find('td:eq(4)').text();
           Swal.fire({
            title: '¿Desea eliminar el usuario'+' '+usuario+' con el ID'+' '+id+'?',
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: 'SI',
            denyButtonText: `NO`,
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                //Swal.fire('Saved!', '', 'success')
                window.location.replace("/controlenvases/deleteuser/"+id);
            } else if (result.isDenied) {
                Swal.fire('Cambios no realizados', '', 'info')
            }
        })
    
    });


});
