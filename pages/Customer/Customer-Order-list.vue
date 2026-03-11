<template>
    <div>
 <v-row  class="mt-4">
            <v-col cols="12"  >
              <v-data-table
                v-model="selectedProduct"
                :headers="headers"
                :items="product"
                show-select
                class="elevation-1"
                item-value="priceId"
              >
                <template #item.lakUnit="{ item }" v-if="product !== []">
                  <td>
                    <p >
                      {{
                        exChangeRate.calculateProductPrice(
                          item,
                          branchExchange?.[0],'unit'
                        )
                      }}
                    </p>
                    
                  </td>
                </template>
                <template #item.lakPackage="{ item }" v-if="product !== []">
                  <td>
                    <p >
                      {{
                        exChangeRate.calculateProductPrice(
                          item,
                          branchExchange?.[0],'package'
                        )
                      }}
                    </p>
                    
                  </td>
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
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
const product = ref([])

if (process.client) {
  const cart = localStorage.getItem("cart")
  product.value = cart ? JSON.parse(cart) : []
}
const exChangeRate = useExchangeStore();
const selectedProduct = ref([]);
const { formatCurrency } = useInputFormatNumber();
const branchExchange = computed(() => exChangeRate.exchanges);
onMounted(() => {
  exChangeRate.getExchangeByBranch(1)
  // product.value = cart ? JSON.parse(cart) : []

  // console.log("product length:", product.value.length)
  // console.log("first thb:", product.value?.[0]?.thb)
})
const headers = [
  { title: "Select", key: "data-table-select" },
  { title: $t("image"), key: "packageUrl" },
  { title: $t("product_name"), key: "productName" },
  { title: $t("price_unit") + " (LAK)", key: "lakUnit" },
  { title: $t("price_package") + " (LAK)", key: "lakPackage" },
  { title: $t("price_unit") + " (THB)", key: "thbUnit" },
  { title: $t("price_package") + " (THB)", key: "thbPackage" },
  { title: $t("actions"), key: "actions" },
];
</script>

<style lang="scss" scoped>

</style>