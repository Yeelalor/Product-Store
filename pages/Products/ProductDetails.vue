<template>
  <div grid-list-xs>
    <v-card color="primary" class="pa-1">
      <v-card rounded="xl"><v-card-text>
          <v-row><v-col cols="12" md="6" sm="6">
              <v-text-field rounded="xl" :label="$t('search')" clearable prepend-inner-icon="mdi-magnify"
                v-model="search" :rules="rules"></v-text-field></v-col></v-row>
          <v-row><v-col cols="3" v-for="i in 16"><v-card width="280px" height="300px" style="
                  background-image: url(/image.png);
                  background-size: cover;
                " class="custom-radius" @click="viewDetails = true">
                <v-card style="margin-top: 150px" width="280px" height="150px" class="my-card custom-radius">
                  <v-card-title primary-title class=""> Flowers </v-card-title>
                  <v-card-text>
                    <h5>bb store</h5>
                    <p>ລາຄາ/ແພັກ: <b>10.000/kip</b></p>
                    <p>ລາຄາ/ແກັດ: <b>100.000/kip</b></p>
                  </v-card-text>
                </v-card>
              </v-card></v-col></v-row>
        </v-card-text>
      </v-card>
    </v-card>
    <v-dialog v-model="viewDetails" scrollable persistent :overlay="false" max-width="900px"
      transition="dialog-transition">
      <v-card>
        <v-card-title primary-title class="d-flex justify-end">
          <v-btn color="grey" @click="viewDetails = false">X</v-btn>
        </v-card-title>
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
              <v-btn :color="select == true ? 'primary' : 'grey'" @click="selectedItem()" rounded="xl">ແພັກ</v-btn>
              <v-btn color="primary" rounded="xl" @click="selectedItem()">ຕຸກ</v-btn>
              <br />
              <br />

              <v-divider></v-divider>
              <v-row><v-col cols="3">
                  <div style="width: 120px; padding: 5px">
                    <v-text-field prepend-inner-icon="mdi-minus" append-inner-icon="mdi-plus"
                      @click:prepend-inner="decrease()" @click:append-inner="count()" id="id" rounded="xl"
                      :clearable="false" class="centered-input" v-model="counter"></v-text-field>
                  </div>
                </v-col><v-col cols="6"><v-btn color="primary" class="ma-5" variant="outlined ">Add to
                    Car</v-btn></v-col></v-row>
            </v-col></v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref } from "vue";
const viewDetails = ref(false);
const select = ref(false);
const counter = ref(0);
const selectedItem = () => {
  select.value = !select.value;
  console.log("=============item============:", select.value);
};
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
  background-color: rgba(240, 164, 225, 0.521) !important;
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