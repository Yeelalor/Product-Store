import { defineStore } from "pinia";
export const useLogin = defineStore("userLogin", {

  state: () => ({
    userLogin: null,
    passWord: null,
    customerUserData: [],
  }),
  actions: {

    allApi() {
      const { mainApi } = useApi();
      return mainApi;
    },
    async userLoginApi() {
      var body = {
        "userLogin": this.userLogin,
        "passWord": this.passWord
      }
      const res = await this.allApi().post("getCustomerByUserAndPass", body);
      if (res.status === 200) {
        this.customerUserData = res.data;
        return this.customerUserData;
      } else {

        this.customerUserData = [];
      }
    },



  }
});
