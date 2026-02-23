<template>
    <div>
        <v-card rounded="xl">

            <v-card-text>
                <div class="d-flex justify-center align-center mb-4">
                    <h3 class="mr-4">{{ $t('select_type_view') }}: </h3>
                    <v-btn class="mr-4" color="primary" variant="tonal"
                        @click="viewOption('list')"><v-icon>mdi-view-list</v-icon>{{
                            $t('view_list') }}</v-btn>
                    <v-btn color="primary" variant="tonal" @click="viewOption('grid')"><v-icon>mdi-view-grid</v-icon>{{
                        $t('view_grid')
                    }}</v-btn>

                </div>
                <div v-if="view_grid === true"> <v-row><v-col cols="12" md="6" sm="6">
                            <v-text-field rounded="xl" :label="$t('search')" clearable prepend-inner-icon="mdi-magnify"
                                v-model="search"></v-text-field></v-col></v-row>
                    <v-row><v-col cols="3" v-for="i in 16"><v-card width="280px" height="300px" style="
                  background-image: url(/image.png);
                  background-size: cover;
                " class="custom-radius" @click="viewDetails = true">
                                <v-card style="margin-top: 150px" width="280px" height="150px"
                                    class="my-card text-white custom-radius">
                                    <v-card-title primary-title class=""> Flowers </v-card-title>
                                    <v-card-text>
                                        <h5>{{ i.companyName }}({{ i.branchName }})</h5>
                                        <p>{{ $t('price_unit') }}: <b>{{ formatCurrency(i.lakUnit) }}/kip</b></p>
                                        <p>{{ $t('price_package') }}: <b>{{ formatCurrency(i.lakPackage) }}/kip</b>
                                        </p>
                                    </v-card-text>
                                </v-card>
                            </v-card></v-col></v-row>
                </div>
                <!-- tab view by list item  -->
                <div v-else style="width: 100vw; height: 100vh;" class="pa-10">
                    <v-row>
                        <v-col cols="12" md="6" sm="6">
                            <v-text-field rounded="xl" :label="$t('search')" clearable prepend-inner-icon="mdi-magnify"
                                v-model="search"></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12">
                            <v-data-table v-model="selectedProduct" :headers="headers" :items="pDetails"
                                :search="search" show-select class="elevation-1" item-value="priceId">
                                <!-- <template v-slot:item.priceId="{ item, index }">
                                    <td>{{ index + 1 }}</td>
                                </template> -->
                                <template v-slot:item.lakUnit="{ item }">
                                    <td>{{ formatCurrency(item.lakUnit) }}</td>
                                </template>
                                <template v-slot:item.lakPackage="{ item }">
                                    <td>{{ formatCurrency(item.lakPackage) }}</td>
                                </template>
                                <template v-slot:item.thbUnit="{ item }">
                                    <td>{{ formatCurrency(item.thbUnit) }}</td>
                                </template>
                                <template v-slot:item.thbPackage="{ item }">
                                    <td>{{ formatCurrency(item.thbPackage) }}</td>
                                </template>
                                <template v-slot:item.packageUrl="{ item }">
                                    <td> <v-avatar color="primary" size="48">
                                            <v-img :src="item.packageUrl" alt="User" />
                                        </v-avatar></td>
                                </template>
                                <!-- <template v-slot:item.actions="{ item }">
                                    <td>
                                        <v-btn color="primary" variant="outlined" @click="viewDetails = true">
                                            <v-icon class="mr-2">mdi-cart-heart</v-icon> {{ $t('order') }}
                                        </v-btn>
                                    </td>
                                </template> -->
                            </v-data-table>
                        </v-col>
                    </v-row>

                </div>

            </v-card-text>
        </v-card>
        <v-dialog v-model="viewDetails" scrollable persistent :overlay="false" max-width="900px"
            transition="dialog-transition">
            <v-card>
                <v-card-title primary-title class="d-flex justify-startspace-between "
                    style="background-color: #1976D2; color: white;">
                    <h4>{{ $t('product_details') }}</h4><v-spacer></v-spacer>
                    <v-btn color="red" @click="cancel()">X</v-btn>
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                    <v-row><v-col cols="12" md="6">
                            <v-card rounded="xl" style="
                  background-image: url(/image.png);
                  background-size: cover;
                " width="400px" height="400px">
                                <br /><br />
                                <br />
                                <v-card width="200px" height="150px" style="
                    background-image: url(/image.png);
                    background-size: cover;
                  " elevation-1 rounded="xl" variant="outlined" color="primary">
                                </v-card>

                                <v-card width="200px" height="150px" style="
                    background-image: url(/img.png);
                    background-size: cover;
                    margin-top: 5px;
                  " variant="outlined" rounded="xl" color="primary">
                                </v-card> </v-card></v-col><v-col cols="12" md="6">
                            <h1 class="text-primary">ຮ້ານ ນາງ ກ ນ້ອຍ (ສາຂາ 2)</h1>

                            <v-divider></v-divider>
                            <h2 class="text-primary">ນໍ້າດື່ມໃຫຍ່</h2>
                            <h4 class="text-primary">ລາຄາ/ແພັກ: 38.000 kip</h4>
                            <h4 class="text-primary">ລາຄາ/ຕຸກ: 10.000 kip</h4>

                            <v-btn color="primary" variant="outlined">ເລືອກຂະໜາດ</v-btn>:
                            <v-btn :color="select == true ? 'primary' : 'grey'" @click="selectedItem()"
                                rounded="xl">ແພັກ</v-btn>
                            <v-btn color="primary" rounded="xl" @click="selectedItem()">ຕຸກ</v-btn>
                            <br />
                            <br>

                            <v-row><v-col cols="12">
                                    <div class="d-flex align-center">
                                        <v-btn color="primary">{{ $t('add_qty') }} </v-btn>:
                                        <v-icon @click="decrease()">mdi-minus</v-icon>
                                        <v-btn color="primary">{{ counter }}</v-btn>
                                        <v-icon @click="count()" class="mr-5">mdi-plus</v-icon>

                                    </div>
                                </v-col>
                            </v-row>
                            <v-divider></v-divider>
                            <v-row><v-col cols="3">
                                    <div style="width: 120px; padding: 5px">
                                        <v-text-field prepend-inner-icon="mdi-minus" append-inner-icon="mdi-plus"
                                            @click:prepend-inner="decrease()" @click:append-inner="count()" id="id"
                                            rounded="xl" :clearable="false" class="centered-input"
                                            v-model="counter"></v-text-field>
                                    </div>
                                </v-col><v-col cols="6"><v-btn color="primary" class="ma-5" variant="outlined ">Add to
                                        Car</v-btn></v-col></v-row>
                        </v-col></v-row>
                </v-card-text>
                <v-card-actions>
                    <v-btn color="secondary" variant="outlined" @click="cancel()"><v-icon>mdi-cancel</v-icon>{{
                        $t('btn_cancel')
                        }}</v-btn>
                    <v-btn color="primary" variant="outlined"><v-icon>mdi-checkbox-marked</v-icon> {{ $t('add_to_card')
                        }}</v-btn>

                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const viewDetails = ref(false)
