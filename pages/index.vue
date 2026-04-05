<template>
  <v-container fluid>
    <v-row
      ><v-col cols="12" md="12" sm="12">
        <!-- this is the tap for company waitting to approve  -->

        <!-- this is the tap for production that customer ordered  -->
        <v-card rounded="xl" style="margin-top: 10px">
          <v-card-title primary-title> ລາຍການສິນຄ້າທີ່ລູກຄ້າສັ່ງຊື້ </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-data-table
              :headers="headerCustomerPayment"
              :items="customerPaymentList"
              class="elevation-1"
            >
              <template #[`item.id`]="{ index }">
                {{ index + 1 }}
              </template>
              <template #[`item.province`]="{ item }">
                {{ item.province }}-{{ item.district }}-{{ item.village }}-{{
                  item.street
                }}
              </template>
              <template #[`item.actions`]="{ item }">
                <div class="d-flex">
                  <v-btn
                    color="primary"
                    variant="outlined"
                    class="ml-2"
                    @click="viewcustomerPaymentDetails(item.billId)"
                    ><v-icon>mdi-eye-refresh</v-icon> {{ $t("btn_view") }}</v-btn
                  >
                </div>
              </template>
            </v-data-table>
          </v-card-text></v-card
        >
        <!-- this is the tap for delivery product to customer  -->
      </v-col></v-row
    >

    <!-- this is for views bill details  -->
    <v-dialog
      v-model="viewBillDetails"
      scrollable
      fullscreen
      persistent
      :overlay="false"
      max-width="500px"
      transition="dialog-transition"
    >
      <v-card class="pa-3">
        <v-card-title class="bg-primary text-white" primary-title>
          <div class="d-flex">
            ລາຍລະອຽດການຊຳລະ <v-spacer> </v-spacer>
            <v-btn
              color="white"
              variant="outlined"
              rounded
              @click="viewBillDetails = false"
            >
              <v-icon class="mr-2">mdi-close</v-icon>
              {{ $t("btn_close") }}
            </v-btn>
          </div>
        </v-card-title>
        <v-card-text>
          <h3>
            {{ $t("order_store_name") }}:
            <b
              >{{ customerDetails.storeName || "N/A" }} ({{
                customerDetails.custName || "N/A"
              }})</b
            >
          </h3>
          <h3>
            {{ $t("bill_id") }}: <b>{{ customerDetails.billId || "N/A" }}</b>
          </h3>
          <h3>
            {{ $t("date") }}: <b>{{ customerDetails.datePayment || "N/A" }}</b>
          </h3>
          <h3>
            {{ $t("phone") }}: <b>{{ customerDetails.custTel || "N/A" }}</b>
          </h3>
          <h3>
            {{ $t("address") }}:
            <b
              >{{ customerDetails.province || "N/A" }}-{{
                customerDetails.district || "N/A"
              }}-{{ customerDetails.village || "N/A" }}-ຮ່ອມ:
              {{ customerDetails.street || "N/A" }}</b
            >
          </h3>
          <v-data-table
            :headers="headerCustomerPaymentDetails"
            :items="customerPaymentDetailsList"
            hide-default-footer
            class="elevation-1"
            :item-perpage="customerPaymentDetailsList.lengths"
          >
            <template #[`item.id`]="{ index }">
              {{ index + 1 }}
            </template>
            <template #[`item.province`]="{ item }">
              {{ item.province }}-{{ item.district }}-{{ item.village }}-{{ item.street }}
            </template>
            <template #[`item.priceLak`]="{ item }">
              {{ formatCurrency(item.priceLak) }}
            </template>
            <template #[`item.priceThb`]="{ item }">
              {{ formatCurrency(item.priceThb) }}
            </template>
            <template #[`item.priceUsd`]="{ item }">
              {{ formatCurrency(item.priceUsd) }}
            </template>
            <template #[`item.lakAmount`]="{ item }">
              {{ formatCurrency(item.lakAmount) }}
            </template>
            <template #[`item.thbAmount`]="{ item }">
              {{ formatCurrency(item.thbAmount) }}
            </template>
            <template #[`item.qty`]="{ item }">
              {{ item.qty }} {{ item.proUnit }}
            </template>
          </v-data-table>
          <div class="d-flex mt-2">
          
            <v-spacer> </v-spacer>
              <h4>ຍອດລວມທັງໝົດເງິນທີ່ຊຳລະ:</h4>
            <v-btn variant="outlined" color="blue" class="mb-4 mr-2">
              <p>ກີບ:{{ formatCurrency(sumTotalList.lakeTotal) }}</p>
            </v-btn>
            <v-btn variant="outlined" color="red" class="mb-4 mr-2">
              <p>ບາດ: {{ formatCurrency(sumTotalList.thbTotal) }}</p>
            </v-btn>
            <v-btn variant="outlined" color="green" class="mb-4 mr-2">
              <p>ໂດລາ:{{ formatCurrency(sumTotalList.usdTotal) }}</p>
            </v-btn>
          </div>
          <div class="text-right d-flex" style="text-align: right">
            <v-spacer> </v-spacer>

            {{ $t("exchange_rate") }}:
            <h4 class="mr-5">
              THB: <b>{{ customerDetails.rateThb || "N/A" }} </b>
            </h4>
            <h4 class="mr-2">
              USD: <b>{{ customerDetails.rateUsd || "N/A" }} </b>
            </h4>
            |
          </div>
        </v-card-text>
        <v-card-actions
          ><v-btn
            color="grey"
            rounded="xl"
            variant="outlined"
            @click="viewBillDetails = false"
            >{{ $t("btn_close") }}</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
