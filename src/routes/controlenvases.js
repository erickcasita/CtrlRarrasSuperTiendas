const express = require('express');
const router = express.Router();
const { pool } = require('../database');
const { isLoggedIn,isNotUserAdmin } = require('../lib/auth');
const PdfPrinter = require("pdfmake");
const fs = require("fs");

router.get('/',isLoggedIn, async (req, res) => {
    const totalproductos = await pool.query('SELECT stock FROM almacen INNER JOIN productos ON almacen.idproducto = productos.idproducto WHERE almacen.idtienda = ? AND productos.tipoenvase = ? AND productos.tipoproducto = ?',['TD1','ENVASE VACIO','CERVEZA']);
    const totalproductosllenos = await pool.query('SELECT stock FROM almacen INNER JOIN productos ON almacen.idproducto = productos.idproducto WHERE almacen.idtienda = ? AND productos.tipoenvase = ? AND productos.tipoproducto = ?',['TD1','ENVASE LLENO','CERVEZA']);
   
    
    let contador,total,total_lleno,contador_lleno;
    contador = 0;
    contador_lleno = 0;


    
    //Calculando los envaces vacios de cervaza tienda vallarta

    totalproductos.forEach((row) => {

        total = row.stock;
        contador = contador+Number(total);

    });
     //Calculando los envaces llenos de cervaza tienda vallarta   
    totalproductosllenos.forEach((row) => {

        total_lleno = row.stock;
        contador_lleno = contador_lleno+Number(total_lleno);

    });

    res.render('controlenvases',{contador,contador_lleno});
});
router.get('/addstore',isLoggedIn, async (req, res) => {

    const stores = await pool.query('SELECT * FROM tiendas ORDER BY LENGTH(idtienda) ASC, idtienda ASC');
    res.render('controlenvases/addstore', { stores});
    
    
});
router.get('/addarticle',isLoggedIn, async (req, res) => {
    const articles = await pool.query('SELECT * FROM productos ORDER BY LENGTH(idproducto) ASC, idproducto ASC');
 
    res.render('controlenvases/addarticle', { articles });

    
    
});
router.get('/addshake',isLoggedIn, async (req, res) => {
    const products = await pool.query('SELECT * FROM productos ORDER BY LENGTH(idproducto) ASC, idproducto ASC');
    const stores = await pool.query('SELECT * FROM tiendas ORDER BY LENGTH(idtienda) ASC, idtienda ASC');
    res.render('controlenvases/addshake', { products, stores });
});

router.get('/adduser',isLoggedIn,isNotUserAdmin, async (req, res) => {

    const usuarios = await pool.query('SELECT *FROM usuarios');

    res.render('controlenvases/adduser',{usuarios});  
    
});

router.get('/reportstocks',isLoggedIn, async (req, res) => {
    const stores = await pool.query('SELECT * FROM tiendas ORDER BY LENGTH(idtienda) ASC, idtienda ASC');
    res.render('controlenvases/reportstocks',{stores});
});
router.get('/reportshake',isLoggedIn, async (req, res) => {
    const stores = await pool.query('SELECT * FROM tiendas ORDER BY LENGTH(idtienda) ASC, idtienda ASC');
    res.render('controlenvases/reportshake',{stores});
});

router.post('/newuser',isLoggedIn, async (req, res) => {

    const {nombre,apellidop,apellidom,nusuario,password,rol} = req.body;

    //Obteniendo los datos para el idusuarios
    const totalusuarios = await pool.query('SELECT COUNT(*) as totalusuarios FROM usuarios');
    let total, id
    totalusuarios.forEach((row) => {

        total = row.totalusuarios;

    });
    total = total + 1;
    total = total.toString();

    //Tratando el ID

    id = "USR"+total;
    const newuser = {
        id,
        nombre: nombre,
        apellidop: apellidop,
        apellidom: apellidom,
        nomusuario: nusuario,
        password: password,
        rol: rol
    }
    await pool.query('INSERT INTO usuarios set ?', [newuser]);
    req.flash('success', '¡Usuarios agregado correctamente!');
    res.redirect('/controlenvases/adduser');
});

