import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  upload(event){
    console.log("hello save kar lo", event)
  }
  title = 'frontend';
}
