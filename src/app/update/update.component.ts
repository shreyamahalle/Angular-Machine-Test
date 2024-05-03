import { Component, Inject } from '@angular/core';
import { FormControl,FormGroup, Validators } from '@angular/forms';
import {  Router } from '@angular/router';
import { ServicesService } from '../services.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent {

  constructor(private router: Router,private serv: ServicesService,
    @Inject(MAT_DIALOG_DATA) public editdata: any,
    private registeref:MatDialogRef<any>){}

ngOnInit(){
  this.getUser()
}

  validForm = new FormGroup({
    file1:new FormControl(''),
    name:new FormControl('',[Validators.required]),
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



  fdata:any
  userData:any
  userID:any
  getUser(){
    this.serv.getUser().subscribe((data)=>{
        this.fdata=data
        for(let d of this.fdata){
          if(d.id == this.editdata){
            this.userData=d
          }
        }
        console.log(this.userData)

        this.userID=this.userData.id
        // this.file1?.patchValue(this.userData.file1)
        this.name?.patchValue(this.userData.name)
        this.lastname?.patchValue(this.userData.lastname)
        this.email?.patchValue(this.userData.email)
        this.mobile?.patchValue(this.userData.mobile)
        this.age?.patchValue(this.userData.age)
        this.state?.patchValue(this.userData.state)
        this.country?.patchValue(this.userData.country)
        this.address?.patchValue(this.userData.address)
        this.tags?.patchValue(this.userData.tags)
        this.checked?.patchValue(this.userData.checked)
        this.imgurl=this.userData.file1
    })
  }

  imgurl:any
  imgurl1:any
  onImageChange(e:any) {

    if(e.target.files) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);

      reader.onload=(imgres:any)=>{
        this.imgurl1=imgres.target.result
        console.log("image path",this.imgurl)
      }
    }

  }

  updatePage(name:any){
    this.router.navigate(['/user',name])
    this.registeref.close()
  }



  cls:any
  updatesubForm(){
    this.file1?.patchValue(this.imgurl)
    console.log(this.validForm.value)
    this.serv.updateUser(this.validForm.value,this.userID).subscribe(()=>{
      alert('data Update Successfully!')
    })
    location.reload();
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
  get email(){
    return this.validForm.get('email')
  }
  get mobile(){
    return this.validForm.get('mobile')
  }
  get age(){
    return this.validForm.get('age')
  }
  get state(){
    return this.validForm.get('state')
  }
  get country(){
    return this.validForm.get('country')
  }
  get address(){
    return this.validForm.get('address')
  }
  get tags(){
    return this.validForm.get('tags')
  }
  get checked(){
    return this.validForm.get('checked')
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
