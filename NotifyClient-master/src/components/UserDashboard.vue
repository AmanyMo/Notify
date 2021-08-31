<template>
  <div
    class="container-fluid pl-0 pr-0"
    style="background-color:#F0F0F0;height:100%;"
  >
    <nav class="navbar navbar-expand-xl" style="background-color:#0063B2FF">
      <a class="navbar-brand " href="/home">
        <img
          class="img-fluid"
          src="../logo/whitelogo.png"
          alt="Notify"
          style="height:50px;"
        />
      </a>
      <button
        class="navbar-toggler btn btn-light"
        type="button"
        data-toggle="collapse"
        data-target=".dogs"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <v-icon>mdi-menu</v-icon>
      </button>

      <ul class="navbar-nav collapse navbar-collapse dogs ">
        <li class="nav-item">
          <v-btn color="white" text class="nav-link ml-5" href="/home/">
            Home
          </v-btn>
        </li>
        <li class="nav-item">
          <v-btn color="white" text class="nav-link ml-5" @click="OpenFeature"
            >Features</v-btn
          >
        </li>
        <li class="nav-item ">
          <v-btn color="white" text class="nav-link ml-5" @click="morefeatures"
            >Send Feedback</v-btn
          >
        </li>
        <li class="nav-item hidden-sm-and-down">
          <v-menu offset-y auto light>
            <template v-slot:activator="{ on }">
              <v-text-field
                style="width:500px"
                id="search"
                clearable
                rounded
                append-icon="mdi mdi-magnify"
                v-on="on"
                v-model="websitebySearch"
                @input="SearchforInput"
                placeholder=" Search for website"
                background-color="white"
              ></v-text-field>
            </template>
            <v-list>
              <v-list-item
                v-for="website in this.websitesbySearch"
                :key="website._id.$oid"
              >
                <v-btn
                  text
                  @mouseenter="dimpic"
                  @mouseleave="undimpic"
                  ripple
                  large
                  class="mx-auto"
                  height="120"
                  @click="ScrapeWeb"
                >
                  <img
                    class="pl-2 pr-2"
                    :src="getImage(website.logo)"
                    :name="website.name"
                    width="150"
                  />
                </v-btn>
              </v-list-item>
            </v-list>
          </v-menu>
        </li>

        <li class=" nav-item ml-5 mr-0  ml-auto" id="bell">
          <v-menu offset-y auto>
            <template v-slot:activator="{ on }">
              <v-btn
                icon
                color="white"
                class="mr-2"
                v-on="on"
                style="outline:none"
              >
                <v-icon > mdi mdi-cart</v-icon>
              </v-btn>
            </template>
            <v-list
              v-if="
                this.$store.state.ProductsTracked.length > 0 &&
                  this.$store.state.ProductsTracked[0].product_name != null
              "
            >
              <v-list-item
                v-for="product in this.$store.state.ProductsTracked"
                :key="product._id"
              >
                <img
                  :src="product.product_image"
                  style="width:50px"
                  alt=""
                  class="mr-2"
                />
                <v-list-item-title>{{
                  product.product_name
                }}</v-list-item-title>

                <v-btn
                  class="ml-5"
                  fab
                  dark
                  small
                  color="red"
                  @click="stopTracking(product._id, product.product_name)"
                >
                  <v-icon dark>mdi mdi-close</v-icon>
                </v-btn>
              </v-list-item>
            </v-list>
          </v-menu>
        </li>


        <li class="nav-item dropdown ml-0" id="name">
            <v-avatar size="48">
            <img
              class="img-fluid ml-auto"
              :src="`${this.$store.getters.userImage}`"
            />
          </v-avatar>
          <v-btn
            class="nav-link dropdown-toggle ml-0"
            color="white"
            text
            id="navbarDropdown"
            role="button"
            data-target="account"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
            >{{ this.$store.getters.userName }}</v-btn
          >
          <input type="file" ref="file" style="display: none" @change="file" />
          <div
            class="dropdown-menu"
            id="account"
            aria-labelledby="navbarDropdown"
          >
            <v-btn
              color="#164e87"
              text
              class="dropdown-item"
              @click="changepicture"
            >
              Change Avatar
              <span class="mdi mdi-image"></span>
            </v-btn>
            <v-btn color="#164e87" class="dropdown-item" :hidden="ifgoogle" text @click="changepw">
              Change Password
              <span class="mdi mdi-key-variant"></span>
            </v-btn>
            <div class="dropdown-divider"></div>
            <v-btn color="#164e87" class="dropdown-item" text @click="logout">
              Sign Out
              <span class="mdi mdi-logout"></span>
            </v-btn>
          </div>
        </li>
        <span class="hidden-md-and-down" style="color:white">{{
          this.country
        }}</span>
        <country-flag
          :country="country"
          size="normal"
          class="hidden-md-and-down"
        />
      </ul>
    </nav>

    <nav >
      <v-btn
        class="navbar-toggler mt-2"
        type="button"
        data-toggle="collapse"
        data-target=".cats"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
        style="outline:none"
        text
      >
        <span style="color:#164e87"
          ><v-icon color="#164e87">mdi-cursor-default-click</v-icon> for All
          Categories</span
        >
      </v-btn>

      <ul class="collapse navbar-collapse cats">
        <li class="nav-item dropdown">
          <v-btn
            color="#164e87"
            text
            class="nav-link dropdown-toggle"
            data-target="homeandapp"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
            >ECommerce</v-btn
          >
          <div
            class="dropdown-menu"
            id="homeandapp"
            ref="dropdown"
            aria-labelledby="navbarDropdown"
          >
            <div class="dropdown-item bg-transparent">
              <v-btn
                text
                @mouseenter="dimpic"
                @mouseleave="undimpic"
                ripple
                large
                @click="ScrapeWeb"
              >
                <img
                  class="pl-2 pr-2"
                  src="../logo/Amazon_logo.svg"
                  name="amazon"
                  width="100"
                />
              </v-btn>
            </div>
            <div class="dropdown-item bg-transparent mt-1">
              <v-btn
                color="#164e87"
                text
                class="dropdown-item"
                @mouseenter="dimpic"
                @mouseleave="undimpic"
                ripple
                large
                @click="ScrapeWeb"
              >
                <img
                  class="pl-2 pr-2"
                  src="../logo/jumia-seeklogo.com.svg"
                  name="jumia"
                  width="100"
                />
              </v-btn>
            </div>
            <div class="dropdown-item bg-transparent mt-1">
              <v-btn
                color="#164e87"
                text
                class="dropdown-item"
                @mouseenter="dimpic"
                @mouseleave="undimpic"
                ripple
                large
                @click="ScrapeWeb"
              >
                <img
                  class="pl-2 pr-2"
                  src="../logo/Souq_Logo_Primary_EN.svg"
                  name="souq"
                  width="100"
                />
              </v-btn>
            </div>
            <div class="dropdown-item bg-transparent mt-1">
              <v-btn
                color="#164e87"
                text
                class="dropdown-item"
                @mouseenter="dimpic"
                @mouseleave="undimpic"
                ripple
                large
                @click="ScrapeWeb"
              >
                <img
                  class="pl-2 pr-2"
                  src="../logo/olx.png"
                  name="olx"
                  width="100"
                />
              </v-btn>
            </div>
          </div>
        </li>

        <li class="nav-item dropdown ">
          <v-btn
            color="#164e87"
            text
            class="nav-link dropdown-toggle"
            data-target="clothing"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
            >clothing</v-btn
          >
          <div
            class="dropdown-menu "
            id="clothing"
            aria-labelledby="navbarDropdown"
          >
            <div class="dropdown-item bg-transparent ">
              <v-btn
                text
                @mouseenter="dimpic"
                @mouseleave="undimpic"
                ripple
                large
                @click="ScrapeWeb"
              >
                <img src="../logo/H&M-Logo.svg" name="hm" width="80" />
              </v-btn>
            </div>
            <div class="dropdown-item bg-transparent mt-1">
              <v-btn
                text
                @mouseenter="dimpic"
                @mouseleave="undimpic"
                ripple
                large
                @click="ScrapeWeb"
              >
                <img src="../logo/Zara_Logo.svg" width="90" name="zara" />
              </v-btn>
            </div>
            <div class="dropdown-item bg-transparent">
              <v-btn
                text
                @mouseenter="dimpic"
                @mouseleave="undimpic"
                ripple
                large
                @click="ScrapeWeb"
              >
                <img
                  src="../logo/Lacoste_logo.svg"
                  name="lacoste"
                  width="90"
                />
              </v-btn>
            </div>
            <div class="dropdown-item bg-transparent mt-1">
              <v-btn
                text
                @mouseenter="dimpic"
                @mouseleave="undimpic"
                ripple
                large
                @click="ScrapeWeb"
              >
                <img
                  src="../logo/Bershka_logo.svg"
                  name="bershka"
                  width="100"
                />
              </v-btn>
            </div>
                   <div class="dropdown-item bg-transparent mt-1">
              <v-btn
                text
                @mouseenter="dimpic"
                @mouseleave="undimpic"
                ripple
                large
                @click="ScrapeWeb"
              >
                <img
                  class="mb-5 "
                  src="../logo/american-eagle-outfitters.svg"
                  name="ae"
                  width="80"
                />
              </v-btn>
            </div>
            <div class="dropdown-item bg-transparent mt-3">
              <v-btn
                text
                @mouseenter="dimpic"
                @mouseleave="undimpic"
                ripple
                large
                @click="ScrapeWeb"
              >
                <img
                  class=""
                  src="../logo/Pull&Bear_logo.svg"
                  name="pullandbear"
                  width="100"
                />
              </v-btn>
            </div>
     
          </div>
        </li>
        <li class="nav-item dropdown">
          <v-btn
            color="#164e87"
            text
            class="nav-link dropdown-toggle"
            data-target="homeandapp"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
            >sports</v-btn
          >
          <div
            class="dropdown-menu"
            id="homeandapp"
            aria-labelledby="navbarDropdown"
          >
            <div class="dropdown-item bg-transparent">
              <v-btn
                text
                @mouseenter="dimpic"
                @mouseleave="undimpic"
                ripple
                large
                @click="ScrapeWeb"
              >
                <img
                  class="pl-2 pr-2"
                  style="mix-blend-mode: multiply;"
                  src="../logo/Adidas_Logo.svg"
                  width="100"
                  name="adidas"
                />
              </v-btn>
            </div>
            <div class="dropdown-item bg-transparent mt-3">
              <v-btn
                text
                @mouseenter="dimpic"
                @mouseleave="undimpic"
                ripple
                large
                @click="ScrapeWeb"
              >
                <img
                  class="pl-2 pr-2 pt-2"
                  src="../logo/nike.png"
                  name="nike"
                  width="100"
                />
              </v-btn>
            </div>
            <div class="dropdown-item bg-transparent mt-3">
              <v-btn
                text
                @mouseenter="dimpic"
                @mouseleave="undimpic"
                ripple
                large
                @click="ScrapeWeb"
              >
                <img
                  class="pl-2 pr-2"
                  src="../logo/puma.png"
                  name="puma"
                  width="100"
                />
              </v-btn>
            </div>
            <div class="dropdown-item bg-transparent mt-3">
              <v-btn
                text
                @mouseenter="dimpic"
                @mouseleave="undimpic"
                ripple
                large
                @click="ScrapeWeb"
              >
                <img
                  src="../logo/reebook.png"
                  class="pl-2 pr-2"
                  name="reebok"
                  width="100"
                />
              </v-btn>
            </div>
          </div>
        </li>
        <li class="nav-item dropdown">
          <v-btn
            color="#164e87"
            text
            class="nav-link dropdown-toggle"
            data-target="homeandapp"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
            >home appliances</v-btn
          >
          <div
            class="dropdown-menu "
            id="homeandapp"
            aria-labelledby="navbarDropdown"
          >
            <!-- <div class="dropdown-item bg-transparent">
              <v-btn
                text
                @mouseenter="dimpic"
                @mouseleave="undimpic"
                ripple
                large
                
                @click="ScrapeWeb"
                disabled
              >
                <img
                  class="pl-2 pr-2"
                  src="../logo/Elaraby-group-logo.png"
                  name="elarabygroup"
                  width="100"
                />
              </v-btn>
            </div> -->
            <div class="dropdown-item bg-transparent">
              <v-btn
                text
                @mouseenter="dimpic"
                @mouseleave="undimpic"
                ripple
                large
                @click="ScrapeWeb"
              >
                <img
                  class="pl-2 pr-2"
                  src="../logo/b-tech.png"
                  name="btech"
                  width="100"
                />
              </v-btn>
            </div>

            <div class="dropdown-item bg-transparent">
              <v-btn
                text
                @mouseenter="dimpic"
                @mouseleave="undimpic"
                ripple
                large
                @click="ScrapeWeb"
              >
                <img src="../logo/fresh.png" name="fresh" width="100" />
              </v-btn>
            </div>
          </div>
        </li>
        <li class="nav-item dropdown ">
          <v-btn
            color="#164e87"
            text
            class="nav-link dropdown-toggle"
            data-target="homeandapp"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
            >health & beauty</v-btn
          >
          <div
            class="dropdown-menu"
            id="homeandapp"
            aria-labelledby="navbarDropdown"
          >
            <div class="dropdown-item bg-transparent">
              <v-btn
                text
                @mouseenter="dimpic"
                @mouseleave="undimpic"
                ripple
                large
                @click="ScrapeWeb"
              >
                <img
                  class="pl-2 pr-2"
                  src="../logo/mazaya-png.png"
                  style="mix-blend-mode: multiply;"
                  width="100"
                  name="mazaya"
                />
              </v-btn>
            </div>
            <div class="dropdown-item bg-transparent mt-1">
              <v-btn
                color="#164e87"
                text
                class="dropdown-item"
                @mouseenter="dimpic"
                @mouseleave="undimpic"
                ripple
                large
                @click="ScrapeWeb"
              >
                <img
                  src="../logo/hude-beauty.png"
                  name="hudabeauty"
                  width="100"
                />
              </v-btn>
            </div>
            <div class="dropdown-item bg-transparent mt-1">
              <v-btn
                color="#164e87"
                text
                class="dropdown-item"
                @mouseenter="dimpic"
                @mouseleave="undimpic"
                ripple
                large
                @click="ScrapeWeb"
              >
                <img
                  class="pl-2 pr-2"
                  src="../logo/sephora.png"
                  name="sephora"
                  width="100"
                />
              </v-btn>
            </div>

            <div class="dropdown-item bg-transparent mt-1">
              <v-btn
                color="#164e87"
                text
                class="dropdown-item"
                @mouseenter="dimpic"
                @mouseleave="undimpic"
                ripple
                large
                @click="ScrapeWeb"
              >
                <img
                  src="../logo/Anastasia_Beverly_Hills_logo.png"
                  name="anastasia"
                  width="100"
                />
              </v-btn>
            </div>
          </div>
        </li>
        <li class="nav-item dropdown ">
          <v-btn
            color="#164e87"
            text
            class="nav-link dropdown-toggle"
            data-target="homeandapp"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
            >furniture</v-btn
          >
          <div
            class="dropdown-menu"
            id="homeandapp"
            aria-labelledby="navbarDropdown"
          >
            <div class="dropdown-item bg-transparent mt-1">
              <v-btn
                color="#164e87"
                text
                class="dropdown-item"
                @mouseenter="dimpic"
                @mouseleave="undimpic"
                ripple
                large
                @click="ScrapeWeb"
              >
                <img src="../logo/Ikea_logo.svg" width="100" name="ikea" />
              </v-btn>
            </div>
            <div class="dropdown-item bg-transparent mt-1">
              <v-btn
                text
                class="dropdown-item"
                @mouseenter="dimpic"
                @mouseleave="undimpic"
                ripple
                large
                @click="ScrapeWeb"
              >
                <img
                  class="pl-2 pr-2"
                  src="../logo/inout.png"
                  name="inandoutfurniture"
                  width="100"
                />
              </v-btn>
            </div>
          </div>
        </li>
        <li class="nav-item dropdown">
          <v-btn
            color="#164e87"
            text
            class="nav-link dropdown-toggle"
            data-target="homeandapp"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
            >watches and jewelry</v-btn
          >
          <div
            class="dropdown-menu"
            id="homeandapp"
            aria-labelledby="navbarDropdown"
          >
            <div class="dropdown-item bg-transparent">
              <v-btn
                text
                @mouseenter="dimpic"
                @mouseleave="undimpic"
                ripple
                large
                @click="ScrapeWeb"
              >
                <img
                  class="pl-2 pr-2"
                  src="../logo/gc.png"
                  style="mix-blend-mode: multiply;"
                  width="100"
                  name="gc"
                />
              </v-btn>
            </div>
            <!-- <div class="dropdown-item bg-transparent">
              <v-btn
                text
                @mouseenter="dimpic"
                @mouseleave="undimpic"
                ripple
                large
                
                @click="ScrapeWeb"
                disabled
                 style="background-color:gray"
              >
                <img
                  class="pl-2 pr-2"
                  src="../logo/D-Diamonds-Logo-JPEG.jpg"
                  style="background-color:gray"
                  width="100"
                  name="ddiamonds"
                />
              </v-btn>
            </div> -->
            <!-- <div class="dropdown-item bg-transparent mt-1">
              <v-btn
                text
                @mouseenter="dimpic"
                @mouseleave="undimpic"
                ripple
                large
                
                @click="ScrapeWeb"
              >
                <img src="../logo/i-watch.png" width="100" name="i-watch" />
              </v-btn>
            </div> -->
            <div class="dropdown-item bg-transparent mt-1">
              <v-btn
                color="#164e87"
                text
                @mouseenter="dimpic"
                @mouseleave="undimpic"
                ripple
                large
                @click="ScrapeWeb"
              >
                <img
                  class="pl-2 pr-2"
                  src="../logo/azzam_logo_tung.png"
                  name="azzam"
                  width="100"
                />
              </v-btn>
            </div>
          </div>
        </li>
        <li class="nav-item dropdown ">
          <v-btn
            color="#164e87"
            text
            class="nav-link dropdown-toggle"
            data-target="homeandapp"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
            >currency and metals</v-btn
          >
          <div
            class="dropdown-menu"
            id="homeandapp"
            aria-labelledby="navbarDropdown"
          >
            <div class="dropdown-item bg-transparent mt-3 ">
              <v-btn
                text
                @mouseenter="dimpic"
                @mouseleave="undimpic"
                ripple
                large
                @click="ScrapeWeb"
              >
                <img
                  src="../logo/currency.png"
                  width="80"
                  name="currency"
                  class="ml-3"
                />
              </v-btn>
            </div>
            <div class="dropdown-item bg-transparent mt-6">
              <v-btn
                text
                @mouseenter="dimpic"
                @mouseleave="undimpic"
                ripple
                large
                @click="ScrapeWeb"
              >
                <img src="../logo/gold.png" width="100" name="XAU" />
              </v-btn>
            </div>
            <div class="dropdown-item bg-transparent mt-1">
              <v-btn
                text
                @mouseenter="dimpic"
                @mouseleave="undimpic"
                ripple
                large
                @click="ScrapeWeb"
              >
                <img src="../logo/silver.png" width="100" name="XAG" />
              </v-btn>
            </div>
          </div>
        </li>
      </ul>
    </nav>

    <div>
      <router-view :key="$route.fullPath"></router-view>
    </div>
    <div class="fixed-bottom">
      <div class="d-flex justify-content-end mr-4 mb-5">
        <v-btn fab dark color="#164e87" x-large @click="chat = !chat">
          <v-icon color="white">
            mdi-facebook-messenger
          </v-icon>
        </v-btn>
        <div class="col-md-3 col-md-offset-3" :hidden="chat">
          <div class="card bg-info">
            <div
              class="panel-heading d-flex justify-content-start pt-1"
              style="background-color:#164e87;color:white"
            >
              <v-icon class="mr-2 pl-1  " color="white"
                >mdi-comment-outline</v-icon
              >
              Notify Chat
              <v-btn
                text=""
                class="ml-auto"
                color="#164e87"
                @click="chat = !chat"
              >
                <v-icon color="white">mdi-close</v-icon>
              </v-btn>
            </div>
            <div class="panel-body" style="background-color:white">
              <ul
                class="list-group list-group-flush text-right"
                v-for="(message, i) in messages"
                :key="i"
                v-chat-scroll
              >
                <li
                  class="list-group-item"
                  :id="message.type == 0 ? 'admin' : 'user'"
                >
                  <span :class="{ 'float-left': message.type == 1 }">
                    {{ message.message }}
                  </span>
                </li>
              </ul>
            </div>
            <div class="panel-footer">
              <span :hidden="typing">Admin is typing...</span>
              <div class="input-group">
                <input
                  id="Mensaje"
                  type="text"
                  v-model="textmsg"
                  class="form-control input-sm"
                  placeholder="Send a Message..."
                />
                <span class="input-group-btn">
                  <v-btn color="#164e87" style="color:white" @click="sendmsg">
                    Send
                  </v-btn>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <v-card
        flat
        tile
        class="lighten-1 white--text text-center hidden-md-and-down"
        color="#0063B2FF"
      >
        <v-card-text class="white--text pt-5 pb-0 ">
          This website aims specifically at allowing users to be notified when a
          current item on a specific website has a price reduction <br />thus
          allowing the users to purchase the item at the specific price he
          wants.
        </v-card-text>

        <v-card-text class="white--text ml-5 pb-2 pt-2">
          {{ new Date().getFullYear() }} — <strong>Notify</strong>

          <v-btn
            v-for="(icon,i) in icons"
            :key="i"
            class="mx-4 white--text ml-0 "
            icon
            :href="icon.src"
          >
            <v-icon size="24px">{{ icon.name }}</v-icon>
          </v-btn>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>
