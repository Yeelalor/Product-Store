<template>

  <VApp>

    <VAppBar class="bg-primary" v-if="user != null || user != ''">
      <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer" color="white"></v-app-bar-nav-icon>
      <h3>user: {{ user }}</h3>

      <Mbtn color="white" icon="mdi-logout" label="Logout" @click="handleLogout"></Mbtn>
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

import { watch } from "vue";

const { locale, setLocale } = useI18n();
const user = computed(() => useLogin().userLogin);
onMounted(() => {
  const reme = localStorage.getItem("remember");
  console.log("user local storage=====================", user.value);
  // check language====================
  // console.log("user local storage=====================", localStorage.getItem("user"));
  const saved = localStorage.getItem("lang");
  if (user.value != null && user.value != '') {
    console.log("user local storage=====================", localStorage.getItem("user"));
    user.value = localStorage.getItem("user");
  }


  if (saved) {
    setLocale(saved);
    console.log("==================lang=============:", saved);
  } else {
    setLocale(locale.value);
    console.log("==================locale.value=============:", locale.value);
  }

});

const handleLogout = async () => {
  await navigateTo("/login"); // clears everything in the browser
};

const fontLinks = {
  // la: "https://fonts.googleapis.com/css2?family=Noto+Sans+Lao:wght@700&display=swap",Saysettha OT
  la: "Saysettha OT, sans-serif",
  zh: "https://fonts.googleapis.com/css2?family=Noto+Sans+Simplified+Chinese&display=swap",
  en: "Saysettha OT, sans-serif",
  vi: "https://fonts.googleapis.com/css2?family=Noto+Serif+Ottoman+Siyaq&display=swap",
};

watch(
  locale,
  (newLocale) => {
    useHead({
      link: [
        {
          rel: "stylesheet",
          href: fontLinks[newLocale] || fontLinks.en,
        },
      ],
      htmlAttrs: {
        lang: newLocale,
        style: `font-size:20px`,
      },
    });
  },
  { immediate: true }
);

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
