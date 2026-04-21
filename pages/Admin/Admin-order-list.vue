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
            
            {{
                item.size == "package"
                  ? formatCurrency(item.lakPackage * item.qty)
                  : formatCurrency(item.lakUnit * item.qty)
              }}
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
