// Lớp BlogService cung cấp các phương thức để tương tác với một API blog, bao gồm việc lấy danh sách blog, 
// lấy một blog cụ thể, tạo mới,
//  cập nhật và xóa blog. Mỗi phương thức trả về một Observable để xử lý không đồng bộ các phản hồi HTTP. 
//  Hằng httpOptions được sử dụng để định nghĩa các tiêu đề HTTP cho các yêu cầu,
//   đảm bảo rằng máy chủ hiểu nội dung là ở định dạng JSON.
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// Dòng đầu tiên import các module cần thiết từ @angular/common/http và @angular/core

const BLOG_API = "http://localhost:8080/api/blog/";
// là URL của API của ứng dụng blog (trong ví dụ này là “http://localhost:8080/api/blog/”).
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
// chứa các thông tin về header (ở đây là chỉ định loại nội dung là JSON).
@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private http: HttpClient) { }

  // Constructor tiêm (inject) dịch vụ HttpClient, dịch vụ này sẽ được sử dụng để thực hiện các yêu cầu HTTP.

  getList():Observable<any>{
    return this.http.get(BLOG_API,httpOptions);
  }
  // Observable<any>: Phương thức này trả về một Observable sẽ phát ra phản hồi từ máy chủ.
  // Gửi một HTTP GET request đến API để lấy danh sách các bài viết blog.
  getListNewest(limit: number):Observable<any>{
    let params = new HttpParams();
    params = params.append('limit',limit);
    return this.http.get(BLOG_API + 'newest',{params: params});
  }
  // Gửi một HTTP GET request đến API để lấy danh sách các bài viết mới nhất, với giới hạn số lượng bài viết.
  // HttpParams: Được sử dụng để thêm các tham số truy vấn (limit) vào yêu cầu.


  getBlog(id: number):Observable<any>{
    return this.http.get(BLOG_API + id,httpOptions);
  }
// Gửi một HTTP GET request đến API để lấy thông tin chi tiết của một bài viết dựa trên ID.

  createBlog(title: string,description: string,content: string, imageId: number,tags: number[],username: string):Observable<any>{
    return  this.http.post(BLOG_API +'create',{title,description,content,imageId,tags,username},httpOptions);
  }
  // Phương thức này tạo một blog mới với các chi tiết được chỉ định. 
  // Các chi tiết này được gửi trong thân của yêu cầu POST.

  updateBLog(id: number,title: string,description: string,content: string, imageId: number,tags: number[]):Observable<any>{
    return this.http.put(BLOG_API + 'update/' +id,{id,title,description,content,imageId,tags},httpOptions);
  }
  // Phương thức này cập nhật một blog hiện có. Nó gửi các chi tiết cập nhật trong thân của yêu cầu PUT.

  deleleBlog(id: number){
    return this.http.delete(BLOG_API + 'delete/' + id,httpOptions);
  }
  // Phương thức này xóa một blog theo ID của nó.
}
