import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  blnIsEnabled;
  // @Output() blnIsEnabled = new EventEmitter<boolean>();;
  constructor() { }

  ngOnInit(): void {
    this.blnIsEnabled = true;
  }

}
