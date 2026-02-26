<template>
  <div>
    <v-card rounded="xl">
      <v-card-text>
        <div class="d-flex justify-center align-center mb-4">
          <h3 class="mr-4">{{ $t("select_type_view") }}:</h3>
          <v-btn class="mr-4" color="primary" variant="tonal" @click="viewOption('list')"
            ><v-icon>mdi-view-list</v-icon>{{ $t("view_list") }}</v-btn
          >
          <v-btn color="primary" variant="tonal" @click="viewOption('grid')"
            ><v-icon>mdi-view-grid</v-icon>{{ $t("view_grid") }}</v-btn
          >
        </div>
        <div v-if="view_grid === true">
          <v-row
            ><v-col cols="12" md="6" sm="6">
              <div class="d-flex">
                <v-text-field
                  rounded="xl"
                  :label="$t('search')"
                  clearable
                  prepend-inner-icon="mdi-magnify"
                  v-model="search"
                ></v-text-field>

                <v-badge location="top right" color="red" content="25">
                  <v-icon class="mr-2" size="x-large">mdi-cart-heart</v-icon>
                </v-badge>
              </div>
            </v-col></v-row
          >
          <v-row
            ><v-col cols="3" v-for="i in 16" :key="i"
              ><v-card
                width="280px"
                height="300px"
                style="background-image: url(/image.png); background-size: cover"
                class="custom-radius"
                @click="viewDetails = true"
              >
                <v-card
                  style="margin-top: 150px"
                  width="280px"
                  height="150px"
                  class="my-card text-white custom-radius"
                >
                  <v-card-title primary-title class=""> Flowers </v-card-title>
                  <v-card-text>
                    <h5>{{ i.companyName }}({{ i.branchName }})</h5>
                    <p>
                      {{ $t("price_unit") }}:
                      <b>{{ formatCurrency(i.lakUnit) }}/kip</b>
                    </p>
                    <p>
                      {{ $t("price_package") }}:
                      <b>{{ formatCurrency(i.lakPackage) }}/kip</b>
                    </p>
                  </v-card-text>
                </v-card>
              </v-card></v-col
            ></v-row
          >
        </div>
        <!-- tab view by list item  -->
        <div v-else style="width: 100vw; height: 100vh" class="pa-10">
          <v-row>
            <v-col cols="12" md="6" sm="6">
              <v-text-field
                rounded="xl"
                :label="$t('search')"
                clearable
                prepend-inner-icon="mdi-magnify"
                v-model="search"
              ></v-text-field>
              <v-icon class="mr-2">mdi-cart-heart</v-icon>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-data-table
                v-model="selectedProduct"
                :headers="headers"
                :items="pDetails"
                :search="search"
                show-select
                class="elevation-1"
                item-value="priceId"
              >
                <!-- <template v-slot:item.priceId="{ item, index }">
                                    <td>{{ index + 1 }}</td>
                                </template> -->

                <template #item.lakUnit="{ item }">
                  <td>
                    <p v-if="item.thbUnit != 0 || item.thbUnit != null">
                      {{
                        formatCurrency(exChangeRate.calculateProductPrice(item.thbUnit))
                      }}
                    </p>
                     <p v-else>
                      {{
                        formatCurrency(item.lakUnit)
                      }}
                    </p>
                  </td>
                </template>
                <template #item.lakPackage="{ item }">
                  <td>{{ formatCurrency(item.lakPackage) }}</td>
                </template>
                <template #item.thbUnit="{ item }">
                  <td>{{ formatCurrency(item.thbUnit) }}</td>
                </template>
                <template #item.thbPackage="{ item }">
                  <td>{{ formatCurrency(item.thbPackage) }}</td>
                </template>
                <template #item.packageUrl="{ item }">
                  <td>
                    <v-avatar color="primary" size="48">
                      <v-img :src="item.packageUrl" alt="User" />
                    </v-avatar>
                  </td>
                </template>
                <template #item.actions="{ item }">
                  <td>
                    <v-btn
                      color="primary"
                      variant="outlined"
                      @click="product.selectItem(item)"
                    >
                      <v-icon class="mr-2">mdi-cart-heart</v-icon>
                      {{ $t("order") }}
                    </v-btn>
                  </td>
                </template>
              </v-data-table>
            </v-col>
          </v-row>
        </div>
      </v-card-text>
    </v-card>
    <v-dialog
      v-model="product.viewDetails_for_Order"
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
          <v-btn color="red" @click="product.viewDetails_for_Order = false">X</v-btn>
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
                <v-slide-group class="pa-4" selected-class="bg-success" show-arrows>
                  <v-slide-group-item
                    v-for="n in product.image_list.length"
                    :key="n"
                    v-slot="{ isSelected, toggle, selectedClass }"
                  >
                    <v-card
                      :class="['ma-4', selectedClass]"
                      color="grey-lighten-1"
                      height="200"
                      width="200"
                      @click="toggle"
                    >
                      <div class="d-flex fill-height align-center justify-center">
                        <v-scale-transition>
                          <img
                            :src="product.image_list[n - 1]"
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
                    <h4 class="mt-2">{{ $t("add_qty") }}:</h4>
                  </div>
                  <div width="50%" class="ml-5">
                    <h4>
                      {{ formatCurrency(productDetailsOnview?.lakPackage) }}
                    </h4>
                    <h4>{{ formatCurrency(productDetailsOnview?.lakUnit) }}</h4>
                    <v-btn
                      class="mr-3"
                      :color="select == true ? 'primary' : 'grey'"
                      @click="selectedItem()"
                      variant="outlined"
                      >{{ $t("pack") }}</v-btn
                    >
                    <v-btn color="primary" variant="outlined" @click="selectedItem()">{{
                      $t("unit")
                    }}</v-btn>
                    <br />
                    <br />
                    <div class="d-flex align-center">
                      <v-icon @click="product.minusQuantity()">mdi-minus</v-icon>
                      <v-btn color="primary">{{ product.quantity }}</v-btn>
                      <v-icon @click="product.addQuantity()" class="mr-5"
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
                  ><v-btn color="red" class="ma-5" variant="outlined "
                    ><v-icon> mdi-cash-100 </v-icon>{{ $t("buy_now") }}</v-btn
                  ><v-btn color="primary" class="ma-5" variant="outlined "
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
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
const viewDetails = ref(false);
const search = ref("");
const select = ref(false);
const itemDetails = ref([]);
const counter = ref(0);
const { formatCurrency } = useInputFormatNumber();
const { showWarning } = useAlert();
const exChangeRate = useExchangeStore();
const imageDetails = ref([]);
const product = useCustomerProductsStore();

