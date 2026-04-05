export interface CustomerPaymentMainList {
    listBill: number;
    billId: string;
    totalThb: number;
    totalLak: number;
    custName: string;
    storename: string;
    custTel: string;
    province: string;
    district: string;
    village: string;
    street: null;
    latLong: string;
    datePayment: Date;
}
export interface CustomerPaymentDetails {
    id: number;
    proId: number;
    proName: string;
    qty: number;
    priceLak: number;
    priceThb: number;
    priceUsd: number;
    lakAmount: number;
    thbAmount: number;
    usdAmount: number;
    exchangeId: number;
    rateThb: number;
    rateUsd: number;
    cusId: null;
    custId: number;
    billId: string;
    datePayment: Date;
    createDate: Date;
    proUnit: string;
    custName: string;
    storeName: string;
    province: string;
    district: string;
    village: string;
    street: string;
    latLong: string;
    custTel: string;
    userLogin: null;
    passWord: null;
    idCard: string;
}
