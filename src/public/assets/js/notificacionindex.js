$(document).ready(function () {
  $("#info").click(function () {
    Swal.fire({
      icon: 'info',
      title: '¿No tiene una cuenta activa?',
      text: 'Si aún no esta registrado o su usuario y/o contraseña se ha extraviado, favor de contactar al área de sistemas correspondiente',
      footer: '<a href="mailto:soportesistemas@coronalostuxtlas.com.mx">Enviar un correo</a>'
    })

  });
  //CONVIRTIENDO INPUTS EN LETRAS MAYUSCULAS

  $("#user").on("keypress", function () {
    $input = $(this);
    setTimeout(function () {
      $input.val($input.val().toUpperCase());
    }, 50);
   
  });

  $("#password").on("keypress", function () {
    $input = $(this);
    console.log($input);
    setTimeout(function () {
      $input.val($input.val().toUpperCase());

    }, 50);
  });


});