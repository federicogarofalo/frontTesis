import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {interval} from 'rxjs';
import {startWith, switchMap} from 'rxjs/operators';
import {NotificationService} from './services/notification.service';
import {ToastrService} from './services/toastr.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'frontTesis';

  constructor(private router: Router, private notificationService: NotificationService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.router.navigate(['/home']);
    this.getNotifications();
  }

  getNotifications() {
    interval(120000).pipe(startWith(0), switchMap(() =>
      this.notificationService.getNotificationsByPeriod(this.getTime(new Date(new Date().getTime() - 2 * 60000)),
        this.getTime(new Date()))))
      .subscribe(resp => {
        const self = this;
        _.forEach(resp, function (notification) {
          self.toastr.showMessage(notification);
        });
      }, err => {
        console.log(err);
      });
  }

  getTime(date: Date): string {
    return date.toTimeString().split(' ', date.toTimeString().length)[0];
  }
}
