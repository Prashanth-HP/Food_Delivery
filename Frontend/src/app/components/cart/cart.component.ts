// // cart.component.ts

// import { Component, OnInit } from '@angular/core';
// import { CartService } from 'src/app/services/cart.service';
// import { FoodItem } from 'src/app/models/food-item.model';

// @Component({
//   selector: 'app-cart',
//   templateUrl: './cart.component.html',
//   styleUrls: ['./cart.component.css']
// })
// export class CartComponent implements OnInit {
//   items: FoodItem[] = [];
//   resId: number = 0;

//   constructor(private cartService: CartService) {}

//   ngOnInit(): void {
//     this.items = this.cartService.getCartItems();
//     this.resId = this.cartService.getResId();
//   }

//   increaseQuantity(item: FoodItem): void {
//     item.quantity++;
//   }

//   decreaseQuantity(item: FoodItem): void {
//     if (item.quantity > 1) {
//       item.quantity--;
//     }
//   }

//   removeItem(item: FoodItem): void {
//     this.cartService.removeFromCart(item);
//     this.items = this.cartService.getCartItems();
//   }

//   getTotalPrice(): number {
//     return this.items.reduce((total, item) => total + item.price * item.quantity, 0);
//   }

//   getCartCount(): number {
//     return this.items.reduce((total, item) => total + item.quantity, 0);
//   }

//   placeOrder(): void {
//     // handle order logic here

//   }
// }

///////////////////////////////////////////////
// import { Component, OnInit } from '@angular/core';
// import { CartService } from 'src/app/services/cart.service';
// import { FoodItem } from 'src/app/models/food-item.model';
// import {OrderMealService} from 'src/app/services/order-meal.service';
// import {Order} from 'src/app/models/order.model';

// import {Restaurant} from 'src/app/models/restaurant.model';
// import { DineDataService } from 'src/app/services/dine-data.service';
// @Component({
//   selector: 'app-cart',
//   templateUrl: './cart.component.html',
//   styleUrls: ['./cart.component.css']
// })
// export class CartComponent implements OnInit {
//   items: FoodItem[] = [];
//   resId: number = -1;
//   order!: Order;
//   constructor(public cartService: CartService,
//               public orderService:OrderMealService,
//               private dineDataService: DineDataService,
//   ) {}
//   ngOnInit() {
//     this.items = this.cartService.getCartItems();
//     this.resId = this.cartService.getResId();
//     this.initOrder();
//   }
//   initOrder() {
//     this.order = {
//       restaurant_id: this.resId,
//       items: this.items.map(item => item.name),
//       total_price: this.cartService.getTotalAmount(),
//       delivery_address: " ", // Use a real address
//       status: 'Pending',
//       created_at: new Date(),
//     };
//     this.dineDataService.getRestaurantById(this.resId).subscribe(r => this.order.delivery_address = r.location);

//   }


//   increaseQuantity(item: FoodItem) {
//     item.quantity++;
//   }

//   decreaseQuantity(item: FoodItem) {
//     if (item.quantity > 1) item.quantity--;
//   }

//   removeItem(item: FoodItem) {
//     this.cartService.removeFromCart(item);
//   }

//   getTotalPrice(): number {
//     return this.cartService.getCartItems()
//       .reduce((total, item) => total + (item.price * item.quantity), 0);
//   }
//   onclick() {
//     console.log("Restaurant ID:", this.resId); // Debug
//     console.log("Order:", this.order); // Debug
//     this.orderService.placeOrder(this.order).subscribe({
//       next: () => console.log('Success!'),
//       error: (err) => console.error('Error:', err)
//     });
//   }
  
// }


