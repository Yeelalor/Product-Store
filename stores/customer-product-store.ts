import { defineStore } from "pinia";
import type { ProductListModel } from "@/models/product-model";
import type { ExChangeModel } from "~/models/exchange-model";
import type { CustomerPaymentMainList, CustomerPaymentDetails } from "~/models/customer-payment-model";
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
        image_list: [] as string[],
        customerPaymentList: [] as CustomerPaymentMainList[],
        customerPaymentDetailsList: [] as CustomerPaymentDetails[],
        sumTotalList: {},
        loading: false,

    }),
    actions: {
        callapi() {
            const { mainApi } = useApi();
            return mainApi;
        },
        async getCustomerPaymentDetailsList(billId: string) {
            this.loading = true;
            var body = {
                "billId": billId
            }
            const res = await this.callapi().post("getCustomerPaymentDetail", body);
            if (res.data.status == "00") {
                this.loading = false;
                this.customerPaymentDetailsList = res.data.dataResCusPayDetail;
                this.sumTotalList = res.data.customerPaymentTotal;
                console.log("get products=================", this.customerPaymentDetailsList);

            } else {
                this.loading = false;
                CallSwal({ icon: "error", title: "Error", text: res.data.message });
            }
        },
        async getCustomerPaymentMainList(startDate: string, endDate: string) {
            this.loading = true;
            var body = {
                startDate: startDate,
                endDate: endDate,
            }
            const res = await this.callapi().post("getCustomerPaymentMainLists", body);
            if (res.data.status == "00") {
                this.loading = false;
                this.customerPaymentList = res.data.dataResCusPayMain;
                console.log("get products=================", this.customerPaymentList);

            } else {
                this.loading = false;
                CallSwal({ icon: "error", title: "Error", text: res.data.message });
            }
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
        selectItem(item: ProductListModel, exchange: ExChangeModel) {
            const userinfo = localStorage.getItem("customerUserData");
            if (userinfo) {
                console.log("=============item============:", JSON.parse(userinfo).custId);
                this.image_list = [];
                this.viewDetails_for_Order = true;
                this.product = item;
                this.product.cusId = JSON.parse(userinfo).custId;
                this.product.exchangeId = exchange.id;
                this.product.usdRate = exchange.usd;
                this.product.thbRate = exchange.thb;
                console.log("=============product============:", this.product);
                this.image_list.push(item.packageUrl);
                this.image_list.push(item.unitUrl);
            }
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