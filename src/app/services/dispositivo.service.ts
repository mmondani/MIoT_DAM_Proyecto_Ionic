import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Dispositivo } from '../dispositivo';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, retry, pluck, filter } from 'rxjs/operators';
import { Medicion } from './medicion';
import { Riego } from './riego';


@Injectable({
  providedIn: 'root'
})
export class DispositivoService {
  private listadoDispositivos: Array<Dispositivo>;
  public dispositivosSubject: Subject<Array<Dispositivo>> = new Subject<Array<Dispositivo>>();
  public dispositivoSubject: Subject<Dispositivo> = new Subject<Dispositivo>();
  public ultimoRiegoSubject: Subject<Riego> = new Subject<Riego>();
  public ultimaMedicionSubject: Subject<Medicion> = new Subject<Medicion>();
  public medicionesSubject: Subject<Array<Medicion>> = new Subject<Array<Medicion>>();


  constructor(private http: HttpClient) {
    this.listadoDispositivos = [
      new Dispositivo(1, "Sensor 1", "Patio", 1),
      new Dispositivo(2, "Sensor 2", "Cocina", 2),
      new Dispositivo(3, "Sensor 3", "Jardin Delantero", 3),
      new Dispositivo(4, "Sensor 4", "Living", 4)
    ];
  }

  public getDispositivos(): void {
    let options = {
      observe: 'response' as const
    };

    this.http
      .get<Array<Dispositivo>>("http://localhost:8000/dispositivo", options)
      .pipe(
        filter(resp => resp.status == 200))
      .subscribe(resp => {
          this.listadoDispositivos = [...resp.body!];
          this.dispositivosSubject.next(this.listadoDispositivos);
      })
  }

  public getDispositivo(id: number): void {
    let options = {
      observe: 'response' as const
    };

    this.http
      .get<Dispositivo>(`http://localhost:8000/dispositivo/${id}`, options)
      .pipe(
        filter(resp => resp.status == 200))
      .subscribe(resp => {
          this.dispositivoSubject.next(resp.body);
      })
  }

  public getUltimaMedicion(id: number): void {
    let options = {
      observe: 'response' as const
    };

    this.http
    .get<Medicion>(`http://localhost:8000/medicion/last/${id}`, options)
    .pipe(
      filter(resp => resp.status == 200))
    .subscribe(resp => {
        this.ultimaMedicionSubject.next(resp.body);
    })
  }

  public getUltimoRiego(id: number): void {
    let options = {
      observe: 'response' as const
    };

    this.http
      .get<Riego>(`http://localhost:8000/riego/last/${id}`, options)
      .pipe(
        filter(resp => resp.status == 200))
      .subscribe(resp => {
          this.ultimoRiegoSubject.next(resp.body);
      })
  }

  public getMediciones(id: number): void {
    let options = {
      observe: 'response' as const
    };

    this.http
      .get<Array<Medicion>>(`http://localhost:8000/medicion/${id}`, options)
      .pipe(
        filter(resp => resp.status == 200))
      .subscribe(resp => {
          this.medicionesSubject.next(resp.body);
      })
  }
}
