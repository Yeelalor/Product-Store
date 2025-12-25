<template>
  <v-container grid-list-xs>
    <v-row><v-col cols="12" md="12" sm="12">
        <!-- this is the tap for company waitting to approve  -->
        <v-card class="pa-1" color="primary">
          <v-card rounded="xl">
            <v-card-title primary-title> ບໍລິສັດລໍຖ້າອະນຸມັດ </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <v-data-table :headers="headers" :items="companies_list" class="elevation-1">
                <template #item.id="{ index }">
                  {{ index + 1 }}
                </template>
                <template #item.actions="{ item }">
                  <div class="d-flex">
                    <v-btn color="primary" variant="outlined"><v-icon>mdi-check-circle</v-icon>
                      {{ $t("btn_approve") }}</v-btn>
                    <v-btn color="red" variant="outlined" class="ml-2"><v-icon>mdi-close-circle</v-icon>
                      {{ $t("btn_cancel") }}</v-btn>
                    <v-btn color="red" variant="outlined" class="ml-2"><v-icon>mdi-eye-refresh</v-icon>
                      {{ $t("btn_view") }}</v-btn>
                  </div>
                </template>
              </v-data-table>
            </v-card-text></v-card>
          <!-- this is the tap for production that customer ordered  -->
          <v-card rounded="xl" style="margin-top: 10px">
            <v-card-title primary-title>
              ລາຍການສິນຄ້າທີ່ລູກຄ້າສັ່ງ
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <v-data-table :headers="headersProduct" :items="product_list" class="elevation-1">
                <template #item.id="{ index }">
                  {{ index + 1 }}
                </template>
                <template #item.actions="{ item }">
                  <div class="d-flex">
                    <v-btn color="primary" variant="outlined" class="ml-2"
                      @click="viewBillDetails = true"><v-icon>mdi-eye-refresh</v-icon>
                      {{ $t("btn_view") }}</v-btn>
                  </div>
                </template>
              </v-data-table>
            </v-card-text></v-card>
          <!-- this is the tap for delivery product to customer  -->
          <v-card rounded="xl" style="margin-top: 10px">
            <v-card-title primary-title>
              ລາຍການສິນຄ້າທີ່ກໍາລັງຈັດສົ່ງລູກຄ້າ
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <v-data-table :headers="headers" :items="companies_list" class="elevation-1">
                <template #item.id="{ index }">
                  {{ index + 1 }}
                </template>
              </v-data-table>
            </v-card-text></v-card>
        </v-card></v-col></v-row>

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
            <template #item.id="{ index }">
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
const user = computed(() => callUserLogin.customerUserData);
onMounted(() => {
  console.log("user data dashboard========", user.value);

});
const headersBillDetail = ref([
  { title: "#", key: "id", align: "start" },
  // { title: t("bill_id"), key: "bill_id", align: "start" },

  { title: t("product_name"), key: "product_name", align: "start" },
  { title: t("supplier_store"), key: "store_order", align: "start" },
  { title: t("order_atm"), key: "order_amount", align: "start" },
  { title: t("amount"), key: "amount", align: "start" },
  { title: t("total"), key: "total", align: "start" },
]);
// this is the header for list order products
const headersProduct = ref([
  { title: "#", key: "id", align: "start" },
  { title: t("bill_id"), key: "bill_id", align: "start" },

  // { title: t("product_name"), key: "product_name", align: "start" },
  { title: t("supplier_store"), key: "store_order", align: "start" },
  { title: t("order_atm"), key: "order_amount", align: "start" },
  // { title: t("amount"), key: "amount", align: "start" },
  { title: t("total"), key: "total", align: "start" },
  { title: t("actions"), key: "actions", align: "start" },
]);
const headers = ref([
  { title: "#", key: "id", align: "start" },
  { title: t("conpany_name"), key: "groupId", align: "start" },

  { title: t("select_conpany_type"), key: "comType", align: "start" },
  { title: t("branch_name"), key: "branchName", align: "start" },
  { title: t("phone"), key: "phone", align: "start" },
  { title: t("actions"), key: "actions", align: "start" },
  { title: "", key: "actions2", align: "start" },
  { title: "", key: "actions3", align: "start" },
]);
// this is the data for list order products
const product_list = ref([
  {
    bill_id: "001",
    product_name: "Water big",
    store_order: "store N $ S",
    order_amount: 22,
    amount: "12.000",
    total: "12.000.000",
  },
  {
    bill_id: "002",
    product_name: "Water big",
    store_order: "store AA $ B",
    order_amount: 40,
    amount: "12.000",
    total: "20.000.000",
  },
]);
// this is the bill details for views bill
const billDetails_list = ref([
  {
    bill_id: "001",
    product_name: "Water big",
    store_order: "store N $ S",
    order_amount: 22,
    amount: "12.000",
    total: "12.000.000",
  },
  {
    bill_id: "002",
    product_name: "kato",
    store_order: "store AA $ B",
    order_amount: 40,
    amount: "12.000",
    total: "20.000.000",
  },
  {
    bill_id: "002",
    product_name: "Pepsi big",
    store_order: "store AA $ B",
    order_amount: 20,
    amount: "12.000",
    total: "20.000.000",
  },
]);
const companies_list = ref([
  {
    groupId: "ສົມບູນການຄ້າ",

    comType: "ເຄື່ອງແຫ້ງ",
    branchName: "ສາຂາດອນແດງ",
    phone: "2099880011",
  },
  {
    groupId: "ສົມບູນການຄ້າ",

    comType: "ເຄື່ອງແຫ້ງ",
    branchName: "ສາຂາຈອມມະນິ",
    phone: "2099880089",
  },
]);
</script>

<style lang="scss" scoped></style>
