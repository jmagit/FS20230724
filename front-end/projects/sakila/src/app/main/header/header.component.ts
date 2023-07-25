import { Component } from '@angular/core';
import { AuthService } from 'projects/sakila/src/app/security';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(public auth: AuthService) {}
}
