export class HaceteSocioModel {

    id: string;
    nombre: string;
    apellido: string;
    telefono: string;
    email: string;
    direccion: string;
    localidad: string;
    estadocivil: string;
    cbu: string;
    observaciones: string;
    estado: boolean;
    fechaPedido : Date;
    fechaAlta: Date;
    fechaRechazo: Date;
    motivoRechazo: string;
    cantidadHijos: string;

    constructor() {
        this.estado = false;
        this.estado = false;
        this.id = "";
        this.nombre ="";
        this.apellido = "";
        this.telefono = "";
        this.email = "";
        this.direccion = "";
        this.localidad = "";
        this.cbu = "";
        this.observaciones = "";
        this.estadocivil= "";

        this.fechaPedido= new Date('01/01/1901');
        this.fechaAlta= new Date('01/01/1901');
        this.fechaRechazo= new Date('01/01/1901');
        this.motivoRechazo= "";
        this.cantidadHijos= "";
    

    }

    
}

