import { defineStore } from "pinia";
export const useAdminProductsStore = defineStore("adminProducts", {
    state: () => ({
        products: [],
        product: null,
    }),
    actions: {

    },
});