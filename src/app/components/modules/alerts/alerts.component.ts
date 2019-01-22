import { Component, OnInit } from '@angular/core';
import {NotificationService} from '../../../services/notification.service';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.css']
})
export class AlertsComponent implements OnInit {

  alerts = [];
  fechaDesde = null;
  fechaHasta = null;

  constructor(private notificationService: NotificationService) { }

  ngOnInit() {
    // this.alerts = this.notificationService.get
    this.startFilter();
  }

  startFilter() {
    debugger;
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const date = today.getDate()
    const yesterday = new Date(year, month, date - 1);
    const sixDaysBefore = new Date(year, month, date - 6);
    const twentyNineBefore = new Date(year, month, date - 29);
    const firstDayMonth = new Date(year, month, 1);
    const lastDayMonth = new Date(year, month + 1, 0);
    const firstDayLastMonth = new Date(year, month - 1, 1);
    const lastDayLastMonth = new Date(year, month , 0);
    const start = twentyNineBefore;
    const end = today;

    // function cb(start, end) {
    //   document.querySelectorAll('#reportrange span')[0].innerHTML = start.toISOString().substring(0, 10) + ' - ' + end.toISOString().substring(0, 10);
    // }
    //
    // document.getElementById('reportrange').daterangepicker({
    //   startDate: start,
    //   endDate: end,
    //   ranges: {
    //     'Hoy': [today, today],
    //     'Ayer': [yesterday, yesterday],
    //     'Ultimos 7 días': [sixDaysBefore, today],
    //     'Ultimos 30 días': [twentyNineBefore, today],
    //     'Este mes': [firstDayMonth, lastDayMonth],
    //     'Mes pasado': [firstDayLastMonth, lastDayLastMonth]
    //   },
    //   locale: {
    //     format: 'DD/MM/YYYY',
    //     applyLabel: 'Aceptar',
    //     cancelLabel: 'Borra3',
    //     customRangeLabel: 'Personalizado',
    //     daysOfWeek: [
    //       'Do',
    //       'Lu',
    //       'Ma',
    //       'Mi',
    //       'Ju',
    //       'Vi',
    //       'Sa'
    //     ],
    //     monthNames: [
    //       'Enero',
    //       'Febrero',
    //       'Marzo',
    //       'Abril',
    //       'Mayo',
    //       'Junio',
    //       'Julio',
    //       'Agosto',
    //       'Septiembre',
    //       'Octubre',
    //       'Noviembre',
    //       'Diciembre'
    //     ]
    //   }
    // }, cb);

    // cb(start, end);
    this.fechaDesde = start.toISOString().substring(0, 10);
    this.fechaHasta = end.toISOString().substring(0, 10);
    // this.handleFilterEvents();
    // // getAlertas();
  }

  // handleFilterEvents() {
  //   const self = this;
  //   $('#reportrange').on('apply.daterangepicker', function (ev, picker) {
  //     self.fechaDesde = picker.startDate.format('YYYY-MM-DD');
  //     self.fechaHasta = picker.endDate.format('YYYY-MM-DD');
  //     // getAlertas();
  //   });
  // }
}
