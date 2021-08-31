<template>
  <v-app color="#1E88E5">
    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
  }),
  sockets: {
    global: function(data) {
      this.$toasted.show(data.msg, {
        theme: "toasted-primary",
        position: "top-center",
        duration: 5000,
      });
      let audio=new Audio(require('./assets/eventually.mp3'));
      audio.play();
    },
    socketid: function(data) {
     this.$store.state.socketID= data.socketid
    },
  },
};
</script>
