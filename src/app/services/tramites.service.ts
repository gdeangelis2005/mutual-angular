import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TramitesModel } from '../models/tramites.model';
import { map, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TramiteService {

  private url = 'https://mutual-4008a-default-rtdb.firebaseio.com';


  constructor( private http: HttpClient ) { }


  crearTramite(tramite:  TramitesModel ) {

    return this.http.post(`${ this.url }/tramite.json`,  tramite)
            .pipe(
              map( (resp: any) => {
                tramite.id = resp.name;
                return  tramite;
              })
            );
    } 

   actualizarTramite(tramite:  TramitesModel ) {
    const  tramiteTemp = {
      ... tramite
    };

    //delete  tramiteTemp.id;

    return this.http.post(`${ this.url }/ tramite/${  tramite.id }.json`,  tramiteTemp)
    .pipe(
      map( (resp: any) => {
        
        return  resp;
      })
    );

    
  }

  actualizarTramiteadj(tramite:  FormData) {
    const  tramiteTemp = {
      ... tramite
    };

    //delete  tramiteTemp.id;

    return this.http.put(`${ this.url }/ tramite/`,  tramite);


  }


  borrarTramite( id: string ) {

    return this.http.delete(`${ this.url }/tramite/${ id }.json`);

  }


  getTramite( id: string ) {

    return this.http.get(`${ this.url }/tramite/${ id }.json`);

  }


  getTramites() {
    return this.http.get(`${ this.url }/tramite.json`)
            .pipe(
              map( this.crearArregloTramite ),
              delay(0)
            );
  }

  private crearArregloTramite(  tramiteObj: object ) {

    const  tramites:  TramitesModel[] = [];
    
    
    
    //Object.keys(  tramiteObj ).forEach( key => {
    //  const  tramite :Tramites =  tramiteObj[key];
    //  tramite.id = key;

    //  tramites.push(  tramite );
    //});


    return  tramites;

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


