import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// HttpClient: Được sử dụng để thực hiện các yêu cầu HTTP.

// Mỗi phương thức này sử dụng HttpClient để gửi yêu cầu HTTP đến API và nhận phản hồi, 
// với các tiêu đề HTTP được cấu hình để chỉ định rằng dữ liệu được gửi và nhận là JSON.

// HttpHeaders: Được sử dụng để thiết lập các tiêu đề HTTP cho các yêu cầu.
// Injectable: Đánh dấu lớp này có thể được cung cấp và tiêm vào các thành phần khác.
// Observable: Một phần của thư viện RxJS, dùng để xử lý dữ liệu không đồng bộ.


const CATEGORY_API = "http://localhost:8080/api/category/";
// Địa chỉ cơ sở của API về danh mục
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
// Cấu hình các tiêu đề HTTP, trong trường hợp này, thiết lập Content-Type là application/json.
@Injectable({
  providedIn: 'root'
})
// Đánh dấu dịch vụ này có thể được tiêm vào và có phạm vi tồn tại toàn ứng dụng.
export class CategoryService {

  constructor(private http: HttpClient) { }
  // Constructor tiêm (inject) dịch vụ HttpClient, dịch vụ này sẽ được sử dụng để thực hiện các yêu cầu HTTP.
  getListCategory():Observable<any>{
    return this.http.get(CATEGORY_API,httpOptions);
  }
  // gửi một yêu cầu HTTP GET đến API để lấy danh sách các danh mục. Kết quả trả về là một Observable

  getListCategoryEnabled(){
    return this.http.get(CATEGORY_API + 'enabled',httpOptions);
  }
//  gửi một yêu cầu HTTP GET đến API để lấy danh sách các danh mục được kích hoạt.
  createCategory(name: string){
    return this.http.post(CATEGORY_API + 'create',{name},httpOptions);
  }
  // gửi một yêu cầu HTTP POST để tạo một danh mục mới với tên danh mục được truyền vào.
  updateCategory(id: number, name: string){
    return  this.http.put(CATEGORY_API + 'update/' + id,{name},httpOptions);
  }
  // gửi một yêu cầu HTTP PUT để cập nhật tên của danh mục với ID cụ thể.
  enableCategory(id: number){
    return this.http.put(CATEGORY_API + 'enable/'+ id,httpOptions);
  }
  // gửi một yêu cầu HTTP PUT để kích hoạt danh mục với ID cụ thể.
  deleteCategory(id:number){
    return this.http.delete(CATEGORY_API + 'delete/'+ id,httpOptions);
  }

  // gửi một yêu cầu HTTP DELETE để xóa danh mục với ID cụ thể.
}
