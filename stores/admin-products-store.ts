import { defineStore } from "pinia";
export const useAdminProductsStore = defineStore("adminProducts", {
    state: () => ({
        products: [],
        product: null,
    }),
    actions: {
        callapi() {
            const { mainApi } = useApi();
            return mainApi;
        },
        async fetchProducts() {
            const res = await this.callapi().get("getAdminProductList");
            console.log("===========login===========:", res.data);

            if (res.data.status == "00") {
                console.log("===========login11===========:", res.data);
                this.products = res.data.dataRes;

                console.log("===========login12===========:", this.products);
            } else {
                CallSwal({ icon: "error", title: "Error", text: res.data.message });
            }
        },
    },
});