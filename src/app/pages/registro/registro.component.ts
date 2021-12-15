import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { UsuarioModel } from '../../models/usuario.model';
import { AuthService } from '../../services/auth.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario: UsuarioModel = new UsuarioModel();
  recordarme = false;
  estado : String =' ';

  constructor( private auth: AuthService,
               private router: Router ) { }

  ngOnInit() {
    this.usuario = new UsuarioModel();
  }

  


  onSubmit( form: NgForm ) {

    if ( form.invalid ) { return; }

    //Swal.fire({
    //  allowOutsideClick: false,
    //  type: 'info',
    //  text: 'Espere por favor...'
    //});
    Swal.fire('Espere por favor...','Procesando...','info');
      
    Swal.showLoading();

    console.log("entra " + this.usuario.nroasociado);
    this.estado = '';


    this.auth.validaUsuario( this.usuario.nroasociado ,this.usuario.email )
     .subscribe( (resp :string) => {
     
      this.estado = resp;
      console.log("estado 2",this.estado);
      this.MensajeSalida();
      this.validafirebase(); 
    }, (err) => {
      this.estado = 'NOK';
      console.log(err.error.error.message);
      this.MensajeSalida();
    });
   
    
    }
    MensajeSalida() {

      if (this.estado !== 'OK')
       this.estado = 'NOK';

    console.log("estado termino",this.estado);
    

    if (this.estado === 'NOK')
    {
      Swal.close();
    
      Swal.fire('No es Socio Activo','','error');
        this.router.navigateByUrl('/home');

    }

    }

    validafirebase() {


    if (this.estado === 'OK')
    {
      Swal.close();
    this.auth.nuevoUsuario( this.usuario )
      .subscribe( resp => {

        console.log(resp);

        if ( this.recordarme ) {
          localStorage.setItem('email', this.usuario.email);
        }

        Swal.fire('ALTA DE SOCIO EN LA PAGINA','','success');
        
        this.router.navigateByUrl('/home');

      }, (err) => {
        console.log(err.error.error.message);
        Swal.close();
    
        Swal.fire('Error al autenticar',err.error.error.message,'error');
       
        
        this.router.navigateByUrl('/home');

      });
    } 
  }


}
