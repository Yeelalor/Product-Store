import { defineStore } from "pinia";
import type { ProductListModel } from "~/models/product-model";
export const useCartStore = defineStore("cart", {
    state: () => ({
        cartItems: [] as ProductListModel[],
        totalAmountLak: 0,
        totalAmountThb: 0,
    }),
    getters: {
        totalPrice(state) {
            return state.cartItems.reduce((total, item) => {
                const itemTotal = (item.lakPackage * item.qty) + (item.thbPackage * item.qty);
                return total + itemTotal;
            }, 0);
        },
        totalItem(state) {
            return state.cartItems.reduce((total, item) => {
                return total + item.qty;
            }, 0);
        }
    },
    actions: {
        loadCart() {
            const savedCart = localStorage.getItem('cart');
            if (savedCart) {
                this.cartItems = JSON.parse(savedCart);
            }
        },
        saveCart() {
            localStorage.setItem('cart', JSON.stringify(this.cartItems));
        },

        addToCart(item: any) {
            const existingItem = this.cartItems.find((cartItem) => cartItem.productId === item.productId);
            if (existingItem) {
                existingItem.qty += item.qty;
            } else {
                this.cartItems.push({
                    ...item
                });
            }
            this.saveCart();
            console.log("get item===========", localStorage.getItem('cart'));

        },
        increaseQty(item: any) {
            const existingItem = this.cartItems.find((cartItem) => cartItem.productId === item.productId);
            if (existingItem) {
                existingItem.qty += 1;
                this.saveCart();
            } else {

            }
        },
        decreaseQty(item: any) {
            const existingItem = this.cartItems.find((cartItem) => cartItem.productId === item.productId);
            if (existingItem && existingItem.qty > 1) {
                existingItem.qty -= 1;
                this.saveCart();
            }
        },
        removeItem(item: any) {
            const index = this.cartItems.findIndex((cartItem) => cartItem.productId === item.productId);
            if (index !== -1) {
                const removedItem = this.cartItems[index];
                this.cartItems.splice(index, 1);
                this.saveCart();
            }
        },
        clearCart() {
            this.cartItems = [];
            this.totalAmountLak = 0;
            this.totalAmountThb = 0;
        },
    },
});