import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConst } from "../utils/app-constants";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient) { }

  getCategories(): Observable<any> {
    let a = AppConst.getCategories();
    return this.http.get(AppConst.getCategories());
  }
}
