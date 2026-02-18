<template>
  <VApp>

    <VAppBar class="bg-primary">
      <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer" color="white"></v-app-bar-nav-icon>
      <v-btn elevation="0" variant="rounded" :to="'/'" color="white"><v-icon>mdi-home </v-icon><b>{{ $t('home')
      }}</b></v-btn>

      <v-menu :close-on-content-click="false">
        <template #activator="{ props }">
          <v-btn color="white" variant="text" v-bind="props" append-icon="mdi-arrow-down-drop-circle">
            {{ $t("manage_data") }}
          </v-btn>
        </template>

        <v-list density="comfortable" nav>

          <v-list-group value="Admin">

            <template #activator="{ props }">
              <v-list-item v-bind="props" :title="$t('product_info')" />
            </template>

            <v-list-item class="px-4 py-2" append-icon="mdi-arrow-right" variant="plain" :title="$t('product_info')"
              to="/Products/Products" link />
            <v-divider></v-divider>
            <v-list-item append-icon="mdi-arrow-right" variant="plain" :title="$t('product_type')"
              to="/Products/ProductType" link />

          </v-list-group>
          <v-divider></v-divider>
          <v-list-group value="company">

            <template #activator="{ props }">
              <v-list-item v-bind="props" :title="$t('conpany_info')" />
            </template>

            <v-list-item append-icon="mdi-chevron-right" variant="plain" :title="$t('conpany_info')"
              to="/Companies/CompaniesPage" link />
            <v-divider></v-divider>
            <v-list-item append-icon="mdi-chevron-right" variant="plain" :title="$t('branch_info')" to="/Branch/Branch"
              link />

          </v-list-group>
          <v-divider></v-divider>
          <v-list-item append-icon="mdi-chevron-right" variant="plain" :title="$t('customer_info')"
            to="/Customer/Customer" link />
          <v-divider></v-divider>
          <v-list-item append-icon="mdi-chevron-right" variant="plain" :title="$t('product_info') + ' - ' + $t('price')"
            to="/Price/Price" link />
          <v-divider></v-divider>
          <v-list-item append-icon="mdi-chevron-right" variant="plain" :title="$t('exchange_rate')"
            to="/Exchange/ExchangeRate" link />
        </v-list>
      </v-menu>
      <v-menu :close-on-content-click="false">
        <template #activator="{ props }">
          <v-btn color="white" variant="text" v-bind="props" append-icon="mdi-arrow-down-drop-circle"
            :to="'/Products/ProductDetails'">
            {{ $t("product_list") }}
          </v-btn>
        </template>


      </v-menu>
      <v-spacer></v-spacer>
      <h4>{{ $t('user') }}: {{ user }}</h4>
      <Mbtn color="white" icon="mdi-logout" :label="$t('logout')" @click="handleLogout"></Mbtn>
    </VAppBar>

    <VMain class="d-flex" style="min-height: 100vh">

      <slot />
    </VMain>
  </VApp>

</template>
<script setup>
import { onMounted, ref } from "vue";
import { useI18n } from "#imports";
definePageMeta({
  layout: "auth",
});
const drawer = ref(true);
const { locale, setLocale } = useI18n();
const user = computed(() => useLogin().userLogin);
onMounted(() => {

  if (user.value == null || user.value == '') {
    useLogin().userLogin = localStorage.getItem("user");
  }

  const saved = localStorage.getItem("lang");
  if (saved) {
    setLocale(saved);
    console.log("==================lang=============:", saved);
  } else {
    setLocale(locale.value);
    console.log("==================locale.value=============:", locale.value);
  }

});

const handleLogout = async () => {
  await useLogin().handleLogout();
};

const fontLinks = {
  // la: "https://fonts.googleapis.com/css2?family=Noto+Sans+Lao:wght@700&display=swap",Saysettha OT
  la: "Saysettha OT, sans-serif",
  zh: "https://fonts.googleapis.com/css2?family=Noto+Sans+Simplified+Chinese&display=swap",
  en: "Saysettha OT, sans-serif",
  vi: "https://fonts.googleapis.com/css2?family=Noto+Serif+Ottoman+Siyaq&display=swap",
};



useHead({
  link: [
    {
      rel: "stylesheet",
      href: fontLinks[locale.value] || fontLinks.en,
    },
  ],
  htmlAttrs: {
    lang: locale.value,
  },
});
</script>
<style scoped>
/*
.app-bar-image {
  background: radial-gradient(ellipse at center, #7e22ce, #6a74e2);

  color: white;
}*/
.bg-primary {
  background: radial-gradient(ellipse at center, #1572dd, #5db7f3);
  color: white;
}

.custom-scroll {
  max-height: 100%;
  /* or 100% if drawer is scrollable */
  overflow-y: auto;
}

/* For WebKit browsers: Chrome, Edge, Safari */
.custom-scroll::-webkit-scrollbar {
  width: 8px;
}

.custom-scroll::-webkit-scrollbar-track {
  background: #6882f5;
}

.custom-scroll::-webkit-scrollbar-thumb {
  background-color: #50cadd;
  border-radius: 4px;
  border: 2px solid #4387ec;
}

/* For Firefox */
.custom-scroll {
  scrollbar-width: thin;
  scrollbar-color: #f6f8fa #0b3252;
}
</style>