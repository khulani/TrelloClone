TrelloClone.Routers.Router = Backbone.Router.extend({
  routes: {
    '': 'index',
    'boards/:id': 'show'
  },

  initialize: function (options) {
    this.$rootEl = options.$rootEl;
  },

  index: function () {
    TrelloClone.boards.fetch();
    var indexView = new TrelloClone.Views.BoardsIndex({
      collection: TrelloClone.boards
    });
    this.$rootEl.find('#sidebar').html(indexView.render().$el);
    this._sidebarView = indexView;
  },

  show: function (id) {
    if (!this._sidebarView) {
      this.index();
    }

    var showView = new TrelloClone.Views.BoardShow({
      model: TrelloClone.boards.getOrFetch(id)
    })

    this._swapView(showView);
  },

  _swapView: function (newView) {
    this._currentView && this.currentView.remove();
    this.$rootEl.find('#main').html(newView.render().$el);

    this.currentView = newView;
  }
})
