<template>
  <v-container fluid>
    <v-row><v-col cols="12" md="12" sm="12">
        <!-- this is the tap for company waitting to approve  -->
      
          <!-- this is the tap for production that customer ordered  -->
          <v-card rounded="xl" style="margin-top: 10px">
            <v-card-title primary-title>
              ລາຍການສິນຄ້າທີ່ລູກຄ້າສັ່ງ
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <v-data-table :headers="headerCustomerPayment" :items="customerPaymentList" class="elevation-1">
                <template #[`item.id`]="{ index }">
                  {{ index + 1 }}
                </template>
                 <template #[`item.province`]="{ item }">
                  {{ item.province  }}-{{ item.district }}-{{ item.village }}-{{item.street}}
                </template>
                <template #[`item.actions`]="{  }">
                  <div class="d-flex">
                    <v-btn color="primary" variant="outlined" class="ml-2"
                      @click="viewBillDetails = true"><v-icon>mdi-eye-refresh</v-icon>
                      {{ $t("btn_view") }}</v-btn>
                  </div>
                </template>
              </v-data-table>
            </v-card-text></v-card>
          <!-- this is the tap for delivery product to customer  -->
         
      </v-col></v-row>

    <!-- this is for views bill details  -->
    <v-dialog v-model="viewBillDetails" scrollable fullscreen persistent :overlay="false" max-width="500px"
      transition="dialog-transition">
      <v-card class="pa-3">
        <v-card-text>
          <h3>{{ $t("bill_id") }}: <b>001</b></h3>
          <h3>{{ $t("date") }}: <b>30-09-2025</b></h3>
          <h3>{{ $t("order_store_name") }}: <b>HHN & NV store</b></h3>
          <h3>{{ $t("phone") }}: <b>020 99801389</b></h3>
          <v-data-table :headers="headersBillDetail" :items="billDetails_list" :items-per-page="billDetails_list.length"
            class="elevation-1" hide-default-footer>
            <template #[`item.id`]="{ index }">
              {{ index + 1 }}
            </template>
          </v-data-table>
        </v-card-text>
        <v-card-actions><v-btn color="grey" rounded="xl" variant="outlined" @click="viewBillDetails = false">{{
          $t("btn_close") }}</v-btn>
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
const user = computed(() => callUserLogin.customerUserData);
const customerPaymentList = computed(() => customePaymentStore.customerPaymentList);

onMounted(() => {
  const today = new Date();
const yesterday = new Date();
// subtract 1 day
yesterday.setDate(today.getDate() - 1);

// format to YYYY-MM-DD
const format = (date) => date.toISOString().split('T')[0];

const todayStr = format(today);
const yesterdayStr = format(yesterday);
  customePaymentStore.getCustomerPaymentMainList(yesterdayStr, todayStr);
console.log("date============",todayStr, yesterdayStr);

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

</script>

<style lang="scss" scoped></style>
