<template>
  <div class="bg d-flex" style="width: 100vw; height: 100vh">
    <v-row justify="end" style="margin-top: 10px; margin-right: 20px">
      <v-col cols="2" color="white">
        <div color="blue">
          <Language></Language>
        </div>
      </v-col>
      <v-col cols="12" md="12">
        <v-row justify="center">
          <v-col cols="12">
            <h1 class="text-center" :style="{ color: 'white' }">
              {{ $t("border") }}
            </h1>
          </v-col>
          <v-col cols="3">
            <v-card class="pa-10" d-flex rounded="xl" elevation="0">
              <v-card-title style="justify-content: center; display: flex" class="">
                <br />
              </v-card-title>
              <v-card-text>
                <v-row style="justify-content: center; display: flex">
                  <img src="../assets/images/ldb-logo.png" width="100" cover />
                  <v-col cols="12" md="12">
                    <h2 class="text-center">{{ $t("welcome") }}</h2>
                    <br />
                    <br />

                    <v-text-field :label="$t('user')" v-model="userLogin.userLogin" rounded></v-text-field>
                    <v-text-field name="name" :label="$t('pw')" v-model="userLogin.passWord" rounded
                      id="id"></v-text-field>
                    <v-checkbox :label="$t('remember')" v-model="remober" color="primary"
                      @change="checkRemember"></v-checkbox>
                    <Mbtn :label="$t('login')" @click="handleLogin" rounded block></Mbtn>
                  </v-col></v-row>
              </v-card-text> </v-card></v-col></v-row>
      </v-col>
    </v-row>

    <MLoading v-model="loading"></MLoading>
  </div>
</template>

<script setup>
const { showSuccess, showError, showWarning, showConfirm } = useAlert();
import { ref } from "vue";

const password = ref(null);
const user = ref(null);
const remober = ref(false);
const loading = ref(false);
const userLogin = useLogin();
onMounted(() => {
  const reme = localStorage.getItem("remember");

  if (reme) {
    console.log("==============reme===========:", reme);
    remober.value = true;
    user.value = reme;
  }
});
watch([user, password], ([newUser, newPass]) => {
  console.log("User changed:", newUser);
  console.log("Password changed:", newPass);
});
watch(user, (val) => {
  console.log("user changed:", val);
});
const checkRemember = () => {
  if (remober.value == true) {
    localStorage.setItem("remember", user.value);

  } else {
    localStorage.removeItem("remember");
  }
};
const handleLogin = async () => {
  loading.value = true;
  const res = await userLogin.userLoginApi();
  console.log("login============", res.status);
  if (res.status == '00') {
    loading.value = false;
    navigateTo("/Dasboard");

  }
};
</script>

<style scoped>
.bg {
  background-image: url("../assets/images/bg_login_biz.png");
  margin: 0;
  padding: 0;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 100vh;
}

@keyframes bounce {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-20px);
  }
}

.bounce {
  animation: bounce 1s infinite;
}

.custom-select .v-field {
  background-color: transparent !important;
}
</style>
