<template>
  <div >
    <!-- <div class="container mt-5"> -->
    <v-carousel cycle hide-delimiters height=610>
      <v-carousel-item 
        v-for="(item, i) in items"
        :key="i"
        :src="item.src"
        reverse-transition="fade-transition"
        transition="fade-transition"
      ></v-carousel-item>
    </v-carousel>
   
  </div>
  <!-- </div> -->
</template>

<script>
export default {
  data() {
    return {
      

      items: [
        {
          src: require("../logo/backbannerslide.png"),
        },
        {
          src: require("../logo/fullbck.png"),
        },
      ],
      slides: ["WELCOME TO", "OUR", "NOTIFY", "WEBSITE", "Fifth"],
    };
  },
};
</script>

<style></style>
