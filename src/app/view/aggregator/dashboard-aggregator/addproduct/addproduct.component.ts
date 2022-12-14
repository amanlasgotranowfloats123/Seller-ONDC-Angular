import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiServiceService } from 'src/app/shared/services/api-service/api-service.service';
import { SnackbarService } from 'src/app/shared/services/snackbar-service/snackbar.service';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.scss'],
})
export class AddproductComponent implements OnInit {
  addSellerFormGroup!: FormGroup;
  panelOpenState!: boolean;
  constructor(
    private fb: FormBuilder,
    private apiService: ApiServiceService,
    private snackBarService: SnackbarService,
    private router: Router
  ) {
    this.addSellerFormGroup = this.fb.group({
      sellerBusinessName: ['', Validators.compose([Validators.required])],
      sellerName: ['', Validators.compose([Validators.required])],
      sellerMobileNumber: [
        '',
        Validators.compose([Validators.required, Validators.minLength(10)]),
      ],
      sellerEmail: [
        '',
        Validators.compose([Validators.required, Validators.email]),
      ],
    });
  }

  get getBusiness() {
    return this.addSellerFormGroup.get('sellerBusinessName');
  }
  get getName() {
    return this.addSellerFormGroup.get('sellerName');
  }
  get getMobile() {
    return this.addSellerFormGroup.get('sellerMobileNumber');
  }
  get getEmail() {
    return this.addSellerFormGroup.get('sellerEmail');
  }

  submitForm(): void {
    if (this.addSellerFormGroup.valid) {
      console.log(this.addSellerFormGroup.value);
      this.apiService
        .inviteSeller(this.addSellerFormGroup.value)
        .subscribe((res) => {
          console.log('invite seller', res);
          this.snackBarService.openSnackBar(
            'Invited seller succesfully',
            'close'
          );
          this.router.navigateByUrl('/aggregator-dashboard/home');
        });
    }
  }
  ngOnInit(): void {}
}
