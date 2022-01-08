$(document).ready(function(){
    $("#descripcion").on("keypress", function () {
        $input = $(this);
        setTimeout(function () {
          $input.val($input.val().toUpperCase());
        }, 50);
        
      });
      $("#descripcioneditar").on("keypress", function () {
        $input = $(this);
        setTimeout(function () {
          $input.val($input.val().toUpperCase());
        }, 50);
        
      });
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