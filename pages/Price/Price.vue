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
                <v-autocomplete v-model="price.request.branchId" :items="branches" item-value="id" item-title="branchName"
                  :label="$t('select') + $t('branch_name')" variant="outlined" rounded
                  clearable></v-autocomplete></v-col><v-col cols="4">
                <v-autocomplete v-model="price.request.productId" :items="products" item-value="id" item-title="productName"
                  :label="$t('select') + $t('product_name')" variant="outlined" rounded
                  clearable></v-autocomplete></v-col></v-row>
          </v-card>
          <br />
          <div class="d-flex align-center">
            <b style="white-space: nowrap; margin-right: 8px">{{ $t("input") }} {{ $t("info") }} {{ $t("price") }}</b>
            <v-divider class="flex-grow-1"></v-divider>
          </div>
          <v-card elevation="0" variant="outlined" class="pa-5" >
              <v-card variant="outlined" elevation="0" class="mb-5 ">
                   <div class="d-flex align-center justify-center ml-4">
              <h3 >{{ $t("select_main_currency") }}:</h3><v-radio-group
                v-model="price.request.selectCurrency" inline class="ml-4 mt-5">
                <v-radio label="LAK" value="lak" color="primary"></v-radio>
                <v-radio label="THB" value="thb" color="primary"></v-radio>
                <v-radio label="USD" value="usd" color="primary"></v-radio>
              </v-radio-group>
            </div>
              </v-card>
         

            <v-row>

              <v-col cols="3">
                <span>
                  <p>
                    {{ $t("price_unit") }} <b class="text-blue">LAK</b>
                  </p>
                </span>
                <v-text-field rounded="xl" clearable v-model="price.request.lakUnit"
                  @input="price.request.lakUnit = formatCurrency(price.request.lakUnit)"></v-text-field></v-col>
              <v-col cols="3">
                <span>
                  <p>
                    {{ $t("price_package") }} <b class="text-blue">LAK</b>
                  </p>
                </span>
                <v-text-field rounded="xl" clearable v-model="price.request.lakPackage"
                  @input="price.request.lakPackage = formatCurrency(price.request.lakPackage)"></v-text-field></v-col>
              <v-col cols="3">
                <span>
                  <p>
                    {{ $t("price_unit") }} <b class="text-red">THB</b>
                  </p>
                </span>
                <v-text-field rounded="xl" clearable v-model="price.request.thbUnit"
                  @input="price.request.thbUnit = formatCurrency(price.request.thbUnit)"></v-text-field></v-col>
              <v-col cols="3">
                <span>
                  <p>
                    {{ $t("price_package") }} <b class="text-red">THB</b>
                  </p>
                </span>
                <v-text-field rounded="xl" clearable v-model="price.request.thbPackage"
                  @input="price.request.thbPackage = formatCurrency(price.request.thbPackage)" ></v-text-field></v-col>
              <v-col cols="3">
                <span>
                  <p>
                    {{ $t("price_unit") }} <b class="text-green">USD</b>
                  </p>
                </span>
                <v-text-field rounded="xl" clearable v-model="price.request.usdUnit"
                  @input="price.request.usdUnit = formatCurrency(price.request.usdUnit)"></v-text-field></v-col>
              <v-col cols="3">
                <span>
                  <p>
                    {{ $t("price_package") }} <b class="text-green">USD</b>
                  </p>
                </span>
                <v-text-field rounded="xl" clearable v-model="price.request.usdPackage"
                  @input="price.request.usdPackage = formatCurrency(price.request.usdPackage)"></v-text-field></v-col></v-row>
          </v-card>
        </v-card-text>
        <v-card-actions>
          <v-row justify="start"><v-col cols="12" md="6" sm="6">
              <v-btn color="grey" class="mr-2" rounded="xl" variant="outlined" @click="price.clearData()"><v-icon
                  class="mr-4">mdi-cancel</v-icon>{{ $t("btn_cancel") }}</v-btn>
              <v-btn v-if="price.request.edit == false" color="primary" rounded="xl" variant="outlined" type="submit"
                @click="insertPrict()"><v-icon class="mr-4">mdi-content-save-all</v-icon>{{ $t("save") }}</v-btn>
              <v-btn v-else color="purple" rounded="xl" variant="outlined" type="submit" @click="updatePrice()"><v-icon
                  class="mr-4">mdi-content-save-all</v-icon>{{ $t("btn_edit")
                  }}</v-btn></v-col></v-row>
          <br /><br /> </v-card-actions>
        <!-- </v-form> -->
      </v-card>

      <v-card rounded="xl" style="margin-top: 5px">
        <v-card-text>
          <v-data-table :headers="headers" :items="allDataPrice" :search="search" hide-actions class="elevation-1"
            pagination.sync="pagination" item-key="id">
            <template #item.id="{ index, item }">
              {{ index + 1 }}
            </template>
             <template #item.lakPackage="{  item }">
              {{  formatCurrency(item.lakPackage)  }}
            </template>
             <template #item.lakUnit="{  item }">
              {{  formatCurrency(item.lakUnit)  }}
            </template>
             <template #item.thbUnit="{  item }">
              {{  formatCurrency(item.thbUnit)  }}
            </template>
             <template #item.thbPackage="{  item }">
              {{  formatCurrency(item.thbPackage)  }}
            </template>
             <template #item.usdUnit="{  item }">
              {{  formatCurrency(item.usdUnit)  }}
            </template>
             <template #item.usdPackage="{  item }">
              {{  formatCurrency(item.usdPackage)  }}
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
    <MLoading v-model="price.loading"></MLoading>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
const { mainApi } = useApi();
const { t } = useI18n();
const {formatCurrency} = useInputFormatNumber();
const key_id = ref(null);
const edit = ref(false);
const loading = ref(false);
const price = usePriceStore();
const { showSuccess, showWarning, showError } = useAlert();
const allDataPrice = computed(() => price.prices);
const products = ref([]);
const branches = ref([]);
const search = ref("");
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
  price.getAllPrices();
  getProducts();
  getBranches();
});

const updatePrice = async () => {
  const result = await price.updatePrice();
  if (result.status == "00") {
    price.loading = false;
    price.clearData();
    
    await price.getAllPrices();
    showSuccess(result.message);
  } else {
    showError(result.message);
  }
  
};
const showEdit = (item) => {
  price.request.edit = true;
  price.request.branchId = item.branchId;
  price.request.productId = item.productId;
  price.request.lakUnit = formatCurrency(item.lakUnit);
  price.request.lakPackage = formatCurrency(item.lakPackage);
  price.request.thbUnit = formatCurrency(item.thbUnit);
  price.request.thbPackage = formatCurrency(item.thbPackage);
  price.request.usdUnit = formatCurrency(item.usdUnit);
  price.request.usdPackage = formatCurrency(item.usdPackage);
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

const insertPrict = async () => {

  if (!price.request.branchId && !price.request.productId) {
    showWarning(t("please_select_branch_product"));
    return;
  } else {
    if (price.request.lakPackage == null && price.request.lakUnit == null && price.request.thbPackage == null && price.request.thbUnit == null && price.request.usdPackage == null && price.request.usdUnit == null) {
      showWarning(t("please_input_price"));
      return;
    }
    price.loading = true;
    await price.insertPrice();
    await price.getAllPrices();
    price.clearData();
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
