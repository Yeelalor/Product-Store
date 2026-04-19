
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
                lakUnit: 0,
                lakPackage: 0,
                thbUnit: 0,
                thbPackage: 0,
                usdUnit: 0,
                usdPackage: 0,
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

                CallSwal({ icon: "warning", title: "ຜິດພາດ", text: res.data.message });
            }
        },
        async updatePrice() {
            this.loading = true;
            var body = {
                priceId: this.request.key_id,
                branchId: this.request.branchId,
                productId: this.request.productId,
                lakUnit: String(this.request.lakUnit)?.replace(/,/g, ''),
                lakPackage: String(this.request.lakPackage)?.replace(/,/g, ''),
                thbUnit: String(this.request.thbUnit)?.replace(/,/g, ''),
                thbPackage: String(this.request.thbPackage)?.replace(/,/g, ''),
                usdUnit: String(this.request.usdUnit)?.replace(/,/g, ''),
                usdPackage: String(this.request.usdPackage)?.replace(/,/g, ''),
                updateBy: "youaadmin",
                lak: this.request.selectCurrency == "lak" ? 1 : 0,
                thb: this.request.selectCurrency == "thb" ? 1 : 0,
                usd: this.request.selectCurrency == "usd" ? 1 : 0,
            };
            const res = await this.callapi().put("updatePrice", body);
            return res.data;

        },
        clearData() {
            this.request.edit = false;
            this.request.key_id = null;
            this.request.branchId = null;
            this.request.productId = null;
            this.request.lakUnit = 0;
            this.request.lakPackage = 0;
            this.request.thbUnit = 0;
            this.request.thbPackage = 0;
            this.request.usdUnit = 0;
            this.request.usdPackage = 0;
            this.request.selectCurrency = 'lak';
            this.request.lak = null;
            this.request.thb = null;
            this.request.usd = null;
        },
        async insertPrice() {
            this.loading = true;
            var body = {
                branchId: this.request.branchId,
                productId: this.request.productId,
                lakUnit: String(this.request.lakUnit)?.replace(/,/g, ''),
                lakPackage: String(this.request.lakPackage)?.replace(/,/g, ''),
                thbUnit: String(this.request.thbUnit)?.replace(/,/g, ''),
                thbPackage: String(this.request.thbPackage)?.replace(/,/g, ''),
                usdUnit: String(this.request.usdUnit)?.replace(/,/g, ''),
                usdPackage: String(this.request.usdPackage)?.replace(/,/g, ''),
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
                CallSwal({ icon: "warning", title: "ຜິດພາດ", text: res.data.message });
                this.loading = false;
            }
        },
    },
});
