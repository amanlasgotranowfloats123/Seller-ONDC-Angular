import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ApiServiceService } from '../../../shared/services/api-service/api-service.service';
import * as AuthActions from '../../../ngrx/states/auth/auth.actions';
import * as fromAuth from 'src/app/ngrx/states/auth/auth.reducer';
import { ActivatedRoute, Router } from '@angular/router';
import { getLocalItem, setLocalItem } from 'src/utils/localstorage';
import { ENUMS } from 'src/utils/enums';
import { PageMetaService } from '../../../shared/services/page-meta-serivce/page-meta.service';

@Component({
  selector: 'app-aggregatorlogin-page',
  templateUrl: './aggregatorlogin-page.component.html',
  styleUrls: ['./aggregatorlogin-page.component.scss'],
})
export class AggregatorLoginPageComponent implements OnInit {
  returnUrl: string = '';
  loginForm!: FormGroup;
  bannerImages: any[] = [];
  logo!: any;
  constructor(
    private readonly fb: FormBuilder,
    private route: ActivatedRoute,
    public store: Store<fromAuth.State>,
    private pagemeta: PageMetaService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: [
        '',
        Validators.compose([Validators.required, Validators.minLength(6)]),
      ],
    });
  }
  user$ = this.store.select(fromAuth.selectUser);

  ngOnInit() {
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

  submitForm() {
    let credentials = {
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value,
    };
    this.store.dispatch(AuthActions.LOGIN_REQUEST({ credentials }));
  }
}
