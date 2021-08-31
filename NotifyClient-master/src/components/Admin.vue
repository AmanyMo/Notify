<template>
  <div id="app">
    <!-- navbar -->
    <div>
      <nav
        class="navbar navbar-expand-sm navbar-dark "
        style="background-color: #164e87;"
      >
        <a class="navbar-brand">
          <img
            class
            height="90px"
            alt="Notify logo"
            src="../logo/whitelogo.png"
          />
        </a>
        <a class="navbar-brand" href="#">NOTIFY Admin Mode</a>

        <ul class="navbar-nav ml-auto">
          <div class="topbar-divider d-none d-sm-block"></div>

          <!-- Nav Item - User Information -->
          <li class="nav-item dropdown no-arrow">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="userDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <span class="mr-2 d-none d-lg-inline text-gray-600 small">{{
                this.$store.getters.userName
              }}</span>
              <img
                class="img-profile rounded-circle"
                :src="this.$store.getters.userImage"
                style="width:40px"
              />
            </a>
            <!-- Dropdown - User Information -->
            <div
              class="dropdown-menu dropdown-menu-right shadow animated--grow-in"
              aria-labelledby="userDropdown"
            >
              <a
                class="dropdown-item"
                @click="logout"
                data-toggle="modal"
                data-target="#logoutModal"
              >
                <i
                  class="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"
                ></i>
                Logout
              </a>
            </div>
          </li>
        </ul>
        <!-- Navbar-->
      </nav>
    </div>
    <div class="col-sm-4 d-flex justify-content-center">
      <v-text-field
        label="Broadcast a Message"
        hide-details="auto"
        v-model="broadcast"
      ></v-text-field>
      <v-btn fab color="blue" class="ml-5" @click="broadmsg">
        <v-icon color="white">mdi-access-point</v-icon>
      </v-btn>
    </div>

    <div class="row d-flex justify-content-center mt-5">
      <div class="col-sm-6 col-lg-3 col-12">
        <div
          class="v-card--material pa-3 v-card--material-stats v-card v-sheet theme--light v-card--material--has-heading"
        >
          <div class="d-flex grow flex-wrap">
            <div
              class="text-start v-card--material__heading mb-n6 v-sheet theme--dark elevation-6 info pa-7"
              style="max-height: 90px; width: auto;"
            >
              <v-icon x-large color="white">mdi-human-greeting</v-icon>
            </div>
            <div class="ml-6">
              <div class="ml-auto text-right">
                <div class="body-3 grey--text font-weight-light">
                  Number of Registered Users
                </div>
                <h3 class="display-2 font-weight-light text--primary">
                  {{ parseFloat(this.allusers) - 1 }} <small></small>
                </h3>
              </div>
            </div>
          </div>
          <div class="px-0 col col-12">
            <hr
              role="separator"
              aria-orientation="horizontal"
              class="v-divider theme--light"
            />
          </div>
          <i
            aria-hidden="true"
            class="v-icon notranslate ml-2 mr-1 mdi mdi-clock theme--light"
            style="font-size: 16px;"
          ></i
          ><span class="caption grey--text font-weight-light">Just Updated</span
          ><!---->
        </div>
      </div>
      <div class="col-sm-6 col-lg-3 col-12">
        <div
          class="v-card--material pa-3 v-card--material-stats v-card v-sheet theme--light v-card--material--has-heading"
        >
          <div class="d-flex grow flex-wrap">
            <div
              class="text-start v-card--material__heading mb-n6 v-sheet theme--dark elevation-6 primary pa-7"
              style="max-height: 90px; width: auto;"
            >
              <i
                aria-hidden="true"
                class="v-icon notranslate mdi mdi-poll theme--dark"
                style="font-size: 32px;"
              ></i
              ><!---->
            </div>
            <div class="ml-6">
              <div class="ml-auto text-right">
                <div class="body-3 grey--text font-weight-light">
                  Current Users Online
                </div>
                <h3 class="display-2 font-weight-light text--primary">
                  {{ this.users }}<small></small>
                </h3>
              </div>
            </div>
          </div>
          <div class="px-0 col col-12">
            <hr
              role="separator"
              aria-orientation="horizontal"
              class="v-divider theme--light"
            />
          </div>
          <i
            aria-hidden="true"
            class="v-icon notranslate ml-2 mr-1 mdi mdi-tag theme--light"
            style="font-size: 16px;"
          ></i
          ><span class="caption grey--text font-weight-light"
            >Tracked from Our Live Server </span
          ><!---->
        </div>
      </div>
      <div class="col-sm-6 col-lg-3 col-12">
        <div
          class="v-card--material pa-3 v-card--material-stats v-card v-sheet theme--light v-card--material--has-heading"
        >
          <div class="d-flex grow flex-wrap">
            <div
              class="text-start v-card--material__heading mb-n6 v-sheet theme--dark elevation-6 orange pa-7"
              style="max-height: 90px; width: auto;"
            >
              <v-icon color="white" x-large>mdi-sitemap</v-icon>
            </div>
            <div class="ml-6">
              <div class="ml-auto text-right">
                <div class="body-3 grey--text font-weight-light">
                  Current Number of Tracked Items
                </div>
                <h3 class="display-2 font-weight-light text--primary">
                  {{ this.alltracks }} <small></small>
                </h3>
              </div>
            </div>
          </div>
          <div class="px-0 col col-12">
            <hr
              role="separator"
              aria-orientation="horizontal"
              class="v-divider theme--light"
            />
          </div>
          <i
            aria-hidden="true"
            class="v-icon notranslate ml-2 mr-1 mdi mdi-alert theme--light red--text"
            style="font-size: 16px;"
          ></i
          ><span class="caption grey--text font-weight-light"
            >Get More Space...</span
          ><!---->
        </div>
      </div>
    </div>
    <div class="row d-flex justify-content-center">
      <div class="col-sm-6 col-lg-3 col-12" :hidden="buttonhide">
        <div
          class="v-card--material pa-3 v-card--material-stats v-card v-sheet theme--light v-card--material--has-heading"
        >
          <div class="d-flex grow flex-wrap">
            <div
              class="text-start v-card--material__heading mb-n6 v-sheet  elevation-6 bg-success pa-7"
              style="max-height: 90px; width: auto;"
            >
              <v-icon x-large color="white">mdi-message-alert</v-icon>
            </div>
            <div class="ml-6">
              <div class="ml-auto text-right">
                <div class="body-3 grey--text font-weight-light">
                  Feedback Reported
                </div>
                <h3 class="display-2 font-weight-light text--primary">
                  {{ feedbacks.length }}<small></small>
                </h3>
              </div>
            </div>
          </div>
          <div class="px-0 col col-12">
            <hr
              role="separator"
              aria-orientation="horizontal"
              class="v-divider theme--light"
            />
          </div>
          <i
            aria-hidden="true"
            class="v-icon notranslate ml-2 mr-1 mdi mdi-tag theme--dark"
            style="font-size: 16px;"
          ></i
          ><v-btn
            fab
            color="white"
            text
            @click="
              hidden = !hidden;
              buttonhide = !buttonhide;
            "
          >
            <v-icon color="#164e87">mdi-dots-horizontal</v-icon>
          </v-btn>
        </div>
      </div>
    </div>
    <div :hidden="hidden">
      <v-btn
        fab
        color="red"
        @click="
          hidden = !hidden;
          buttonhide = !buttonhide;
        "
      >
        <v-icon color="white">mdi-close</v-icon>
      </v-btn>
      <v-sheet class="mx-auto" elevation="8" max-width="900">
        <v-slide-group
          v-model="model"
          class="pa-4"
          :prev-icon="prevIcon ? 'mdi-minus' : undefined"
          :next-icon="nextIcon ? 'mdi-plus' : undefined"
          :multiple="multiple"
          :mandatory="mandatory"
          :show-arrows="showArrows"
          :center-active="centerActive"
        >
          <v-slide-item
            v-for="(n, i) in feedbacks"
            :key="i"
            v-slot:default="{ active, toggle }"
          >
            <div
              class="card m-3 border-info "
              @click="toggle"
              style="width:250px"
            >
              <div class="card-body">
                <h5 class="card-title">{{ n.userName }}</h5>
                <h6 class="card-subtitle mb-2 text-muted">{{ n.userEmail }}</h6>
                <div class="card-text" style="white-space: pre-line;">
                  {{ n.feedback }}
                </div>
                <v-rating
                  :value="n.rating"
                  color="yellow darken-3"
                  background-color="grey darken-1"
                  empty-icon="$ratingFull"
                  readonly
                  class="text-right ml-5"
                  style="display:inline-block"
                ></v-rating>
                <v-row class="fill-height" align="center" justify="center">
                  <v-scale-transition>
                    <v-icon
                      v-if="active"
                      size="48"
                      v-text="'mdi-close-circle-outline'"
                    ></v-icon>
                  </v-scale-transition>
                </v-row>
              </div>
            </div>
          </v-slide-item>
        </v-slide-group>
      </v-sheet>
    </div>

    <div class="d-flex justify-content-end mr-4 mb-5">
      <div v-for="(chat, i) in allChats" :key="i">
        <ul>
          <li>
            <v-btn
              v-bind:class="{ white: chat.clicked, red: !chat.clicked }"
              @click="
                chat.clicked = !chat.clicked;
                chat.showChat = !chat.showChat;
              "
              >{{ chat.chat }}</v-btn
            >
          </li>
        </ul>
        <div class="mr-2" :hidden="chat.showChat">
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
                @click="chat.showChat = !chat.showChat"
              >
                <v-icon color="white">mdi-close</v-icon>
              </v-btn>
            </div>
            <div class="panel-body" ref="panel" style="background-color:white">
              <ul
                class="list-group list-group-flush text-right"
                v-for="(msg, i) in uniqueChat(chat.chat)"
                :key="i"
              >
                <li
                  class="list-group-item"
                  :id="msg.type == 1 ? 'admin' : 'user'"
                >
                  <span :class="{ 'float-left': msg.type == 1 }">
                    {{ msg.message }}
                  </span>
                </li>
              </ul>
            </div>
            <div class="panel-footer">
              <div class="input-group">
                <input
                  id="Mensaje"
                  type="text"
                  v-model="chat.message"
                  class="form-control input-sm"
                  placeholder="Send a Message..."
                  @input="typing(chat.chat)"
                  ref="input"
                />
                <span class="input-group-btn">
                  <v-btn
                    color="#164e87"
                    style="color:white"
                    @click="sendmsg(chat.chat, chat.message)"
                  >
                    Send
                  </v-btn>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- footer -->
