<template>
  <v-container fluid>
    <v-card color="" class="pa-1">
      <v-card rounded="xl">
        <v-card-title primary-title class="d-flex bg-primary">
          {{ $t("product_info") }}-{{ $t("price") }}
        </v-card-title>
        <v-divider></v-divider>
        <!-- <v-form> -->
        <v-card-text>
          <div class="d-flex align-center">
            <b style="white-space: nowrap; margin-right: 8px">{{
              $t("conpany_info")
              }}</b>
            <v-divider class="flex-grow-1"></v-divider>
          </div>
          <v-card elevation="0" variant="outlined" class="pa-5" style="
                border: 2px solid green;
                border-radius: 12px;
                margin-top: 5px;
              ">
            <v-row>
              <v-col cols="4">
                <v-autocomplete v-model="branch" :items="branches" item-value="id" item-title="branchName"
                  :label="$t('select') + $t('branch_name')" variant="outlined" rounded
                  clearable></v-autocomplete></v-col><v-col cols="4">
                <v-autocomplete v-model="product" :items="products" item-value="id" item-title="productName"
                  :label="$t('select') + $t('product_name')" variant="outlined" rounded
                  clearable></v-autocomplete></v-col></v-row>
          </v-card>
          <br />
          <div class="d-flex align-center">
            <b style="white-space: nowrap; margin-right: 8px">{{ $t("input") }} {{ $t("info") }} {{ $t("price") }}</b>
            <v-divider class="flex-grow-1"></v-divider>
          </div>
          <v-card elevation="0" variant="outlined" class="pa-5" style="
                border: 2px solid green;
                border-radius: 12px;
                margin-top: 5px;
              ">
            <div class="d-flex">
              <h3 class="pt-1">{{ $t("select_main_currency") }}:</h3><v-radio-group
                v-model="price.request.selectCurrency" inline>
                <v-radio label="LAK" value="lak" color="primary"></v-radio>
                <v-radio label="THB" value="thb" color="primary"></v-radio>
                <v-radio label="USD" value="usd" color="primary"></v-radio>
              </v-radio-group>
            </div>

            <v-row>

              <v-col cols="3">
                <span>
                  <p>
                    {{ $t("price_unit") }} <b class="text-blue">LAK</b>
                  </p>
                </span>
                <v-text-field rounded="xl" clearable v-model="price.request.lakUnit"
                  @input="lak_unit = $formatCurrency(lak_unit)"></v-text-field></v-col>
              <v-col cols="3">
                <span>
                  <p>
                    {{ $t("price_package") }} <b class="text-blue">LAK</b>
                  </p>
                </span>
                <v-text-field rounded="xl" clearable v-model="price.request.lakPackage"
                  @input="lak_package = $formatCurrency(lak_package)"></v-text-field></v-col>
              <v-col cols="3">
                <span>
                  <p>
                    {{ $t("price_unit") }} <b class="text-red">THB</b>
                  </p>
                </span>
                <v-text-field rounded="xl" clearable v-model="price.request.thbUnit"
                  @input="thb_unit = $formatCurrency(thb_unit)"></v-text-field></v-col>
              <v-col cols="3">
                <span>
                  <p>
                    {{ $t("price_package") }} <b class="text-red">THB</b>
                  </p>
                </span>
                <v-text-field rounded="xl" clearable v-model="price.request.thbPackage"
                  @input="thb_package = $formatCurrency(thb_package)"></v-text-field></v-col>
              <v-col cols="3">
                <span>
                  <p>
                    {{ $t("price_unit") }} <b class="text-green">USD</b>
                  </p>
                </span>
                <v-text-field rounded="xl" clearable v-model="price.request.usdUnit"
                  @input="usd_unit = $formatCurrency(usd_unit)"></v-text-field></v-col>
              <v-col cols="3">
                <span>
                  <p>
                    {{ $t("price_package") }} <b class="text-green">USD</b>
                  </p>
                </span>
                <v-text-field rounded="xl" clearable v-model="price.request.usdPackage"
                  @input="usd_package = $formatCurrency(usd_package)"></v-text-field></v-col></v-row>
          </v-card>
        </v-card-text>
        <v-card-actions>
          <v-row justify="start"><v-col cols="12" md="6" sm="6">
              <v-btn color="grey" class="mr-2" rounded="xl" variant="outlined" @click="price.cloarData()"><v-icon
                  class="mr-4">mdi-cancel</v-icon>{{ $t("btn_cancel") }}</v-btn>
              <v-btn v-if="edit == false" color="primary" rounded="xl" variant="outlined" type="submit"
                @click="insertPrict()"><v-icon class="mr-4">mdi-content-save-all</v-icon>{{ $t("save") }}</v-btn>
              <v-btn v-else color="purple" rounded="xl" variant="outlined" type="submit" @click="updatePrice()"><v-icon
                  class="mr-4">mdi-content-save-all</v-icon>{{ $t("btn_edit")
                  }}</v-btn></v-col></v-row>
          <br /><br /> </v-card-actions>
        <!-- </v-form> -->
      </v-card>

      <v-card rounded="xl" style="margin-top: 5px">
        <v-card-text>
          <v-data-table :headers="headers" :items="allData" :search="search" hide-actions class="elevation-1"
            pagination.sync="pagination" item-key="id">
            <template #item.id="{ index, item }">
              {{ index + 1 }}
            </template>
            <template #item.actions="{ item }">
              <div class="d-flex">
                <v-btn color="blue" rounded="xl" variant="outlined" @click="showEdit(item)"><v-icon>mdi-pen</v-icon>{{
                  $t("btn_edit") }}</v-btn>
              </div>
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-card>
    <MLoading v-model="loading"></MLoading>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
