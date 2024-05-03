import { Component, Inject } from '@angular/core';
import { FormControl,FormGroup, Validators } from '@angular/forms';
import {  Router } from '@angular/router';
import { ServicesService } from '../services.service';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {

  constructor(private router: Router,private serv: ServicesService, private registeref:MatDialogRef<any>){}



  validForm = new FormGroup({
    file1: new FormControl(''),
    name:new FormControl('',[Validators.required, Validators.maxLength(20)]),
    lastname:new FormControl('',[Validators.required]),
    email:new FormControl('',[Validators.required, Validators.email]),
    mobile:new FormControl('',[Validators.required]),
    age:new FormControl('',[Validators.required]),
    state:new FormControl('',[Validators.required]),
    country:new FormControl('',[Validators.required]),
    address:new FormControl('',[Validators.required]),
    tags:new FormControl('',[Validators.required]),
    checked:new FormControl('',[Validators.required])
  })




// image change``
  imgurl:any="https://cdn3.iconfinder.com/data/icons/business-vol-26/100/Artboard_2-1024.png"
  imgValid:any=true
  onImageChange(e:any) {
    if(e.target.files) {
      if(e.target.files[0].size < 310*325){
        this.imgValid=false
        const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);

      reader.onload=(imgres:any)=>{
        console.log(imgres.target.result)
        this.imgurl=imgres.target.result
      }
      }
    }

  }

  cls:any
  subForm(){
    console.log(this.validForm.value)
    this.file1?.patchValue(this.imgurl)
    this.serv.addUser(this.validForm.value).subscribe(()=>{
      alert('data added Successfully!')
    })
    location.reload();
  }

  newPage(name:any){
    this.router.navigate(['/user',name])
    this.registeref.close()
  }

  get file1(){
    return this.validForm.get('file1')
  }

  get name(){
    return this.validForm.get('name')
  }

  get lastname(){
    return this.validForm.get('lastname')
  }







  formatLabel(value: number): string {

    return `${value}`;
  }

feildintrest:any=[]
num:any =1
  intrest(val:any){
   let obj:any={}

    obj["id"]=this.num
    obj["data"]=val
    this.feildintrest.push(obj)
    console.log(this.feildintrest)
    this.num++
  }

  cross(pid:any){
    console.log(pid)
    for(let obj in this.feildintrest){
      if(this.feildintrest[obj].id == pid){
        this.feildintrest.splice(obj,1)
      }
      else{
        console.log('invalid data!')
      }
    }


  }
}
