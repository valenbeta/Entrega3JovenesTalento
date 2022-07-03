//Matriz de clientes inicial
cliente1 = [1,400,250,300,150,350,300];
cliente2 = [2,80,150,100,150,150,150];
cliente3 = [3,230,190,300,150,150,150];
let listaConsumo = [cliente1, cliente2, cliente3];

//Se toma la información de clientes para elaborar y ordenar una matriz de descuentos
// descuentos = matrizDescuentos(listaConsumo);
listaDescuento = ordenarDescuentos(matrizDescuentos(listaConsumo));


// Función para generar matriz con el consumo promedio de los últimos seis meses y descuento obtenido (de cada cliente)
function matrizDescuentos (listaConsumo) {

    let listaDescuento =[]
    listaConsumo.forEach(element => {
        elementosLista = [];
        let sumConsumo = 0
        let promConsumo;

        for (let index = 1; index < element.length; index++) {
          
          sumConsumo += element[index];
        }
        
        elementosLista.push(element[0]);
        promConsumo = Math.round(sumConsumo / (element.length - 1));
        elementosLista.push(promConsumo);

        let descuento;

        if (promConsumo > 200) {
            descuento = 3;
        } 
        else if (promConsumo <= 200 && promConsumo >= 100){
            descuento = 5
        }
        else if (promConsumo <= 100 && promConsumo > 50){
            descuento = 10
        }
        else if (promConsumo <= 50){
            descuento = 15
        }

        elementosLista.push(descuento); 
        listaDescuento.push(elementosLista);
    });
    return listaDescuento;
}

//Función para ordenar la matriz de descuentos (de mayor a menor según el %)
function ordenarDescuentos (listaDescuento){
    listaDescuento = listaDescuento.sort((a,b) => b[2]-a    [2]);
    return listaDescuento;
}

// Función para agregar cliente a la matriz desde HTML
function agregarCliente(consumoMes1, consumoMes2, consumoMes3, consumoMes4, consumoMes5, consumoMes6){
    const id = listaConsumo.length + 1;   

    if(isNaN(consumoMes1) || isNaN(consumoMes2) || isNaN(consumoMes3) || isNaN(consumoMes4) || isNaN(consumoMes5) || isNaN(consumoMes6)) {
        window.alert("Por favor completa todos los campos")
    } else {
        listaConsumo.push ([id,consumoMes1, consumoMes2, consumoMes3, consumoMes4, consumoMes5, consumoMes6]);
        window.alert("Se ha agregado un nuevo cliente.")
        vaciarInputs();
        listaDescuento = ordenarDescuentos(matrizDescuentos(listaConsumo));
    }
}

//Función para vaciar entradas después de agregar cliente a la matriz
function vaciarInputs (){
    idInputs = ["InputM1","InputM2","InputM3","InputM4","InputM5","InputM6"];
    idInputs.forEach(element => {
        let input = document.getElementById (element);
        input.value = "";
    });
}

//Función activada al hacer clic en botón "Agregar cliente"
function onClickButtonAgregarCliente() {
    let consumo=[];
    for (let index = 1; index < 7; index++) {
        const input = document.getElementById("InputM"+index);
        const consumoMes = parseInt(input.value);
        consumo.push(consumoMes);
    }  
    agregarCliente(consumo[0],consumo[1],consumo[2],consumo[3],consumo[4],consumo[5]);

}

// Función activada al hacer clic en el botón "Generar tabla" (genera primera tabla, borrando el botón)
function generarTabla1(matriz,seccionId) {
    let seccion = document.getElementById(seccionId);
    let botonGenerar = document.getElementById("botonGenerarTabla"+seccionId);
    seccion.removeChild(botonGenerar);

    generarTabla(matriz,seccionId);
    detallesTabla(seccionId);
    generarBotonActualizar(matriz,seccionId);

}


