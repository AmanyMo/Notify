<template>
  <div class="container">
    <div class=" col-sm-9 justify-content-center">
      <form class="mt-5" @submit.prevent="submitInfo">
        <v-container fluid>
          <v-textarea
            autocomplete="email"
            label="Enter Your Recommendations..."
            v-model="msg"
          ></v-textarea>
          <span style="color:#164e87"><b>Rate the App</b></span>
          <v-rating
            v-model="rating"
            color="yellow darken-3"
            background-color="grey darken-1"
            empty-icon="$ratingFull"
            half-increments
            hover
            class="text-right ml-5"
            style="display:inline-block"
          ></v-rating>
        </v-container>
        

        <div class="d-flex justify-content-center">
          <v-btn
            type="submit"
            class="white--text mt-5"
            color="#164e87"
            :loading="loading"
            >Send Feedback</v-btn
          >
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import api from "../api";
export default {
  data() {
    return {
      msg: null,
      rating: null,
      loading: false,
    };
  },
  methods: {
    submitInfo() {
      if (this.msg == null || this.rating == null) {
        return this.$alert("Kindly Fill This Form ", "Error", "error");
      }
      api
        .MoreFeatures(
          this.msg,
          this.rating,
          this.$store.getters.userEmail,
          this.$store.getters.userName
        )
        .then(() => {
          this.$alert("Feedback Sent Successfully ", "Success",'success');
        });
    },
  },
};
</script>

<style></style>