const search = ref("")
const select = ref(false)
const itemDetails = ref([])
const counter = ref(0)
const { formatCurrency } = useInputFormatNumber()
const { showWarning } = useAlert()
const exChangeRate = useExchangeStore()
const imageDetails = ref([])
const product = useCustomerProductsStore()

const pDetails = computed(() => product.products)
const unit_size = ref(false)
const package_size = ref(false)
const amount = ref(0)
const amountTHB = ref(0)
const view_grid = ref(false);
const view_list = ref(false);
const selectedProduct = ref([])

const branchExchange = computed(() => exChangeRate.exchanges)
onMounted(() => {
    product.fetchProducts()
    // exChangeRate.fetchExchanges()
})
const headers = [
    { title: 'Select', key: 'data-table-select' },
    // { title: '#', key: 'priceId' },
    { title: $t('image'), key: 'packageUrl' },
    { title: $t('product_name'), key: 'productName' },
    { title: $t('conpany_name'), key: 'companyName' },
    { title: $t('branch_name'), key: 'branchName' },
    { title: $t('price_unit') + ' (LAK)', key: 'lakUnit' },
    { title: $t('price_package') + ' (LAK)', key: 'lakPackage' },
    { title: $t('price_unit') + ' (THB)', key: 'thbUnit' },
    { title: $t('price_package') + ' (THB)', key: 'thbPackage' },
    { title: $t('province'), key: 'bprovince' },
    { title: $t('district'), key: 'bdistrict' },
    // { title: $t('actions'), key: 'actions' },
]
const viewOption = (option) => {
    if (option === 'grid') {
        view_grid.value = true
        view_list.value = false
    } else {
        view_list.value = true
        view_grid.value = false
    }
}
const selectedItem = (size) => {
    if (size === 'unit') {
        counter.value = 0
        unit_size.value = true

        package_size.value = false
    } else if (size === 'package') {

        counter.value = 0
        package_size.value = true
        unit_size.value = false
    }
    select.value = !select.value
}

const cancel = () => {
    viewDetails.value = false
    counter.value = 0
    amount.value = 0
    amountTHB.value = 0
    unit_size.value = false
    package_size.value = false
}
const count = () => {
    counter.value++;
    console.log("=============item============:", counter.value);

};
const decrease = () => {
    if (counter.value >= 1) {
        counter.value--;
        console.log("=============item============:", counter.value);
    } else {
        counter.value = 0;
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