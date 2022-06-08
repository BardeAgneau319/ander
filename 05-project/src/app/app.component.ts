import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor() {}

  pages: any[];

  ngOnInit(): void {
    this.pages = [
      {
        title: "Conférence",
        url: "/home"
      },
      {
        title: "Sessions",
        url: "/sessions"
      },
      {
        title: "Téléphone",
        url: "/phone"
      },
    ]
  }  
}
