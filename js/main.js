
if ($.cookie('authToken')) {
  $.ajaxSetup({
    beforeSend: function(xhr, settings) {
      xhr.setRequestHeader("Authorization", "Token " + $.cookie('authToken'));
    }
  });
}

$(document).ready(function(){

  $('body').on('click','a', function(e){
  e.preventDefault();
  var href = $(this).attr('href');
  href = href.substr(1);
  router.navigate(href, {trigger:true});
});

  $("#loginContainer form").on('submit', function(e){
    e.preventDefault();
    login();
  });

var login = function() {
  var username = $("#username").val();
  var password = $("#password").val();
      $.ajax({
        method: 'POST',
        url: 'https://pacific-gorge-8441.herokuapp.com/api/api-token-auth/',
        data: {'username': username,
                'password': password},
        dataType: "json"
    }).then(function(resp){
      $.cookie('authToken', resp['token']);
       $.ajaxSetup({
           beforeSend: function(xhr, settings) {
             xhr.setRequestHeader("Authorization", "Token " +resp['token']);

           }

       });
  });
};

  var Router = Backbone.Router.extend({
    initialize: function() {
      Backbone.history.start({pushState: true});
    },
    routes: {
      "home": "home",
      "login": "login",
      "item": "item",
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

    $("#addButton").on('click', function(e) {
      e.preventDefault();
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
      token: null
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
      console.log("success pledge", resp);
    },
    error: function(err) {
      console.log("nope", err);
    }
  });
  var pledgeAdd = new pledgeContainer();
  pledgeAdd.set ({
    item: $("#itemNumber").val(),
    pledge_amount: $("#pledgeAmount").val(),
    token: $("#stripeToken").val()
  })

    $("#itemNumber").val("");
    $("#pledgeAmount").val("");
    $("#stripeToken").val("");


  // pledgeAdd.save(null, {
  //   success: function(resp) {
  //     console.log("success", resp)
  //   },
  //   error: function(err) {
  //     console.log("nope pledge", err)
  //   }
  // });


  var wishContainer = Backbone.Model.extend({
    initialize: function(){
    },
    defaults: {
      title: null,
      expiration_date: null,
      list_url: null,
      user: null
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
        var data2obj = {"data": resp.toJSON().results};
        console.log(data2obj);
        var wishTemplate = $("#wishTemplate").text();
        var wishHTML = Mustache.render(wishTemplate, data2obj);
        $("#wishContainer").html(wishHTML);
        console.log("success", resp);
      },
      error: function(err){
        console.log("nope", err);
      }
    });

    $("#addButton2").on('click', function(e) {
      e.preventDefault();
      console.log("test");
      var wishAdd = new wishContainer();
      wishAdd.set ({
      title: $("#addWishTitle").val(),
      expiration_date: $("#addExpirationDate").val(),
      list_url: $("#addListUrl").val(),

    });

    wishAdd.save (null, {
      url: "https://pacific-gorge-8441.herokuapp.com/api/wishlists/",
     succes: function(resp) {
      console.log("succes", resp);
     },
     error: function(err) {
      console.log("nope", err);
     }
    });
      $("#addWishTitle").val("");
      $("#addExpirationDate").val("");
      $("#addListUrl").val("");

    });

    $("#addNewItem").on('click', function() {
      $("#newItemForm").show();
      $("#itemContainer").hide();
    });


    router.on("route:index", function() {
      $("#formContainer").show();
      $("#itemContainer").hide();
      $("#newItemForm").hide();
      $("#wishlistForm").hide();
      $("#formContainer").hide();
    });

    router.on("route:home", function() {
      $("#mainContainer").show();
      $("#itemContainer").hide();
      $("#newItemForm").hide();
      $("#wishlistForm").hide();
      $("#formContainer").hide();
      $("#addNewItem").hide();
     });

    router.on("route:item", function() {
      $("#mainContainer").hide();
      $("#itemContainer").show();
      $("#addNewItem").show();
    });

    router.on("route:add", function() {
      $("#wishlistForm").show();
    });

    $("#inputBtn").on('click', function() {
    $("#mainContainer").hide();
    $("#formContainer").hide();
    });

    $("#mainContainer").hide();
    $("#itemContainer").hide();
    $("#newItemForm").hide();
    $("#wishlistForm").hide();
    $("#addNewItem").hide();
    $("#formContainer").show();
});