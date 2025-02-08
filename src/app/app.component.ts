import { Component,  OnInit, Inject, PLATFORM_ID  } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductListComponent } from './components/product-list/product-list.component';
import { CouponService } from './services/coupon.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ProductListComponent, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  displayCouponDialog: boolean = false;
  title = 'coupon-web';
  newCouponCode: string = '';
  newDiscountPercentage: number = 0;
  newExpirationDate: string = '';

    constructor(private couponService: CouponService,
    ){}
  
    ngOnInit(): void {}

    openCouponDialog() {
      this.displayCouponDialog = true;
    }
  
    closeCouponDialog() {
      this.displayCouponDialog = false;
    }
  
  
  
  createCoupon() {
    const couponData = {
      code: this.newCouponCode,
      discountpercentage: this.newDiscountPercentage,
      expirationDate: new Date(this.newExpirationDate).toISOString()
    };

    this.couponService.createCoupon(couponData).subscribe(
      response => {
        alert('Cupón creado exitosamente');
        console.log(response);
      },
      error => {
        alert('Hubo un error al crear el cupón');
        console.error(error);
      }
    );
  }
}
