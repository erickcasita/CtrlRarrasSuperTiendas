$(document).ready(function() {  
        
    $(document).on("click", ".editarModal", function(){		            
       fila = $(this).closest("tr");	        
       id = fila.find('td:eq(0)').text();
       tproducto = fila.find('td:eq(1)').text();
       tenvace = fila.find('td:eq(2)').text();
       descripcion = fila.find('td:eq(3)').text();
       $("#tipoarticuloeditar").val(tproducto);
       $("#tipoenvaseeditar").val(tenvace);
       $("#descripcioneditar").val(descripcion);
       $("#ideditar").val(id);
       $("#ideditar").prop( "disabled", true );
       $('#editModal').modal('show');	
    });
    $(document).on("click", ".deleteItem", function(){

            fila = $(this).closest("tr");	        
            id = fila.find('td:eq(0)').text();
            descripcion = fila.find('td:eq(3)').text();
           Swal.fire({
            title: '¿Desea eliminar el producto'+' '+descripcion+' con el ID'+' '+id+'?',
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: 'SI',
            denyButtonText: `NO`,
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                //Swal.fire('Saved!', '', 'success')
                window.location.replace("/controlenvases/deletearticle/"+id);
            } else if (result.isDenied) {
                Swal.fire('Cambios no realizados', '', 'info')
            }
        })
    
    });


});