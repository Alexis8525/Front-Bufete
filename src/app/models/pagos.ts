export class Pago {
    idPago?: number;
    monto?: number;
    montoRestante?: number;
    metodo?: string;
    estado?: number;
    fechaPago?: string;
    montoInicial?: number;  //lO MISMO QUE EL SERVICIO PERO SE ACTUALIZA Y SE GUARDA EN TBL.PAGO 
    //Datos adicionales de otras tablas 
    idServicio?: number;
    idCliente?: number;
    nomCliente?: string;
    nomServicio?: string;  
    costo?: number; //COSTO DEL SERVICIO
    
    folio?: number;

    constructor(
        monto: number,
        montoRestante: number,
        metodo: string,  
        estado: number,
        fechaPago: string,
        idServicio: number,
        idCliente: number,
        nomCliente: string,
        nomServicio: string,
        montoInicial: number,
        folio: number,   
        costo: number,
    ) {
        this.monto = monto;
        this.montoRestante = montoRestante;
        this.metodo = metodo;
        this.estado = estado;
        this.fechaPago = fechaPago;
        this.idServicio = idServicio;
        this.idCliente = idCliente;
        this.nomCliente = nomCliente;
        this.nomServicio = nomServicio;  
        this.montoInicial = montoInicial;  
        this.folio = folio;
        this.costo = costo;  
    }
}

