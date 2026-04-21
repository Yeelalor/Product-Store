import { defineStore } from "pinia";
import type { ProductListModel } from "@/models/product-model";
import type { ExChangeModel } from "~/models/exchange-model";
export const useAdminProductsStore = defineStore("adminProducts", {
    state: () => ({
        products: [] as ProductListModel[],
        product: null as ProductListModel | null,
        loading: false,
        page: 20,
        cartItems: [] as ProductListModel[],
        image_list: [] as string[],
        viewDetails_for_Order: false,
        quantity: 0,
        size: "package",
        selectMulti:[] as ProductListModel[],
        dialogMultiple:false,
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
        totalPriceUsd(state) {
            return state.cartItems.reduce((total, item) => {
                const itemTotal = item.size === "package" && item.usd == 1 ? item.usdPackage * item.qty : item.usdUnit * item.qty;
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
       
        calculatePriceQty(item:ProductListModel){
            if(item.size=='unit'){
                
            }
         
        },
         minusQuantity() {
            if (this.quantity > 0) {
                this.product!.size = this.size as any;
                this.quantity -= 1;
                this.product!.qty = this.quantity as any;

            }

        },
        addQuantity() {
            this.quantity += 1;
            if (this.product) {
                this.product.qty = this.quantity as any;
                this.product!.size = this.size as any;
            }
        },
        clearProductData() {
            this.viewDetails_for_Order = false;
            this.quantity = 1;
            this.size = "package";
            this.image_list = [];

        },
        selectSize(size: string) {
            this.quantity = 1;
            if (this.product) {
                this.product.qty = this.quantity as any;
            }
            this.size = size;
            if (this.product) {
                this.product.size = size;
            }
        },
        selectItem(item: ProductListModel, exchange: ExChangeModel) {
            const userinfo = localStorage.getItem("customerUserData");

            if (userinfo) {
                this.image_list = [];
                this.viewDetails_for_Order = true;
                this.product = item;
                this.product.cusId = JSON.parse(userinfo).custId;
                this.product.exchangeId = exchange.id;
                this.product.usdRate = exchange.usd;
                this.product.thbRate = exchange.thb;
                this.image_list.push(item.packageUrl);
                this.image_list.push(item.unitUrl);
            }
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
            this.product=[];
            this.viewDetails_for_Order=false;

        },
        saveCart() {
            localStorage.setItem('admin-cart', JSON.stringify(this.cartItems));
        },
        loadCart() {
            const savedCart = localStorage.getItem('admin-cart');
            if (savedCart) {
                this.cartItems = JSON.parse(savedCart);
            }
        },
        async fetchProducts() {
            this.loading = true;
            const res = await this.callapi().get("getAdminProductList");

            if (res.data.status == "00") {
                this.loading = false;
                this.products = res.data.dataRes;
            } else {
                this.loading = false;
                CallSwal({ icon: "error", title: "Error", text: res.data.message });
            }
        },
    },
});