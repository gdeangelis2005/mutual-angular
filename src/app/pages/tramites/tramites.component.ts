import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
//import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';                                         

import { ValidadoresService } from '../../services/validadores.service';    
import { filter, startWith, takeUntil } from 'rxjs/operators';                                                          
import { Observable, Subscription, Subject, of, from } from 'rxjs';   

import { TramitesModel } from '../../models/tramites.model';
import { TramiteService } from '../../services/tramites.service';

import { DomSanitizer } from '@angular/platform-browser';


//import { ValidadoresService } from '../../services/validadores.service';

import Swal from 'sweetalert2';
//import { getMaxListeners } from 'process';

//import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-heroe',
  templateUrl: './tramites.component.html',
  styleUrls: ['./tramites.component.css']
})
export class TramitesComponent implements OnInit {
 // son del file
//  public previsualizacion!: string;
  public archivos: any = []
  public loading!: boolean
// son del tramite
  tramite: TramitesModel = new TramitesModel();
  forma!: FormGroup;
  private ngUnsubscribe: Subject<any> = new Subject<any>();
  url: string ="";
  msgError: string ="";
  msgOk: string =""; ;
  subscription: Subscription = new Subscription(); //| undefined;


  constructor( private tramitesService: TramiteService,
               private route: ActivatedRoute,
               private router: Router, 
               private fb: FormBuilder,
               private validadores: ValidadoresService,
               private sanitizer: DomSanitizer ) { 
              
  this.crearFormulario();
  this.cargarDataAlFormulario();
  //this.crearListeners();

   }

  ngOnInit() {

    console.log("llego");
    var id = this.route.snapshot.paramMap.get('id');
    
    console.log(id);
    if (id === null)
      id='nuevo'; 

    if ( id !== 'nuevo' ) {

     // this.haceteSocioService.getHaceteSocio( id )
     //   .subscribe( (resp:  HaceteSocioModel) => {
     //     this.haceteSocio = resp;
     //     this.haceteSocio.id = id!;
     //   });

    }
  }
  

  guardar() {

    if ( this.forma.invalid ) {
      console.log('Formulario no válido');
      return Object.values( this.forma.controls ).forEach( control => {
        if ( control instanceof FormGroup ) 
        { 
          Object.values( control.controls ).forEach( control => control.markAsTouched() );
        } else {
          control.markAsTouched();
        }
      });
    }
    
    //Swal.fire({
    //  title: 'Espere',
    //  text: 'Guardando información',
    //  type: 'info',
    //  allowOutsideClick: false
    //});
    Swal.fire('Espere','Guardando información','info');
    Swal.showLoading();
   
    const tipoTramite = this.forma.get('tipoTramite');
    this.tramite.tipoTramite =  (tipoTramite !== null ? tipoTramite.value : ' '); 
   
    const nombre = this.forma.get('nombre');
    this.tramite.nombre =  (nombre !== null ? nombre.value : ' '); 
    const apellido = this.forma.get('apellido');
    this.tramite.apellido = (apellido !== null ? apellido.value : ' '); 
    const email = this.forma.get('email');
    this.tramite.email = (email !== null ? email.value : ' ');
    const direccion = this.forma.get('direccion');
    this.tramite.direccion = (direccion !== null ? direccion.value :' ');
    const localidad = this.forma.get('localidad');
    this.tramite.localidad = (localidad !== null ? localidad.value : ' ');
    const observaciones = this.forma.get('observaciones');
    this.tramite.observaciones = (observaciones !== null ? observaciones.value : ' '); 
    const cbu = this.forma.get('cbu');
    this.tramite.cbu = (cbu !== null ? cbu.value : ' '); 
    
    const telefono = this.forma.get('telefono');
    this.tramite.telefono=(telefono !== null ? telefono.value :  ' '); 
    
    this.tramite.estado=false; 
    this.tramite.fechaPedido= new Date();
    this.tramite.fechaAlta= new Date('01/01/1901');
    this.tramite.fechaRechazo= new Date('01/01/1901');
    this.tramite.motivoRechazo="";


  
  
    console.log(this.tramite);

    let peticion: Observable<any>;

    if ( this.tramite.id ) {
      peticion = this.tramitesService.actualizarTramite( this.tramite );
    } else {
      peticion = this.tramitesService.crearTramite( this.tramite );
    }




    peticion.subscribe( resp => {
      Swal.fire(this.tramite.nombre,'Se actualizó correctamente','success');
      this.router.navigateByUrl('/home');
    });

  }

