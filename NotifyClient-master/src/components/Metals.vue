<template>
  <div class="d-flex justify-content-center">
    <div class="flex-column  mt-5 ">
      <img
        style="mix-blend-mode: multiply;"
        :src="this.$store.state.metalpic"
        width="200"
        alt="no pic"
      />
      <form class="mt-5" @submit.prevent="submitInfo">
        <v-row align="center">
          <v-col>
            <v-select
              v-model="currency"
              :items="states"
              menu-props="auto"
              label="Choose Currency"
              hide-details
              prepend-icon="mdi mdi-map"
              single-line
            ></v-select>
          </v-col>
        </v-row>
        <v-row algin="center">
          <v-col>
            <v-select
              v-model="weight"
              :items="weights"
              @click="checkmetal"
              prepend-icon="mdi mdi-map"
              menu-props="auto"
              hide-details
              label="Choose Weight"
              single-line
            ></v-select>
          </v-col>
        </v-row>

        <v-btn
          type="submit"
          class="white--text mt-5"
          color="#164e87"
          :loading="loading"
          >Track Price</v-btn
        >
      </form>
    </div>
  </div>
</template>

<script>
import api from "../api";
export default {
  data() {
    return {
      loading: false,
      currency: null,
      weight: null,
      weights: ["kg", "g", "oz"],
      states: [
        "USD",
        "AED",
        "AFN",
        "ALL",
        "AMD",
        "ANG",
        "AOA",
        "ARS",
        "AUD",
        "AWG",
        "AZN",
        "BAM",
        "BBD",
        "BDT",
        "BGN",
        "BHD",
        "BIF",
        "BMD",
        "BND",
        "BOB",
        "BRL",
        "BSD",
        "BTN",
        "BWP",
        "BYN",
        "BZD",
        "CAD",
        "CDF",
        "CHF",
        "CLP",
        "CNY",
        "COP",
        "CRC",
        "CUC",
        "CUP",
        "CVE",
        "CZK",
        "DJF",
        "DKK",
        "DOP",
        "DZD",
        "EGP",
        "ERN",
        "ETB",
        "EUR",
        "FJD",
        "FKP",
        "GBP",
        "GEL",
        "GGP",
        "GHS",
        "GIP",
        "GMD",
        "GNF",
        "GTQ",
        "GYD",
        "HKD",
        "HNL",
        "HRK",
        "HTG",
        "HUF",
        "IDR",
        "ILS",
        "IMP",
        "INR",
        "IQD",
        "IRR",
        "ISK",
        "JEP",
        "JMD",
        "JOD",
        "JPY",
        "KES",
        "KGS",
        "KHR",
        "KMF",
        "KPW",
        "KRW",
        "KWD",
        "KYD",
        "KZT",
        "LAK",
        "LBP",
        "LKR",
        "LRD",
        "LSL",
        "LYD",
        "MAD",
        "MDL",
        "MGA",
        "MKD",
        "MMK",
        "MNT",
        "MOP",
        "MRO",
        "MUR",
        "MVR",
        "MWK",
        "MXN",
        "MYR",
        "MZN",
        "NAD",
        "NGN",
        "NIO",
        "NOK",
        "NPR",
        "NZD",
        "OMR",
        "PAB",
        "PEN",
        "PGK",
        "PHP",
        "PKR",
        "PLN",
        "PYG",
        "QAR",
        "RON",
        "RSD",
        "RUB",
        "RWF",
        "SAR",
        "SBD",
        "SCR",
        "SDG",
        "SEK",
        "SGD",
        "SHP",
        "SLL",
        "SOS",
        "SRD",
        "STD",
        "SVC",
        "SYP",
        "SZL",
        "THB",
        "TJS",
        "TMT",
        "TND",
        "TOP",
        "TRY",
        "TTD",
        "TWD",
        "TZS",
        "UAH",
        "UGX",
        "USD",
        "UYU",
        "UZS",
        "VEF",
        "VND",
        "VUV",
        "WST",
        "XAF",
        "XCD",
        "XOF",
        "XPF",
        "YER",
        "ZAR",
        "ZMW",
      ],
    };
  },
  methods: {
    submitInfo() {
      if (!this.currency || !this.weight)
        return this.$alert(
          "Please select all the missing information",
          "Error",
          "error"
        );
      this.loading = true;
      let info = {
        currency: this.currency,
        weight: this.weight,
        mtl: this.$store.state.metalname
      };
      api
        .MetalsQuery(info)
        .then((res) => {
          const data = res.data;
          this.loading = false;
          this.$fire({
            title: "<strong>Metal info</strong>",
            width: 900,
            html: `<p>1 ${data.weight} of ${data.name} equals ${data.price} ${data.currency}</p> `,
            showCancelButton: true,
            focusConfirm: false,
            confirmButtonText: "Proceed",
            cancelButtonText: "Not what your looking for?",
          }).then((promiseres) => {
            if (promiseres.value) {
              this.$router.push({
                name: "options",
                params: {
                  price: data.price,
                  link: "https://goldprice.org/",
                  image: this.$store.getters.metalpic,
                  weight: data.weight,
                  name: data.name,
                  currency: data.currency,
                },
              });
            }
          });
        })
        .catch(() => {});
    },
    checkmetal() {
      if (this.$store.state.metalname == "XAG") {
        this.weights = this.weights.filter((w) => w != "g");
      } else {
        this.weights = ["kg", "g", "oz"];
      }
    },
  },
  created(){
    
  }
};
</script>

<style></style>
