TrelloClone.Models.Board = Backbone.Model.extend({
  urlRoot: 'api/boards',

  parse: function (payload) {
    if (payload.lists) {
      this.lists().set(payload.lists, { parse: true });
      delete payload.lists;
    }

    return payload;
  },

  lists: function() {
    if (!this._lists) {
      this._lists = new TrelloClone.Collections.Lists();
    }
    return this._lists;
  },

  sortableList: function () {
    var sortable = [];
    this.lists().each( function (list) {
      sortable.push("#sortable-" + list.id);
    });

    return sortable.join();
  }
})
