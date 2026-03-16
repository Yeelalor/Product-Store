import { defineStore } from "pinia";
import type { ProductListModel } from "@/models/product-model";
export const useCustomerProductsStore = defineStore("customerProducts", {
    state: () => ({
        products: [] as ProductListModel[],
        product: null as ProductListModel | null,
        quantity: 1,
        size: "package",
        lake_rate: 0,
        totalAmountLak: 0,
        totalAmountThb: 0,
        viewDetails_for_Order: false,
        image_list: [] as string[]

    }),
    actions: {
        callapi() {
            const { mainApi } = useApi();
            return mainApi;
        },
        cearProductData() {
            this.viewDetails_for_Order = false;
            this.quantity = 1;
            this.size = "package";
            this.image_list = [];

        },
        callExchante() {
            const exchangeStore = useExchangeStore();
            return exchangeStore;
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
        addToCart() {
            const cartStore = useCartStore();
            if (this.product) {
                cartStore.addToCart(this.product);
                // CallSwal({ icon: "success", title: "Success", text: "Product added to cart" });
                this.cearProductData();
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
        selectItem(item: ProductListModel) {
            console.log("=============item============:", item);

            this.image_list = [];
            this.viewDetails_for_Order = true;
            this.product = item;
            this.image_list.push(item.packageUrl);
            this.image_list.push(item.unitUrl);
        },
        async fetchProducts() {
            const res = await this.callapi().get("getCustomerProductList");
            if (res.data.status == "00") {
                this.products = res.data.dataRes;
                console.log("get products=================", this.products);

            } else {
                CallSwal({ icon: "error", title: "Error", text: res.data.message });
            }
        },
    },
});