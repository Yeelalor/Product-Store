import { defineStore } from 'pinia';
export const useExchangeStore = defineStore('exchangeStore', {
    state() {
        return {
            exchanges: [],
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