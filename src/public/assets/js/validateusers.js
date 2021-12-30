$(document).ready(function(){

    $("#agregar").click(function(){
        let nombre = $('#nombre').val();
        let apellidop = $('#apellidop').val();
        let apellidom = $('#apellidom').val();
        let nusuario = $('#nusuario').val();
        let password = $('#password').val();

        if(nombre === '' || apellidop === '' || apellidom === '' || nusuario === '' || password === ''){
            Swal.fire(
                'Atención!',
                'No hay ningún artículo en la lista',
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
                'No hay ningún artículo en la lista',
                'info'
            )
            return false;
        }
        $("#ideditar").prop( "disabled", false);
    });

}); 