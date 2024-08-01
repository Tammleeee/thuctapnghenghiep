// CartService: Quản lý giỏ hàng bằng cách sử dụng localStorage để lưu trữ trạng thái
//  và cung cấp các phương thức để thêm, cập nhật, xóa, và lấy các mục trong giỏ hàng.
// Các phương thức chính: addToCart, updateCart, remove, clearCart, getItems, getTotalPrice, loadCart, và productInCart.
// Lưu trữ: Sử dụng localStorage để lưu và tải trạng thái giỏ hàng, đảm bảo giỏ hàng vẫn duy trì sau khi tải lại trang.


import { EventEmitter, Injectable } from '@angular/core';
// EventEmitter dùng để phát các sự kiện, còn Injectable để đánh dấu lớp có thể được tiêm vào (inject).
import { InputText } from 'primeng/inputtext';
import { Observable, of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  items : any[] =[];
  
  totalPrice =0;

  total = 0;
  // items: Mảng chứa các mục trong giỏ hàng.
  // totalPrice: Biến để lưu tổng giá của các mục trong giỏ hàng.
  // total: Biến để lưu tổng giá (dư thừa với totalPrice).

  constructor() { }
  // Khởi tạo dịch vụ, không có hành động cụ thể nào được thực hiện ở đây

  saveCart():void{
    localStorage.setItem('cart_items',JSON.stringify(this.items));
  }
  // Lưu trạng thái hiện tại của giỏ hàng vào localStorage dưới dạng JSON.

  addToCart(item: any,quantity: number){
    this.loadCart();
    if(!this.productInCart(item)){
      item.quantity = quantity;
      item.subTotal = item.quantity * item.price;
      this.items.push(item)
    }else{
      this.items.forEach(res => {
        if(res.id == item.id){
          res.quantity += quantity;
          res.subTotal = res.quantity * res.price;
        }
      });
    }
    item.quantity = quantity;
    this.saveCart();
    this.getTotalPrice();

  }
  // Thêm mục vào giỏ hàng hoặc cập nhật số lượng nếu mục đã tồn tại. 
  // Sau đó lưu trạng thái giỏ hàng và tính lại tổng giá.

  updateCart(item:any,quantity: number){
    this.items.forEach(res =>{
      if(res.id == item.id){
        res.quantity = quantity;
        res.subTotal = res.quantity * res.price;
      }
    })
    this.saveCart();
    this.getTotalPrice();
  }
  // Cập nhật số lượng của mục trong giỏ hàng và tính lại tổng giá.

  productInCart(item: any):boolean{
    return this.items.findIndex((x:any) => x.id == item.id) > -1;
  }
  // Kiểm tra xem mục đã có trong giỏ hàng chưa
  
  loadCart():void{
    this.items = JSON.parse(localStorage.getItem('cart_items') as any) || [];
    this.getTotalPrice();

  }
  // Tải giỏ hàng từ localStorage và tính lại tổng giá.

  getItems() {
    return this.items;
    this.getTotalPrice();
  }
// Lấy danh sách các mục trong giỏ hàng.


  getTotalPrice(){
    this.totalPrice = 0;
    this.total = 0;
    this.items.forEach(res =>{
      this.totalPrice += res.subTotal;
      this.total = this.totalPrice;
    })
    return this.totalPrice;
  }
  // Tính tổng giá của các mục trong giỏ hàng

  remove(item: any){
    const index = this.items.findIndex((o:any) => o.id == item.id);
    if(index > -1){
      this.items.splice(index,1);
      this.saveCart();
    }
    this.getTotalPrice();
  }
  // Xóa mục khỏi giỏ hàng, lưu trạng thái và tính lại tổng giá.

  clearCart(){
    this.items = [];
    this.getTotalPrice();
    localStorage.removeItem('cart_items');
  }
  // Xóa toàn bộ giỏ hàng, tính lại tổng giá và xóa giỏ hàng khỏi localStorage.
}
