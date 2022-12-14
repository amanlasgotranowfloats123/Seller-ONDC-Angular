import { Component, Input, OnInit } from '@angular/core';
import { ApiServiceService } from '../../../shared/services/api-service/api-service.service';
import { FormControl } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { PageMetaService } from '../../../shared/services/page-meta-serivce/page-meta.service';
import { getLocalItem, setLocalItem } from 'src/utils/localstorage';
import { ENUMS } from 'src/utils/enums';
import { Store } from '@ngrx/store';
import * as fromAuth from 'src/app/ngrx/states/auth/auth.reducer';
import * as AuthActions from '../../../ngrx/states/auth/auth.actions';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  token: any;
  phoneNo: any;
  returnUrl: string = '';
  bannerImages: any[] = [];
  logo!: any;

  sellerId: any;
  constructor(
    private api: ApiServiceService,
    private readonly fb: FormBuilder,
    private route: ActivatedRoute,
    private pagemeta: PageMetaService,
    private router: Router,
    public store: Store<fromAuth.State>
  ) {
    this.loginForm = this.fb.group({
      phone: ['', Validators.compose([Validators.required])],
      otp: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(4),
        ]),
      ],
    });
  }

  loginForm!: FormGroup;
  val: any;
  w: any;

  ngOnInit() {
    this.phoneNo = this.api.UserSubjectValue;
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    let res = getLocalItem(ENUMS.SITEINFO);
    if (res && Array.isArray(res) && res[0]?.bannerCarousel) {
      this.bannerImages = [...res[0].bannerCarousel];
      this.logo = res[0].logo;
    } else {
      this.pagemeta
        .fetchPageMetaData(this.router.url)
        .subscribe((response: any) => {
          if (
            response &&
            response.aggregators &&
            response.aggregators.siteInfo
          ) {
            setLocalItem(ENUMS.SITEINFO, response.aggregators.siteInfo);
            this.bannerImages = [
              ...response.aggregators.siteInfo[0]?.bannerCarousel,
            ];
            this.logo = response.aggregators.siteInfo[0].logo;
          }
        });
    }
  }

  verify() {
    if (this.loginForm.valid) {
      let credentials = {
        phone: this.loginForm.get('phone')?.value,
        otp: this.loginForm.get('otp')?.value,
      };
      this.store.dispatch(AuthActions.SELLER_LOGIN_REQUEST({ credentials }));
      // setLocalItem('token', (this.token));
      // setLocalItem('sellerId', this.sellerId);
    }
  }
}
