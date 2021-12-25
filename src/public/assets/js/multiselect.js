
$(document).ready(function(){
    let tmp = ['o'];
    $('#tipomovimientosalida').hide();
    $('#lbltipomovimientosalida').hide();
    $('#movimiento').on('change', function (){
        if ($("#movimiento option:selected").text() == 'SALIDA') {
            $('#tipomovimientoentrada').hide();
            $('#tipomovimientoentrada').prop('disabled', true);
            $('#lbltipomovimientoentrada').hide();
            $('#tipomovimientosalida').show();
            $('#tipomovimientosalida').prop('disabled', false);
            $('#lbltipomovimientosalida').show();
        }else{
            $('#tipomovimientoentrada').show();
            $('#tipomovimientoentrada').prop('disabled', false);
            $('#lbltipomovimientoentrada').show();
            $('#tipomovimientosalida').hide();
            $('#tipomovimientosalida').prop('disabled', true);
            $('#lbltipomovimientosalida').hide();
        }
        
 });
 $(document).on("click", ".plus", function(){
   
    if($('#cantidad').val() === ''){
        Swal.fire(
            'Atención!',
            'Ingrese una cantidad',
            'info'
          )       
    }else{
        let cantidad = $('#cantidad').val();
        let idproducto = $('#producto').val();
        let producto =  $('#producto option:selected').text();
        let val = idproducto+"$"+cantidad;
        let txt = producto + " = "+cantidad;
        //$('.lista').append('<li class="list-group-item"  >'+txt+'<input type="hidden" name="Hola" value='+val +' / > <a href="#" class="btn btn-outline-danger btn-rounded  delete"><i class="fas fa-trash"></i></a></li>'); 
        $('.tbl-articulos').append('<tr><th scope="row">'+producto+'<input type="hidden" name="tabla" value='+val+' /></th><td>'+cantidad+'</td><td><a href="#" class="btn btn-outline-danger btn-rounded  delete"><i class="fas fa-trash"></i></a></td></tr>');  

    }
 
 });

 $(document).on("click", ".delete", function(event){
    event.preventDefault();
    $(this).closest("tr").remove();
});

function checkId (id) {
	let ids = document.querySelectorAll('.tbl-articulos th[for="producto"]');
    console.log(ids);
  return [].filter.call(ids, th => th.textContent === producto).length === 1;
}

})