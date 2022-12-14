import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../../../shared/services/api-service/api-service.service';
import * as fromAuth from 'src/app/ngrx/states/auth/auth.reducer';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { NgForm } from '@angular/forms';
import { PageMetaService } from '../../../shared/services/page-meta-serivce/page-meta.service';
import Models from '../../../models';
import { PageData } from '../../../models/page-data.model';
import { getLocalItem, setLocalItem } from 'src/utils/localstorage';
import { ENUMS } from 'src/utils/enums';

@Component({
  selector: 'app-get-otp',
  templateUrl: './get-otp.component.html',
  styleUrls: ['./get-otp.component.scss'],
})
export class GetOTPComponent implements OnInit {
  bannerImages: any[] = [];
  logo!: any;
  otpObj: { phone: string } | undefined;
  phone: any;
  user = null;
  returnUrl: string = '';

  otpForm!: FormGroup;
  mobileNumber?: string;

  constructor(
    private api: ApiServiceService,
    private route: ActivatedRoute,
    private router: Router,
    public store: Store<fromAuth.State>,
    private readonly fb: FormBuilder,
    private pagemeta: PageMetaService
  ) {
    this.otpForm = this.fb.group({
      phone: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'),
        ]),
      ],
    });
  }
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



  otp(event: any) {
    localStorage.clear();
    this.phone = '+91' + event.target.value;
    this.otpObj = { phone: this.phone };
    //  console.log(this.otpObj);
    this.api.phoneTransfer(this.phone);
    if (this.otpObj != null) {
      this.api.login(this.otpObj).subscribe((data: any) => {
        //response will be used in future.
      });
    }
  }
}
