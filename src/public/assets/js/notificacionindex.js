$("#info").click(function(){
    Swal.fire({
        icon: 'info',
        title: '¿No tiene una cuenta activa?',
        text: 'Si aún no esta registrado o su usuario y/o contraseña se ha extraviado, favor de contactar al área de sistemas correspondiente',
        footer: '<a href="mailto:soportesistemas@coronalostuxtlas.com.mx">Enviar un correo</a>'
      })

});