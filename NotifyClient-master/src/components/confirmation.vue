<template>
 <div class="container-fluid text-center" style="height:100%" id="info" v-if="this.$store.state.newEmail">
    <img src="../logo/whitelogotextt.png" alt="" id="text" class="mx-auto d-block pt-5">
 
    <!-- <img src="../logo/white_notify.png" alt="" class="mx-auto d-block pt-5"> -->
<div class="row">
  <div class="col-sm-4"></div>
  <div class="col-sm-4 mt-5">
    <h2 class="mt-5">Almost there...</h2>
    <p>Please check your email ({{this.$store.state.newEmail}}) <br> to confirm your account.</p>
    <hr>
    <p class="mt-5 pt-3">If <b>{{this.$store.state.newEmail}} </b>is not your email address,<br> please <router-link  to="/register">go back</router-link> and enter the correct one.</p>
    <p class="mt-5 pt-3 ">If you haven't received our email in 15 minutes,<br> please check your spam folder.</p>
  </div>
  <div class="col-sm-4"></div>
  </div>
</div>
 
</template>

<script>
export default {

}
</script>

<style scoped>

#info{

  background-image: url('../logo/Subtle-Prism.svg');
  background-size: cover;


   /* background-image: url('../logo/backbanner.png');
  background-size: cover;
  background-repeat: round; */
}

#text{
position: relative;
/* margin-bottom: -4%; */

}
</style> 