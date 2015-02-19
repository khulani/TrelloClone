TrelloClone.Views.Card = Backbone.View.extend({
  template: JST['cards/card'],
  tagName: 'li',

  initialize: function (options) {
    this._dragging = false;
  },

  events: {
    'click button.card': 'deleteCard',
    'sortstart .cards': 'toggleDrag',
    'sortstop .cards': 'toggleDrag'
  },

  deleteCard: function () {
    this.model.destroy();
  },

  render: function () {
    var content = this.template({ card: this.model });

    this.$el.html(content);
    this.$el.addClass('card-style');
    this.$el.addClass('deletable');
    this.$el.attr('id', this.model.get('id'));
    this.$el.attr('list', this.model.get('list_id'));
    return this;
  },

  toggleDrag: function () {
    debugger;
    if (this._dragging) {
      this.$el.addClass('dragging');
    } else {
      this.$el.removeClass('dragging');
    }
  }
})
