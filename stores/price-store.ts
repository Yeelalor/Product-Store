
import { defineStore } from 'pinia';
export const usePriceStore = defineStore('priceStore', {
    state() {
        return {
            prices: [],
            loading: false,
            search: null,
            request: {
                priceId: 0,
                branchId: null,
                productId: null,
                lakUnit: null,
                lakPackage: null,
                thbUnit: null,
                thbPackage: null,
                usdUnit: null,
                usdPackage: null,
                updateBy: null,
                lak: null,
                thb: null,
                usd: null,
                edit: false,
                key_id: null,
                selectCurrency: 'lak',
            }
        };
    },
    actions: {
        callapi() {
            const { mainApi } = useApi();
            return mainApi;
        },
        async getAllPrices() {
            const res = await this.callapi().post("getPrices");
            if (res.data.status == "00") {
                this.prices = res.data.dataRes;
                console.log("allData=============", this.prices);
            } else {
                showError(res.data.message);
            }
        },
        async updatePrice() {
            this.loading = true;
            var body = {
                priceId: this.request.key_id,
                branchId: this.request.branchId,
                productId: this.request.productId,
                lakUnit: this.request.lakUnit,
                lakPackage: this.request.lakPackage,
                thbUnit: this.request.thbUnit,
                thbPackage: this.request.thbPackage,
                usdUnit: this.request.usdUnit,
                usdPackage: this.request.usdPackage,
                updateBy: "youaadmin",
                lak: this.request.selectCurrency == "lak" ? 1 : 0,
                thb: this.request.selectCurrency == "thb" ? 1 : 0,
                usd: this.request.selectCurrency == "usd" ? 1 : 0,
            };
            const res = await this.callapi().post("updatePrice", body);
            return res.data;

        },
        cloarData() {
            this.request.edit = false;
            this.request.key_id = null;
            this.request.branchId = null;
            this.request.productId = null;
            this.request.lakUnit = null;
            this.request.lakPackage = null;
            this.request.thbUnit = null;
            this.request.thbPackage = null;
            this.request.usdUnit = null;
            this.request.usdPackage = null;
            this.request.selectCurrency = 'lak';
            this.request.lak = null;
            this.request.thb = null;
            this.request.usd = null;
        },
        async insertPrice() {
            var body = {
                branchId: this.request.branchId,
                productId: this.request.productId,
                lakUnit: this.request.lakUnit,
                lakPackage: this.request.lakPackage,
                thbUnit: this.request.thbUnit,
                thbPackage: this.request.thbPackage,
                usdUnit: this.request.usdUnit,
                usdPackage: this.request.usdPackage,
                createBy: 'youaadmin',
                lak: this.request.selectCurrency == "lak" ? 1 : 0,
                thb: this.request.selectCurrency == "thb" ? 1 : 0,
                usd: this.request.selectCurrency == "usd" ? 1 : 0,
            };
            console.log("insert ===========:", body);

            const res = await this.callapi().post("insertPrice", body);
            if (res.data.status == "00") {
                this.prices = res.data.dataRes;
                this.loading = false;

            } else {
                showError(res.data.message);
            }
        },
    },
});
