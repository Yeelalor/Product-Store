import { defineStore } from "pinia";
export const useCustomerProductsStore = defineStore("customerProducts", {
    state: () => ({
        products: [],
        product: null,
        quantity: 0,
        size: "",
        totalAmountLak: 0,
        totalAmountThb: 0,

    }),
    actions: {
        callapi() {
            const { mainApi } = useApi();
            return mainApi;
        },

        async fetchProducts() {
            const res = await this.callapi().get("getProductDetails");
            console.log("===========login===========:", res.data);

            if (res.data.status == "00") {
                this.products = res.data.dataRes;
            } else {
                CallSwal({ icon: "error", title: "Error", text: res.data.message });
            }
        },
    },
});