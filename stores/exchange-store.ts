import { defineStore } from 'pinia';
import type { ExChangeModel } from '@/models/exchange-model';
import type { ProductListModel } from '~/models/product-model';
export const useExchangeStore = defineStore('exchangeStore', {
    state() {
        return {
            exchanges: [] as ExChangeModel[],
            loading: false,
            search: null,
        };
    },
    actions: {
        callapi() {
            const { mainApi } = useApi();
            return mainApi;
        },
        callFormat(value: any) {
            const { formatCurrency } = useInputFormatNumber();
            return formatCurrency(value);
        },
        calculateProductPrice(productItem: ProductListModel, exchange: ExChangeModel, productSize: string) {
            console.log("thb=11==================", productItem);
            console.log("thb=22==================", productItem.thb);
            // console.log("ex=111==================", exchange.thb);
            if (productItem?.thb === 1) {
                if (productSize === 'package') {
                    const result = productItem.thbPackage * (exchange?.thb);
                    return this.callFormat(result);
                } else {
                    const result = productItem.thbUnit * (exchange?.thb);
                    return this.callFormat(result);
                }
            } else if (productItem.usd === 1) {
                if (productSize === 'package') {
                    const result = productItem.usdUnit * (exchange?.usd);
                    return this.callFormat(result);
                } else {
                    const result = productItem.usdUnit * (exchange?.usd);
                    return this.callFormat(result);
                }
            } else if (productItem.thbPackage === 1) {
                const result = productItem.thbPackage * (exchange?.thb);
                return this.callFormat(result);
            } else if (productItem.usd === 1) {
                const result = productItem.usdUnit * (exchange?.usd);
                return this.callFormat(result);
            } else {
                const result = productItem.lakUnit;
                return this.callFormat(result);
            }
        },

        cleanData() {
            this.exchanges = [];
            this.search = null;
        },
        async getExchangeByBranch(branchId: any) {
            var body = { branchId: branchId };
            const res = await this.callapi().post('getExchangeByBranch', body);
            console.log('===========exchange rates by branch id===========:', res.data.dataRes);

            if (res.data.status == '00') {
                this.exchanges = res.data.dataRes;
            } else {
                CallSwal({ icon: 'error', title: 'Error', text: res.data.message });
            }
        },
        async fetchExchanges() {
            const res = await this.callapi().get('getExchangeRates');
            console.log('===========exchange rates===========:', res.data);

            if (res.data.status == '00') {
                this.exchanges = res.data.dataRes;
            } else {
                CallSwal({ icon: 'error', title: 'Error', text: res.data.message });
            }
        },
    },
});