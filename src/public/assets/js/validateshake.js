$(document).ready(function(){
    //código para validar si hay un registro vacio.

    $("#generar").click(function(){
        var nFilas = $("#tbl-articulos tr").length;

        if(nFilas <=1){
            Swal.fire(
                'Atención!',
                'No hay ningún artículo en la lista',
                'info'
            )
            return false;
        }
       
        $('#tienda').prop('disabled', false);
        $('#tipomovimientoentrada').prop('disabled', false);  
    });


}); 