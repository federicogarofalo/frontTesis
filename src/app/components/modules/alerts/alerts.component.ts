import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {NotificationService} from '../../../services/notification.service';
import {NodeSelectorComponent} from '../../utils/node-selector/node-selector.component';
import {SeveritySelectorComponent} from '../../utils/severity-selector/severity-selector.component';
import {Notification} from '../../../models/notification';
import {Node} from '../../../models/node';
import {Severity} from '../../../models/severity';
import {VariableService} from '../../../services/variable.service';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.css']
})
export class AlertsComponent implements OnInit, AfterViewInit {

  notifications: Notification[];
  notificationAlerts: Notification[];
  dateFrom: string;
  dateTo: string;
  node: Node;
  severity: Severity;
  showAlerts = false;
  tzOffset = new Date().getTimezoneOffset() * 60000;
  defaultDateFrom = new Date(Date.now() - this.tzOffset).toISOString().substring(0, 10);
  defaultDateTo = new Date(Date.now() - this.tzOffset).toISOString().substring(0, 10);

  @ViewChild(NodeSelectorComponent) nodeSelector;
  @ViewChild(SeveritySelectorComponent) severitySelector;

  constructor(private notificationService: NotificationService, public variable: VariableService) { }

  ngOnInit() {
    this.dateFrom = this.defaultDateFrom;
    this.dateTo = this.defaultDateTo;
    this.severity = null;
  }

  ngAfterViewInit(): void {
    const nodesSubscription = this.nodeSelector.dataReady.subscribe(nodes => {
      this.node = nodes[0];
      this.getNotifications();
      nodesSubscription.unsubscribe();
    });
  }

  getNotifications() {
    this.notificationService.getNotificationsByDate(this.dateFrom, this.dateTo, this.node, this.severity)
      .subscribe(notifications => {
      this.notifications = notifications;
    }, err => {
      console.log(err);
    });
  }

  onNodeChange(node: Node) {
    this.node = node;
    this.getNotifications();
  }

  onSeverityChange(severity: Severity) {
    this.severity = severity;
    this.getNotifications();
  }

  getNotificationAlerts(notification: Notification) {
    this.notificationService.getNotificationAlerts(notification).subscribe(alerts => {
      this.notificationAlerts = alerts;
      this.showAlerts = true;
    });
  }
}
