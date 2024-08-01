import { HttpClient, HttpHeaders } from '@angular/common/http';
//  Dòng này import hai module từ @angular/common/http. Module HttpClient cho phép gửi HTTP requests và 
// nhận HTTP responses trong Angular. 
// Module HttpHeaders được sử dụng để định nghĩa các HTTP headers (các tiêu đề HTTP) cho các requests.
import { Injectable } from '@angular/core';
// Dòng này import decorator Injectable từ @angular/core. Injectable được sử dụng 
// để đánh dấu rằng AuthService là một service có thể được inject vào các component khác trong ứng dụng.
import { Observable } from 'rxjs';
// Dòng này import Observable từ rxjs.
// Observable là một phần của thư viện RxJS và được sử dụng để xử lý các luồng dữ liệu bất đồng bộ.
const AUTH_API = "http://localhost:8080/api/auth/";
// Dòng này import Observable từ rxjs. 
// Observable là một phần của thư viện RxJS và được sử dụng để xử lý các luồng dữ liệu bất đồng bộ.
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
// Biến httpOptions chứa các tùy chọn cho HTTP requests.
// Trong trường hợp này, nó chỉ định rằng các requests sẽ có Content-Type là application/json.

@Injectable({
  providedIn: 'root'
})
// Decorator @Injectable được sử dụng để khai báo rằng AuthService là một service được cung cấp ở mức ứng dụng (root level).
// Điều này cho phép Angular inject AuthService vào bất kỳ component nào trong ứng dụng.
export class AuthService {

  constructor(private http:HttpClient) { }

  register(username: string, email: string, password: string):Observable<any>{
    return this.http.post(AUTH_API + 'register',{username,email,password},httpOptions);
  }
  // Phương thức register gửi một request POST đến địa chỉ AUTH_API + 'register' với các thông tin username, email, và password. 
  // Nó trả về một Observable để xử lý kết quả của request.

  login(username: string,password: string):Observable<any>{
    return this.http.post(AUTH_API+ "login",{username,password},httpOptions);
  }
// Tương tự, phương thức login gửi một request POST đến địa chỉ AUTH_API + 'login' 
// với thông tin username và password
  logout():Observable<any>{
    return this.http.post(AUTH_API + "logout",{},httpOptions);
  }
}
