$(document).ready(function(){

  $.ajax({
    url: 'https://pacific-gorge-8441.herokuapp.com/api/items'
  }).then(function(resp){
    console.log(resp);
  });

  sendAuthentication = function (xhr) {
  var user = "nick";// your actual username
  var pass = "123";// your actual password
  var token = user.concat(":", pass);
  xhr.setRequestHeader('Authorization', ("Basic ".concat(btoa(token))));
}


  var Router = Backbone.Router.extend({
    initialize: function() {
      Backbone.history.start({pushState: true});
    },
    routes: {
      "item/:id": "item",
      "add": "add",
      "": "index"
    }
  });

  var router = new Router();


  var itemContainer = Backbone.Model.extend({
    initialize: function(){
    },
    defaults: {
      item_url: null,
      image_url: null,
      title: null,
      description: null,
      price: null,
      wishList: null
    },
    Model: itemContainer,
    url: 'https://pacific-gorge-8441.herokuapp.com/api/items/'
  });

  var itemContainers = Backbone.Collection.extend({
     Model: itemContainer
   });

    var itemCollection = new itemContainer();
      itemCollection.fetch ({
      success: function(resp) {
        var dataObj = {"data": resp.toJSON().results};
        console.log(dataObj);
        var itemTemplate = $("#itemTemplate").text();
        var itemHTML = Mustache.render(itemTemplate, dataObj);
        $("#itemContainer").html(itemHTML);
        console.log("success", resp);
      },
      error: function(err) {
        console.log("nope", err);
      }
    });
    $("#addButton").on('click', function() {
      var itemAdd = new itemContainer();
      itemAdd.set ({
        item_url: $("#addItem").val(),
        image_url: $("#addImage").val(),
        title: $("#addTitle").val(),
        description: $("#addDescription").val(),
        price: $("#addPrice").val(),
        wish_list: $("#addWishList").val()
      });

      itemAdd.save (null, {
        url: 'https://pacific-gorge-8441.herokuapp.com/api/items/',
        success: function(resp) {
          console.log("success", resp);
        },
        error: function(err) {
          console.log("nope", err);
        }
      });
      $("#addItem").val("");
      $("#addImage").val("");
      $("#addTitle").val("");
      $("#addDescription").val("");
      $("#addPrice").val("");
      $("#addWishList").val("");
    });

  var pledgeContainer = Backbone.Model.extend({
    initialize: function(){
    },
    defaults: {
      item: null,
      pledge_amount: null,
      user: null
    },
    Model: pledgeContainer,
    url: 'https://pacific-gorge-8441.herokuapp.com/api/pledges/'
  });

  var pledgeContainers = Backbone.Collection.extend({
    Model: pledgeContainer
  });

  var pledgeCollection = new pledgeContainer();

  pledgeCollection.fetch ({
    success: function(resp) {
      console.log("success", resp);
    },
    error: function(err) {
      console.log("nope", err);
    }
  });

  // pledgeCollection.set ({
  //   beforeSend: sendAuthentication,
  //   item: $("#addPledgeItem").val(),
  //   pledge_amount: $("#addPledgeAmount").val(),
  //   user: $("#addUser").val()
  // })
  //   $("#addPledgeItem").val("");
  //   $("#addPledgeAmount").val("");
  //   $("#addUser").val("");

  // pledgeCollection.save(null, {
  //   success: function(resp) {
  //     console.log("success", resp)
  //   },
  //   error: function(err) {
  //     console.log("nope", err)
  //   }
  // });

  var wishContainer = Backbone.Model.extend({
    initialize: function(){
    },
    defaults: {
      item: null,
      expiration_date: null,
      list_url: null,
      url: null
    },
    Model: wishContainer,
    url: 'https://pacific-gorge-8441.herokuapp.com/api/wishlists/'
  });

  var wishContianers = Backbone.Collection.extend({
    Model: wishContainer
  });


    var wishCollection = new wishContainer();
    wishCollection.fetch ({
      success: function(resp){
        var data2obj = {"data": resp.toJSON()};
        console.log(data2obj);
        var wishTemplate = $("#wishTemplate").text();
        var wishHTML = Mustache.render(wishTemplate, data2obj);
        console.log("success", resp);
      },
      error: function(err){
        console.log("nope", err);
      }
    });

    wishCollection.set ({
      item: $("#addWishItem").val(),
      expiration_date: $("#addExpirationDate").val(),
      list_url: $("#addListUrl").val(),
      url: $("#addWishUrl").val()
    })
     $("#addWishItem").val("");
      $("#addExpirationDate").val("");
      $("#addListUrl").val("");
      $("#addWishUrl").val("");

    wishCollection.save (null, {
     succes: function(resp) {
      console.log("succes", resp);
     },
     error: function(err) {
      console.log("nope", err);
     }
    });


    //$("#formContainer").hide();
    //$("#itemContainer").hide();
    $("#inputBtn").on('click', function() {
    $("#itemPage").show();
    $("#mainContainer").hide();
    $("#formContainer").hide();

    });

  });


