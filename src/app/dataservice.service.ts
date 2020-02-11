import { Injectable, Output, EventEmitter } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usermodule } from './usermodule';
 
@Injectable({
  providedIn: 'root'
})
export class DataserviceService {
  redirectUrl: string;
 
  baseUrl:string = "http://localhost/uat/api";
@Output() getLoggedInName: EventEmitter<any> = new EventEmitter();
  constructor(private httpClient : HttpClient) { }
  public userlogin(username, password) {
    return this.httpClient.post<any>(this.baseUrl + '/login.php', { username, password })
        .pipe(map(Usermodule => {
            this.setToken(Usermodule[0].USER_NAME);
            this.setRole(Usermodule[0].USER_NAME);
            this.setName(Usermodule[0].FIRST_NAME , Usermodule[0].LAST_NAME);
            this.getLoggedInName.emit(true);
            return Usermodule;
        }));
}
public userregistration(name,email,pwd,mobile) {
  return this.httpClient.post<any>(this.baseUrl + '/registration.php', { name,email, pwd,mobile })
      .pipe(map(Usermodule => {
          return Usermodule;
      }));
}


public adduser(idcard, title, firstname, lastname, sex, blood, birthdate, createby) {
  return this.httpClient.post<any>(this.baseUrl + '/adduser.php', { idcard, title, firstname, lastname, sex, blood, birthdate, createby })
      .pipe(map(Usermodule => {
          return Usermodule;
      }));
}
public updateuserdetails(id,name,email,pwd,mobile) {
  return this.httpClient.post<any>(this.baseUrl + '/updateuser.php', { id,name,email,pwd,mobile })
    .pipe(map(Usermodule => {
          return Usermodule;
      }));
 
}

public edithistoryuser(id, idcard, title, firstname, lastname, sex, blood, birthdate, updateby) {
  return this.httpClient.post<any>(this.baseUrl + '/updatehitoryuser.php', { id, idcard, title, firstname, lastname, sex, blood, birthdate, updateby })
    .pipe(map(Usermodule => {
          return Usermodule;
      }));
 
}

public gethistoryUserId(empid: number): Observable<Usermodule[]>
  {
    return this.httpClient.get<Usermodule[]>(
      this.baseUrl + '/gethistoryuserdataone.php?'+ 'empid=' + empid 
      );
  }



removeEmployee(empid: number): Observable<Usermodule[]> {
  return this.httpClient.delete<Usermodule[]>(this.baseUrl+'/deletedata.php?empid='+empid );
}
public getUserId(empid: number): Observable<Usermodule[]>
  {
    return this.httpClient.get<Usermodule[]>(
      this.baseUrl + '/getdataone.php?'+ 'empid=' + empid 
      );
  }
 
getAllUsers(id) : Observable<Usermodule[] > {
  return this.httpClient.get<Usermodule[]>(this.baseUrl+'/getdata.php');
}
 
//token
setToken(token: string) {
  localStorage.setItem('token', token);
}
 
getToken() {
  return localStorage.getItem('token'); 
}

setName(FIRST_NAME: string, LAST_NAME: string) {
  localStorage.setItem('fullname', FIRST_NAME +" "+LAST_NAME);
}

setRole(role:string){
  localStorage.setItem('role', role);
}

getRole(){
  return localStorage.getItem('role');
}

getName() {
  return localStorage.getItem('fullname'); 
}
 
deleteToken() {
  localStorage.removeItem('token');
  localStorage.removeItem('fullname'); 

}
 
isLoggedIn() {
  const usertoken = this.getToken();
  if (usertoken != null) {
    return true
  }
  return false;
}
 
}
 