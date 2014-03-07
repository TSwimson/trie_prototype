window.App = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    this.router = new this.Routers.Main();
    Backbone.history.start({pushState: true});

    App.autocompleter = new Autocompleter();
    var ws = new WebSocket('ws://' + window.location.host + window.location.pathname);
    ws.onmessage = function(m) {
      App.autocompleter.add(m.data);
    };
  }
};

App.Routers.Main = Backbone.Router.extend({
  routes: {
    ''        : 'main',
    ':search' : 'main'
  },
  main: function(search) {
    search = search || '';
    $(function(){
      
      $('#search_bar').on('input', function() {
        App.showAutocompletes();
      });
      $('#search_bar').val(search);
    });

    setInterval(function(){
      App.showAutocompletes();
    }, 300);
  }
});

App.showAutocompletes = function() {
  var $list = $('#results');
  var s = $('#search_bar').val().toLowerCase();
  $list.empty();
  var list = [];
  if (s.length > 0){
    $.each(App.autocompleter.complete(s),function(index, item) {
      list.push(item);
    });
  }
  if(list.length > 0) {
    $list.html('<li>' + list.join('</li><li>') + '</li>');
  }
};
$(function(){
  App.initialize();
});



