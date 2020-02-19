import { Component, OnInit, Injectable } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { DataserviceService } from '../dataservice.service';
import {Usermodule} from '../usermodule'
// import { ValidationService } from 'src/app/Services/validation.service';
import {
  NgbCalendar,
  NgbDateAdapter,
  NgbDateStruct,
  NgbDateParserFormatter
} from '@ng-bootstrap/ng-bootstrap';

@Injectable()
export class CustomAdapter extends NgbDateAdapter<string> {

  readonly DELIMITER = '-';


  fromModel(value: string): NgbDateStruct {
    let result: NgbDateStruct = null;
    if (value) {
      let date = value.split(this.DELIMITER);
      result = {
        year : parseInt(date[0], 10),
        day : parseInt(date[2], 10),
        month : parseInt(date[1], 10)
      };
    }
    return result;
  }

  toModel(date: NgbDateStruct): string {
    let result: string = null;
    if (date) {
      result = date.year + "-" + date.month + "-" + date.day;
    }
    return result;
  }
}

@Injectable()
export class CustomDateParserFormatter extends NgbDateParserFormatter {

  readonly DELIMITER = '/';

  parse(value: string): NgbDateStruct {
    let result: NgbDateStruct = null;
    if (value) {
      let date = value.split(this.DELIMITER);
      result = {
        day : parseInt(date[0], 10),
        month : parseInt(date[1], 10),
        year : parseInt(date[2], 10)
      };
    }
    return result;
  }

  format(date: NgbDateStruct): string {
    let result: string = null;
    if (date) {
      result = date.day + this.DELIMITER + date.month + this.DELIMITER + date.year;
    }
    return result;
  }
}

@Component({
  selector: 'app-edithistoryuser',
  templateUrl: './edithistoryuser.component.html',
  styleUrls: ['./edithistoryuser.component.css'],
  providers: [
    {provide: NgbDateAdapter, useClass: CustomAdapter},
    {provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter}
  ]
})

export class EdithistoryuserComponent implements OnInit {

  angForm: FormGroup;
  submitted = false;
  userMo : Usermodule;

  constructor(private fb: FormBuilder,private dataService: DataserviceService,private router:Router) {
 
    this.angForm = this.fb.group({
        id: [''],
        idcard: ['',  [Validators.required, Validators.minLength(13), Validators.maxLength(13)]],
        title: ['', Validators.required],
        firstname: ['', Validators.required,],
        lastname: ['', Validators.required],
        sex: ['', Validators.required],
        blood: ['', Validators.required],
        birthdate: ['', Validators.required],
   
    });
   }
  get f() { return this.angForm.controls; }

  onReset() {
      this.submitted = false;
      this.angForm.reset();
  }
  
  ngOnInit() {
    let Id = window.localStorage.getItem("editId");

    console.log(Id);
    if(!Id) {
      this.router.navigate(['list-user']);
      return;
    }
    this.dataService.gethistoryUserId(+Id)
      .subscribe( data => {
      this.userMo = data;
       console.log('test userMo :',this.userMo);
      });
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode !== 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  postdata()
  {
    // this.submitted = true;
    // if (this.angForm.invalid) {
    //   return;
    // }
    
     let updateby = localStorage.getItem('role');
    this.userMo.USER_NAME = updateby;
    this.dataService.edithistoryuser(this.userMo)
    .pipe(first())
    .subscribe(
        data => {
          // this.router.navigate(['dashboard']); 
          alert("บันทึกสำเร็จ");

        },
        error => {
          alert("บันทึกไม่สำเร็จ");
          // this.router.navigate(['dashboard']);

        });
 
  }
  // get id() { return this.angForm.get('id'); }
  // get idcard() { return this.angForm.get('idcard'); }
  // get title() { return this.angForm.get('title'); }
  // get firstname() { return this.angForm.get('firstname'); }
  // get lastname() { return this.angForm.get('lastname'); }
  // get sex() { return this.angForm.get('sex'); }
  // get blood() { return this.angForm.get('blood'); }
  // get birthdate() { return this.angForm.get('birthdate'); }
  // get updateby() { return this.angForm.get('updateby'); }
 
}

