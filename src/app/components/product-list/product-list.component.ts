import { Component } from '@angular/core';
import { Product } from '../products/product.interface';
import { CouponService } from '../../services/coupon.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {


  products: Product[] = [
    {
      id: 1,
      name: 'Laptop Gamer',
      image: 'https://imggraficos.gruporeforma.com/2022/05/Laptops-gamer-asus-hot-sale-2022-2.png',
      description: 'Laptop potente para gaming',
      price: 1500,
    },
    {
      id: 2,
      name: 'Smartphone',
      image: 'https://www.clarin.com/2023/04/18/ljLoc_lEv_2000x1500__1.jpg',
      description: 'Último modelo con cámara avanzada',
      price: 800,
    }, {
      id: 3,
      name: 'Auriculares Bluetooth',
      image: 'https://www.steren.com.gt/media/catalog/product/cache/b69086f136192bea7a4d681a8eaf533d/image/22188aa47/audifonos-bluetooth-freepods-touch-true-wireless-negros.jpg',
      description: 'Sonido de alta calidad, ideal para deportes',
      price: 150,
    },
    {
      id: 4,
      name: 'Smartwatch',
      image: 'https://www.lacuracaonline.com/media/catalog/product/4/6/467370400012_1.jpg?optimize=medium&bg-color=255,255,255&fit=bounds&height=700&width=700&canvas=700:700',
      description: 'Reloj inteligente con monitor de actividad física',
      price: 220,
    },
    {
      id: 5,
      name: 'Teclado Mecánico',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFqwTEMVj1j_httWd28Opmp0LWfIVKHXqm0w&s',
      description: 'Teclado mecánico con retroiluminación RGB',
      price: 120,
    },
    {
      id: 6,
      name: 'Cámara Digital',
      image: 'https://picacia.gt/cdn/shop/products/pag-SON-F-C-ZV-1-2_480x480.png?v=1737991597',
      description: 'Cámara profesional para fotografía y video',
      price: 900,
    },
    {
      id: 7,
      name: 'Disco Duro Externo',
      image: 'https://m.media-amazon.com/images/I/51ixOfwvwjL._AC_UF894,1000_QL80_.jpg',
      description: 'Disco duro de 1TB con conexión USB 3.0',
      price: 80,
    },
    {
      id: 8,
      name: 'Consola de Videojuegos',
      image: 'https://click.gt/cdn/shop/files/4_9ac68a5e-982f-4315-9253-3787193525b0.jpg?v=1726941809&width=300',
      description: 'Consola de última generación con juegos incluidos',
      price: 400,
    },
    {
      id: 9,
      name: 'Monitor 4K',
      image: 'https://ssl-product-images.www8-hp.com/digmedialib/prodimg/lowres/c08894694.png',
      description: 'Pantalla de alta definición para juegos y trabajo',
      price: 350,
    },
    {
      id: 10,
      name: 'Router Wi-Fi',
      image: 'https://www.steren.com.gt/media/catalog/product/cache/b69086f136192bea7a4d681a8eaf533d/image/225094a23/repetidor-router-wi-fi-6-ax1500-2-4-ghz-y-5-ghz-hasta-100-m-de-cobertura.jpg',
      description: 'Router con tecnología Wi-Fi 6 para alta velocidad',
      price: 100,
    }
  ];

  showCouponInput: { [key: number]: boolean } = {};
  couponCode: string = '';
  invalidCouponMessage: { [key: number]: string } = {};


  constructor(private couponService: CouponService){}

  toggleCouponInput(productId: number) {
    this.showCouponInput[productId] = !this.showCouponInput[productId];
    this.invalidCouponMessage[productId] = '';  
  }

  applyDiscount(product: Product) {
    this.couponService.validateCoupon(this.couponCode).subscribe((response: { valid: boolean; discountPercentage?: number }) => {
      if (response.valid && response.discountPercentage) {
        product.discont = response.discountPercentage;
        this.invalidCouponMessage[product.id] = ''; 
      } else {
        product.discont = undefined;  
        this.invalidCouponMessage[product.id] = 'Código de cupón no válido'; 
      }
    });
  }

  getDiscountedPrice(product: Product): number {
    if (product.discont) {
      return product.price - (product.price * (product.discont / 100));
    }
    return product.price;  
  }

}
