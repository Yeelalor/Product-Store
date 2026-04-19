<template>
  <div>
    <v-card>
      <v-card-title>
        <v-icon class="mr-2" color="white">
          mdi-order-numeric-ascending
        </v-icon>
        {{ $t("list_order") }}
      </v-card-title>
      <v-card-text>
        <v-data-table
          :headers="headers"
          :items="cart"
          class="elevation-1"
          item-value="priceId"
          items-per-page="20"
          :items-per-page-text="$t('rows_per_page')"
        >
          <template #[`item.id`]="{ item, index }">
            <p>
              {{ index + 1 }}
            </p>
            <p hidden>{{ item }}</p>
          </template>
          <template #[`item.qty`]="{ item }">
            <p>{{ item.qty }} {{ item.size }}</p>
          </template>
          <template #[`item.lakAmount`]="{ item }">
            <p>
              {{
                exChangeRate.calculateProductPriceWithQty(
                  item,
                  branchExchange[0],
                  item.size,
                  item.qty,
                )
              }}
            </p>
          </template>
          <template #[`item.thbAmount`]="{ item }">
            <p>
              {{
                item.size == "package"
                  ? formatCurrency(item.thbPackage * item.qty)
                  : formatCurrency(item.thbUnit * item.qty)
              }}
            </p>
          </template>
          <template #[`item.thbUnit`]="{ item }">
            <p>
              {{
                item.size == "package"
                  ? formatCurrency(item.thbPackage)
                  : formatCurrency(item.thbUnit)
              }}
            </p>
          </template>
          <template #[`item.lakUnit`]="{ item }">
            <p>
              {{
                item.size == "package"
                  ? formatCurrency(item.lakPackage)
                  : formatCurrency(item.lakUnit)
              }}
            </p>
          </template>
          <template #[`item.packageUrl`]="{ item }">
            <td>
              <v-avatar color="primary" size="48">
                <v-img :src="item.packageUrl" alt="User" />
              </v-avatar>
            </td>
          </template>
          <template #[`item.add_or_minus_qty`]="{ item }">
            <div class="d-flex align-center gap-2">
              <v-icon class="mr-2" @click="adminStore.decreaseQty(item)"
                >mdi-minus</v-icon
              >
              <v-btn color="primary" variant="outlined">
                {{ item.qty }}
              </v-btn>
              <v-icon class="mr-2" @click="adminStore.increaseQty(item)"
                >mdi-plus</v-icon
              >
            </div>
          </template>
          <template #[`item.actions`]="{ item }">
            <v-btn
              variant="outlined"
              color="red"
              class="mr-2"
              @click="adminStore.removeItem(item)"
            >
              <v-icon color="red"> mdi-delete </v-icon>
              {{ $t("btn_delete") }}
            </v-btn>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </div>

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
                    <div class="d-flex fill-height align-center justify-center">
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
                    <v-btn color="primary">{{
                      product.product.qty == null ? 1 : product.product.qty
                    }}</v-btn>
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
</template>

<script setup lang="ts">
import { on } from "events";
import { ref, computed, onMounted } from "vue";

const { formatCurrency } = useInputFormatNumber();
const adminStore = useAdminProductsStore();
const exChangeRate = useExchangeStore();
const productDetailsOnview = computed(() => adminStore.product);
const cart = computed(() => adminStore.cartItems);
onMounted(async () => {
  adminStore.loadCart();
});
const headers = [
  { title: "No", key: "id" },
  { title: $t("image"), key: "packageUrl" },
  { title: $t("product_name"), key: "productName" },
  { title: $t("add_qty"), key: "qty", align: "center" },
  { title: $t("price") + " (LAK)", key: "lakUnit", align: "end" },
  { title: $t("price") + " (THB)", key: "thbUnit", align: "end" },
  { title: $t("amount") + " (LAK)", key: "lakAmount", align: "end" },
  { title: $t("amount") + " (THB)", key: "thbAmount", align: "end" },
  { title: $t("add_or_minus_qty"), key: "add_or_minus_qty" },
  { title: $t("actions"), key: "actions" },
];
</script>

<style lang="scss" scoped></style>
