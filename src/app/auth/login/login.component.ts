import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { UserService } from '../providers/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  private userLoggedIn;
  private returnUrl;
  loading = true;

  @Input() google: boolean = true;
  @Input() facebook: boolean = false;
  @Input() twitter: boolean = false;
  @Input() github: boolean = false;
  @Input() email: boolean = false;
  @Input() phone: boolean = false;

  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    //Subscribe to the logged in user so as it changes we can respond
    this.userService.getLoggedInUser().subscribe((user) => {
      //If user exists they are logged in
      //If user is null they have been found not to be logged in
      //If user is undefined, we dont have a resonse yet
      if (user) {
        this.router.navigateByUrl(this.returnUrl);
      } else if (user === null) {
        this.loading = false;
      }
    });
  }

  loginGoogle() {
    this.loading = true;
    this.userService.loginWithGoogle();
  }
}
