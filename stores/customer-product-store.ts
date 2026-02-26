import { defineStore } from "pinia";
import type { ProductListModel } from "@/models/product-model";
export const useCustomerProductsStore = defineStore("customerProducts", {
    state: () => ({
        products: [] as ProductListModel[],
        product: null as ProductListModel | null,
        quantity: 0,
        size: "",
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
        minusQuantity() {
            if (this.product && this.quantity > 0) {
                this.quantity -= 1;
                // this.totalAmountLak = this.quantity * this.product.priceLak;
                // this.totalAmountThb = this.quantity * this.product.priceThb;
            }
        },
        addQuantity() {
            if (this.product) {
                this.quantity += 1;
                // this.totalAmountLak = this.quantity * this.product.priceLak;
                // this.totalAmountThb = this.quantity * this.product.priceThb;
            }
        },
        selectItem(item: ProductListModel) {
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
            } else {
                CallSwal({ icon: "error", title: "Error", text: res.data.message });
            }
        },
    },
});