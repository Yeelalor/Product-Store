import { defineStore } from "pinia";
export const useProductStore = defineStore("product", {
    state() {
        return {
            products: [],
            loading: false,
            search: null,
        };
    },
    actions: {
        callapi() {
            const { mainApi } = useApi();
            return mainApi;
        },

        cleanData() {
            this.products = [];
            this.search = null;
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