import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Import Router
import { CartService } from 'src/app/services/cart.service';
import { FoodItem } from 'src/app/models/food-item.model';
import { OrderMealService } from 'src/app/services/order-meal.service';
import { Order } from 'src/app/models/order.model';
import { DineDataService } from 'src/app/services/dine-data.service';
import { ToastrService } from 'ngx-toastr';
// Removed Restaurant import as it's not directly used after fetching location

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  items: FoodItem[] = [];
  resId: number = -1;
  order!: Order;
  isOrdering: boolean = false; // Flag for loading state

  constructor(
    public cartService: CartService,
    public orderService: OrderMealService,
    private dineDataService: DineDataService,
    private router: Router, // Inject Router
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.items = this.cartService.getCartItems();
    this.resId = this.cartService.getResId();
    // Only initialize order if there are items and a valid restaurant ID
    if (this.items.length > 0 && this.resId !== -1) {
      this.initOrder();
    } else if (this.resId === -1 && this.items.length > 0) {
        console.error("Cart has items but no Restaurant ID is set in CartService.");
        // Handle this case - maybe clear cart or show an error
    }
  }

  initOrder() {
    // Ensure we have valid data before creating the order object
    if (this.resId === -1 || this.items.length === 0) {
        console.error("Cannot initialize order: Invalid resId or empty cart.");
        return; // Exit if data is invalid
    }

    this.order = {
      restaurant_id: this.resId,
      items: this.items.map(item => item.name), // Get current item names
      total_price: this.cartService.getTotalAmount(), // Get current total
      delivery_address: "Loading address...", // Placeholder
      status: 'Pending',
      created_at: new Date(),
    };

    // Fetch the restaurant address
    this.dineDataService.getRestaurantById(this.resId).subscribe({
        next: r => {
            if (r) {
                this.order.delivery_address = r.location;
            } else {
                console.error(`Restaurant with ID ${this.resId} not found.`);
                this.order.delivery_address = "Address not found"; // Update placeholder on error
                // Consider disabling the order button if address is crucial and not found
            }
        },
        error: err => {
            console.error('Error fetching restaurant details:', err);
            this.order.delivery_address = "Error loading address"; // Update placeholder on error
             // Consider disabling the order button
        }
    });
  }

  increaseQuantity(item: FoodItem) {
    item.quantity++;
    // No need to call cartService.updateCart or similar unless your service needs it
    this.updateOrderDetails(); // Update order preview if needed
  }

  decreaseQuantity(item: FoodItem) {
    if (item.quantity > 1) {
        item.quantity--;
        this.updateOrderDetails(); // Update order preview if needed
    } else if (item.quantity === 1) {
        // Optional: If quantity becomes 0, remove the item
        this.removeItem(item);
    }
    else if (item.quantity === 0) {
      this.cartService.removeFromCart(item);
      this.items = this.cartService.getCartItems(); 
      this.order = undefined!; // Clear order object if cart becomes empty
      this.updateOrderDetails();
  }
  }

  removeItem(item: FoodItem) {
    this.cartService.removeFromCart(item);
    this.items = this.cartService.getCartItems(); // Update local items array
    if (this.items.length === 0) {
        this.order = undefined!; // Clear order object if cart becomes empty
        this.resId = -1; // Reset resId if appropriate for your logic
    } else {
        this.updateOrderDetails(); // Update order details
    }
  }

  getTotalPrice(): number {
    // Recalculate based on the current state of `items` array in the component
    return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  // Helper function to update order details based on current cart state
  updateOrderDetails() {
      if (this.order) {
          this.order.items = this.items.map(item => item.name);
          this.order.total_price = this.getTotalPrice();
      } else if (this.items.length > 0 && this.resId !== -1) {
          // If order was cleared (e.g., cart became empty then items added back), re-initialize
          this.initOrder();
      }
  }


  onclick() {
    // Ensure order object is initialized and not already ordering
    if (!this.order || this.isOrdering || this.items.length === 0) {
        console.warn("Cannot place order: Order data not ready, already ordering, or cart is empty.");
        return;
    }

    this.isOrdering = true; // Set loading state

    // Ensure order details are up-to-date before sending
    this.updateOrderDetails();
    this.order.created_at = new Date(); // Update timestamp just before sending

    console.log("Placing Order:", this.order); // Debug

    this.orderService.placeOrder(this.order).subscribe({
      next: (response) => { // Backend might return the created order ID or object
        console.log('Order placed successfully!', response);

        // Clear the cart in the service AND locally
        this.cartService.clearCart(); // Make sure this method exists and works in CartService
        this.items = []; // Clear local items array
        this.order = undefined!; // Clear order object
        this.resId = -1; // Reset restaurant ID tracking if needed

        this.toastr.success(`Thank you for ordering! `, 'Order placed successfully!', {
          timeOut: 2000, // Duration of the toast
          closeButton: true, // Show close button
          progressBar: true, // Show progress bar
        });
        //console.log('Redirecting to orders page in 3 seconds...');
        // Use setTimeout to introduce the delay
        setTimeout(() => {
          this.isOrdering = false; // Reset loading state before navigating
          this.router.navigate(['/orders']); // Navigate programmatically
        }, 3000); // 3000 milliseconds = 3 seconds
      },
      error: (err) => {
        console.error('Error placing order:', err);
        this.isOrdering = false; // Reset loading state on error
        // Provide user feedback (e.g., using a toast notification service or alert)
        alert(`Order failed: ${err.message || 'Please try again.'}`);
      }
    });
  }
}

// Ensure CartService has a clearCart method, e.g.:
/*
In cart.service.ts:

private items: FoodItem[] = [];
private resId: number = -1;
// ... other methods

clearCart() {
    this.items = [];
    this.resId = -1;
    // Persist if using local storage, etc.
    // this.saveCart();
    console.log('Cart cleared.');
}
*/