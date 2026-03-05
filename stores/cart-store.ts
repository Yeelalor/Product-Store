import { defineStore } from "pinia";
export const useCartStore = defineStore("cart", {
    state: () => ({
        cartItems: [] as any[],
        totalAmountLak: 0,
        totalAmountThb: 0,
    }),
    actions: {
        addToCart(item: any) {
            this.cartItems.push(item);
            this.totalAmountLak += item.lak_price * item.quantity;
            this.totalAmountThb += item.thb_price * item.quantity;
        },
        removeFromCart(index: number) {
            const item = this.cartItems[index];
            if (item) {
                this.totalAmountLak -= item.lak_price * item.quantity;
                this.totalAmountThb -= item.thb_price * item.quantity;
                this.cartItems.splice(index, 1);
            }
        },
        clearCart() {
            this.cartItems = [];
            this.totalAmountLak = 0;
            this.totalAmountThb = 0;
        },
    },
});