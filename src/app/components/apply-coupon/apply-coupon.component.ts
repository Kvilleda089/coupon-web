import { Component } from '@angular/core';
import { CouponService } from '../../services/coupon.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-apply-coupon',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './apply-coupon.component.html',
  styleUrl: './apply-coupon.component.css'
})
export class ApplyCouponComponent {
  couponCode = '';
  originalPrice = 100; 
  discountedPrice: number | null = null;
  discountPercentage: number | null = null;
  errorMessage: string | null = null;

  constructor(private couponService: CouponService){}


  appliDiscont(){
    if(!this.couponCode.trim()){
      this.errorMessage = 'Ingrese un código de cupón';
      return;
    }

    this.couponService.validateCoupon(this.couponCode).subscribe(response => {
      if (response.valid) {
        this.discountPercentage = response.discountPercentage || 0;
        this.discountedPrice = this.originalPrice - (this.originalPrice * this.discountPercentage / 100);
        this.errorMessage = null;
      } else {
        this.errorMessage = 'El cupón no es válido';
        this.discountedPrice = null;
        this.discountPercentage = null;
      }
    });
  }
}
