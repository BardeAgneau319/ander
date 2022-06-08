import { Component, OnInit } from '@angular/core';
import { Device } from '@awesome-cordova-plugins/device/ngx';

@Component({
  selector: 'app-phone',
  templateUrl: './phone.component.html',
  styleUrls: ['./phone.component.scss'],
})
export class PhoneComponent implements OnInit {

  constructor(
    public device: Device
  ) { }

  ngOnInit() {
  }

  deviceAvailable(): boolean {
    return !!(this.device?.platform);
  }

}
