$(document).ready(function(){

    $("#nombre").on("keypress", function () {
        $input = $(this);
        setTimeout(function () {
          $input.val($input.val().toUpperCase());
        }, 50);
        
      });
      $("#apellidop").on("keypress", function () {
        $input = $(this);
        setTimeout(function () {
          $input.val($input.val().toUpperCase());
        }, 50);
        
      });
      $("#apellidom").on("keypress", function () {
        $input = $(this);
        setTimeout(function () {
          $input.val($input.val().toUpperCase());
        }, 50);
        
      });
      $("#nusuario").on("keypress", function () {
        $input = $(this);
        setTimeout(function () {
          $input.val($input.val().toUpperCase());
        }, 50);
        
      });
      $("#password").on("keypress", function () {
        $input = $(this);
        setTimeout(function () {
          $input.val($input.val().toUpperCase());
        }, 50);
        
      });
      $("#nombreeditar").on("keypress", function () {
        $input = $(this);
        setTimeout(function () {
          $input.val($input.val().toUpperCase());
        }, 50);
        
      });
      $("#apellidopeditar").on("keypress", function () {
        $input = $(this);
        setTimeout(function () {
          $input.val($input.val().toUpperCase());
        }, 50);
        
      });
      $("#apellidomeditar").on("keypress", function () {
        $input = $(this);
        setTimeout(function () {
          $input.val($input.val().toUpperCase());
        }, 50);
        
      });
      $("#nusuarioeditar").on("keypress", function () {
        $input = $(this);
        setTimeout(function () {
          $input.val($input.val().toUpperCase());
        }, 50);
        
      });
      $("#passwordeditar").on("keypress", function () {
        $input = $(this);
        setTimeout(function () {
          $input.val($input.val().toUpperCase());
        }, 50);
        
      });
    $("#agregar").click(function(){
        let nombre = $('#nombre').val();
        let apellidop = $('#apellidop').val();
        let apellidom = $('#apellidom').val();
        let nusuario = $('#nusuario').val();
        let password = $('#password').val();

        if(nombre === '' || apellidop === '' || apellidom === '' || nusuario === '' || password === ''){
            Swal.fire(
                'Atención!',
                'Todos los campos son requeridos',
                'info'
            )
            return false;
        }
    });
    $("#editar").click(function(){
        let nombreeditar = $('#nombreeditar').val();
        let apellidopeditar = $('#apellidopeditar').val();
        let apellidomeditar = $('#apellidomeditar').val();
        let nusuarioeditar = $('#nusuarioeditar').val();
        let passwordeditar = $('#passwordeditar').val();

        if(nombreeditar === '' || apellidopeditar === '' || apellidomeditar === '' || nusuarioeditar === '' || passwordeditar === ''){
            Swal.fire(
                'Atención!',
                'Todos los campos son requeridos',
                'info'
            )
            return false;
        }
        $("#ideditar").prop( "disabled", false );
    });

}); 