const pDetails = computed(() => product.products);
const productDetailsOnview = computed(() => product.product);
const unit_size = ref(false);
const package_size = ref(false);
const amount = ref(0);
const amountTHB = ref(0);
const view_grid = ref(false);
const view_list = ref(false);
const selectedProduct = ref([]);
const images = ref(["/image.png", "/image.png", "/image.png", "/image.png"]);

const branchExchange = computed(() => exChangeRate.exchanges);
onMounted(() => {
  product.fetchProducts();
  exChangeRate.getExchangeByBranch(1)
});
const groupedImages = computed(() => {
  if (!Array.isArray(images.value)) return [];

  const result: string[][] = [];

  for (let i = 0; i < images.value.length; i += 2) {
    result.push(images.value.slice(i, i + 2));
  }

  return result;
});

const headers = [
  { title: "Select", key: "data-table-select" },
  // { title: '#', key: 'priceId' },
  { title: $t("image"), key: "packageUrl" },
  { title: $t("product_name"), key: "productName" },
  // { title: $t('conpany_name'), key: 'companyName' },
  // { title: $t('branch_name'), key: 'branchName' },
  { title: $t("price_unit") + " (LAK)", key: "lakUnit" },
  { title: $t("price_package") + " (LAK)", key: "lakPackage" },
  { title: $t("price_unit") + " (THB)", key: "thbUnit" },
  { title: $t("price_package") + " (THB)", key: "thbPackage" },
  { title: $t("actions"), key: "actions" },
  // { title: $t('district'), key: 'bdistrict' },
  // { title: $t('actions'), key: 'actions' },
];
const viewOption = (option: string) => {
  if (option === "list") {
    view_grid.value = false;
    view_list.value = true;
  } else if (option === "grid") {
    view_grid.value = true;
    view_list.value = false;
  }
};


</script>

<style lang="scss" scoped>
.my-card {
  background-color: rgba(49, 133, 81, 0.521) !important;
  /* black tint */
  color: #070707;
  /* make text readable */
}

.custom-radius {
  border-top-left-radius: 20px;
  /* round top-left */
  border-top-right-radius: 0;
  /* square top-right */
  border-bottom-right-radius: 20px;
  border-bottom-left-radius: 0;
}

.centered-input input {
  text-align: center;
}
</style>
