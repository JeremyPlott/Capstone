import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../prs/user/user.service';
import { User } from '../../prs/user/user.class';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  users: User[] = [];

  constructor(
    private route: ActivatedRoute,
    private usersvc: UserService
  ) { }

  ngOnInit() {
    this.usersvc.list().subscribe(
      users => {
        this.users = users;
        console.log("Users", users);
      }, 
      err => {
        console.error(err);
      }
    );
  }
  
}
