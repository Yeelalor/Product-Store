import { defineStore } from "pinia";
import type { ProductListModel } from "~/models/product-model";
export const useCartStore = defineStore("cart", {
    state: () => ({
        cartItems: [] as ProductListModel[],
        totalAmountLak: 0,
        totalAmountThb: 0,
    }),
    getters: {
        totalPriceLak(state) {
            return state.cartItems.reduce((total, item) => {
                const itemTotal = item.size === "package" && item.lak == 1 ? item.lakPackage * item.qty : item.lakUnit * item.qty;
                return total + itemTotal;
            }, 0);
        },
        totalPriceThb(state) {
            return state.cartItems.reduce((total, item) => {
                const itemTotal = item.size === "package" && item.thb == 1 ? item.thbPackage * item.qty : item.thbUnit * item.qty;
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
            } else {
                this.removeItem(item);
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
            localStorage.removeItem('cart');
            this.totalAmountLak = 0;
            this.totalAmountThb = 0;
        },
    },
});