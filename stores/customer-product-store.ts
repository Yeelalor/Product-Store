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
        minusQuantity() {
            if (this.quantity > 0) {
                this.quantity -= 1;
                if (this.product) {
                    this.product.qty = this.quantity as any;
                    if (this.product.size === "package") {
                        const totalThb = this.product.qty * this.product.thbPackage;
                        const totalLak = this.product.qty * this.product.lakPackage;
                        const totalUsd = this.product.qty * this.product.usdPackage;
                        this.product.totalThb = totalThb;
                        this.product.totalLak = totalLak;
                        this.product.totalUsd = totalUsd;
                    } else {
                        const totalThb = this.product.qty * this.product.thbUnit;
                        const totalLak = this.product.qty * this.product.lakUnit;
                        const totalUsd = this.product.qty * this.product.usdUnit;
                        this.product.totalLak = totalLak;
                        this.product.totalUsd = totalUsd;
                        this.product.totalThb = totalThb;
                    }
                }
            }

        },
        addQuantity() {
            this.quantity += 1;
            if (this.product) {
                this.product.qty = this.quantity as any;
                if (this.product.size === "package") {
                    const totalThb = this.product.qty * this.product.thbPackage;
                    const totalLak = this.product.qty * this.product.lakPackage;
                    const totalUsd = this.product.qty * this.product.usdPackage;
                    this.product.totalThb = totalThb;
                    this.product.totalLak = totalLak;
                    this.product.totalUsd = totalUsd;
                } else {
                    const totalThb = this.product.qty * this.product.thbUnit;
                    const totalLak = this.product.qty * this.product.lakUnit;
                    const totalUsd = this.product.qty * this.product.usdUnit;
                    this.product.totalLak = totalLak;
                    this.product.totalUsd = totalUsd;
                    this.product.totalThb = totalThb;
                }
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