import { Component } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  items = [{title:"Home",path:"/home"},{title:"Admin",path:"/adminpage"},{title:"addproduct",path:"/addproduct"}];

}
