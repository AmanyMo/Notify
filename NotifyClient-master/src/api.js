import axios from "axios";
// const URL = "http://localhost:5000";
axios.interceptors.request.use(
  function(config) {
    if (config.url == "http://ip-api.com/json") return config;
    config.withCredentials = true;
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

export default {
  getlocation() {
    return axios.get("http://ip-api.com/json");
  },
  register(user) {
    return axios.post(`account/register`, user);
  },
  login(user) {
    return axios.post(`account/login`, user);
  },
  checktoken() {
    return axios.get(`check-token`);
  },
  deletetoken() {
    return axios.get(`delete-token`);
  },
  changepicture(picture) {
    return axios.post(`account/picture`, picture);
  },
  changepassword(email) {
    return axios.put(`account/change-pw?email=${email}`, null);
  },
  userChangesPw(user) {
    return axios.post("account/changed-pass", user);
  },
  scrapeweb(info) {
    return axios.post("find", info);
  },
  scheduleTask(info){
    return axios.post("find/schedule",info)
  },
  scheduleCurrency(info){
    return axios.post("find/schedule-currency",info)
  },
  scheduleMetals(info){
    return axios.post("find/schedule-metals",info)
  },
  getProductTracks(email){
    return axios.get(`find/getall/${email}`);
  },
  getCurrencyTracks(email){
    return axios.get(`find/getallcurr/${email}`);
  },
  getMetalTracks(email){
    return axios.get(`find/getallmetals/${email}`);
  },
  stopTrackingProduct(pid){
    return axios.delete(`find/delete/${pid}`);
  },
  searchforWebsite(websitebySearch)
  {
    return axios.get(`find/website/${websitebySearch}`);
  },
  CurrencyQuery(Have,Want){
    return axios.post(`find/currency?Have=${Have}&Want=${Want}`);
  },
  MetalsQuery(info){
    return axios.post('find/metals',info);
  },
  Notifications(email){
    return axios.get(`find/getmessages/${email}`);
  },
  getallusers(){
    return axios.get('administrator/users');
  },
  getalltracks(){
    return axios.get('administrator/items');
  },
  MoreFeatures(msg,rating,email,name){
    return axios.post(`administrator/morefeatures?msg=${msg}&rating=${rating}&email=${email}&name=${name}`);
  },
  getFeatures(){
    return axios.get('administrator/getfeatures')
  },
  googleLogin(){
    return axios.get('account/google');
  }
};
