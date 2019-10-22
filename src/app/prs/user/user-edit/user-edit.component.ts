import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../user.class';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  user: User;
  verifyDelete: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private usersvc: UserService
    ) { }

  save(): void {
    this.usersvc.change(this.user).subscribe(
      res => { console.log("Response from user edit", res);
      this.router.navigateByUrl('/users/list') 
    },
      err => { console.log(err); }
    );
  }
  edit(): void {
    this.router.navigateByUrl(`/users/edit/${this.user.id}`);
  }
  verify(): void {
    this.verifyDelete = !this.verifyDelete;
  }
  delete(): void {
    this.usersvc.remove(this.user).subscribe(
      res => { console.log("Response from user edit", res);
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
