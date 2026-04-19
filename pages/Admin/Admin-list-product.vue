<template>
  <div class="d-flex">
    <v-card class="mx-auto" style="margin-top: 10px">
      <v-card-title class="text-h5">{{ $t("product_list") }}</v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <div class="d-flex">
              <v-row
                ><v-col cols="10"
                  ><v-text-field
                    v-model="search"
                    :label="$t('search')"
                    clearable
                  >
                    <template #prepend-inner>
                      <v-icon>mdi-magnify</v-icon>
                    </template>
                  </v-text-field></v-col
                >
                <v-col cols="2">
                  <v-badge
                    location="top right"
                    color="red"
                    :content="cartList.length"
                    @click="$router.push('/Admin/Admin-order-list')"
                  >
                    <v-icon class="mr-2" size="x-large">mdi-cart-heart</v-icon>
                  </v-badge></v-col
                ></v-row
              >
            </div>

            <v-data-table
              :headers="headers"
              :items="productList"
              :search="search"
              class="elevation-1"
              item-value="priceId"
              :items-per-page="adminStore.page"
              :items-per-page-text="$t('rows_per_page')"
            >
              <template #[`item.thbUnit`]="{ item }">
                <td>{{ formatCurrency(item.thbUnit) }}</td>
              </template>
              <template #[`item.thbPackage`]="{ item }">
                <td>{{ formatCurrency(item.thbPackage) }}</td>
              </template>
              <template #[`item.lakUnit`]="{ item }">
                <td>{{ formatCurrency(item.lakUnit) }}</td>
              </template>
              <template #[`item.lakPackage`]="{ item }">
                <td>{{ formatCurrency(item.lakPackage) }}</td>
              </template>
              <template #[`item.bdistrict`]="{ item }">
                <td>
                  {{ item.bvillage }}-{{ item.bdistrict }}-{{ item.bprovince }}
                </td>
              </template>
              <template #[`item.packageUrl`]="{ item }">
                <td>
                  <v-avatar color="primary" size="48">
                    <v-img :src="item.packageUrl" alt="User" />
                  </v-avatar>
                </td>
              </template>
              <template #[`item.actions`]="{ item }">
                <td>
                  <v-btn
                    color="primary"
                    variant="outlined"
                    @click="adminStore.selectItem(item, branchExchange?.[0])"
                  >
                    <v-icon class="mr-2">mdi-cart-heart</v-icon>
                    {{ $t("order") }}
                  </v-btn>
                </td>
              </template>
            </v-data-table>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-dialog
      v-model="adminStore.viewDetails_for_Order"
      fullscreen
      scrollable
      persistent
      :overlay="false"
      max-width="900px"
      transition="dialog-transition"
    >
      <v-card>
        <v-card-title primary-title class="d-flex justify-startspace-between">
          <h4>{{ $t("product_details") }}</h4>
          <v-spacer></v-spacer>
          <v-btn color="red" @click="adminStore.clearProductData()">X</v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-row
            ><v-col cols="12" md="4">
              <v-card width="100%" height="400px" class="mb-4 justify-center">
                <v-img
                  :src="productDetailsOnview?.packageUrl"
                  alt="Product Image"
                  width="100%"
                  height="100%"
                />
              </v-card>
              <v-sheet class="mx-auto" elevation="3" max-width="800">
                <v-slide-group
                  class="pa-4"
                  selected-class="bg-success"
                  show-arrows
                >
                  <v-slide-group-item
                    v-for="n in adminStore.image_list.length"
                    :key="n"
                    v-slot="{ toggle, selectedClass }"
                  >
                    <v-card
                      :class="['ma-4', selectedClass]"
                      color="grey-lighten-1"
                      height="200"
                      width="200"
                      @click="toggle"
                    >
                      <div
                        class="d-flex fill-height align-center justify-center"
                      >
                        <v-scale-transition>
                          <img
                            :src="adminStore.image_list[n - 1]"
                            alt="Product Image"
                            width="100%"
                            height="100%"
                          />
                        </v-scale-transition>
                      </div>
                    </v-card>
                  </v-slide-group-item>
                </v-slide-group>
              </v-sheet> </v-col
            ><v-col cols="12" md="6">
              <div>
                <h2>{{ productDetailsOnview?.productName }}</h2>
                <div class="d-flex">
                  <div width="50%" class="text-right">
                    <h4>{{ $t("price_package") }}:</h4>
                    <h4>{{ $t("price_unit") }}:</h4>
                    <h4>{{ $t("size") }}:</h4>
                    <br />
                    <br />
                    <h4 class="mt-2">{{ $t("add_qty") }}:</h4>
                  </div>
                  <div width="60%" class="ml-5">
                    <!-- <h4
                    :class="
                      product.size == 'package' ? 'text-primary' : 'text-black'
                    "
                  >
                    {{
                      exChangeRate.calculateProductPrice(
                        productDetailsOnview,
                        branchExchange?.[0],
                        "package",
                      )
                    }}
                  </h4> -->
                    <!-- <h4
                    :class="
                      product.size == 'unit' ? 'text-primary' : 'text-black'
                    "
                  >
                    {{
                      exChangeRate.calculateProductPrice(
                        productDetailsOnview,
                        branchExchange?.[0],
                        "unit",
                      )
                    }}
                  </h4> -->
                    <v-btn
                      class="mr-3"
                      :color="adminStore.size == 'package' ? 'primary' : 'grey'"
                      @click="adminStore.selectSize('package')"
                      variant="outlined"
                      >{{ $t("pack") }}</v-btn
                    >
                    <v-btn
                      :color="adminStore.size == 'unit' ? 'primary' : 'grey'"
                      variant="outlined"
                      @click="adminStore.selectSize('unit')"
                      >{{ $t("unit") }}</v-btn
                    >
                    <!-- <h4>
                      {{
                        adminStore.product.size == "package"
                          ? formatCurrency(product.product.total)
                          : ""
                      }}
                    </h4> -->
                    <br />
                    <br />
                    <div class="d-flex align-center">
                      <v-icon @click="adminStore.minusQuantity()"
                        >mdi-minus</v-icon
                      >
                      <v-btn color="primary">{{}}</v-btn>
                      <v-icon @click="adminStore.addQuantity()" class="mr-5"
                        >mdi-plus</v-icon
                      >
                    </div>
                  </div>
                </div>
              </div>
              <br />
              <v-divider></v-divider>
              <br />
              <v-row
                ><v-col cols="6"
                  ><v-btn color="red" class="ma-5" variant="outlined"
                    ><v-icon> mdi-cash-100 </v-icon>{{ $t("buy_now") }}</v-btn
                  ><v-btn
                    color="primary"
                    class="ma-5"
                    variant="outlined"
                    @click="adminStore.addToCart()"
                    ><v-icon> mdi-cart-plus </v-icon>{{ $t("add_cart") }}</v-btn
                  ></v-col
                ></v-row
              >
            </v-col></v-row
          >
        </v-card-text>
        <v-card-actions>
          <v-btn color="secondary" variant="outlined" @click="cancel()"
            ><v-icon>mdi-cancel</v-icon>{{ $t("btn_cancel") }}</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <MLoading v-model="adminStore.loading"></MLoading>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
