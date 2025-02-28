// Proyecto Arbitraje de Criptomonedas
// Autor: Ariel Duhart

//creo array con monedas fiat
const fiatCurrenciesArray = ['ARS','BRL','MXN', 'UYU', 'USD', 'EUR'];
const criptoCurrenciesArray = ['BTC','ETH','SOL','UNI','USDT','WLD', 'DAI'];

//cargo dinamicamente el array de monedas fiat al DOM
const llenarSelectFiat = ()=>{
    const fiatSelector = document.getElementById("fiat");
// recorro el array de monedas fiat y creo los elementos del selector
    fiatCurrenciesArray.forEach(currency=>{        
        const option = document.createElement("option");
        option.value += currency;
        option.textContent += currency; //esta propiedad muestra el contenido
        fiatSelector.appendChild(option);
    });      
};

const llenarSelectCoin = ()=>{
    const coinSelector = document.getElementById("coin");

    criptoCurrenciesArray.forEach(coin=>{
        const option = document.createElement("option");
        option.value += coin;
        option.textContent += coin;
        coinSelector.appendChild(option)
    });
};

//llamo a las funciones para pintar el DOM
llenarSelectFiat();
llenarSelectCoin();

//obtengo el boton para poder escucharlo

const boton = document.getElementById("btnconsultar");

boton.onclick = async () => {
    //obtengo los id de los elementos
    const fiatSelector = document.getElementById("fiat");
    const coinSelector = document.getElementById("coin");
    const volumeInput = document.getElementById("volumen");

    const selectedFiat = fiatSelector.value;
    const selectedCoin = coinSelector.value;
    const enteredVolume = volumeInput.value;

    //usando operadores ternarios para verificar los valores
    const mensaje = (selectedFiat==='Moneda a usar' || selectedCoin === 'Moneda a Arbitrar' || enteredVolume=='')
    ? 'Revisa los valores cargados'
    : 'Valores cargados Correctamente';

    const icono = (selectedFiat==='Moneda a usar' || selectedCoin === 'Moneda a Arbitrar' || enteredVolume=='')
    ? 'error'
    : 'success';

    Swal.fire({
        icon: icono,
        title: icono==='error' ? 'Oops...!' : 'Great!',
        text: mensaje
    });
    //return;

    //obtengo los datos de la api con ls funcion creada para ello
    const data = await getCriptoYaData(selectedCoin,selectedFiat,enteredVolume);

    //creo la tabla con los datos obtenidos
    crearTabla(data);

    formatearMejorCompraMejorVenta(data);

    crearBoton();

};

//Conecto con la API de criptoya
const criptoYaApi = 'https://criptoya.com/api';

//Creo funcion para obtener los datos de la api
const getCriptoYaData = async(coin, fiat, volume)=>{
    const apiUrl = `${criptoYaApi}/${coin}/${fiat}/${volume}`;
    const response = await fetch (apiUrl);
    const data = await response.json()    
    return data;
};

//creo una tabla para mostrar en el DOM con los datos obtenidos en la API
const crearTabla = (data) => {
    const resultadosDiv = document.getElementById('resultados');
    resultadosDiv.innerHTML = ''; // Limpiar contenido previo

    const tabla = document.createElement("table");
    tabla.className = "table table-striped table-dark";

    // Crear el encabezado de la tabla
    const thead = document.createElement("thead");
    const encabezado = `
        <tr>
            <th>Exchange</th>
            <th>Precio Compra</th>
            <th>Precio Venta</th>
        </tr>
    `;
    thead.innerHTML = encabezado;
    tabla.appendChild(thead);

    // Crear el cuerpo de la tabla
    const tbody = document.createElement("tbody");
    Object.keys(data).forEach(exchange => {
        const fila = `
            <tr>
                <td>${exchange}</td>
                <td>${data[exchange].totalAsk}</td>
                <td>${data[exchange].totalBid}</td>
            </tr>
        `;
        tbody.innerHTML += fila;
    });
    tabla.appendChild(tbody);

    resultadosDiv.appendChild(tabla);
};

// Función para formatear las celdas con el mejor totalAsk y totalBid
const formatearMejorCompraMejorVenta = (data) => {
    let mejorCompra = { exchange: "", totalAsk: Infinity };
    let mejorVenta = { exchange: "", totalBid: -Infinity };

    // Encontrar el mejor totalAsk y totalBid
    Object.keys(data).forEach(exchange => {
        if (data[exchange].totalAsk < mejorCompra.totalAsk) {
            mejorCompra = { exchange, totalAsk: data[exchange].totalAsk };
        }
        if (data[exchange].totalBid > mejorVenta.totalBid) {
            mejorVenta = { exchange, totalBid: data[exchange].totalBid };
        }
    });

    // Formatear las celdas correspondientes
    const filas = document.querySelectorAll("#resultados table tbody tr");
    filas.forEach(fila => {
        const celdas = fila.querySelectorAll("td");
        if (celdas[0].textContent === mejorCompra.exchange) {
            celdas[1].style.backgroundColor = "green";
            celdas[1].style.color = "white";
        }
        if (celdas[0].textContent === mejorVenta.exchange) {
            celdas[2].style.backgroundColor = "red";
            celdas[2].style.color = "white";
        }
    });
};

const crearBoton = () => {
    const resultadosDiv = document.getElementById("resultados")
    const botonLimpiar = document.createElement("button");
    botonLimpiar.type = "buton";
    botonLimpiar.className = "btn btn-danger";
    botonLimpiar.id = "btnLimpiar";
    botonLimpiar.textContent = "Limpiar tabla"
    resultadosDiv.appendChild(botonLimpiar);

    botonLimpiar.onclick = () => {
        // const resultadosDiv = document.getElementById('resultados');
        resultadosDiv.innerHTML = ''; // Limpiar contenido de resultados
         // Volver a agregar el botón de limpiar
    };
};

const contacto = document.getElementById("contacto");
contacto.onclick = (event)=>{
    event.preventDefault();
    Swal.fire({
        icon: "info",
        title: "Contacto",
        text: "Formulario en construccion"
    });
};



