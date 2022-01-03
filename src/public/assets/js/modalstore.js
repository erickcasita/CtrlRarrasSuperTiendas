$(document).ready(function() {  
        
    $(document).on("click", ".editarModal", function(){		  


       fila = $(this).closest("tr");	        
       id = fila.find('td:eq(0)').text();
       zona = fila.find('td:eq(1)').text();
       nomsucursal = fila.find('td:eq(2)').text();
       calle = fila.find('td:eq(3)').text();
       ext = fila.find('td:eq(4)').text();
       colonia = fila.find('td:eq(5)').text();
       localidad = fila.find('td:eq(6)').text();
       municipio = fila.find('td:eq(7)').text();    
       $("#idstore").val(id);
       $("#zonaeditar").val(zona);
       $("#nombretiendaeditar").val(nomsucursal);
       $("#calleeditar").val(calle);
       $("#numeroeditar").val(ext);
       $("#coloniaeditar").val(colonia);
       $("#localidadeditar").val(localidad);
       $("#municipioeditar").val(municipio);
       $("#idstore").prop( "disabled", true );
       $('#editstoreModal').modal('show');	
    });
    $(document).on("click", ".deleteItem", function(){

            fila = $(this).closest("tr");	        
            id = fila.find('td:eq(0)').text();
            nomsucursal = fila.find('td:eq(2)').text();
           Swal.fire({
            title: '¿Desea eliminar la tienda'+' '+nomsucursal+' con el ID'+' '+id+'?',
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: 'SI',
            denyButtonText: `NO`,
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                //Swal.fire('Saved!', '', 'success')
                window.location.replace("/controlenvases/deletestore/"+id);
            } else if (result.isDenied) {
                Swal.fire('Cambios no realizados', '', 'info')
            }
        })
    
    });


});