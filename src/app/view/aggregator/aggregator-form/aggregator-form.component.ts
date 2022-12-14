import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromAuth from 'src/app/ngrx/states/auth/auth.reducer';
import { ENUMS } from 'src/utils/enums';
import { setLocalItem } from 'src/utils/localstorage';
import { RegexUtil } from 'src/utils/regex';
import { ApiServiceService } from '../../../shared/services/api-service/api-service.service';
import { SnackbarService } from '../../../shared/services/snackbar-service/snackbar.service';

@Component({
  selector: 'app-aggregator-form',
  templateUrl: './aggregator-form.component.html',
  styleUrls: ['./aggregator-form.component.scss'],
})
export class AggregatorFormComponent implements OnInit {
  color: ThemePalette = 'primary';
  aggregatorRegisterForm!: FormGroup;
  message: string[] = [];
  progressInfos: any[] = [];
  selectedFiles?: FileList;

  selectedFileNames: string[] = [];
  previews: string[] = ['', '', '', '', ''];
  isPreviewAdded: boolean = false;
  imageInfos?: Observable<any>;

  constructor(
    private fb: FormBuilder,
    public store: Store<fromAuth.State>,
    private api: ApiServiceService,
    private router: Router,
    private snackBService: SnackbarService
  ) {
    this.aggregatorRegisterForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      pincode: [
        '',
        Validators.compose([
          Validators.required,
          // Validators.pattern(RegexUtil.pinCode),
        ]),
      ],
      storeLogoPreview: [''],
      city: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(RegexUtil.name),
        ]),
      ],
      state: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(RegexUtil.name),
        ]),
      ],
      address: ['', Validators.required],
      isAddressAuthorized: false,
      gstin: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(RegexUtil.gstNumber),
        ]),
      ],
      businessName: ['', Validators.compose([Validators.required])],
      pan: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(RegexUtil.panCard),
        ]),
      ],
      nameOnPan: [
        '',
        Validators.compose([
          Validators.required,
          // Validators.pattern(RegexUtil.name),
        ]),
      ],
      panDateOfIncorporation: ['', Validators.required],
      registeredBusinessAddress: [
        '',
        Validators.compose([Validators.required]),
      ],
      storeAddress: ['', Validators.required],
      isAlreadyONDCRegistered: false,
      // storeImages: [[null], Validators.required],
      category: ['', Validators.required],
      timeToShip: ['1', Validators.required],
      deliveryCharge: ['0', Validators.required],
      maxDeliveryRadius: ['5', Validators.required],
      maxReturnWindow: ['1', Validators.required],
      isAutoAcceptEnabled: [false, Validators.required],
      agreetoTerms: [false, Validators.required],
      maxSettlementWindow: ['1', Validators.required],
      settlementType: 'NEFT',
      bankDetails: this.fb.group({
        accountNumber: [
          '',
          Validators.compose([Validators.required, Validators.maxLength(17)]),
        ],
        accountType: ['SAVINGS', Validators.required],
        accountName: ['', Validators.required],
        ifscCode: ['', Validators.required],
      }),
      upiDetails: this.fb.group({
        vpa: ['', Validators.required],
        name: ['', Validators.required],
      }),
      maxWithholdingAmount: ['1', Validators.required],
      phoneNumber: [
        '',
        Validators.compose([Validators.required, Validators.maxLength(10)]),
      ],
    });
  }
  userInfo$ = this.store.select(fromAuth.selectUser);

  ngOnInit(): void {
    console.log(this.aggregatorRegisterForm.value);
  }
  panelOpenState!: boolean;

  get upiDetails() {
    return this.aggregatorRegisterForm.get('upiDetails') as FormGroup;
  }
  get bankDetails() {
    return this.aggregatorRegisterForm.get('bankDetails') as FormGroup;
  }

  get vpa() {
    return this.upiDetails.get('vpa');
  }
  get vpaName() {
    return this.upiDetails.get('name');
  }

  get AccNumber() {
    return this.bankDetails.get('accountNumber');
  }
  get AccName() {
    return this.bankDetails.get('accountName');
  }
  get accountType() {
    return this.bankDetails.get('accountType');
  }
  get getifscCode() {
    return this.bankDetails.get('ifscCode');
  }

  selectFiles(event: any, type: string): void {
    this.message = [];
    this.progressInfos = [];
    this.selectedFiles = event.target.files;
    this.aggregatorRegisterForm.get('storeLogoPreview')?.setValue('');
    if (this.selectedFiles && this.selectedFiles[0]) {
      const numberOfFiles = this.selectedFiles.length;
      const reader = new FileReader();
      for (let i = 0; i < numberOfFiles; i++) {
        reader.onload = (e: any) => {
          if (type === 'storelogo') {
            this.aggregatorRegisterForm
              .get('storeLogoPreview')
              ?.setValue(e.target.result);
          } else {
            // this.previews.splice(i, 1, e.target.result);
            this.previews.push(e.target.result);
            this.isPreviewAdded = true;
          }
        };

        reader.readAsDataURL(this.selectedFiles[i]);
        this.selectedFileNames.push(this.selectedFiles[i].name);
      }
    }
  }

  setAddress(event: any) {
    // if(event.target.value){}
    this.aggregatorRegisterForm
      .get('storeAddress')
      ?.setValue(
        this.aggregatorRegisterForm.get('registeredBusinessAddress')?.value
      );
  }

  getToday(): string {
    return new Date().toISOString().split('T')[0];
  }

  submitForm() {
    let payload = {
      name: this.aggregatorRegisterForm.get('name')?.value,
      onboardingDetails: {
        gstin: this.aggregatorRegisterForm.get('pan')?.value,
        pan: this.aggregatorRegisterForm.get('pan')?.value,
        fssaiLicenseNumber: '',
      },
      logo: this.aggregatorRegisterForm.get('storeLogoPreview')?.value,
      domain: '',
      address: {
        name: 'Bob Marley',
        building: 'Fortune sky',
        locality: 'Banjara hills',
        pincode: 500012,
        city: 'Hyderabad',
        state: 'Telangana',
        country: 'India',
        coordinates: [17.391769, 78.463816],
        phoneNumber: this.aggregatorRegisterForm.get('phoneNumber')?.value,
      },
      primaryContact: {
        phoneNumber: this.aggregatorRegisterForm.get('phoneNumber')?.value,
        email: this.aggregatorRegisterForm.get('email')?.value,
        name: this.aggregatorRegisterForm.get('name')?.value,
      },
      contactDetails: [
        {
          name: this.aggregatorRegisterForm.get('name')?.value,
          phoneNumber: this.aggregatorRegisterForm.get('phoneNumber')?.value,
          email: this.aggregatorRegisterForm.get('email')?.value,
        },
      ],
      ondcConfiguration: {
        aggregatorId: 'id',
        sellerId: 'sellerId',
        settlementConfiguration: {
          settlementType:
            this.aggregatorRegisterForm.get('settlementType')?.value,
          bankDetails: {
            accountNumber: this.AccNumber?.value,
            accountType: this.accountType?.value,
            accountName: this.AccName?.value,
            ifscCode: this.getifscCode?.value,
          },
          upiDetails: {
            vpa: this.vpa?.value,
            name: this.vpaName?.value,
          },
          settlementBasis: '',
          maxSettlementWindow: this.aggregatorRegisterForm.get(
            'maxSettlementWindow'
          )?.value,
          maxWithHoldingPercentage: this.aggregatorRegisterForm.get(
            'maxWithholdingAmount'
          )?.value,
        },
        registryConfiguration: {
          brId: '',
          city: '',
          country: '',
          createdAt: '',
          domain: '',
          encryptionPrivateKey: '',
          encryptionPublicKey: '',
          signingPrivateKey: '',
          signingPublicKey: '',
          status: '',
          subscriberId: '',
          subscriberUrl: '',
          updatedAt: '',
          validFrom: '',
          validUntil: '',
        },
        deliveryConfiguration: {
          returnsAllowed: true,
          deliveryCharge:
            this.aggregatorRegisterForm.get('deliveryCharge')?.value,
          maxDeliveryTime:
            this.aggregatorRegisterForm.get('maxReturnWindow')?.value,
          maxReturnWindow:
            this.aggregatorRegisterForm.get('maxReturnWindow')?.value,
          maxShipmentTime: this.aggregatorRegisterForm.get('timeToShip')?.value,
          serviceableRadiusInKms:
            this.aggregatorRegisterForm.get('maxDeliveryRadius')?.value,
          isAutoAccept: this.aggregatorRegisterForm.get('isAutoAcceptEnabled')
            ?.value,
        },
        ondcOnboardingConfiguration: {
          authorizedSignatoryAddress: '',
          authorizedSignatoryName: '',
          businessAddress: {
            name: 'Bob Marley',
            building: 'Fortune sky',
            locality: 'Banjara hills',
            pincode: 500012,
            city: 'Hyderabad',
            state: 'Telangana',
            country: 'India',
            coordinates: [17.391769, 78.463816],
            phoneNumber: this.aggregatorRegisterForm.get('phoneNumber')?.value,
          },
          phoneNumber: this.aggregatorRegisterForm.get('phoneNumber')?.value,
          fssaiLicenseNumber: '',
          isSellingFnB: true,
          gstin: this.aggregatorRegisterForm.get('gstin')?.value,
          panDetails: {
            pan: this.aggregatorRegisterForm.get('pan')?.value,
            nameOnPan: this.aggregatorRegisterForm.get('nameOnPan')?.value,
            panDateOfIncorporation: this.aggregatorRegisterForm.get(
              'panDateOfIncorporation'
            )?.value,
          },
          brandImage: '',
          storeImages: [''],
          category: this.aggregatorRegisterForm.get('category')?.value,
        },
        createdAt: new Date().toString(),
      },
    };
    console.log('payload', payload);
    // if (this.aggregatorRegisterForm.valid) {
    this.api.AggregatorRegister(payload).subscribe(
      (response: any) => {
        if (response?.status == 'success') {
          this.router.navigateByUrl('/aggregator-dashboard/home');
          this.snackBService.openSnackBar('Registered succesfully', 'close');
        } else {
          console.log('error1', response);
        }
      },
      (error) => {
        console.log('error', error);
      }
    );
    // }
  }

  async saveProgress() {
    setLocalItem(ENUMS.AGGREGATOR_FORMDATA, this.aggregatorRegisterForm.value);
    this.snackBService.openSnackBar('Form saved successfully', 'close');
  }
}
