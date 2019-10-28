import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RequestService } from '../request.service';
import { Request } from '../request.class';
import { RequestLineService } from '../../requestlines/requestline.service';
import { RequestLine } from '../../requestlines/requestline.class';
import { SystemService } from '../../../core/system/system.service';

@Component({
  selector: 'app-request-detail',
  templateUrl: './request-detail.component.html',
  styleUrls: ['./request-detail.component.css']
})
export class RequestDetailComponent implements OnInit {

  request: Request;
  requestlines: RequestLine[] = [];

  constructor(
    private route: ActivatedRoute,
    private requestsvc: RequestService,
    private requestlinesvc: RequestLineService,
    private systemsvc: SystemService
  ) { }

  ngOnInit() {
    this.systemsvc.CheckLogin();
    let requestid = this.route.snapshot.params.id;
    this.requestsvc.get(requestid).subscribe(
      request => {
        this.request = request;
        console.log("Request:", request);
      },
      err => { console.error(err); }
    );
    // this.requestlinesvc.list().subscribe(
    //   requestlines => {
    //     this.requestlines = this.request.requestLines;
    //     console.log("Request lines", requestlines);
    //   }, 
    //   err => {
    //     console.error(err);
    //   }
    // );
      
  }

}
