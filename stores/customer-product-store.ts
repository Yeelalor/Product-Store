import { defineStore } from "pinia";
import type { ProductListModel } from "@/models/product-model";
export const useCustomerProductsStore = defineStore("customerProducts", {
    state: () => ({
        products: [] as ProductListModel[],
        product: null as ProductListModel | null,
        quantity: 0,
        size: "",
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
            this.size = size;
        },
        minusQuantity() {
            if (this.size === '') {
                CallSwal({ icon: "warning", title: "Error", text: "Please select a size first.!" });
                return;
            } else {
                if (this.quantity > 0) {
                    this.quantity -= 1;
                    if (this.size === 'package') {
                        this.lake_rate = Number(this.product?.lakPackage.replace(/,/g, '')) || 0;
                    } else if (this.size === 'unit') {
                        this.lake_rate = Number(this.product?.lakUnit.replace(/,/g, '')) || 0;
                    }
                    this.totalAmountLak = this.quantity * this.lake_rate;
                    // this.totalAmountThb = this.quantity * this.product.priceThb;
                }
            }

        },
        addQuantity() {
            if (this.size === '') {
                CallSwal({ icon: "warning", title: "Error", text: "Please select a size first.!" });
                return;
            } else {
                this.quantity += 1;
                this.totalAmountLak = this.quantity * this.lake_rate;
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