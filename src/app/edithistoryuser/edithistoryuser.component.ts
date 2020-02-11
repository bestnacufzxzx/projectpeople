import { Component, OnInit, Injectable } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { DataserviceService } from '../dataservice.service';
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
  constructor(private fb: FormBuilder,private dataService: DataserviceService,private router:Router) {
 
    this.angForm = this.fb.group({
        id: [''],
        idcard: ['',  Validators.required],
        title: ['', Validators.required],
        firstname: ['', Validators.required],
        lastname: ['', Validators.required],
        sex: ['', Validators.required],
        blood: ['', Validators.required],
        birthdate: ['', Validators.required],
   
    });
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
      //  this.angForm.controls[email].setValue('name')
      //  this.email.nativeElement.value = 'This is new value';
        this.angForm.patchValue({
          id:data[0].ID, idcard:data[0].CITIZEN_ID, title:data[0].TITLE, firstname:data[0].FIRST_NAME, lastname:data[0].LAST_NAME, sex:data[0].SEX, blood:data[0].BLOOD, birthdate:data[0].BIRTH_DATE
       });
      });
  }
  postdata(angForm1:NgForm)
  {
    let updateby = localStorage.getItem('role');
    console.log(updateby);
    this.dataService.edithistoryuser(angForm1.value.id,angForm1.value.idcard,angForm1.value.title,angForm1.value.firstname,angForm1.value.lastname,angForm1.value.sex,angForm1.value.blood,angForm1.value.birthdate,updateby)
 
    .pipe(first())
    .subscribe(
        data => {
          this.router.navigate(['dashboard']); 
          alert("บันทึกสำเร็จ");

        },
        error => {
          alert("บันทึกไม่สำเร็จ");
          this.router.navigate(['dashboard']);

        });
 
  }
  get id() { return this.angForm.get('id'); }
  get idcard() { return this.angForm.get('idcard'); }
  get title() { return this.angForm.get('title'); }
  get firstname() { return this.angForm.get('firstname'); }
  get lastname() { return this.angForm.get('lastname'); }
  get sex() { return this.angForm.get('sex'); }
  get blood() { return this.angForm.get('blood'); }
  get birthdate() { return this.angForm.get('birthdate'); }
  get updateby() { return this.angForm.get('updateby'); }
 
}