</template>

<script>
import api from "../api";

export default {
  data() {
    return {
      model: null,
      multiple: false,
      mandatory: false,
      showArrows: true,
      prevIcon: false,
      nextIcon: false,
      centerActive: false,
      allusers: 0,
      alltracks: 0,
      hidden: true,
      buttonhide: false,
      users: 0,
      broadcast: null,
      chatt: true,
      allMsgs: [],
      allChatters: [],
      filtermsgCount: {},
      clicked: false,
      allChats: [],
      textmsg: null,
      feedbacks: [],
    };
  },
  sockets: {
    TrackLess: function() {
      this.alltracks--;
    },
    newItem: function() {
      this.alltracks++;
    },
    newUser: function() {
      this.allusers++;
    },
    newFeedback: function(data) {
      this.$toasted.info(`New Feedback from ${data.userName}`);
      this.feedbacks.push(data);
      let audio = new Audio(require("../assets/deduction.mp3"));
      audio.play();
    },
    usercount: function(data) {
      this.users = data.usercount;
    },
    failed: function() {
      this.allMsgs.pop();
      this.$toasted.error("User is Currently Offline");
    },
    chatadmin: function(data) {
      let notif = new Audio(require("../assets/that-was-quick.mp3"));

      notif.play();
      this.allMsgs.push(data);
      this.filtermsgCount[data.email] = this.getOccurrence(
        this.allMsgs,
        data.email
      );
      this.allChatters = Object.keys(this.filtermsgCount);
      this.allChats = [];
      this.allChatters.map((chatter) => {
        let obj = {
          chat: chatter,
          clicked: false,
          showChat: false,
          message: null,
        };
        this.allChats.push(obj);
      });
    },
  },

  methods: {
    scrollToEnd() {
      let container = document.querySelectorAll(".panel-body");
      if (container.length > 0) {
        container.forEach((con) => {
          let scrollHeight = con.scrollHeight;
          con.scrollTop = scrollHeight;
        });
      }
    },
    typing(email) {
      this.$socket.emit("typing", { email: email });
    },
    sendmsg(email, mess) {
      if (mess) {
        let obj = {
          email: email,
          message: mess,
          type: 0,
        };
        this.$socket.emit("messageAdmin", obj);
        this.allMsgs.push(obj);
    
     
      }
    },
    getOccurrence(array, value) {
      return array.filter((v) => v.email === value).length;
    },
    broadmsg() {
      if (this.broadcast) {
        this.$socket.emit("global", { msg: this.broadcast });
        this.$toasted.success("Broadcasted Message Succesfully!");
        this.broadcast = null;
        let audio = new Audio(require("../assets/deduction.mp3"));
        audio.play();
      }
    },
    logout() {
      this.$confirm("Are you sure you want to logout?").then(() => {
        this.$loading(true);
        api
          .deletetoken()
          .then(() => {
            this.$socket.emit("adminlogout", {
              email: this.$store.getters.userEmail,
            });
            this.$loading(false);
            this.$router.push("/");
            localStorage.removeItem("user-info");
          })
          .catch(() => {
            this.$socket.emit("adminlogout", {
              email: this.$store.getters.userEmail,
            });
            this.$loading(false);
            this.$router.push("/");
            localStorage.removeItem("user-info");
          });
      });
    },
    async getdata() {
      let users = await api.getallusers();
      let tracks = await api.getalltracks();
      this.allusers = users.data;
      this.alltracks = tracks.data;
    },

    ok: function() {
      // send ok to client and remove it from the page
      this.$alert("i have been read it , thanks for your suggestions :)");
    },
    reply: function() {
      //reply then remove it to show the new msg
      this.$prompt("REPLY..").then(() => {
        //do something...
        console.log("*a*a*a*a*a*");
      });
    },
    uniqueChat: function(email) {
      return this.allMsgs.filter((msg) => msg.email == email);
    },
  },
  created() {
    api.getFeatures().then((res) => {
      this.feedbacks = res.data;
    });
    this.getdata();
    this.$socket.emit("admin", {
      email: this.$store.getters.userEmail,
    });
    this.$socket.emit("getusers");
  },
  mounted() {
    this.scrollToEnd();
  },
  updated() {
    this.scrollToEnd();
  },
};
</script>

<style>
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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
.navbar {
  min-height: 80px;
}
.navbar-nav .nav-link {
  margin-right: 20px;
  margin-left: 100px;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
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
