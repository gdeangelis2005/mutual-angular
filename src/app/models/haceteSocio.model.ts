export class HaceteSocioModel {

    id: string;
    nombre: string;
    apellido: string;
    telefono: string;
    email: string;
    direccion: string;
    localidad: string;
    cbu: string;
    observaciones: string;
    estadocivil: string;
    cantidadHijos: number;
    motivoRechazo: string;

    constructor() {
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

        this.motivoRechazo= "";
        this.cantidadHijos= 0;
    

    }

    
}

