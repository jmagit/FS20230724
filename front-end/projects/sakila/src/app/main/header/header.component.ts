import { Component } from '@angular/core';
import { AuthService } from 'projects/sakila/src/app/security';
import { environment } from 'projects/sakila/src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  readonly roleMantenimiento = environment.roleMantenimiento
  constructor(public auth: AuthService) {}
}
