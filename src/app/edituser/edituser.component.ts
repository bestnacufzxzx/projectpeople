import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { DataserviceService } from '../dataservice.service';
 
@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.css']
})
export class EdituserComponent implements OnInit {
 
  angForm: FormGroup;
  constructor(private fb: FormBuilder,private dataService: DataserviceService,private router:Router) {
 
    this.angForm = this.fb.group({
      email: ['', [Validators.required,Validators.minLength(1), Validators.email]],
      password: ['', Validators.required],
      name: ['', Validators.required],
      mobile: ['', Validators.required],
      id: ['']
 
    });
   }
 
  ngOnInit() {
    let Id = window.localStorage.getItem("editId");
    if(!Id) {
      this.router.navigate(['list-user']);
      return;
    }
    this.dataService.getUserId(+Id)
      .subscribe( data => {
       // this.angForm.controls[email].setValue('name')
       // this.email.nativeElement.value = 'This is new value';
        this.angForm.patchValue({
          // id:data[0].Id,name: data[0].name, email: data[0].email, password: data[0].pwd, mobile: data[0].mobile
 
       });
      });
  }
  postdata(angForm1:NgForm)
  {
    this.dataService.updateuserdetails(angForm1.value.id, angForm1.value.name,angForm1.value.email,angForm1.value.password,angForm1.value.mobile)
 
    .pipe(first())
    .subscribe(
        data => {
            this.router.navigate(['dashboard']);
        },
        error => {
        });
 
  }
  get email() { return this.angForm.get('email'); }
  get password() { return this.angForm.get('password'); }
  get name() { return this.angForm.get('name'); }
  get mobile() { return this.angForm.get('mobile'); }
  get id() { return this.angForm.get('id'); }
 
}