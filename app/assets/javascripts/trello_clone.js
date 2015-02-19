window.TrelloClone = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    TrelloClone.boards = new TrelloClone.Collections.Boards();

    new TrelloClone.Routers.Router({
      $rootEl: $('#trello')
    })
    Backbone.history.start();
  }
};
