import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
// HttpParams dùng để thiết lập các tham số cho các yêu cầu HTTP GET
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// Observable là một phần của RxJS và được sử dụng để xử lý các dữ liệu không đồng bộ.
import { Order } from '../_class/order';
import { OrderDetail } from '../_class/order-detail';
// Order và OrderDetail là các lớp mô hình (model) cho đơn hàng và chi tiết đơn hàng.
const ORDER_API = "http://localhost:8080/api/order/";
// chứa URL cơ bản của API liên quan đến đơn hàng.
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
// chứa các tiêu đề HTTP, trong trường hợp này là Content-Type: application/json, để cấu hình cho các yêu cầu HTTP.

@Injectable({
  providedIn: 'root'
})

// để đánh dấu rằng OrderService là một service có thể được inject vào các component khác trong ứng dụng.
export class OrderService {
  constructor(private http: HttpClient) { }
  // Hàm khởi tạo nhận vào một HttpClient để thực hiện các yêu cầu HTTP. 
  // HttpClient này được Angular cung cấp và inject vào service.

  getListOrder():Observable<any>{
    return this.http.get(ORDER_API,httpOptions);
  }
  // Phương thức getListOrder gửi yêu cầu HTTP GET tới URL ORDER_API để lấy danh sách các đơn hàng.

  getListOrderByUser(username: string):Observable<any>{
    let params = new HttpParams();
    params = params.append('username',username);
    return this.http.get(ORDER_API + 'user',{params: params});

  }
  // Phương thức getListOrderByUser nhận vào một username và 
  // gửi yêu cầu HTTP GET tới URL ORDER_API + 'user' để lấy danh sách các đơn hàng của người dùng cụ thể.
  // Sử dụng HttpParams để thêm tham số username vào URL.
  placeOrder(firstname: string,lastname:string,country:string,address: string,town: string,state:string,postCode: string,phone:string,email:string,note:string,orderDetails: OrderDetail[],username: string):Observable<any>{
    return this.http.post(ORDER_API +'create',{firstname,lastname,country,address,town,state,postCode,phone,email,note,orderDetails,username},httpOptions);
  }
//   Phương thức placeOrder nhận vào nhiều tham số liên quan đến đơn hàng 
//   (họ tên, địa chỉ, thông tin liên lạc, chi tiết đơn hàng, v.v.).
// Gửi yêu cầu HTTP POST tới URL ORDER_API + 'create' để tạo một đơn hàng mới.
// Dữ liệu đơn hàng được gửi đi dưới dạng JSON thông qua httpOptions.
}
