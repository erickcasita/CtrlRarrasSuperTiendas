$(document).ready(function(){
    $("#agregar").click(function(){
            let descripcion = $('#descripcion').val();
            if(descripcion === ''){
                Swal.fire(
                    'Atención!',
                    'Todos los datos son requeridos',
                    'info'
                )
                return false;
            }          
    });


    $("#editar").click(function(){
       
        let descripcion = $('#descripcioneditar').val();
        console.log(descripcion);
            if(descripcion === ''){
                Swal.fire(
                    'Atención!',
                    'Todos los datos son requeridos',
                    'info'
                )
               
                return false;
            }
            $("#ideditar").prop( "disabled", false );   
                
    });
});