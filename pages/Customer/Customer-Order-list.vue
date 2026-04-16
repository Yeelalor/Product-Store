<template>
  <div class="ml-5">
    <br />
    <v-card rounded="xl">
      <v-card-title primary-title class="d-flex bg-primary">
        <v-icon class="mr-2" color="white"> mdi-order-numeric-ascending </v-icon>
        {{ $t("list_order") }}
      
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-row class="mt-4 ml-5" justity="center">
          <v-col cols="12">
            <v-btn variant="outlined" color="primary" class="mb-4 mr-6" @click="cartStore.cusetomerPayment()">
              <v-icon class="mr-2"> mdi-cash-multiple </v-icon> {{ $t("payment") }}
            </v-btn>
            <v-btn
              variant="outlined"
              color="red"
              class="mb-4"
              @click="cartStore.clearCart()"
            >
              <v-icon class="mr-2"> mdi-close-octagon </v-icon> {{ $t("cancel_payment") }}
            </v-btn>
            <v-row
              ><v-col cols="8"></v-col
              ><v-col cols="4">
                <v-card class="mb-4" rounded="xl" variant="outlined" >
                  <v-card-text class="d-flex align-end gap-2" color="primary">
                    <div style="width: 50%" class="text-right">
                      <p>{{ $t("item_total") }}:</p>
                      <p>{{ $t("price") + " LAK" }}:</p>
                      <p>{{ $t("price") + " THB" }}:</p>
                    </div>
                    <div style="width: 50%" class="text-right">
                      <p>{{ product.length }} {{ $t("item") }}</p>
                      <p>{{ formatCurrency(convertRateToKip(cartStore.totalPriceThb, branchExchange[0]?.thb || 0)) }}</p>
                      <p>{{ formatCurrency(cartStore.totalPriceThb) }}</p>
                    </div>
              
                  </v-card-text>
                        <v-divider>
                      
                    </v-divider>
                    <div class="ml-3 pb-2" text-black>  {{$t('exchange_rate')}}: THB: {{ formatCurrency(branchExchange[0]?.thb) }} | USD: {{ formatCurrency(branchExchange[0]?.usd) }}</div>
                  
                  
                </v-card></v-col
              ></v-row
            >

            <v-data-table
              :headers="headers"
              :items="product"
              class="elevation-1"
              item-value="priceId"
              items-per-page="20"
              :items-per-page-text="$t('rows_per_page')"
            >
              <template #[`item.id`]="{ item, index }">
                <p>
                  {{ index + 1 }}
                </p>
                <p hidden>{{item}}</p>
              </template>
              <template #[`item.qty`]="{ item }">
                <p>{{ item.qty }} {{ item.size }}</p>
              </template>
              <template #[`item.lakAmount`]="{ item }">
                <p >
                  {{
                    exChangeRate.calculateProductPriceWithQty(item, branchExchange[0], item.size, item.qty)
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
                  <v-icon class="mr-2" @click="cartStore.decreaseQty(item)"
                    >mdi-minus</v-icon
                  >
                  <v-btn color="primary" variant="outlined">
                    {{ item.qty }}
                  </v-btn>
                  <v-icon class="mr-2" @click="cartStore.increaseQty(item)"
                    >mdi-plus</v-icon
                  >
                </div>
              </template>
              <template #[`item.actions`]="{ item }">
                <v-btn
                  variant="outlined"
                  color="red"
                  class="mr-2"
                  @click="cartStore.removeItem(item)"
                >
                  <v-icon color="red"> mdi-delete </v-icon>
                  {{ $t("btn_delete") }}
                </v-btn>
              </template>
            </v-data-table>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
const product = computed(() => cartStore.cartItems);
const exChangeRate = useExchangeStore();
const selectedProduct = ref([]);
const { formatCurrency } = useInputFormatNumber();
const branchExchange = computed(() => exChangeRate.exchanges || []);
const exchange = computed(() => branchExchange.value?.[0] || null);
const cartStore = useCartStore();

onMounted(() => {
  cartStore.loadCart();
  exChangeRate.getExchangeByBranch(1);
});
const totalPriceLak = computed(() => cartStore.totalPriceLak);
const convertRateToKip = (value: number,exchange:number) => {
  return totalPriceLak.value + exChangeRate.convertRateToLak(value, exchange);
};
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
