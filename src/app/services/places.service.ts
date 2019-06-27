import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConst } from "../utils/app-constants";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  constructor(private http: HttpClient) { }

  getPlaces(params: string): Observable<any> {
    return this.http.get(AppConst.getPlaces().toString() + params);
  }
}