import { Component, OnInit, Injectable} from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { DataserviceService } from '../dataservice.service';
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
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css'],
  providers: [
    {provide: NgbDateAdapter, useClass: CustomAdapter},
    {provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter}
  ]
})

export class AdduserComponent implements OnInit {

  angForm: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder,private dataService: DataserviceService,private router:Router) {
 
    this.angForm = this.fb.group({
      idcard: ['', [Validators.required, Validators.minLength(13), Validators.maxLength(13)]],
      title: ['', Validators.required],
      firstname: ['', Validators.required],
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
    // let createby = localStorage.getItem('role');
    // console.log(createby)
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode !== 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  postdata(angForm1:NgForm)
  {
    this.submitted = true;

    // stop here if form is invalid
    if (this.angForm.invalid) {
        return;
    }
    
    let createby = localStorage.getItem('role');
    this.dataService.adduser(angForm1.value.idcard,angForm1.value.title,angForm1.value.firstname,angForm1.value.lastname,angForm1.value.sex,angForm1.value.blood,angForm1.value.birthdate,createby)
      .pipe(first())
      .subscribe(
          data => {
            this.router.navigate(['dashboard']);
              // this.router.navigate(['login']);
              alert("บันทึกไม่สำเร็จ");

          },
          error => {
            alert("บันทึกสำเร็จ");
            // this.router.navigate(['dashboard']);

          });
  }
  get idcard() { return this.angForm.get('idcard'); }
  get title() { return this.angForm.get('title'); }
  get firstname() { return this.angForm.get('firstname'); }
  get lastname() { return this.angForm.get('lastname'); }
  get sex() { return this.angForm.get('sex'); }
  get blood() { return this.angForm.get('blood'); }
  get birthdate() { return this.angForm.get('birthdate'); }
  get createby() { return this.angForm.get('createby'); }

}
