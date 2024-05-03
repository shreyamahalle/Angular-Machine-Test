import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor( private http :HttpClient) { }

  getdata="http://localhost:3000/profile1"
  getUser(){
    return this.http.get(this.getdata)
  }

  addUser(formData:any){
    return this.http.post(this.getdata,formData)
  }

  updateUser(formData:any,id:any){
    return this.http.put(`${this.getdata}/${id}`,formData)
  }

}
