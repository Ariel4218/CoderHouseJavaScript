// Proyecto Arbitraje de Criptomonedas
// Autor: Ariel Duhart

/*
// Variable con estructura de monedas
const monedas = {
    btc: [ { exchange: "Binance", compra: 1000, venta: 1050, comision: 0.01 }, 
        { exchange: "Decrypto", compra: 1010, venta: 1040, comision: 0.02 }, ],
    eth: [ { exchange: "Binance", compra: 100, venta: 105, comision: 0.01 }, 
        { exchange: "Decrypto", compra: 101, venta: 104, comision: 0.02 }, ],
};
*/

//Clase constructora del objeto Exchanges y metodo para calcular el precio de compra y el precio de venta mas comisiones
class Exchanges {
    constructor (exchange, precioCompra, precioVenta, comision){
        this.exchange = exchange.toUpperCase();
        this.precioCompra = Number(precioCompra);
        this.precioVenta = Number(precioVenta);
        this.comision = Number(comision);
        this.precioCompraConComision = 0;
        this.precioVentaConComision = 0;
    }
    //creo un metodo para calcular la comision
    agregarComision(){
        this.precioCompraConComision = this.precioCompra * (1+this.comision);
        this.precioVentaConComision = this.precioVenta * (1+this.comision);
    }
};

//Clase constructora del objeto Monedas para almacenar las criptomonedas
class Monedas {
    constructor (){
        this.moneda = {};
    }

    // creo metodo para agregar el exchange a la moneda
    agregarMoneda(tipo, exchange, precioCompra, precioVenta, comision){
        const nuevoExchange = new Exchanges(exchange, precioCompra, precioVenta, comision);
        nuevoExchange.agregarComision(); // Realizo el calculo de la comision
        if (!this.moneda[tipo]){
            this.moneda[tipo] = [];
        }
        this.moneda[tipo].push(nuevoExchange);
    }
};

// creo el objeto monedas
const moneda = new Monedas();
// con el metodo agregarMoneda() agrego la moneda y los datos de los exchanges
moneda.agregarMoneda("BTC", "Binance", 1000, 1050, 0.01);
moneda.agregarMoneda("BTC", 'Decrypto', 1010, 1040, 0.02);
moneda.agregarMoneda("ETH", 'Binance', 100, 105, 0.01);
moneda.agregarMoneda("ETH", 'Decrypto', 101, 104, 0.02);
moneda.agregarMoneda("SOL", 'Binance', 50, 55, 0.01);
moneda.agregarMoneda("SOL", 'Decrypto', 51, 54, 0.02);

//console.log(moneda.moneda["SOL"]);

// Función para calcular el arbitraje
function arbitraje (moneda, monedaIngresada){
    //verificar que la moneda ingresada exista
    if (!moneda.moneda[monedaIngresada]){// Se usa !moneda.monedas[monedaIngresada] ya que es la manera en la que se verifica si una llave no existe dentro de un objeto. Esto arroja True si no existe
        alert( "La moneda ingresada no existe");
        return;
    };

    //Creo variables para almacenar el valor de la mejor opcion de compra y venta
    let mejorCompra = { exchange: "", precio: Infinity };// infinity representa un numero positivo > a cualquier elemento
    let mejorVenta = { exchange: "", precio: -Infinity }; // -infinity representa un numero negativo < a cualquier elemento

    // Recorro el objeto moneda de la clase monedas que tiene la propiedad moneda cuya clave va a ser la moneda ingresada
    moneda.moneda[monedaIngresada].forEach(moneda => {
        //Actualizo la mejor opcion de compra
        if (moneda.precioCompraConComision < mejorCompra.precio) {
            mejorCompra = {exchange: moneda.exchange, precio: moneda.precioCompraConComision};
        }

        //Actualizo la mejor opcion de venta
        if (moneda.precioVentaConComision > mejorVenta.precio){
            mejorVenta = {exchange:moneda.exchange, precio: moneda.precioVentaConComision};
        }
    });


    //Mostrar resultados
    alert(`La mejor opcion de compra de ${monedaIngresada} es en ${mejorCompra.exchange} a un precio de ${mejorCompra.precio}`);
    alert(`La mejor opcion de venta de ${monedaIngresada} es en ${mejorVenta.exchange} a un precio de ${mejorVenta.precio}`);
    alert(`La ganancia es de ${mejorVenta.precio - mejorCompra.precio}`);
};

// Llamo a la función

do {
    const monedaIngresada = prompt("Ingrese la moneda a arbitrar (btc, eth o sol):").toUpperCase();
    arbitraje(moneda, monedaIngresada);

} while (confirm("Desea realizar otra operación?"));


    



