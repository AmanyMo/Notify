import api from "../src/api";
import store from "./vuex";
async function getalltrackings() {
  let currencyarray = new Array();
  let metalarray = new Array();
  const allProducts = await api.getProductTracks(store.getters.userEmail);
  const allCurrencies = await api.getCurrencyTracks(store.getters.userEmail);
  const allMetals = await api.getMetalTracks(store.getters.userEmail);
 
  Array.from(allCurrencies.data).forEach((curr) => {
    let obj = {
      ...curr,
      product_name: `${curr.from_currency}-->${curr.to_currency}`,
      product_image: require("./logo/" + "currency.png"),

    };
    currencyarray.push(obj);
  });

  Array.from(allMetals.data).forEach((met) => {
    let mtype = met.metal_type;
    let img;
    if (mtype == "Gold") {
      img = require("./logo/" + "gold.png");
    } else {
      img = require("./logo/" + "silver.png");
    }
    let obj = {
      ...met,
      product_name: `${met.metal_type} Track 1 ${met.weight} in ${met.currency}`,
      product_image: img,
    };
    metalarray.push(obj);
  });
  let arr=new Array()
  arr.push(...Array.from(allProducts.data));
  arr.push(...currencyarray);
  arr.push(...metalarray);

  return arr;
}

export default getalltrackings;