const { t } = useI18n();
const viewBillDetails = ref(false);
const callUserLogin = useLogin();
const customePaymentStore = useCustomerProductsStore();
const { formatCurrency } = useInputFormatNumber();
const user = computed(() => callUserLogin.customerUserData);
const customerPaymentList = computed(() => customePaymentStore.customerPaymentList);
const customerPaymentDetailsList = computed(
  () => customePaymentStore.customerPaymentDetailsList
);
const customerDetails = computed(
  () => customePaymentStore.customerPaymentDetailsList[0] || {}
);
const sumTotalList = computed(() => customePaymentStore.sumTotalList);

onMounted(() => {
  const today = new Date();
  const yesterday = new Date();
  // subtract 1 day
  yesterday.setDate(today.getDate() - 1);

  // format to YYYY-MM-DD
  const format = (date) => date.toISOString().split("T")[0];

  const todayStr = format(today);
  // const yesterdayStr = format(yesterday);
  const yesterdayStr = "2026-04-02";
  customePaymentStore.getCustomerPaymentMainList(yesterdayStr, todayStr);
  console.log("date============", todayStr, yesterdayStr);
});

// this is the header for list order products
const headerCustomerPayment = ref([
  { title: "ລດ", key: "id", align: "start" },
  { title: t("bill_id"), key: "billId", align: "start" },
  { title: t("customer_name"), key: "custName", align: "start" },
  { title: t("customer_store_name"), key: "storename", align: "start" },
  { title: t("phone"), key: "custTel", align: "start" },
  { title: "ຈໍານວນລາຍການ", key: "listBill", align: "start" },
  { title: "ຈໍານວນເງິນ LAK", key: "totalLak", align: "start" },
  { title: "ຈໍານວນເງິນ THB", key: "totalThb", align: "start" },
  { title: "ວັນທີຊຶ້", key: "datePayment", align: "start" },
  { title: "ທີ່ຢູ່", key: "province", align: "start" },
  { title: t("actions"), key: "actions", align: "start" },
]);
const headerCustomerPaymentDetails = ref([
  { title: "ລດ", key: "id", align: "start" },
  { title: "ຊື່ສິນຄ້າ", key: "proName", align: "start" },
  { title: "ຈໍານວນ", key: "qty", align: "start" },
  { title: "ລາຄາ LAK", key: "priceLak", align: "start" },
  { title: "ລາຄາ THB", key: "priceThb", align: "start" },
  { title: "ລາຄາ USD", key: "priceUsd", align: "start" },
  { title: "ຈໍານວນເງິນ LAK", key: "lakAmount", align: "start" },
  { title: "ຈໍານວນເງິນ THB", key: "thbAmount", align: "start" },
]);
const viewcustomerPaymentDetails = (id) => {
  viewBillDetails.value = true;
  console.log("item=============", id);

  customePaymentStore.getCustomerPaymentDetailsList(id);
};
</script>

<style lang="scss" scoped></style>
