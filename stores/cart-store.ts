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
        callapi() {
            const { mainApi } = useApi();
            return mainApi;
        },
        async cusetomerPayment() {
            var bodyItem = this.cartItems.map((item) => {
                var lakPrice = 0;
                var thbPrice = 0;
                var usdPrice = 0;
                if (item.size == "unit") {
                    thbPrice = item.thbUnit;
                    usdPrice = item.usdUnit;
                    if (item.lak == 1) {
                        lakPrice = item.lakUnit;
                    } else if (item.thb == 1) {
                        lakPrice = item.thbUnit * item.thbRate;
                    } else {
                        lakPrice = item.usdUnit * item.usdRate;
                    }

                } else {
                    thbPrice = item.thbPackage;
                    usdPrice = item.usdPackage;
                    if (item.lak == 1) {
                        lakPrice = item.lakPackage;
                    } else if (item.thb == 1) {
                        lakPrice = item.thbPackage * item.thbRate;
                    } else {
                        lakPrice = item.usdPackage * item.usdRate;
                    }
                }
                return {
                    proName: item.productName,
                    proId: item.productId,
                    qty: item.qty,
                    priceLak: lakPrice,
                    priceThb: thbPrice,
                    priceUsd: usdPrice,
                    lakAmount: lakPrice * item.qty,
                    thbAmount: thbPrice * item.qty,
                    usdAmount: usdPrice * item.qty,
                    exchangeId: item.exchangeId,
                    rateThb: item.thbRate,
                    rateUsd: item.usdRate,
                    cusId: item.cusId,
                    proUnit: item.size
                };
            });
            // var body = { branchId: branchId };
            const res = await this.callapi().post('insertCustomerPayment', bodyItem);

            if (res.data.status == '00') {
                CallSwal({ icon: 'success', title: 'Success', text: res.data.message });
            } else {
                CallSwal({ icon: 'error', title: 'Error', text: res.data.message });
            }

            this.cartItems = [];
            localStorage.removeItem('cart');
            this.totalAmountLak = 0;
            this.totalAmountThb = 0;
        },

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