window.App = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    //this.router = new this.Routers.Main();
    Backbone.history.start({pushState: true});

    App.autocompleter = new Autocompleter();
    var ws = new WebSocket('ws://' + window.location.host + window.location.pathname);
    ws.onmessage = function(m) {
      App.autocompleter.add(m.data);
    };
  }
};
$(function(){
  App.initialize();
});