<script>
import _ from "lodash";
import websites from "../websites";
import api from "../api";
import getalltrackings from "../getalltrackings";
export default {
  data() {
    return {
      country: "",
      website: null,
      websitebySearch: null,
      websitesbySearch: [],
      icons: [{name:"mdi-facebook" ,src:'https://www.facebook.com/Notify-104494634643627/?modal=admin_todo_tour'}, {name:"mdi-instagram",src:'https://www.instagram.com/Notifyy2020/?fbclid=IwAR3tqK41kQHSscDmn6gp2JBxemtG_4qAAxAG-jiwj9dIVSN06iil0LcyNqg'}],
      productsBeingTracked: [],
      chat: true,
      textmsg: null,
      typing: true,
      ifgoogle:false,
      messages: [
        {
          message:
            " Welcome to Notify Chat, Our Customer Support Will be With you Shortly...",
          type: 0,
        },
      ],
    };
  },
  sockets: {
    removeItem: function(data) {
      this.$store.state.ProductsTracked = this.$store.state.ProductsTracked.filter(
        (p) => p.product_name != data.product_name
      );
    },
    message: function(data) {
      this.typing = true;
     let audio=new Audio(require('../assets/that-was-quick.mp3'));
     audio.play();
      this.messages.push(data);
    },
    failed: function() {
      this.messages.pop();
      this.$toasted.error("Notify Admin is Currently Offline");
    },
    AdminTyping: function() {
      this.typing = false;
    },
  },
  methods: {
    scrollToEnd() {
      let container = document.querySelector(".panel-body");
      let scrollHeight = container.scrollHeight;
      container.scrollTop = scrollHeight;
    },
    sendmsg() {
      if (this.textmsg) {
        let obj = {
          email: this.$store.getters.userEmail,
          message: this.textmsg,
          type: 1,
        };
        this.$socket.emit("chat-message", obj);
        this.messages.push(obj);
        this.textmsg = null;
      }
    },
    OpenFeature() {
      this.$fire({
        title:
          '<strong style="color:white">What features do we offer?</strong>',
        width: 900,
        background: "#164e87",
        html: `<div style="color:white;"class="ml-3" >
    <ul>
    <li class="mt-3 text-sm-left" >Tracking products has never been easier, with just a link of the product you can track its price.</li>
    <li class="mt-3 text-sm-left" >Abillity to track other items such as precious metals and currencies of all sort.</li>
    <li class="mt-3 text-sm-left" >Instant Email when price of chosen item drops.</li>
    <li class="mt-3 text-sm-left" >Abillity to cancel any order being tracked from the bell icon top right of your screen.</li>
    <li class="mt-3 text-sm-left">Want more features? Please let us know.</li>
    </ul>
    </div>
   `,
        showCancelButton: true,
        focusConfirm: false,
      });
    },
    checkForNotifs() {
      api
        .Notifications(this.$store.getters.userEmail)
        .then((res) => {
          if (res) {
            this.$store.state.Notifications = [];
            this.$store.state.Notifications = res.data;
          }
        })
        .catch((err) => {
          this.$store.state.Notifications = err.response.data;
        });
    },
    getImage(logo) {
      return require("../logo/" + logo);
    },
    SearchforInput() {
      this.websitesbySearch = _.filter(websites, (val) =>
        _.includes(
          val.website_name?.toLowerCase(),
          this.websitebySearch?.toLowerCase()
        )
      );
    },
    stopTracking(pid, pname) {
      this.$confirm(`Are you sure you want to stop tracking ${pname}?`).then(
        () => {
          this.$loading(true);
          api
            .stopTrackingProduct(pid)
            .then(() => {
              this.$store.state.ProductsTracked = _.filter(
                this.$store.state.ProductsTracked,
                (product) => product._id != pid
              );

              this.$loading(false);
              this.$alert(
                `Successfully stopped tracking ${pname}`,
                "Success",
                "success"
              );
            })
            .catch(() => {});
        }
      );
    },
    ScrapeWeb(e) {
      if (e.target.tagName === "BUTTON") {
        this.website = e.target.querySelector("img");
      } else {
        this.website = e.target;
      }

      if (this.website.name == "currency") {
        this.$router.push({ name: "currency" }).catch((error) => {
          if (error.name != "NavigationDuplicated") {
            throw error;
          }
        });
      } else if (this.website.name == "XAU" || this.website.name == "XAG") {
        this.$store.commit("assignmetalpic", this.website.src);
        this.$store.commit("assignmetalname",this.website.name);
        this.$router.push({ name: "metals" }).catch((error) => {
          if (error.name != "NavigationDuplicated") {
            throw error;
          }
        });
      } else {
        let info = {
          websitename: this.website.name,
          websitesrc: this.website.src,
        };
        this.$store.commit("assignwebsite", info);
        this.$router.push({ name: "main" }).catch((error) => {
          if (error.name != "NavigationDuplicated") {
            throw error;
          }
        });
      }
    },

    dimpic(e) {
      e.target.style.opacity = 0.5;
    },
    undimpic(e) {
      e.target.style.opacity = 1;
    },
    file(e) {
      let frm = new FormData();
      frm.append("profile_picture", e.target.files[0], e.target.files[0].name);
      frm.append("email", this.$store.getters.userEmail);
      this.$loading(true);
      api
        .changepicture(frm)
        .then((res) => {
          this.$loading(false);
          this.$store.commit("assignpicture", res.data);
          this.$alert("Profile Picture has been changed", null, "success");
        })
        .catch(() => {});
    },
    morefeatures() {
      this.$router.push({ name: "morefeatures" });
    },
    logout() {
      this.$confirm("Are you sure you want to logout?").then(() => {
        this.$loading(true);
        this.$socket.emit("logout", { email: this.$store.getters.userEmail });
        api
          .deletetoken()
          .then(() => {
            this.$loading(false);
            this.$router.push("/");
            localStorage.removeItem("user-info");
          })
          .catch(() => {
            this.$loading(false);
            this.$router.push("/");
            localStorage.removeItem("user-info");
          });
      });
    },
    changepw() {
      this.$fire({
        title: "Enter the information below",
        html:
          '<input id="oldpw" type="password" class="swal2-input" placeholder="Old Password">' +
          '<input id="password" type="password" class="swal2-input" placeholder="New Password">' +
          '<input id="confirmpassword" type="password" class="swal2-input" placeholder="Confirm Password">',
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: "Change",
        preConfirm: () => {
          return [
            document.getElementById("oldpw").value,
            document.getElementById("password").value,
            document.getElementById("confirmpassword").value,
          ];
        },
      }).then((results) => {
        if (results.value) {
          const oldpw = results.value[0];
          const password = results.value[1];
          const confirmpassword = results.value[2];
          if (oldpw.length == 0)
            return this.$alert(
              "Please enter your old password",
              "Error",
              "error"
            );
          if (password != confirmpassword)
            return this.$alert("Passwords don't match", "Error", "error");
          if (password.length < 5)
            return this.$alert(
              "Password must be at least 5 characters",
              "Error",
              "error"
            );
          if (/^(?=.*?[A-Z])(?=.*?[a-z])/.test(password) == false)
            return this.$alert(
              "Password must have at least one upper case and one lower case letters.",
              "Error",
              "error"
            );
          this.$loading(true);
          let user = {
            oldpw: oldpw,
            email: this.$store.getters.userEmail,
            password: password,
          };
          api
            .userChangesPw(user)
            .then((res) => {
              this.$loading(false);
              this.$alert(
                `${res.data}, Log in to continue`,
                "Success",
                "success"
              );
              api.deletetoken().then(() => {
                localStorage.removeItem("user-info");
                this.$router.push("/");
              });
            })
            .catch((err) => {
              this.$loading(false);
              this.$alert(err.response.data, "Error", "error");
            });
        }
      });
    },
    changepicture() {
      this.$refs.file.click();
    },
  },
  created() {
   
   if(this.$store.state.user.googleID && !this.$store.state.user.password){
     this.ifgoogle=true;
   }
    api
      .getlocation()
      .then((res) => {
        this.country = res.data.countryCode;
      })
      .catch((err) => {
        console.error(err);
      });

    this.$socket.emit("email", {
      email: this.$store.getters.userEmail,
    });
    getalltrackings(this.$store.getters.userEmail).then((arr) => {
      this.$store.state.ProductsTracked = arr;
    });
  },
  mounted() {
    this.scrollToEnd();
  },
  updated() {
    this.scrollToEnd();
  },
};
</script>
<style scoped>
.nav-link {
  outline: none;
}
.navbar{
  height: 2px;
}
@media (max-width: 750px) {
  .nav-item {
    display: block;
  }
 
}
@media(max-width: 1200px)
{
 #name {
   position:absolute;
    top: 25px;
    right: 50px;
    font-family: "Courier New", Courier, monospace;
    z-index: 100;
  }
 #bell{
   position: absolute;
   left: 0px;
   top: 140px;
 }
}
#admin {
  display: inline-block;
  clear: both;
  padding: 20px;
  border-radius: 30px;
  margin-bottom: 2px;
  margin-top: 7px;
  font-family: Helvetica, Arial, sans-serif;
  background: #eee;
}
#user {
  display: inline-block;
  clear: both;
  padding: 20px;
  border-radius: 30px;
  margin-bottom: 2px;
  margin-top: 7px;
  font-family: Helvetica, Arial, sans-serif;
  background: #0084ff;
  color: #fff;
}

ul {
  list-style-type: none;
}
.dropdown:hover .dropdown-menu {
  display: block;
}
.dropdown-menu {
  display: none;
  position: absolute;
  background-color: #f1f1f1;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}
.chat {
  list-style: none;
  margin: 0;
  padding: 0;
}

.chat li {
  margin-bottom: 10px;
  padding-bottom: 5px;
  border-bottom: 1px dotted #b3a9a9;
}

.chat li.left .chat-body {
  margin-left: 60px;
}

.chat li.right .chat-body {
  margin-right: 60px;
}

.chat li .chat-body p {
  margin: 0;
  color: #777777;
}

.panel .slidedown .glyphicon,
.chat .glyphicon {
  margin-right: 5px;
}

.panel-body {
  overflow-y: scroll;
  height: 500px;
}

::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #f5f5f5;
}

::-webkit-scrollbar {
  width: 12px;
  background-color: #f5f5f5;
}

::-webkit-scrollbar-thumb {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #555;
}
</style>
