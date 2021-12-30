import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HaceteSocioModel } from '../models/haceteSocio.model';
import { map, delay } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class HaceteSocioService {

  private url1 = 'https://mutual-4008a-default-rtdb.firebaseio.com';
  //private url = 'https://localhost:5001/carnet';
  private url = 'https://www.mupolrionegro.org.ar:4434/carnet';


  constructor( private http: HttpClient ) { }


  crearHaceteSocio(haceteSocio:  HaceteSocioModel ) {
    console.log(haceteSocio);
    //return this.http.post(`${ this.url }/haceteSocio.json`,  haceteSocio)
//      return this.http.post(this._api.apiUrl + 'token', body, options)
//          .map((response: Response) => {
//              
//          });
  

//return this.http.post(`${ this.url}/haceteSocio`, haceteSocio,{
    //    headers: {
    //        'Content-Type': 'application/json',
    //        responseType : 'text'
    //             }
    

return this.http.post(`${ this.url }/haceteSocio`, haceteSocio)
             .pipe(
              map( (resp: any) => {
                console.log(resp);    
                return  resp;
             })
            );

  }
  
  //return $http.post(url, $httpParamSerializer(datos), {
  //  headers: {
  //      'Content-Type': 'application/json'
  //  }
// });
//var parametros = JSON.stringify({username:user_email, password:user_password});    

//return $http.post(url, parametros, {
//        headers: {
//            'Content-Type': 'application/json; charset=utf-8'
//        }
//    });

//login(username: string, password: string): Observable<boolean> {
//  let headers = new Headers({ 'Content-Type': 'application/json' });
//  let options = new RequestOptions({ headers: headers });
//  let body = JSON.stringify({ username: username, password: password });
//      return this.http.post(this._api.apiUrl + 'token', body, options)
//          .map((response: Response) => {
//              
//          });
//  }
  
  actualizarHaceteSocio(haceteSocio:  HaceteSocioModel ) {

    const  haceteSocioTemp = {
      ... haceteSocio
    };

    //delete  haceteSocioTemp.id;

    return this.http.put(`${ this.url }/ haceteSocio/${  haceteSocio.id }.json`,  haceteSocioTemp);


  }

  borrarHaceteSocio( id: string ) {

    return this.http.delete(`${ this.url }/haceteSocio/${ id }.json`);

  }


  getHaceteSocio( id: string ) {

    return this.http.get(`${ this.url }/haceteSocio/${ id }.json`);

  }


  getHaceteSocios() {
    return this.http.get(`${ this.url }/haceteSocio.json`)
            .pipe(
              map( this.crearArreglo ),
              delay(0)
            );
  }

  private crearArreglo(  haceteSocioObj: object ) {

    const  haceteSocios:  HaceteSocioModel[] = [];

    //Object.keys(  haceteSocioObj ).forEach( key => {

    //  const  haceteSocio:  HaceteSocioModel =  haceteSocioObj[key];
    //  haceteSocio.id = key;

    //  haceteSocios.push(  haceteSocio );
    //});


    return  haceteSocios;

  }


  getQuery(query: string) {

    const url =   `https://192.168.52.119/MS-Descarga/api/v1/${query}`;

    console.log(url);
    return this.http.get<any>(url);
  }

  SendEmail(documento: string, email: string) {
    //  let token = this.vtoken;
        return this.getQuery(`${documento}/enviar/${email}`);
  }

  


}
