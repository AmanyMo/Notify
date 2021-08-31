<template>
  <div>
    <div
      class="container justify-content-center mt-5"
      v-if="this.$route.params.price"
    >
      <div>
        <h4>{{ this.$route.params.name }}</h4>
        <img :src="this.$route.params.image" style="width:20%" alt="" />
      </div>
      <v-form @submit.prevent="submitInfo">
        <v-radio-group @change="readinput" v-model="value">
          <v-radio label="Email me when the price drops"></v-radio>
          <v-radio
            label="Only Email me when the price drops below a specific price"
          ></v-radio>
        </v-radio-group>
        <div :hidden="this.bool">
          <label for="inputprice" class="mb-3"
            >Please select a specific price for the product</label
          ><br />
          <input
            type="number"
            style="background-color:white"
            v-model="specificprice"
            @change="checkiflarger"
          /><span class="ml-3">{{ this.$route.params.currency }}</span>
        </div>
        <v-btn
          color="primary"
          type="submit"
          :loading="this.loading"
          class="mt-5"
          >Start Tracking</v-btn
        >
      </v-form>
    </div>
    <div v-else class="text-center mx-auto mt-5 ">
      <h1>Not quite what your looking for?</h1>
    </div>
  </div>
</template>

<script>
import api from "../api";
import allcurrentTrackings from "../getalltrackings";
export default {
  data() {
    return {
      value: null,
      specificprice: this.$route.params.price,
      bool: true,
      loading: false,
    };
  },
  methods: {
    checkiflarger() {
      if (this.specificprice > this.$route.params.price) {
        this.specificprice = this.$route.params.price;
      }
    },
    readinput() {
      if (this.value == 1) {
        this.bool = false;
      } else {
        this.bool = true;
      }
    },
    submitInfo() {
      if (this.value == null)
        return this.$alert("Please Select an Option", null, "info");
      if (this.value == 1 && this.specificprice == this.$route.params.price)
        return this.$alert(
          `Please Select a Price below ${this.$route.params.price} ${this.$route.params.currency}`,
          null,
          "error"
        );
      this.loading = true;
      let scheduleInfo = {
        ...this.$route.params,
        requestedPrice: this.specificprice,
        userRequirement: this.value,
        userEmail: this.$store.getters.userEmail,
        socketid:this.$store.state.socketID
      };

      if (
        this.$route.params.link == "https://www1.oanda.com/currency/converter/"
      ) {
        api
          .scheduleCurrency(scheduleInfo)
          .then(() => {
            this.loading = false;

            this.$alert(
              "Currency Change is being tracked, you will recieve an email once price drops",
              "Success",
              "success"
            );
            allcurrentTrackings().then((arr) => {
              
              this.$store.state.ProductsTracked = arr;
              this.$router.push("currency");
            });
          })
          .catch((err) => {
            this.loading = false;
            this.$alert(err.response.data, "Error", "error");
          });
      } else if (this.$route.params.weight) {
        console.log(scheduleInfo)
        api
          .scheduleMetals(scheduleInfo)
          .then(() => {
            this.loading = false;

            this.$alert(
              "Your Request is being tracked, you will recieve an email once price drops",
              "Success",
              "success"
            );
            allcurrentTrackings().then((arr) => {
             
              this.$store.state.ProductsTracked = arr;
              this.$router.push("metals");
            });
          })
          .catch((err) => {
            this.loading = false;
            this.$alert(err.response.data, "Error", "error");
          });
      } else {
        api
          .scheduleTask(scheduleInfo)
          .then(() => {
            this.loading = false;

            this.$alert(
              "Product is being tracked, you will recieve an email once price drops",
              "Success",
              "success"
            );

            allcurrentTrackings().then((arr) => {
             
              this.$store.state.ProductsTracked = arr;
              this.$router.push("/home/main");
            });
          })
          .catch((err) => {
            this.loading = false;
            this.$alert(err.response.data, "Error", "error");
          });
      }
    },
  },
};
</script>

<style></style>
