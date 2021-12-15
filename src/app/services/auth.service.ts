import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.model';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty';
  //  private apikey = 'AIzaSyCr--fzsw8mVaADP3mPVyy72vsQKvJ6cYY';
  private apikey = 'AIzaSyAnUJC2OkJtW-QhZn8ZZLfqoPu4LaztPoc';
  //project-925127114724
  private url1= 'https://www.mupolrionegro.org.ar:4434/carnet/socio';
  //private url1= 'https://www.mupolrionegro.org.ar/sp/servicioPagina/socio';
   // /406660000


  userToken="";
  referencia="";

 
  // Crear nuevo usuario
  // https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=[API_KEY]


  // Login
  // https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=[API_KEY]


  constructor( private http: HttpClient ) {
    this.leerToken();
  }


  logout() {
    localStorage.removeItem('token');
  }

  login( usuario: UsuarioModel ) {

    const authData = {
      ...usuario,
      returnSecureToken: true
    };

    return this.http.post(
      `${ this.url }/verifyPassword?key=${ this.apikey }`,
      authData
    ).pipe(
      map( resp => {
        // esto this.guardarToken( resp['idToken'] );
        this.guardarToken( resp.toString());
        return resp;
      })
    );

  }

  
  validaUsuario( usuario: string , email: string ):Observable<string>
  {
    this.referencia = this.url1 +"/"+ usuario+"/"+ email;
    console.log(this.referencia);
    return this.http.get(this.referencia,{responseType : 'text'});

  }



  nuevoUsuario( usuario: UsuarioModel ) {

    const authData = {
      ...usuario,
      returnSecureToken: true
    };

    return this.http.post(
      `${ this.url }/signupNewUser?key=${ this.apikey }`,
      authData
    ).pipe(
      map( resp => {
        //this.guardarToken( resp['idToken'] );
        this.guardarToken( resp.toString() );

        return resp;
      })
    );

  }


  private guardarToken( idToken: string ) {

    this.userToken = idToken;
    localStorage.setItem('token', idToken);

    let hoy = new Date();
    hoy.setSeconds( 3600 );

    localStorage.setItem('expira', hoy.getTime().toString() );


  }

  leerToken() {

    if ( localStorage.getItem('token') ) {
      const token = localStorage.getItem('token');
      this.userToken = (token !== null ? token : ' ');
    } else {
      this.userToken = '';
    }

    return this.userToken;

  }


  estaAutenticado(): boolean {

    if ( this.userToken.length < 2 ) {
      return false;
    }

    const expira = Number(localStorage.getItem('expira'));
    const expiraDate = new Date();
    expiraDate.setTime(expira);

    if ( expiraDate > new Date() ) {
      return true;
    } else {
      return false;
    }


  }


}
