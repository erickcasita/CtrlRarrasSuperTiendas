$(document).ready(function(){
    //código para validar si hay un registro vacio.
    
    //Convirtiendo a mayusculas
    $("#nombretienda").on("keypress", function () {
        $input = $(this);
        setTimeout(function () {
          $input.val($input.val().toUpperCase());
        }, 50);
      });
    $("#calle").on("keypress", function () {
        $input = $(this);
        setTimeout(function () {
          $input.val($input.val().toUpperCase());
        }, 50);
      });
      $("#numero").on("keypress", function () {
        $input = $(this);
        setTimeout(function () {
          $input.val($input.val().toUpperCase());
        }, 50);
        
      });
      $("#colonia").on("keypress", function () {
        $input = $(this);
        setTimeout(function () {
          $input.val($input.val().toUpperCase());
        }, 50);
        
      });

      $("#calleeditar").on("keypress", function () {
        $input = $(this);
        setTimeout(function () {
          $input.val($input.val().toUpperCase());
        }, 50);
      });
      $("#numeroeditar").on("keypress", function () {
        $input = $(this);
        setTimeout(function () {
          $input.val($input.val().toUpperCase());
        }, 50);
        
      });
      $("#coloniaeditar").on("keypress", function () {
        $input = $(this);
        setTimeout(function () {
          $input.val($input.val().toUpperCase());
        }, 50);
        
      });
      $("#nombretiendaeditar").on("keypress", function () {
        $input = $(this);
        setTimeout(function () {
          $input.val($input.val().toUpperCase());
        }, 50);
        
      });

    $("#agregar").click(function(){
        
        let nombretienda = $('#nombretienda').val();
        let calle = $('#calle').val();
        let numero = $('#numero').val();
        let colonia = $('#colonia').val();

        if(nombretienda === '' || calle === '' || numero === '' || colonia === ''){
            Swal.fire(
                'Atención!',
                'Todos los datos son requeridos',
                'info'
            )
            return false;
        }

       

    });
    
    $("#editar").click(function(){
        
        let nombretienda = $('#nombretiendaeditar').val();
        let calle = $('#calleeditar').val();
        let numero = $('#numeroeditar').val();
        let colonia = $('#coloniaeditar').val();

        if(nombretienda === '' || calle === '' || numero === '' || colonia === ''){
            Swal.fire(
                'Atención!',
                'Todos los datos son requeridos',
                'info'
            )
            return false;   
        }else{
            $("#idstore").prop( "disabled", false );
        }
        

    });
}); 