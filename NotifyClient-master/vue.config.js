const path=require('path')
module.exports = {
  outputDir:path.resolve(__dirname,'../server/public'),
  devServer: {
    proxy: {
      "^/account/*": {
        target: "http://localhost:5000",
      },
      "^/user_images": {
        target: "http://localhost:5000",
      },
      "/home/user_images": {
        target: "http://localhost:5000",
        pathRewrite: {
          "/home/user_images": "/user_images",
        },
      },
      "^/find/getall":{
        target: "http://localhost:5000"
      },
      "^/find/getallcurr":{
        target: "http://localhost:5000"
      },
      "^/find/getallmetals":{
        target: "http://localhost:5000"
      },
      "^/check-token": {
        target: "http://localhost:5000",
      },
      "/home/check-token": {
        target: "http://localhost:5000",
        pathRewrite: {
          "/home/check-token": "/check-token",
        },
      },
      "^/delete-token": {
        target: "http://localhost:5000",
      },
      "^/find/delete":{
        target: "http://localhost:5000",
      },
      "^/find/getmessages":{
        target: "http://localhost:5000",
      },
      "^/find/website":{
        target: "http://localhost:5000",
      },
      "/home/delete-token": {
        target: "http://localhost:5000",
        pathRewrite: {
          "/home/delete-token": "/delete-token",
        },
      },
      
      "/home/administrator/morefeatures":{
        target:"http://localhost:5000",
        pathRewrite:{
          "/home/administrator/morefeatures":"/administrator/morefeatures"
        },
      },
      "^/administrator/*": {
        target: "http://localhost:5000",
      },
      "/home/account/picture": {
        target: "http://localhost:5000",
        pathRewrite: {
          "/home/account/picture": "/account/picture",
        },
      },
      "/home/account/changed-pass": {
        target: "http://localhost:5000",
        pathRewrite: {
          "/home/account/changed-pass": "/account/changed-pass",
        },
      },
      
      "/home/find/schedule": {
        target: "http://localhost:5000",
        pathRewrite: {
          "/home/find/schedule": "/find/schedule",
        },
      },
      "/home/find/schedule-currency": {
        target: "http://localhost:5000",
        pathRewrite: {
          "/home/find/schedule-currency": "/find/schedule-currency",
        },
      },
      "/home/find/schedule-metals": {
        target: "http://localhost:5000",
        pathRewrite: {
          "/home/find/schedule-metals": "/find/schedule-metals",
        },
      },
      "home/find/currency": {
        target: "http://localhost:5000",
        pathRewrite: {
          "/home/find/currency": "/find/currency",
        },
      },
      "home/find/metals": {
        target: "http://localhost:5000",
        pathRewrite: {
          "/home/find/metals": "/find/metals",
        },
      },
      "/home/find": {
        target: "http://localhost:5000",
        pathRewrite: {
          "/home/find": "/find",
        },
      },
    },
  },
  transpileDependencies: ["vuetify"],
};
