// Proyecto Arbitraje de Criptomonedas
// Autor: Ariel Duhart

// Variable con estructura de monedas
const monedas = {
    btc: [ { exchange: "Binance", compra: 1000, venta: 1050, comision: 0.01 }, 
        { exchange: "Decrypto", compra: 1010, venta: 1040, comision: 0.02 }, ],
    eth: [ { exchange: "Binance", compra: 100, venta: 105, comision: 0.01 }, 
        { exchange: "Decrypto", compra: 101, venta: 104, comision: 0.02 }, ],
};

// Función para calcular el arbitraje
function arbitraje (monedas, monedaIngresada){
    //verificar que la moneda ingresada exista
    if (!monedas[monedaIngresada]){
        alert( "La moneda ingresada no existe");
        return;
    };
    //Creo variables para almacenar el valor de la mejor opcion de compra y venta
    let mejorCompra = { exchange: "", precio: Infinity };
    let mejorVenta = { exchange: "", precio: Infinity };

    // Recorro los exchanges para la moneda ingresada
    monedas[monedaIngresada].forEach (moneda => {
        const precioCompraConComision = moneda.compra * (1 + moneda.comision);
        const precioVentaConComision = moneda.venta * (1 - moneda.comision);
        // Actualizo la mejor opcion de compra
        if (precioCompraConComision < mejorCompra.precio){
            mejorCompra={ exchange: moneda.exchange, precio: precioCompraConComision };
        };
        // Actualizo mejor opcion de venta
        if (precioVentaConComision < mejorVenta.precio){
            mejorVenta={ exchange: moneda.exchange, precio: precioVentaConComision };
        };
    }
);
    //Mostrar resultados
    console.log(`La mejor opcion de compra de ${monedaIngresada} es en ${mejorCompra.exchange} a un precio de ${mejorCompra.precio}`);
    console.log(`La mejor opcion de venta de ${monedaIngresada} es en ${mejorVenta.exchange} a un precio de ${mejorVenta.precio}`);
    console.log(`La ganancia es de ${mejorVenta.precio - mejorCompra.precio}`);
};

// Llamo a la función

do {
    const monedaIngresada = prompt("Ingrese la moneda a arbitrar (btc o eth):").toLowerCase();
    arbitraje(monedas, monedaIngresada);

} while (confirm("Desea realizar otra operación?"));


    



