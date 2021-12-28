
$(document).ready(function () {
    //Funcion para ocultar los select segun el movimiento ENTRADA | SALIDA
    $('#tipomovimientosalida').hide();
    $('#lbltipomovimientosalida').hide();
    $('#movimiento').on('change', function () {
        if ($("#movimiento option:selected").text() == 'SALIDA') {
            $('#tipomovimientoentrada').hide();
            $('#tipomovimientoentrada').prop('disabled', true);
            $('#lbltipomovimientoentrada').hide();
            $('#tipomovimientosalida').show();
            $('#tipomovimientosalida').prop('disabled', false);
            $('#lbltipomovimientosalida').show();
        } else {
            $('#tipomovimientoentrada').show();
            $('#tipomovimientoentrada').prop('disabled', false);
            $('#lbltipomovimientoentrada').show();
            $('#tipomovimientosalida').hide();
            $('#tipomovimientosalida').prop('disabled', true);
            $('#lbltipomovimientosalida').hide();
        }

    });
    //Funcion para agregar un elemento
    $(document).on("click", ".plus", function () {


        if ($('#cantidad').val() === '' || $('#cantidad').val() === '0') {
            Swal.fire(
                'Atención!',
                'Ingrese una cantidad',
                'info'
            )
        } else {
            let cantidad = $('#cantidad').val();
            let idproducto = $('#producto').val();
            let producto = $('#producto option:selected').text();
            let val = idproducto + "$" + cantidad;
            let txt = producto + " = " + cantidad;


            //Validando row repetidos....

            if (checkId(producto)) {
                Swal.fire(
                    'Atención!',
                    'El artículo: ' + producto + " ya está en la lista",
                    'info'
                )
            } else {
                $('#tbl-articulos').append('<tr><td for="tbl" >' + producto + '<input type="hidden" name="tabla" value=' + val + ' /></td><td>' + cantidad + '</td><td><a href="#" class="btn btn-outline-danger btn-rounded  delete"><i class="fas fa-trash"></i></a></td></tr>');
            }
        }

    });
    //Funcion para validar si hay un articulo repetido
    function checkId(id) {
        let ids = document.querySelectorAll('#tbl-articulos td[for="tbl" ]');

        return [].filter.call(ids, td => td.textContent === id).length === 1;
    }
    //Funcion para eliminar un articulo
    $(document).on("click", ".delete", function (event) {
        event.preventDefault();
        $(this).closest("tr").remove();
    });

});