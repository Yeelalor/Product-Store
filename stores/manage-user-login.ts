import { defineStore } from "pinia";
export const useLogin = defineStore("userLogin", {

  state: () => ({
    userLogin: null,
    passWord: null,
    customerUserData: [],
    loading: false,
    remember: false,
  }),
  actions: {

    allApi() {
      const { mainApi } = useApi();
      return mainApi;
    },
    checkRemember() {
      this.remember = !this.remember;
      if (!this.remember) {
        console.log("true=============", this.remember);

        localStorage.removeItem('remember');
      } else {

        console.log("false=============", this.remember);
        if (this.userLogin != null) {
          console.log("false111=============", this.remember);
          localStorage.setItem('remember', this.userLogin);
        }
      }
    },
    async handleLogout() {
      localStorage.removeItem('user')
      await navigateTo("/login");
    },
    async userLoginApi() {
      if (this.userLogin == null || this.passWord == null) {
        CallSwal({
          icon: "warning",
          title: "ຜິດພາດ",
          text: useI18n().t("please_input"),
        });
        return;
      }
      this.loading = true;
      var body = {
        "userLogin": this.userLogin,
        "passWord": this.passWord
      }
      const res = await this.allApi().post("getCustomerByUserAndPass", body);
      this.loading = false;
      if (res.status === 200) {
        localStorage.setItem("user", this.userLogin == null ? "" : this.userLogin);
        console.log("user=====================", this.userLogin);
        console.log("user local storage=====================", localStorage.getItem("user"));
        this.customerUserData = res.data;
        navigateTo("/Dasboard");
        return this.customerUserData;
      } else {
        CallSwal({
          icon: "warning",
          title: "ຜິດພາດ",
          text: useI18n().t("user_or_pw"),
        });
        this.customerUserData = [];
      }
    },



  },
});
