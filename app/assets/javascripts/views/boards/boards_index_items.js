TrelloClone.Views.BoardsIndexItem = Backbone.View.extend({
  template: JST['boards/board_index_item'],
  tagName: 'li',

  events: {
    'click button': 'deleteBoard'
  },

  deleteBoard: function (event) {
    this.model.destroy();
  },

  render: function () {
    var content = this.template({ board: this.model });

    this.$el.html(content);
    this.$el.addClass('deletable');
    return this;
  }
})