router.post('/newarticle',isLoggedIn, async (req, res) => {
    const { tipoarticulo,tipoenvase, descripcion } = req.body;
     //Obteniendo los datos para el idtiendas
     const totalproductos = await pool.query('SELECT idproducto FROM productos ORDER BY LENGTH(idproducto) DESC, idproducto DESC LIMIT 1;');
     let total, id,tmp
     totalproductos.forEach((row) => {
 
         total = row.idproducto;
         
 
     });
     //Separando 
     tmp = total.split('PD');
     tmp = tmp[1];
     
     //Sumando un nuevo id
     tmp = Number(tmp)+1;
     //Convirtiendo en String
     tmp = tmp.toString();
 
     //Tratando el id
      id = "PD" + tmp;
  
    //Insertando un nuevo artículo
    const newarticle = {
        idproducto: id,
        tipoproducto: tipoarticulo,
        tipoenvase:tipoenvase,
        descripcion
    }
    await pool.query('INSERT INTO productos set ?', [newarticle]);
    req.flash('success', '¡Artículo agregado correctamente!');
    res.redirect('/controlenvases/addarticle');
});
router.post('/editarticle',isLoggedIn, async (req, res) => {
    const { ideditar,tipoarticuloeditar,tipoenvaseeditar, descripcioneditar } = req.body;
    await pool.query('UPDATE productos SET tipoproducto = ?,tipoenvase = ?, descripcion = ? WHERE idproducto = ?',[tipoarticuloeditar,tipoenvaseeditar,descripcioneditar,ideditar]);
    req.flash('success', '¡Artículo editado correctamente!');
    res.redirect('/controlenvases/addarticle');
});

