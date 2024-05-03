import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ServicesService } from '../services.service';
import { UpdateComponent } from '../update/update.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {


  constructor(private serv: ServicesService, private actv:ActivatedRoute,private dialog:MatDialog){}
nameProfile:any
  ngOnInit(){
      this.actv.params.subscribe((user)=>{
        this.nameProfile = user['name']
        console.log(this.nameProfile)
      })
      this.getUser();
  }

  userdata:any
  newUserData:any

  imgch:any=0
  iduser:any=[]
  getUser(){
    this.serv.getUser().subscribe((data)=>{
        this.userdata=data
        console.log(this.userdata)

        for(let d of this.userdata){
          if(d.name == this.nameProfile){
            this.newUserData=d
            this.iduser.push(d.id)
            console.log(this.newUserData, this.iduser)
            this.imgurl=this.newUserData.file1
          }

        }
    })
  }

  imgurl:any
  onImageChange(e:any) {
    if(e.target.files) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);

      reader.onload=(imgres:any)=>{
        console.log(imgres.target.result)
        this.imgurl=imgres.target.result
        this.newUserData.file1= this.imgurl

      this.serv.updateUser(this.newUserData,this.newUserData.id).subscribe(()=>{
        console.log(this.imgurl, this.newUserData )
      })
      }

    }

  }


  openDialog() {
    this.dialog.open(UpdateComponent, {
    width:"36%",
    data:this.newUserData.id
    });
  }



  edit(val:any){
    console.log(val)

  }
}
