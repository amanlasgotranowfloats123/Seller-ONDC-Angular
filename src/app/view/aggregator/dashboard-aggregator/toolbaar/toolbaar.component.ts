import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ENUMS } from 'src/utils/enums';
import { getLocalItem } from 'src/utils/localstorage';

@Component({
  selector: 'app-toolbaar',
  templateUrl: './toolbaar.component.html',
  styleUrls: ['./toolbaar.component.scss'],
})
export class ToolbaarComponent implements OnInit {
  profilePic: any = '';
  name: any = '';
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    let data: any = getLocalItem(ENUMS.USERDATA);
    this.name = data?.userData?.name;
    console.log(this.name);
  }

  logout(): void {
    this.authService.logout();
  }
}