router.post('/editarstore',isLoggedIn, async (req, res) => {

    const { idstore,zonaeditar,nombretiendaeditar, calleeditar,numeroeditar,coloniaeditar,localidadeditar,municipioeditar } = req.body;
    await pool.query('UPDATE tiendas SET zona = ?,nombretienda = ?, calle = ?, numero = ?, colonia = ?, localidad = ?, municipio = ? WHERE idtienda = ?',[zonaeditar,nombretiendaeditar,calleeditar,numeroeditar,coloniaeditar,localidadeditar,municipioeditar,idstore]);
    req.flash('success', 'Tienda editada correctamente!');
    res.redirect('/controlenvases/addstore');
});
router.post('/edituser',isLoggedIn, async (req, res) => {
    const {ideditar,nombreeditar,apellidopeditar,apellidomeditar,nusuarioeditar,passwordeditar,roleditar} = req.body;
    await pool.query('UPDATE usuarios SET nombre = ?,apellidop = ?, apellidom = ?, nomusuario = ?, password = ?, rol = ? WHERE id = ?',[nombreeditar,apellidopeditar,apellidomeditar,nusuarioeditar,passwordeditar,roleditar,ideditar]);
    req.flash('success', 'Usuario editado correctamente!');
    res.redirect('/controlenvases/adduser');
});
router.get('/deletearticle/:id',isLoggedIn, async (req, res) => {
    let idarticle = req.params.id;


    try {
        const sql = await pool.query('DELETE FROM productos WHERE idproducto = ?',[idarticle]);
        req.flash('success', '¡Artículo eliminado correctamente!');
        res.redirect('/controlenvases/addarticle');
    } catch (e) {
       
        req.flash('error', '¡Este artículo no se puede eliminar por que esta en un almacen! ');
        res.redirect('/controlenvases/addarticle');
       
    } 
    
});
router.get('/deletestore/:id',isLoggedIn, async (req, res) => {
    let idstore = req.params.id;
    try {
        const sql = await pool.query('DELETE FROM tiendas WHERE idtienda = ?', [idstore]);
        req.flash('success', 'Tienda eliminada correctamente!');
        res.redirect('/controlenvases/addstore');
    } catch (e) {
        console.log(e.sqlMessage);
        let coderror = e.code;
        let msgerror = e.sqlMessage;
        let msg = msgerror + 'Código de error: ' + coderror;
        req.flash('error', msg);
        res.redirect('/controlenvases/addstore');

    }
});
router.get('/deleteuser/:id', isLoggedIn, async (req, res) => {
    let iduser = req.params.id;
    try {
        const sql = await pool.query('DELETE FROM usuarios WHERE id = ?', [iduser]);
        req.flash('success', 'Usuario eliminado correctamente!');
        res.redirect('/controlenvases/adduser');
    } catch (e) {
        console.log(e.sqlMessage);
        let coderror = e.code;
        let msgerror = e.sqlMessage;
        let msg = msgerror + 'Código de error: ' + coderror;
        req.flash('error', msg);
        res.redirect('/controlenvases/adduser');

    }
});
router.post('/newstore', isLoggedIn, async (req, res) => {
    const { zona, nombretienda, calle, numero, colonia, localidad, municipio } = req.body;

    //Obteniendo los datos para el idtiendas
    const totaltiendas = await pool.query('SELECT idtienda FROM tiendas ORDER BY LENGTH(idtienda) DESC, idtienda DESC LIMIT 1;');
    let total, id,tmp
    totaltiendas.forEach((row) => {

        total = row.idtienda;
        

    });
    //Separando 
    tmp = total.split('TD');
    tmp = tmp[1];
    
    //Sumando un nuevo id
    tmp = Number(tmp)+1;
    //Convirtiendo en String
    tmp = tmp.toString();

    //Tratando el id
     id = "TD" + tmp;
     

    //Insertando una nueva tienda
    const newstore = {
        idtienda: id,
        zona,
        nombretienda,
        calle,
        numero,
        colonia,
        localidad,
        municipio

    }
    await pool.query('INSERT INTO tiendas set ?', [newstore]);
    req.flash('success', 'Tienda agregada correctamente!');
    res.redirect('/controlenvases/addstore');
});
router.post('/newshake', isLoggedIn, async (req, res) => {
    let tipomoviento;
    let arreglo = [];
    let cantidad = []
    const { movimiento, tipomovimientoentrada, tipomovimientosalida, tienda, tabla } = req.body;
    if (tipomovimientoentrada === undefined) {
        tipomoviento = tipomovimientosalida;
    } else {
        tipomoviento = tipomovimientoentrada;
    }
    if (typeof tabla === 'string') {
        arreglo.push(tabla);

    } else {
        arreglo = tabla;
    }

    arreglo.forEach(async element => {
        var arrayDeCadenas = element.split('$');
        const addalmacen = {
            idtienda: tienda,
            idproducto: arrayDeCadenas[0],
            stock: arrayDeCadenas[1]
        }
        if (movimiento === 'ENTRADA') {
            if (tipomoviento === 'INVENTARIO INICIAL') {
                const sql = await pool.query('SELECT COUNT(*) as contar FROM almacen WHERE idproducto = ? AND idtienda = ?', [addalmacen.idproducto, tienda]);
                if (Number(sql[0].contar) >= 1) {
                    try {
                        await pool.query('UPDATE almacen SET stock = ? WHERE idtienda = ? AND idproducto = ?', [addalmacen.stock, tienda, addalmacen.idproducto]);

                    } catch (e) {
                        console.log(e.message);
                    }

                } else {

                    try {

                        await pool.query('INSERT INTO almacen set ?', [addalmacen]);

                    } catch (e) {
                        console.log(e.message);
                    }

                }

            } else {
                let suma = 0;

                try {
                    const stock = await pool.query('SELECT stock FROM almacen WHERE idtienda = ? AND idproducto =  ?', [addalmacen.idtienda, addalmacen.idproducto]);

                    suma = Number(stock[0].stock) + Number(addalmacen.stock);

                } catch (e) {


                    console.log(e.message);

                }

                try {
                    await pool.query('UPDATE almacen SET stock = ? WHERE idtienda = ? and idproducto = ?', [suma, addalmacen.idtienda, addalmacen.idproducto]);
                } catch (e) {
                    console.log(e.message);
                }


            }
        } else {
            let suma = 0;
            try {
                const stock = await pool.query('SELECT stock FROM almacen WHERE idtienda = ? AND idproducto =  ?', [addalmacen.idtienda, addalmacen.idproducto]);
                suma = Number(stock[0].stock) - Number(addalmacen.stock);

            } catch (e) {
                console.log(e.message);
            }
            try {
                await pool.query('UPDATE almacen SET stock = ? WHERE idtienda = ? and idproducto = ?', [suma, addalmacen.idtienda, addalmacen.idproducto]);
            } catch (e) {
                console.log(e.message);
            }

        }

        //Obteniendo la fecha actual
        let date = new Date();
        let fecha = date.toISOString().split('T')[0];
        const newShake = {
            movimiento,
            tipomovimiento: tipomoviento,
            idtienda: tienda,
            idproducto: arrayDeCadenas[0],
            cantidad: arrayDeCadenas[1],
            usuario: req.user.nomusuario,
            fecha

        }

        try {
            await pool.query('INSERT INTO movimientos SET ?', [newShake]);


        } catch (e) {
            console.log(e.message);


        }
    });

    req.flash('success', 'Movimiento realizado correctamente!');
    res.redirect('/controlenvases/addshake');

});
router.post('/validatearticles',isLoggedIn, async (req, res) => {
    const{idproducto,idtienda} = req.body;
    const stock = await pool.query('SELECT stock FROM almacen WHERE idtienda = ? AND idproducto =  ?', [idtienda, idproducto]);
    let tmp,msg;

    stock.forEach(element => {
        tmp = element['stock'];
       
    });
    if(tmp === undefined){
       //salmacen para los productos que no estan
        res.send('salmacen');
    }else{
        //almacen para los productos que si estan
        res.send('almacen');
    }
  
});
router.post('/newreportstocks',isLoggedIn, async (req, res) => {
    //Recibiendo el ID de la sucursal y el tipo de envase 
    const {tienda, tipoenvase} = req.body;
    //Sacando de la Base de datos el nombre de la sucursal 
    const tiendaname = await pool.query('SELECT nombretienda FROM tiendas WHERE idtienda = ?',[tienda]);
    //Contando el total de envases llenos 
    const totalenvaseslleno = await pool.query('SELECT SUM(stock) FROM almacen INNER JOIN productos on almacen.idproducto = productos.idproducto WHERE idtienda=? AND productos.tipoenvase = ?',[tienda,'ENVASE LLENO']);
    console.log(totalenvaseslleno);
    //Contando el total de envases vacios 
    const totalenvasesvacios = await pool.query('SELECT SUM(stock) FROM almacen INNER JOIN productos on almacen.idproducto = productos.idproducto WHERE idtienda=? AND productos.tipoenvase = ?',[tienda,'ENVASE VACIO']);
    //Contando el total de envases en general

    const totalenvases = await pool.query('SELECT SUM(stock) FROM almacen WHERE idtienda = ? ',[tienda])
    //Declarando variables
    let sql;
    let body = [];
    let bodyenvaseslleno = [];
    let bodyenvasesvacio = [];
    let bodytotalenvases = [];
    let nombretienda;
    //Ciclo para extraer solo el nombre la tienda
    tiendaname.forEach((row) => {

        nombretienda = row.nombretienda;

    });

    //Validaciones 
    if(tipoenvase === 'ENVASE LLENO'){
        //Consulta de articulos cuando los envases estan llenos
        sql = await pool.query('SELECT almacen.idtienda, tiendas.nombretienda, almacen.idproducto, productos.descripcion, almacen.stock FROM almacen INNER JOIN tiendas ON almacen.idtienda = tiendas.idtienda INNER JOIN productos on almacen.idproducto = productos.idproducto WHERE almacen.idtienda = ? AND productos.tipoenvase = ?',[tienda,tipoenvase]);
      
        //LLenando el arreglo con articulos de envase Llenos
        totalenvaseslleno.forEach(element => {
            var fila = new Array();
            fila.push('');
            if( element['SUM(stock)'] === null){
                fila.push('TOTAL ENVASES LLENOS: 0');
            }else{
                fila.push('TOTAL ENVASES LLENOS: ' + element['SUM(stock)']);
            }
            
            bodyenvaseslleno.push(fila);

        });
       
        //LLenando los arreglos, envasesvacios y envasestotales con espacios en blanco
        for (let step = 0; step < 5; step++) {
            // Se ejecuta 5 veces, con valores del paso 0 al 4.
            bodyenvasesvacio.push(step);
            bodytotalenvases.push(step);
          }
    }

    if(tipoenvase === 'ENVASE VACIO'){
         //Consulta de articulos cuando los envases estan vacios
        sql = await pool.query('SELECT almacen.idtienda, tiendas.nombretienda, almacen.idproducto, productos.descripcion, almacen.stock FROM almacen INNER JOIN tiendas ON almacen.idtienda = tiendas.idtienda INNER JOIN productos on almacen.idproducto = productos.idproducto WHERE almacen.idtienda = ? AND productos.tipoenvase = ?',[tienda,tipoenvase]);
        //LLenando el arreglo con articulos de envase vacios
        totalenvasesvacios.forEach(element => {
            var fila = new Array();
            fila.push('');
            if (element['SUM(stock)'] === null) {
                fila.push('TOTAL ENVASES VACIOS: 0');
            } else {
                fila.push('TOTAL ENVASES VACIOS: ' + element['SUM(stock)']);
            }
        
    
        bodyenvasesvacio.push(fila);
    
        });
         //LLenando los arreglos, envasesllenos y envasestotales con espacios en blanco
        for (let step = 0; step < 5; step++) {
            // Se ejecuta 5 veces, con valores del paso 0 al 4.
            bodyenvaseslleno.push(step);
            bodytotalenvases.push(step);
          }
        bodyenvaseslleno =  bodyenvasesvacio;
        bodyenvasesvacio = [];
        for (let step = 0; step < 5; step++) {
            // Se ejecuta 5 veces, con valores del paso 0 al 4.
            bodyenvasesvacio.push(step);
           
          }
    }

    if(tipoenvase === 'AMBOS'){
        //Consulta de articulos en general
       sql = await pool.query('SELECT almacen.idtienda, tiendas.nombretienda, almacen.idproducto, productos.descripcion, almacen.stock FROM almacen INNER JOIN tiendas ON almacen.idtienda = tiendas.idtienda INNER JOIN productos on almacen.idproducto = productos.idproducto WHERE almacen.idtienda = ?',[tienda]);
       //LLenando el arreglo envases lleno
       totalenvaseslleno.forEach(element => {
           var fila = new Array();
           fila.push('');
           if (element['SUM(stock)'] === null) {
               fila.push('TOTAL ENVASES LLENOS: 0');
           } else {
               fila.push('TOTAL ENVASES LLENOS: ' + element['SUM(stock)']);
           }

           bodyenvaseslleno.push(fila);

       });
        //LLenando el arreglo envases vacios
        totalenvasesvacios.forEach(element => {
            var fila = new Array();
            fila.push('');
            if (element['SUM(stock)'] === null) {
                fila.push('TOTAL ENVASES VACIOS: 0');
            } else {
                fila.push('TOTAL ENVASES VACIOS: ' + element['SUM(stock)']);
            }
        
            bodyenvasesvacio.push(fila);
        
        });
        
           
        //LLenando el arreglo total envases
        totalenvases.forEach(element => {
            var fila = new Array();
            fila.push('');
            if (element['SUM(stock)'] === null) {
                fila.push('TOTAL ALMACEN: 0');
            } else {
                fila.push('TOTAL ALMACEN: ' + element['SUM(stock)']);
            }
            

            bodytotalenvases.push(fila);

        });
    }
  //LLenando el arreglo de productos
   sql.forEach(element => { 
    var fila = new Array();
    fila.push(element['idproducto']);
    fila.push(element['descripcion']);
    fila.push(element['stock']);
    body.push(fila);
   
});

// Comparacios cuando no hay resultados.
if (body.length == 0){
    for (let step = 0; step < 5; step++) {
    // Se ejecuta 5 veces, con valores del paso 0 al 4.
    body.push(step)
  }
}


  
    
    //Variable para el titulo
    title = "REPORTE DE EXISTENCIAS SUCURSAL "+nombretienda;

      
    let docDefinition = {
        //content: content
        pageSize: 'A4',
        //pageOrientation: 'landscape',
        pageMargins: [38, 5, 15, 40],
      
        content: [
            {image: 'src/public/assets/img/header.jpg',
            width: 530, style:'foto'},
            { text: title, style: 'header' },
            {
                style: 'tableExample',
                table: {
                    headerRows: 1,
                    widths: [143, 250, 100],

                    body: [
                        ['ID ARTICULO', 'DESCRIPCION', 'EXISTENCIA'],
                        [ '', '', ''],

                    ]

                },
                
                layout: 'lightHorizontalLines'  
            },
            {
               style: 'tableExample',
                table: {

                    widths: [150, 270, 80],


                    body: body
             
                   

                    //[body,'FALLAS','USUARIO RUTA','RUTA','TECNICO','LUGAR','FECHA DE LLEGADA','FECHA DE SALIDA','DESCRIPCION','OBSERVACIONES']


                },
                layout: 'noBorders'  
           
            },
            {
                style: 'tableExample',
                 table: {
 
                     widths: [340,170],
 
 
                     body: bodyenvaseslleno
              
                    
 
                     //[body,'FALLAS','USUARIO RUTA','RUTA','TECNICO','LUGAR','FECHA DE LLEGADA','FECHA DE SALIDA','DESCRIPCION','OBSERVACIONES']
 
 
                 },
                 layout: {
                    hLineStyle: function (i, node) {
                        if (i === 0 || i === node.table.widths.length) {
                            return {dash: {length: 3, space: 3}};
                        }
                    },

                    hLineColor: function (i, node) {
                        if (i === 1 || i === node.table.widths.length) {
                            return 'white';
                        }
                            
                        },
                      
                    vLineColor: function (i, node) {
                        if (i === 0 || i === node.table.body.length) {
                            return 'white';
                        }
                        if (i === 1 || i === node.table.widths.length) {
                            return 'white';
                        }
                            
                        },
                   
                 

                   
                 
                   
                }
            
             },
             {
                style: 'tableExample',
                 table: {
 
                     widths: [340,170],
 
 
                     body: bodyenvasesvacio              
                    
 
                     //[body,'FALLAS','USUARIO RUTA','RUTA','TECNICO','LUGAR','FECHA DE LLEGADA','FECHA DE SALIDA','DESCRIPCION','OBSERVACIONES']
 
 
                 },
                 layout: {
                    hLineStyle: function (i, node) {
                        if (i === 1 || i === node.table.widths.length) {
                            return {dash: {length: 3, space: 3}};
                        }
                    },

                    hLineColor: function (i, node) {
                        if (i === 0 || i === node.table.widths.length) {
                            return 'white';
                        }
                            
                        },
                      
                    vLineColor: function (i, node) {
                        if (i === 0 || i === node.table.body.length) {
                            return 'white';
                        }
                        if (i === 1 || i === node.table.widths.length) {
                            return 'white';
                        }
                            
                        },
                   
                 

                   
                 
                   
                }
            
             },
             {
                style: 'tableExample',
                 table: {
 
                     widths: [340,170],
 
 
                     body: bodytotalenvases              
                    
 
                     //[body,'FALLAS','USUARIO RUTA','RUTA','TECNICO','LUGAR','FECHA DE LLEGADA','FECHA DE SALIDA','DESCRIPCION','OBSERVACIONES']
 
 
                 },
                 layout: {
                   

                    hLineColor: function (i, node) {
                        if (i === 0 || i === node.table.body.length) {
                            return 'white';
                        }
                            
                        },
                      
                    vLineColor: function (i, node) {
                        if (i === 0 || i === node.table.body.length) {
                            return 'white';
                        }
                        if (i === 1 || i === node.table.widths.length) {
                            return 'white';
                        }
                            
                        },
                   
                 

                   
                 
                   
                }
            }

            //{image: 'src/public/img/footer.jpg',
            //width: 760, style:'foto2'}

        ],
        styles: {
            foto: {
                margin: [-5, 0, 0, 0]
            },
            foto2: {
                margin: [0, 20, 0, 10]
            },
            header: {
                fontSize: 14,
                bold: true,
                margin: [0, 30, 0, 5]
            },
            subheader: {
                fontSize: 16,
                bold: true,
                margin: [0, 10, 0, 5]
            },
            tableExample: {
                margin: [0, 0, 0, 0],
                fontSize: 7
            },
            tableheader: {
                fontSize: 10,
                bold: true,
                alignment: 'center'
            }

        },
        defaultStyle: {
            //alignment: 'justify'
        }
    }
    const doc = new PdfPrinter({
        Roboto: {
            normal: new Buffer.from(require('pdfmake/build/vfs_fonts.js').pdfMake.vfs['Roboto-Regular.ttf'], 'base64'),
            bold: new Buffer.from(require('pdfmake/build/vfs_fonts.js').pdfMake.vfs['Roboto-Medium.ttf'], 'base64')
        }
    }).createPdfKitDocument(docDefinition)
    doc.pipe(fs.createWriteStream('src/reportes/reportstock.pdf'))
    doc.end()
    req.flash('showreporte', '¡Reporte Generado Correctamente!');
    res.redirect('/controlenvases/reportstocks');

});
router.post('/newreportshake',isLoggedIn, async (req, res) => {

    const {tienda,movimiento,fechainicio, fechafinal} = req.body;
    //Consulta para los movimientos
    let sql = await pool.query('SELECT movimientos.movimiento,movimientos.tipomovimiento, productos.descripcion, movimientos.cantidad,movimientos.usuario, movimientos.fecha FROM movimientos INNER JOIN productos on movimientos.idproducto = productos.idproducto WHERE fecha BETWEEN ? AND ? AND movimiento = ? AND idtienda = ?',[fechainicio,fechafinal,movimiento,tienda]);
    //Sacando de la Base de datos el nombre de la sucursal 
    const tiendaname = await pool.query('SELECT nombretienda FROM tiendas WHERE idtienda = ?',[tienda]);
    //Sacando el total de registros segun la tienda y el tipo de movimiento
    let totalrows = await pool.query('SELECT COUNT(*) AS total from movimientos WHERE idtienda = ? AND movimiento = ?',[tienda,movimiento]);
    let nombretienda;
    let body = [];
    let bodytotal = [];
    //Ciclo para extraer solo el nombre la tienda
    tiendaname.forEach((row) => {

        nombretienda = row.nombretienda;

    });
    if(movimiento === 'AMBOS'){
        sql = await pool.query('SELECT movimientos.movimiento,movimientos.tipomovimiento, productos.descripcion, movimientos.cantidad,movimientos.usuario, movimientos.fecha FROM movimientos INNER JOIN productos on movimientos.idproducto = productos.idproducto WHERE fecha BETWEEN ? AND ?  AND idtienda = ?',[fechainicio,fechafinal,tienda]);
        totalrows = await pool.query('SELECT COUNT(*) AS total from movimientos WHERE idtienda = ? ',[tienda]);
    }    
    
    //LLenando el arreglo de productos
    sql.forEach(element => { 
        var fila = new Array();
        fila.push(element['movimiento']);
        fila.push(element['tipomovimiento']);
        fila.push(element['descripcion']);
        fila.push(element['cantidad']);   
        fila.push(element['fecha']);
        fila.push(element['usuario']);
        
       
        body.push(fila);  
    });
    //LLenando el arreglo con el total
    totalrows.forEach(element => { 
        var fila = new Array();
        fila.push('');
        fila.push('TOTAL DE MOVIMIENTOS: '+element['total']);
        bodytotal.push(fila);  
    });
    //Cuando no hay datos
    if (body.length == 0){
        for (let step = 0; step < 5; step++) {
        // Se ejecuta 5 veces, con valores del paso 0 al 4.
        body.push(step)
      }
    }
    console.log(body);
    console.log(bodytotal);

    //Variable para el titulo
    title = "REPORTE DE MOVIMIENTOS SUCURSAL "+nombretienda;
    subtitle = "DEL: "+fechainicio +" AL " +fechafinal;
      
    let docDefinition = {
        //content: content
        pageSize: 'A4',
        //pageOrientation: 'landscape',
        pageMargins: [38, 5, 15, 40],
      
        content: [
            {image: 'src/public/assets/img/header.jpg',
            width: 530, style:'foto'},
            { text: title, style: 'header' },
            { text: subtitle, style: 'subheader' },
            {
                style: 'tableExample',
                table: {
                    headerRows: 1,
                    widths: [80, 100, 80,80, 60, 50],

                    body: [
                        ['MOVIMIENTO', 'TIPO', 'ARTICULO','CANTIDAD','FECHA','USUARIO'],
                        [ '', '', '','', '', ''],
                    ]

                },
                
                layout: 'lightHorizontalLines'  
            },
            {
                style: 'tableExample',
                 table: {
 
                    widths: [89, 105, 95,80, 75 , 50],
 
 
                     body: body
              
                    
 
                     //[body,'FALLAS','USUARIO RUTA','RUTA','TECNICO','LUGAR','FECHA DE LLEGADA','FECHA DE SALIDA','DESCRIPCION','OBSERVACIONES']
 
 
                 },
                 layout: 'noBorders'  
            
             },
             {
                style: 'tableExample',
                 table: {
 
                     widths: [-18,'*'],
 
 
                     body: bodytotal
              
                    
 
                     //[body,'FALLAS','USUARIO RUTA','RUTA','TECNICO','LUGAR','FECHA DE LLEGADA','FECHA DE SALIDA','DESCRIPCION','OBSERVACIONES']
 
 
                 },
                 layout: {
                    hLineStyle: function (i, node) {
                        if (i === 0 || i === node.table.widths.length) {
                            return {dash: {length: 3, space: 3}};
                        }
                    },

                    hLineColor: function (i, node) {
                        if (i === 1 || i === node.table.widths.length) {
                            return 'white';
                        }
                            
                        },
                      
                    vLineColor: function (i, node) {
                        if (i === 0 || i === node.table.body.length) {
                            return 'white';
                        }
                        if (i === 1 || i === node.table.widths.length) {
                            return 'white';
                        }
                            
                        },
                   
                 

                   
                 
                   
                }
            
             },
             
            //{image: 'src/public/img/footer.jpg',
            //width: 760, style:'foto2'}

        ],
        styles: {
            foto: {
                margin: [-5, 0, 0, 0]
            },
            foto2: {
                margin: [0, 20, 0, 10]
            },
            header: {
                fontSize: 14,
                bold: true,
                margin: [0, 30, 0, 5]
            },
            subheader: {
                fontSize: 7,
                bold: true,
                margin: [420, 10, 0, 5]
            },
            tableExample: {
                margin: [0, 0, 0, 0],
                fontSize: 7
            },
            tableheader: {
                fontSize: 10,
                bold: true,
                alignment: 'center'
            }

        },
        defaultStyle: {
            //alignment: 'justify'
        }
    }
    const doc = new PdfPrinter({
        Roboto: {
            normal: new Buffer.from(require('pdfmake/build/vfs_fonts.js').pdfMake.vfs['Roboto-Regular.ttf'], 'base64'),
            bold: new Buffer.from(require('pdfmake/build/vfs_fonts.js').pdfMake.vfs['Roboto-Medium.ttf'], 'base64')
        }
    }).createPdfKitDocument(docDefinition)
    doc.pipe(fs.createWriteStream('src/reportes/reportshake.pdf'))
    doc.end();
    req.flash('showreporteshake', '¡Reporte Generado Correctamente!');
    res.redirect('/controlenvases/reportshake');

    

});
router.get('/showreport', isLoggedIn, async (req, res) => {
    const path = 'src/reportes/reportstock.pdf';
    if (fs.existsSync(path)) {
        res.contentType("application/pdf");
        fs.createReadStream(path).pipe(res)
    } else {
        res.status(500)
        console.log('File not found')
        res.send('File not found')
    }
});
router.get('/showreportshake', isLoggedIn, async (req, res) => {
    const path = 'src/reportes/reportshake.pdf';
    if (fs.existsSync(path)) {
        res.contentType("application/pdf");
        fs.createReadStream(path).pipe(res)
    } else {
        res.status(500)
        console.log('File not found')
        res.send('File not found')
    }
});
router.get('/logout',isLoggedIn,(req, res) => {
    req.logOut();
    res.redirect('/');

})

module.exports = router;