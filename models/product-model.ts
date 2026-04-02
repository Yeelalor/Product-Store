
export interface ProductResponseModel {
    status: string;
    message: string;
    dataRes: ProductListModel[];
}
export interface ProductListModel {
    companyName: string;
    branchName: string;
    productName: string;
    lakUnit: number;
    lakPackage: number;
    thbUnit: number;
    thbPackage: number;
    usdUnit: number;
    usdPackage: number;
    imgUnit: string;
    unitUrl: string;
    imgPackage: string;
    packageUrl: string;
    priceId: number;
    branchId: number;
    productId: number;
    bprovince: string;
    bvillage: string;
    bdistrict: string;
    size: String;
    qty: 1;
    totalThb: number;
    totalLak: number;
    totalUsd: number;
    lak: number;
    thb: number;
    usd: number;
    cusId: number;
    exchangeId: number;
    usdRate: number;
    thbRate: number;
}