// Función para generar botón "Actualizar tabla"
function generarBotonActualizar (matriz,seccionId) {
    let boton = document.createElement("div");
    boton.className = "tablas";
    let seccionTabla = document.getElementById("tabla"+seccionId);
    boton.innerHTML = `<button type='button' onclick='actualizarTabla${seccionId}()'> Actualizar Tabla </button>`;
    seccionTabla.appendChild(boton);
    
}

 // Función activada al hacer clic en el botón "Actualizar tabla" (borra la tabla anterior y genera la tabla nuevamente)
 function actualizarTablahistorico() {
    let seccionTabla = document.getElementById("historico") ;
    let borrarTabla = document.getElementById("tablahistorico");

    seccionTabla.removeChild(borrarTabla);  

    generarTabla(listaConsumo, "historico");
    detallesTabla("historico");
    generarBotonActualizar(listaConsumo, "historico");
  }

// Función activada al hacer clic en el botón "Actualizar tabla" (borra la tabla anterior y genera la tabla nuevamente)
  function actualizarTabladescuentos() {
    let seccionTabla = document.getElementById("descuentos") ;
    let borrarTabla = document.getElementById("tabladescuentos");

    seccionTabla.removeChild(borrarTabla);  
    descuentos = matrizDescuentos(listaConsumo);
    listaDescuento = ordenarDescuentos(descuentos);
    generarTabla(listaDescuento, "descuentos");
    detallesTabla("descuentos");
    generarBotonActualizar(listaDescuento, "descuentos");
  }

// Función para generar tabla desde una matriz (se crea dentro de una nueva sección de HTML)
function generarTabla(matriz, idSeccion) {

    let seccion = document.getElementById(idSeccion);
    
    // Creación de tabla 
    let seccionTabla = document.createElement("div");
    seccionTabla.id = "seccionTabla"+idSeccion;

    
    seccion.appendChild(seccionTabla);

    let tabla = document.createElement("table");
    seccionTabla.appendChild(tabla);

    let tituloTabla = document.createElement("caption");
    tituloTabla.id = "tituloTabla"+idSeccion;
    tabla.appendChild(tituloTabla); 
    seccionTabla.id = "tabla"+idSeccion;
 
    
    //  Encabezado de la tabla 
    let encabezado = document.createElement("tr");

    for (let index = 0; index < matriz[0].length; index++) {
        let tituloColumna = document.createElement("th");
        tituloColumna.id = "t"+(index+1)+idSeccion;
        encabezado.appendChild(tituloColumna);
        
    }

    tabla.appendChild(encabezado);

    //Ciclo para generar filas
    matriz.forEach(element => {
    
        var fila = document.createElement("tr");
    
    //Ciclo para generar los datos de cada fila 
        element.forEach(item => {
            var columna = document.createElement("td");
            var contenido = document.createTextNode(item);
            columna.appendChild(contenido);
            fila.appendChild(columna);
            });   
        tabla.appendChild(fila);
  
      });
    
  }


  // Función para generar el título y encabezados de la tabla.
  function detallesTabla(seccionId){

    let tituloTabla = document.getElementById("tituloTabla"+seccionId);

    if (seccionId =="historico") {
        tituloTabla.innerText = "Histórico de consumo de los clientes (Kwh).";
        encabezado1 = document.getElementById("t1"+seccionId)
        encabezado1.innerText = "ID Cliente";
        for (let index = 2; index <= 7; index++) {
            encabezado = document.getElementById("t" + index+seccionId)
            encabezado.innerText = "Mes " + (index-1);
        }
    }

    if (seccionId =="descuentos") {
        tituloTabla.innerText = "Descuento según consumo.";
        encabezado1 = document.getElementById("t1"+seccionId)
        encabezado1.innerText = "ID Cliente";

        encabezado2 = document.getElementById("t2"+seccionId)
        encabezado2.innerText = "Promedio consumo (Kwh)";

        encabezado2 = document.getElementById("t3"+seccionId)
        encabezado2.innerText = "% Descuento";        
    }   
}
