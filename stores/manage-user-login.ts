import { defineStore } from "pinia";
export const useLogin = defineStore("userLogin", {

  state: () => ({
    userLogin: null,
    passWord: null,
    customerUserData: [],
    loading: false,
  }),
  actions: {

    allApi() {
      const { mainApi } = useApi();
      return mainApi;
    },
    async userLoginApi() {
      if (this.userLogin == null || this.passWord == null) {
        CallSwal({
          icon: "warning",
          title: "ຜິດພາດ",
          text: useI18n().t("please_input"),
        });
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
        navigateTo("/Dasboard");
      } else {
        CallSwal({
          icon: "warning",
          title: "ຜິດພາດ",
          text: useI18n().t("user_or_pw"),
        });
      }
    },



  }
});
