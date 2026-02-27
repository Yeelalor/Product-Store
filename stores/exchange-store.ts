import { defineStore } from 'pinia';
import type { ExChangeModel } from '@/models/exchange-model';
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
        calculateProductPrice(price: string, exchange: String) {
            const priceNum = Number(price.replace(/,/g, ''));
            const exchangeRateNum = Number(exchange.replace(/,/g, ''));
            const result = priceNum * exchangeRateNum;
            return this.callFormat(result);
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