const adminStore = useAdminProductsStore();
const productList = computed(() => adminStore.products);
const cartList = computed(() => adminStore.cartItems);
const exChangeRate = useExchangeStore();
const branchExchange = computed(() => exChangeRate.exchanges);
const { formatCurrency } = useInputFormatNumber();
onMounted(async () => {
  await adminStore.fetchProducts();
  adminStore.loadCart();

  exChangeRate.getExchangeByBranch(1);
});
const search = ref("");
const selectedProduct = ref([]);
const headers = [
  { title: "Select", key: "data-table-select" },
  // { title: '#', key: 'priceId' },
  { title: $t("image"), key: "packageUrl" },
  { title: $t("product_name"), key: "productName" },
  { title: $t("price_unit") + " (LAK)", key: "lakUnit" },
  { title: $t("price_package") + " (LAK)", key: "lakPackage" },
  { title: $t("price_unit") + " (THB)", key: "thbUnit" },
  { title: $t("price_package") + " (THB)", key: "thbPackage" },
  { title: $t("price_unit") + " (USD)", key: "usdUnit" },
  { title: $t("price_package") + " (USD)", key: "usdPackage" },
  { title: $t("conpany_name"), key: "companyName" },
  { title: $t("branch_name"), key: "branchName" },
  { title: $t("address"), key: "bdistrict" },
  { title: $t("actions"), key: "actions" },

  // { title: $t('actions'), key: 'actions' },
];
</script>

<style lang="scss" scoped></style>
