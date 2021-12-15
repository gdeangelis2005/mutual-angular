import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { UsuarioModel } from '../../models/usuario.model';
import { AuthService } from '../../services/auth.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  usuario: UsuarioModel = new UsuarioModel();
  recordarme = false;

  constructor( private auth: AuthService,
               private router: Router ) { }

  ngOnInit() {

    if ( localStorage.getItem('email') ) {
      const mail = localStorage.getItem('email');
      this.usuario.email = (mail !== null ? mail : ' ');
      this.recordarme = true;
    }

  }


  login( form: NgForm ) {

    if (  form.invalid ) { return; }

   // Swal.fire({
   //    allowOutsideClick: false,
   //   type: 'info',
   //   title: 'info',
   //   text: 'Espere por favor...'
   // });
    Swal.fire('Espere por favor...','Procesando...','info');
    Swal.showLoading();


    this.auth.login( this.usuario )
      .subscribe( resp => {

        console.log(resp);
        Swal.close();

        if ( this.recordarme ) {
          localStorage.setItem('email', this.usuario.email);
        }


        this.router.navigateByUrl('/home');

      }, (err) => {

        console.log(err.error.error.message);
        //Swal.fire({
        //  type: 'error',
        //  title: 'Error al autenticar',
        //  text: err.error.error.message
        //});
        Swal.fire('Error al autenticar',err.error.error.message,'error');
 
      });

  }

}
