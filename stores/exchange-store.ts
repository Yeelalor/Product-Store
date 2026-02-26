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
        calculateProductPrice(price: string): number {
            const priceNum = parseFloat(price);
            const exchangeRateNum = this.exchanges[0] ? parseFloat(this.exchanges[0].thb) : 0; // Assuming you want to use the THB exchange rate from the first item in the exchanges array
            if (isNaN(priceNum) || isNaN(exchangeRateNum)) {
                return 0; // Return 0 if either value is not a valid number
            }
            return priceNum * exchangeRateNum;
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