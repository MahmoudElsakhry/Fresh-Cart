import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Enviroment } from '../../base/enviroment';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private HttpClient:HttpClient) { }
  getCategory(): Observable<any>{
    return this.HttpClient.get(`${Enviroment.BaseUrl}/api/v1/categories`)
  }
  getSpecificCategory(id:string): Observable<any>{
    return this.HttpClient.get(`${Enviroment.BaseUrl}/api/v1/categories/${id}`)

  }
}
