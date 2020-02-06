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
            this.setToken(Usermodule[0].name);
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
public updateuserdetails(id,name,email,pwd,mobile) {
  return this.httpClient.post<any>(this.baseUrl + '/updateuser.php', { id,name,email,pwd,mobile })
    .pipe(map(Usermodule => {
          return Usermodule;
      }));
 
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

setName(name: string) {
  localStorage.setItem('name', name);
}

getName() {
  return localStorage.getItem('name'); 
}
 
deleteToken() {
  localStorage.removeItem('token');
}
 
isLoggedIn() {
  const usertoken = this.getToken();
  if (usertoken != null) {
    return true
  }
  return false;
}
 
}
 