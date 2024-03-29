import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConst } from "../utils/app-constants";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationsService {

  constructor(private http: HttpClient) { }

  getLocations(): Observable<any> {
    return this.http.get(AppConst.getLocations());
  }
}
