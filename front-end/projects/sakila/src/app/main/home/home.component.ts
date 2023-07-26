import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  title = 'Curso';

  // constructor(private log: LoggerService) {
  //   log.error('Es un error')
  //   log.warn('Es un warn')
  //   log.info('Es un info')
  //   log.log('Es un log')
  // }

  // constructor(private notify: NotificationService) {}
  // ngOnInit(): void {
  //   this.notify.add('Inicio la aplicación', NotificationType.info)
  // }

}
