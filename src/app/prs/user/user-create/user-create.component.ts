import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../user.class';
import { SystemService } from '../../../core/system/system.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {

  user: User = new User();

  constructor(
    private router: Router,
    private usersvc: UserService,
    private systemsvc: SystemService
  ) { }

  save(): void {
    this.usersvc.create(this.user).subscribe(
      res => { console.log("Response from user create", res);
      this.router.navigateByUrl('/users/list') 
    },
      err => { console.log(err); }
    );
  }

  viewpass() {
    var x = document.getElementById("passfield");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }

  ngOnInit() {
    this.systemsvc.CheckLogin();
  }

}
