<template>
  <div class="container-fluid" style="height:100%" id="test">
    <img
      src="../logo/whitelogotextt.png"
      alt=""
      id="text"
      class="mx-auto d-block pt-5"
    />

    <div class="row pt-5 d-flex justify-content-center mt-5">
      <div class="col-sm-4"></div>
      <div class="col-sm-3 mt-5 pr-0 pl-0 pb-0" id="form">
        <form @submit.prevent="login" class="pt-5">
          <h3 style="color:#008de5" class="text-center mb-5">
            Login
          </h3>
          <div class="form-group row d-flex justify-content-center pt-5">
            <v-icon class="mdi mdi-email mr-1" large color="#008de5"></v-icon>
            <input
              type="email"
              class="form-control"
              v-model="loginInfo.email"
              aria-describedby="emailHelp"
              required
              style="width:50%;"
              placeholder="Email address"
            />
          </div>

          <div class="form-group row d-flex justify-content-center">
            <v-icon class="mdi mdi-lock mr-1" large color="#008de5"></v-icon>
            <input
              type="password"
              v-model="loginInfo.password"
              class="form-control "
              style="width:50%"
              id="p1"
              required
              placeholder="Password"
            />
          </div>
          <div class="d-flex justify-content-center">
            <v-btn
              type="submit"
              class="white--text "
              style="width:30%;"
              color="#008de5"
              :loading="loading"
              >Log In</v-btn
            >
          </div>
        </form>
        <div class="row">
          <div class="col-md-12">
            <a
              href="/account/google"
              class="btn btn-lg btn-google btn-block text-uppercase btn-outline"
              ><img
                src="https://img.icons8.com/color/16/000000/google-logo.png"
              />
              Login Using Google</a
            >
          </div>
        </div>
        <br />
        <p class="d-flex justify-content-center mt-5 mb-0" id="info1">
          <span class="mt-2">New to Notify? </span>
          <router-link class="ml-1 mt-2" to="register" style="color:#164e87"
            >Sign Up</router-link
          >
        </p>
        <a
          id="info"
          style="color:#164e87"
          class="d-flex justify-content-center pb-3 pt-1"
          @click="forgotpassword"
          href="#"
          >Forgot your password?</a
        >
      </div>
      <div class="col-sm-4"></div>
    </div>
    <div style="color:#164e87" class=" text-center mb-5">
      @{{ new Date().getFullYear() }} Notify.com
    </div>
    <div class="row text-center justify-content-center mt-5">
      <div class="column">
        <div class="card">
          <img src="../logo/one.svg" id="icon" alt="Register" width="20%" />
          <div class="container">
            <h3>Register a new account</h3>
          </div>
        </div>
      </div>

      <div class="column">
        <div class="card">
          <img src="../logo/two.svg" alt="Login" style="width:20%" />
          <div class="container">
            <h3>Login to discover more</h3>
          </div>
        </div>
      </div>

      <div class="column">
        <div class="card">
          <img src="../logo/three.png" alt="categories" style="width:20%" />
          <div class="container">
            <h3>Explore our categories</h3>
          </div>
        </div>
      </div>
      <div class="column">
        <div class="card">
          <img src="../logo/four.png" alt="categories" style="width:20%" />
          <div class="container">
            <h3>Track your product</h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../api";
export default {
  data() {
    return {
      loginInfo: {
        email: null,
        password: null,
      },
      loading: false,
    };
  },
  methods: {
  
    login() {
      this.loading = true;

      api
        .login(this.loginInfo)
        .then((response) => {
          this.loading = false;
          this.$store.commit("assignUser", response.data);

          if (response.data.role == "admin") {
            this.$router.push("admin");
          } else {
            this.$router.push("/home");
          }
        })
        .catch((err) => {
          this.loading = false;
          this.$toasted.error(err.response.data);
        });
    },
    forgotpassword() {
      this.$prompt(
        "A password reset email will be sent",
        null,
        "Enter your email",
        "question",
        { input: "email", allowOutsideClick: false }
      ).then((text) => {
        this.$loading(true);
        api
          .changepassword(text)
          .then(() => {
            this.$loading(false);
            this.$alert(
              "Check your email for password reset link",
              "An email has been sent",
              "success"
            );
          })
          .catch((err) => {
            this.$loading(false);
            this.$alert(err.response.data, "Error", "error");
          });
      });
    },
  },
};
</script>

<style scoped>
#form {
  /* border: 1px solid; */
  border-radius: 50px;
  border-bottom: transparent;
  background-color: whitesmoke ;
  
}
#logo {
  margin-bottom: 0%;
  width: auto;
}
#test {
  background-image: url("../logo/Subtle-Prism.svg");
  background-size: cover;
}

#text {
  position: relative;
  /* margin-bottom: %; */
}

#info1 {
  background: rgba(211, 211, 211, 0.897);
}
#info {
 
  border-bottom-left-radius: 50px;
  border-bottom-right-radius: 50px;
  background: rgba(211, 211, 211, 0.897);
}
body {
  font-family: Arial, Helvetica, sans-serif;
  margin: 0;
}

html {
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: inherit;
}

.column {
  position: static;

  width: 20%;
  margin-bottom: 16px;
  padding: 0 8px;
}

.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  margin: 8px;
}

.container {
  padding: 0 16px;
}

.container::after,
.row::after {
  content: "";
  clear: both;
  display: table;
}

.title {
  color: grey;
}

@media screen and (max-width: 650px) {
  .column {
    width: 100%;
    display: block;
  }
}
</style>
