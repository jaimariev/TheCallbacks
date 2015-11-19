$.ajax({
  url: 'https://pacific-gorge-8441.herokuapp.com/api/items'
}).then(function(resp){
  console.log(resp);
});

var Container = Backbone.Model.extend({
  initialize: function(){
  },
  defaults: {
    item_url: null,
    title: null,
    description: null,
    price: null
  },
  Model: Container,
  url: 'https://pacific-gorge-8441.herokuapp.com/api/items'
});

var Containers = Backbone.Collection.extend({
   Model: Container,
   url: 'https://pacific-gorge-8441.herokuapp.com/api/items'
 });

var CotainerCollection = new Container();

CotainerCollection.fetch ({
  success: function(resp) {
    console.log("success", resp);
  },
  error: function(err) {
    console.log("nope", err);
  }
});









