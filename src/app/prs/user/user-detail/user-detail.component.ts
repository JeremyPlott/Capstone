import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../user.class';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  user: User;

  constructor(
    private route: ActivatedRoute,
    private usersvc: UserService
  ) { }

  ngOnInit() {
    let userid = this.route.snapshot.params.id;
    this.usersvc.get(userid).subscribe(
      user => {
        this.user = user;
        console.log("User:", user);
      },
      err => { console.error(err); }
    );
  }

}
