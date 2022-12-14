import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiServiceService } from 'src/app/shared/services/api-service/api-service.service';
import { ActivatedRoute } from '@angular/router';
import { getLocalItem } from 'src/utils/localstorage';
import { ENUMS } from 'src/utils/enums';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.scss'],
})
export class AddproductComponent implements OnInit {
  message: string[] = [];
  progressInfos: any[] = [];
  selectedFiles?: FileList;

  selectedFileNames: string[] = [];
  previews: string[] = ['', '', '', '', ''];
  isPreviewAdded: boolean = false;
  storeLogoPreview: string[] = [];

  data: any;
  val = 'xyz';
  xyz: any;
  activeType = 'id';
  sellerId: any;

  constructor(
    private api: ApiServiceService,
    private router: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  productForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    sellingPrice: new FormControl('', [Validators.required]),
    gst: new FormControl('', [Validators.required]),
    discountedPrice: new FormControl('', [Validators.required]),
    discountPercentage: new FormControl('', [Validators.required]),
    stockQuantity: new FormControl('', [Validators.required]),
    unit: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
    this.sellerId = getLocalItem(ENUMS.USERDATA);

    this.api
      .getProd(
        this.router.snapshot.params['id'],
        localStorage.getItem('sellerId')
      )
      .subscribe((result: any) => {
        this.productForm = this.formBuilder.group({
          name: new FormControl(result['product']['name']),
          category: new FormControl(result['product']['category']),
          sellingPrice: new FormControl(result['product']['sellingPrice']),
          gst: new FormControl(result['product']['gst']),
          discountedPrice: new FormControl(
            result['product']['discountedPrice']
          ),
          discountPercentage: new FormControl(
            result['product']['discountPercentage']
          ),
          stockQuantity: new FormControl(result['product']['stockQuantity']),
          unit: new FormControl(result['product']['unit']),
        });

        this.activeType = this.router.snapshot.params['id'];
      });
  }
  panelOpenState!: boolean;

  getApi() {
    this.api.getProduct().subscribe((Data: any) => {
      this.data = Data;
    });
  }
  setValue(xyz: any) {
    this.sellerId = localStorage.getItem('sellerId');
    if (this.activeType == 'id') {
      this.api.postProduct(this.productForm.value).subscribe((val: any) => {
        this.api.getProduct;
        this.api.postProduct;
      });
    } else {
      this.api
        .patchProduct(
          this.productForm.value,
          this.router.snapshot.params['id'],
          this.sellerId
        )
        .subscribe((val: any) => {
          this.api.getProduct;
          this.api.patchProduct;
        });
    }
    this.activeType = 'id';
  }

  selectFiles(event: any, type: string): void {
    this.message = [];
    this.progressInfos = [];
    this.selectedFiles = event.target.files;
    this.storeLogoPreview = [];
    if (this.selectedFiles && this.selectedFiles[0]) {
      const numberOfFiles = this.selectedFiles.length;
      const reader = new FileReader();
      for (let i = 0; i < numberOfFiles; i++) {
        reader.onload = (e: any) => {
          this.previews.push(e.target.result);
          this.isPreviewAdded = true;
        };
        console.log(this.selectedFiles[i]);

        reader.readAsDataURL(this.selectedFiles[i]);
        this.selectedFileNames.push(this.selectedFiles[i].name);
      }
    }
  }
}