const { mainApi } = useApi();
const { t } = useI18n();
const products = ref([]);
const product = ref(null);
const branches = ref([]);
const branch = ref(null);
const lak_unit = ref(null);
const lak_package = ref(null);
const thb_unit = ref(null);
const thb_package = ref(null);
const usd_unit = ref(null);
const usd_package = ref(null);
const search = ref(null);
const allData = ref([]);
const key_id = ref(null);
const edit = ref(false);
const loading = ref(false);
const CurrencyRadio = ref("lak");
const price = usePriceStore();
const { showSuccess, showWarning, showError } = useAlert();

// role for feild
const rules = [
  (value) => {
    if (value) return true;
    return t("rule");
  },
];

// table header

const headers = ref([
  { title: "#", key: "id", align: "start" },
  { title: t("product_name"), key: "productName", align: "start" },
  { title: t("price_unit") + " " + "LAK", key: "lakUnit", align: "start" },
  {
    title: t("price_package") + " " + "LAK",
    key: "lakPackage",
    align: "start",
  },
  { title: t("price_unit") + " " + "THB", key: "thbUnit", align: "start" },
  {
    title: t("price_package") + " " + "THB",
    key: "thbPackage",
    align: "start",
  },
  {
    title: t("price_package") + " " + "USD",
    key: "usdPackage",
    align: "start",
  },
  { title: t("price_unit") + " " + "USD", key: "usdUnit", align: "start" },
  { title: t("branch_name"), key: "branchName", align: "start" },
  { title: t("crate_date"), key: "createDate", align: "start" },
  { title: t("actions"), key: "actions", align: "start" },
]);

// Method========================
onMounted(() => {
  getAllPrices();
  getProducts();
  getBranches();
});

const updatePrice = async () => {
  const result = await price.request.updatePrice();
  if (result.status == "00") {
    price.loading = false;
    price.cloarData();
    getAllPrices();
    showSuccess(result.message);
  } else {
    showError(result.message);
  }
  // loading.value = true;
  // var body = {
  //   priceId: key_id.value,
  //   branchId: branch.value,
  //   productId: product.value,
  //   lakUnit: lak_unit.value,
  //   lakPackage: lak_package.value,
  //   thbUnit: thb_unit.value,
  //   thbPackage: thb_package.value,
  //   usdUnit: usd_unit.value,
  //   usdPackage: usd_package.value,
  //   updateBy: localStorage.getItem("user"),
  //   lak: CurrencyRadio.value == "lak" ? 1 : 0,
  //   thb: CurrencyRadio.value == "thb" ? 1 : 0,
  //   usd: CurrencyRadio.value == "usd" ? 1 : 0,
  // };
  // const res = await mainApi.put("updatePrice", body);
  // if (res.data.status == "00") {
  //   loading.value = false;
  //   cloarData();
  //   getAllPrices();
  //   showSuccess(res.data.message);
  // } else {
  //   showError(res.data.message);
  // }
};
const showEdit = (item) => {
  price.request.edit = true;
  price.request.branchId = item.branchId;
  price.request.productId = item.productId;
  price.request.lakUnit = item.lakUnit;
  price.request.lakPackage = item.lakPackage;
  price.request.thbUnit = item.thbUnit;
  price.request.thbPackage = item.thbPackage;
  price.request.usdUnit = item.usdUnit;
  price.request.usdPackage = item.usdPackage;
  price.request.lak = item.lak;
  price.request.thb = item.thb;
  price.request.usd = item.usd;
  price.key_id = item.priceId;
  if (item.lak == 1) {
    price.request.selectCurrency = "lak";
  } else if (item.thb == 1) {
    price.request.selectCurrency = "thb";
  } else if (item.usd == 1) {
    price.request.selectCurrency = "usd";
  }
};
const getAllPrices = async () => {
  const res = await mainApi.post("getPrices");
  if (res.data.status == "00") {
    allData.value = res.data.dataRes;
    console.log("allData=============", allData.value);
  } else {
    showError(res.data.message);
  }
};
const insertPrict = async () => {

  if (!price.request.branchId && !price.request.productId) {
    showWarning(t("please_select_branch_product"));
    return;
  } else {
    if (price.request.lakPackage == null || price.request.lakUnit == null || price.request.thbPackage == null || price.request.thbUnit == null || price.request.usdPackage == null || price.request.usdUnit == null) {
      showWarning(t("please_input_price"));
      return;
    }
    price.loading = true;
    await price.request.insertPrict();
    price.loading = false;
    return;
  }
  // loading.value = true;


};
const getProducts = async () => {
  const res = await mainApi.get("getProducts");
  if (res.data.status == "00") {
    products.value = res.data.dataRes;
  } else {
    showError(res.data.message);
  }
};
const getBranches = async () => {
  const res = await mainApi.get("getAllBranch");
  if (res.data.status == "00") {
    branches.value = res.data.dataRes;
  } else {
    showError(res.data.message);
  }
};
</script>

<style lang="scss" scoped></style>
