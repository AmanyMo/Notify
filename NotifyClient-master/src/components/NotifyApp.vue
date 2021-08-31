<template>
  <div class="d-flex justify-content-center" style="margin-top:100px">
    <div class="flex-column  mt-5">
      <img
        style="mix-blend-mode: multiply;"
        :src="this.$store.getters.website.websitesrc"
        width="400"
        alt="no pic"
      />
      <form class="mt-5" @submit.prevent="submitInfo">
        <v-text-field
          label="Enter the product link here"
          v-model="link"
          :rules="rules"
          hide-details="auto"
        ></v-text-field>

        <v-btn
          type="submit"
          class="white--text mt-5"
          color="#164e87"
          :loading="loading"
          >Find</v-btn
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
      anypricedrop: false,
      specificpricedrop: false,
      link: null,
      spcificprice: null,
      rules: [
        (value) => !!value || "Required.",
        (value) => (value && value.length >= 3) || "Min 3 characters",
      ],
      loading: false,
    };
  },
  methods: {
    submitInfo() {
      let info = {
        link: this.link,
      };
      if (!this.link)
        return this.$alert("Please enter a link to find...", null, "error");

      if (!this.link.includes(`${this.$store.getters.website.websitename}`))
        return this.$alert(
          `Entered link must be from ${this.$store.getters.website.websitename
            .toString()
            .toUpperCase()}`,
          null,
          "error"
        );
      this.loading = true;
      api
        .scrapeweb(info)
        .then((response) => {
          const data = response.data;
          this.loading = false;
          this.$fire({
            title: "<strong>Product info</strong>",
            width: 900,
            html: `<img src=${data.ImgSrc} style="width:100px"/> <b>${data.name}</b><br>
                <b>Price</b> ${data.price}${data.currency}`,

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
                  name: data.name,
                  image: data.ImgSrc,
                  currency: data.currency,
                  link: this.link,
                },
              });
              
            }
            this.link = null;
          });
        })
        .catch((err) => {
          this.loading = false;
          this.$alert(err.response.data, "Error", "error");
        });
    },
  },
};
</script>

<style scoped></style>
