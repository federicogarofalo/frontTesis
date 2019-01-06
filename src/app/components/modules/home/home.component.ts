import {Component, OnInit} from '@angular/core';
import {FrameService} from '../../../services/frame.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private frameService: FrameService) { }

  ngOnInit() {
    this.frameService.getNodesPower().subscribe(
      resp => {
        console.log('Request worked');
      },
      err => {
        console.log('Request did not work');
      }
    );
  }

}
