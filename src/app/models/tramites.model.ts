export class Tramites {

    id: string;
    tipoTramite: string;
    nombre: string;
    apellido: string;
    telefono: string;
    email: string;
    direccion: string;
    localidad: string;
    cbu: string;
    observaciones: string;
    estado: boolean;
    fechaPedido: Date;
    fechaAlta: Date;
    fechaRechazo: Date;
    motivoRechazo: string;

    constructor() {
        this.estado = false;
        this.id = "";
        this.tipoTramite = "";
        this.nombre = "";
        this.apellido = "";
        this.telefono = "";
        this.email = "";
        this.direccion = "";
        this.localidad = "";
        this.cbu = "";
        this.observaciones = "";
        
        this.fechaPedido= new Date('01/01/1901');
        this.fechaAlta= new Date('01/01/1901');
        this.fechaRechazo = new Date('01/01/1901');
        this.motivoRechazo = "";
    

    }

    
}

