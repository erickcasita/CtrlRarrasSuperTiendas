
const helpers = {};


helpers.checkrol = (val) => {

   let txt;
   if (val == 'ADMINISTRADOR') {
        txt = '<li><a href="/controlenvases/adduser"><i class="fas fa-user"></i>Alta de Usuarios</a></li> ';
   }
   
   return txt;
};

helpers.checkthrol = (val) => {

   let txt;
   if (val == 'ADMINISTRADOR') {
        txt = '<th></th>';
   }
   
   return txt;
};
helpers.checktdrol = (val) => {
   let txt;
   if (val == 'ADMINISTRADOR') {
      txt = '<a href="#" class="btn btn-outline-info btn-rounded editarModal"><i class="fas fa-pen"></i></a> <a href="#" class="btn btn-outline-danger btn-rounded deleteItem"><i class="fas fa-trash"></i></a>';
   }
   
   return txt;
};


module.exports = helpers;