  crearFormulario() {

    this.forma = this.fb.group({
      tipoTramite  : ['', ],
      numeroAsociado: ['', [Validators.required] ],
      nombre       : ['', [Validators.required] ],
      apellido     : ['', [Validators.required] ],
      email        : ['', [ Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')] ],
      direccion    : ['', [Validators.required] ],
      localidad    : ['', [Validators.required] ],
      telefono     : ['', [Validators.required] ],
      cbu          : ['', [Validators.required] ],
      observaciones: ['', ],
      text_input: ['', Validators.required],
      photos: this.fb.array([])

      },{
      
      });
      //usuario : ['', , this.validadores.existeUsuario ],
      //direccion: this.fb.group({
      //  distrito: ['', Validators.required ],
      //  ciudad  : ['', Validators.required ],
      // });
    //pasatiempos: this.fb.array([])
    //},{
    //  validators: this.validadores.passwordsIguales('pass1','pass2')
    //});

  }

  clearImage()
  {
 //   this.previsualizacion = '';
 //   this.archivos = [];
 //   this.forma.reset({
 //     photos: []
 //   });
    this.photos.clear();
    console.log(this.photos);


  }
  cargarDataAlFormulario() {

    // this.forma.setValue({
    this.forma.reset({
      tipoTramite:"01",
      photos: []
     
    });

  }

  //crearListeners() {
    // this.forma.valueChanges.subscribe( valor => {
    //   console.log(valor);
    // });

    // this.forma.statusChanges.subscribe( status => console.log({ status }));
    //this.forma.get('nombre').valueChanges.subscribe( console.log );
  //}

  
  


  get nombreNoValido( ) {
    return this.forma.get('nombre')!.invalid && this.forma.get('nombre')!.touched
  }
  get apellidoNoValido( ) {
    return this.forma.get('apellido')!.invalid && this.forma.get('apellido')!.touched
  }
  get emailNoValido( ) {
    return this.forma.get('email')!.invalid && this.forma.get('email')!.touched
  }
  get direccionNoValido( ) {
    return this.forma.get('direccion')!.invalid && this.forma.get('direccion')!.touched
  }
  get localidadNoValido( ) {
    return this.forma.get('localidad')!.invalid && this.forma.get('localidad')!.touched
  }
  get telefonoNoValido( ) {
    return this.forma.get('telefono')!.invalid && this.forma.get('telefono')!.touched
  }
  get observacionesNoValido( ) {
    return this.forma.get('observaciones')!.invalid && this.forma.get('observaciones')!.touched
  }
  get cbuNoValido( ) {
    return this.forma.get('cbu')!.invalid && this.forma.get('cbu')!.touched
  }
  get numeroAsociadoNoValido( ) {
    return this.forma.get('numeroAsociado')!.invalid && this.forma.get('numeroAsociado')!.touched
  }
  
  

  
  mandarMail()
  {
  this.subscription = this.tramitesService.SendEmail("prueba","g@gmail.com").pipe(
    takeUntil(this.ngUnsubscribe))
    .subscribe(response => {
      console.log(response);
      this.msgOk = response;
      },
      (error) => {
        console.log(error);
        this.msgError = error.error;
      });
    }

   
    createItem(data:any): FormGroup {
      return this.fb.group(data);
  }
  
  //Help to get all photos controls as form array.
  get photos(): FormArray {
     return this.forma.get('photos') as FormArray;
  };

  extraerBase64 = async ($event: any) => new Promise((resolve , reject) :any => {
    try {
      const unsafeImg = window.URL.createObjectURL($event);
      const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () => {
        resolve({
          base: reader.result
        });
      };
      reader.onerror = error => {
        resolve({
          base: null
        });
      };

    } catch (e) {
      return null;
    }
  });

  subirArchivo(): any {
    try {
      this.loading = true;
      const formularioDeDatos = new FormData();

      this.photos.controls.forEach ((photo : any) => {
        formularioDeDatos.append('files', photo.value)
      });
     
      this.tramitesService.actualizarTramite(this.tramite) 
      .subscribe(res => {
        this.loading = false;
        console.log('Respuesta del servidor', res);

        this.tramitesService.actualizarTramiteadj(formularioDeDatos)
           .subscribe(res => {
            this.loading = false;
            console.log('Respuesta del servidor', res);

        }, () => {
          this.loading = false;
          alert('Error');
        })
      });
    } catch (e) {
      this.loading = false;
      console.log('ERROR', e);

    }
  }


  detectFiles(event:any)  {
      let files = event.target.files;
      if (files) {
          for (let file of files) {

            //this.extraerBase64(file).then((imagen: any) => {
            //  this.previsualizacion = imagen.base;
            //  });

              let reader = new FileReader();
              reader.readAsDataURL(file);
              reader.onload = (e: any) => {
                  this.photos.push(this.createItem({
                      file,
                      //url: e.target.result  //Base64 string for preview image
                      url: reader.result
                    }));
              console.log(reader.result);
              console.log(this.photos);
              
              
             // reader.readAsDataURL(file);
     
            }
        }
      }
    }
  }
