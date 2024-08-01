// ImageService cung cấp các phương thức để tải lên tệp hình ảnh và lấy danh sách các hình ảnh từ một API.

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const IMAGE_API = "http://localhost:8080/api/image/";
// chứa URL cơ bản của API liên quan đến hình ảnh.
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http:HttpClient) { }
  // Hàm khởi tạo nhận vào một HttpClient để thực hiện các yêu cầu HTTP.
  //  HttpClient này được Angular cung cấp và inject vào service.
  upload(file:File){
    // Phương thức upload nhận vào một tệp (File) và tạo một đối tượng FormData.
    const formData: FormData = new FormData();
    // FormData là một đối tượng đặc biệt để gửi dữ liệu dưới dạng multipart/form-data, thường được sử dụng khi tải lên tệp.
    formData.append('file',file);
    // formData.append('file', file) thêm tệp vào FormData với tên là 'file'.
    return this.http.post<any>(IMAGE_API+'upload-file',formData); 
    // gửi yêu cầu HTTP POST tới API để tải lên tệp, với URL được nối từ IMAGE_API và 'upload-file', và dữ liệu là formData.
  }

  getList(){
    // Phương thức getList gửi yêu cầu HTTP GET tới URL IMAGE_API để lấy danh sách các hình ảnh.
    return this.http.get(IMAGE_API,httpOptions);
    // httpOptions được sử dụng để thiết lập tiêu đề của yêu cầu, trong trường hợp này là 'Content-Type': 'application/json'.
  }
}
