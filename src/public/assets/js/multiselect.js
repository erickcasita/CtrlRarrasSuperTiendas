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

     
        if ($('#cantidad').val() === '' || Number($('#cantidad').val()) <=0 ) {
            Swal.fire(
                'Atención!',
                'Ingrese una cantidad',
                'info'
            )
        } else {
            let bandera;
            const values = {
                idproducto: $('#producto').val(),
                idtienda : $('#tienda').val()

            }
            $.ajax({
                method: 'POST',
                url: '/controlenvases/validatearticles',
                data: values,
                success: function(result){
                    if(!result){
                        console.log('No hay respuesta en el server');
                    } else {
                        bandera = result;
                        if (result == 'almacen') {
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
                                $('#tienda').prop('disabled', true);
                            }
                        }else{
                            Swal.fire(
                                'Atención!',
                                'El artículo: ' + $('#producto').val() + " No está en el almacen de la sucursal con el ID: "+$('#tienda').val() + ' Debe agregarlo como Inventario Inicial',
                                'info'
                            )
                        }
                    }
                }
            });
          
         
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
        var nFilas = $('#tbl-articulos  tr').length;
        if(nFilas <=2){
            $('#tienda').prop('disabled', false);
        }
        $(this).closest("tr").remove();
    });


});

