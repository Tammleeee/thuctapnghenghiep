
// Đoạn mã trên là một Angular route guard được sử dụng để kiểm tra xem người dùng có quyền truy cập
//  vào một tài nguyên cụ thể hay không. 

import { Injectable } from '@angular/core';
//  import Injectable decorator từ Angular core module. Decorator này cho phép chúng ta sử dụng @Injectable() 
// để đánh dấu class AuthGuardService là một service có thể được inject vào các thành phần khác trong ứng dụng.
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})

// đặt trên class AuthGuardService để cho biết rằng service này được cung cấp ở mức ứng dụng (root level)
export class AuthGuardService implements CanActivate {

  isLoggedIn: boolean = false;  

  constructor(private storageService: StorageService,private router: Router) { }
  
//   Trong constructor, AuthGuardService nhận vào hai dependency injection: storageService và router.
// storageService là một service khác (có thể là lớp StorageService) được sử dụng để kiểm tra xem người dùng đã đăng nhập hay chưa.
// router là service để điều hướng người dùng đến các route khác trong ứng dụng.

  canActivate():boolean{
    // Đây là phương thức được gọi khi người dùng cố gắng truy cập
    //  vào một route được bảo vệ bởi AuthGuardService.
// Trong phương thức này:
    this.isLoggedIn = this.storageService.isLoggedIn();
    // kiểm tra xem người dùng đã đăng nhập hay chưa bằng cách gọi phương thức isLoggedIn() từ storageService.
    if(this.isLoggedIn == false){
      this.router.navigate(['/login']);
      return false;
    }
    // Nếu người dùng chưa đăng nhập (this.isLoggedIn == false), chúng ta
    //  điều hướng họ đến trang đăng nhập (this.router.navigate(['/login']);) và trả về false để ngăn họ truy cập vào route.
    return true;
    // Nếu người dùng đã đăng nhập, chúng ta trả về true để cho phép họ truy cập vào route
  }
}
