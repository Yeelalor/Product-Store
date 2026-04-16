<template>
    <div class="d-flex">
<v-card class="mx-auto" style="margin-top: 50px">
  <v-card-title class="text-h5">Admin Product List</v-card-title>
  <v-card-text>
 <v-row>
            <v-col cols="12">
              <v-data-table
                v-model="selectedProduct"
                :headers="headers"
                :items="productList"
                :search="search"
                show-select
                class="elevation-1"
                item-value="priceId"
              >
                <!-- <template #[`item.lakUnit`]="{ item }">
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
                <template #[`item.lakPackage`]="{ item }">
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
                </template> -->
                <!-- <template #[`item.thbUUnit`]="{ item }">
                  <td>{{ formatCurrency(item.thbUnit) }}</td>
                </template>
                <template #[`item.thbPackage`]="{ item }">
                  <td>{{ formatCurrency(item.thbPackage) }}</td>
                </template>
                <template #[`item.packageUrl`]="{ item }">
                  <td>
                    <v-avatar color="primary" size="48">
                      <v-img :src="item.packageUrl" alt="User" />
                    </v-avatar>
                  </td>
                </template> -->
                <!-- <template #[`item.actions`]="{ item }">
                  <td>
                    <v-btn
                      color="primary"
                      variant="outlined"
                      @click="product.selectItem(item,branchExchange?.[0])"
                    >
                      <v-icon class="mr-2">mdi-cart-heart</v-icon>
                      {{ $t("order") }}
                    </v-btn>
                  </td>
                </template> -->
              </v-data-table>
            </v-col>
          </v-row>
  </v-card-text>
    
</v-card>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
const adminStore = useAdminProductsStore();
const productList = computed(() => adminStore.products);
onMounted(() => {
  adminStore.fetchProducts();
  console.log("product-list=================",productList.value);
  
});
const search = ref("");
const selectedProduct = ref([]);
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
</script>

<style lang="scss" scoped>

</style>