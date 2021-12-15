import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HaceteSocioModel } from '../models/haceteSocio.model';
import { map, delay } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class HaceteSocioService {

  private url = 'https://mutual-4008a-default-rtdb.firebaseio.com';


  constructor( private http: HttpClient ) { }


  crearHaceteSocio(haceteSocio:  HaceteSocioModel ) {

    return this.http.post(`${ this.url }/haceteSocio.json`,  haceteSocio)
            .pipe(
              map( (resp: any) => {
                haceteSocio.id = resp.name;
                return  haceteSocio;
              })
            );

  }  actualizarHaceteSocio(haceteSocio:  HaceteSocioModel ) {

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
