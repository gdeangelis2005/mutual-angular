import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
//import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';                                         
import { ValidadoresService } from '../../services/validadores.service';    
import { filter, startWith, takeUntil } from 'rxjs/operators';                                                          
import { Observable, Subscription, Subject, of, from } from 'rxjs';   

import { HaceteSocioModel } from '../../models/haceteSocio.model';
import { HaceteSocioService } from '../../services/hacete-socio.service';
//import { ValidadoresService } from '../../services/validadores.service';

import Swal from 'sweetalert2';
//import { getMaxListeners } from 'process';

//import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-heroe',
  templateUrl: './hacete-socio.component.html',
  styleUrls: ['./hacete-socio.component.css']
})
export class HaceteSocioComponent implements OnInit {

  haceteSocio: HaceteSocioModel = new HaceteSocioModel();
  forma!: FormGroup;
  private ngUnsubscribe: Subject<any> = new Subject<any>();
  url: string ="";
  msgError: string ="";
  msgOk: string =""; ;
  subscription: Subscription = new Subscription(); //| undefined;



  constructor( private haceteSocioService: HaceteSocioService,
               private route: ActivatedRoute,
               private router: Router, 
               private fb: FormBuilder,
               private validadores: ValidadoresService ) { 
              
  this.crearFormulario();
  this.cargarDataAlFormulario();
  this.crearListeners();

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
    const nombre = this.forma.get('nombre');
    this.haceteSocio.nombre =  (nombre !== null ? nombre.value : ' '); 
    const apellido = this.forma.get('apellido');
    this.haceteSocio.apellido = (apellido !== null ? apellido.value : ' '); 
    const email = this.forma.get('email');
    this.haceteSocio.email = (email !== null ? email.value : ' ');
    const direccion = this.forma.get('direccion');
    this.haceteSocio.direccion = (direccion !== null ? direccion.value :' ');
    const localidad = this.forma.get('localidad');
    this.haceteSocio.localidad = (localidad !== null ? localidad.value : ' ');
    const estadocivil = this.forma.get('estadocivil');
    this.haceteSocio.estadocivil = (estadocivil !== null ? estadocivil.value : ' ');
    const observaciones = this.forma.get('observaciones');
    this.haceteSocio.observaciones = (observaciones !== null ? observaciones.value : ' '); 
    const telefono = this.forma.get('telefono');
    this.haceteSocio.telefono=(telefono !== null ? telefono.value :  ' '); 
    const cantidadHijos = this.forma.get('cantidadHijos');
    this.haceteSocio.cantidadHijos=(cantidadHijos != null ? cantidadHijos.value :  ' ');
    this.haceteSocio.cbu="";
    this.haceteSocio.estado=false; 
    this.haceteSocio.fechaPedido= new Date();
    this.haceteSocio.fechaAlta= new Date('01/01/1901');
    this.haceteSocio.fechaRechazo= new Date('01/01/1901');
    this.haceteSocio.motivoRechazo="";


  
  
    console.log(this.haceteSocio);

    let peticion: Observable<any>;

    if ( this.haceteSocio.id ) {
      peticion = this.haceteSocioService.actualizarHaceteSocio( this.haceteSocio );
    } else {
      peticion = this.haceteSocioService.crearHaceteSocio( this.haceteSocio );
    }

    peticion.subscribe( resp => {

      Swal.fire(this.haceteSocio.nombre,'Se actualizó correctamente','success');

      this.router.navigateByUrl('/home');


    });

  }

  crearFormulario() {

    this.forma = this.fb.group({
      nombre       : ['', [Validators.required] ],
      apellido     : ['', [Validators.required] ],
      email        : ['', [ Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')] ],
      direccion    : ['', [Validators.required] ],
      localidad    : ['', [Validators.required] ],
      estadocivil  : ['', [Validators.required] ],
      telefono     : ['', [Validators.required] ],
      cantidadHijos: ['', [Validators.required] ],
      observaciones: ['', ]
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

  cargarDataAlFormulario() {

    // this.forma.setValue({
    this.forma.reset({
    });

  }

  crearListeners() {
    // this.forma.valueChanges.subscribe( valor => {
    //   console.log(valor);
    // });

    // this.forma.statusChanges.subscribe( status => console.log({ status }));
    //this.forma.get('nombre').valueChanges.subscribe( console.log );
  }

  
  


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
  get estadocivilNoValido( ) {
    return this.forma.get('estadocivil')!.invalid && this.forma.get('estadocivil')!.touched
  }
  get telefonoNoValido( ) {
    return this.forma.get('telefono')!.invalid && this.forma.get('telefono')!.touched
  }
  get observacionesNoValido( ) {
    return this.forma.get('observaciones')!.invalid && this.forma.get('observaciones')!.touched
  }

  get cantidadHijosNoValido( ) {
    return this.forma.get('cantidadHijos')!.invalid && this.forma.get('cantidadHijos')!.touched
  }

  mandarMail()
  {
  this.subscription = this.haceteSocioService.SendEmail("prueba","g@gmail.com").pipe(
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


}
