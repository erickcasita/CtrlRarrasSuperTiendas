$(document).ready(function(){
    //código para validar si hay un registro vacio.

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