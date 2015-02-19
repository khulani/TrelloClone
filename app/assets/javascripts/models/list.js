TrelloClone.Models.List = Backbone.Model.extend({
  urlRoot: '/api/lists',

  parse: function (payload) {
    if (payload.cards) {
      this.cards().set(payload.cards);
      delete payload.cards;
    }
    return payload;
  },

  cards: function () {
    if (!this._cards) {
      this._cards = new TrelloClone.Collections.Cards();
    }
    return this._cards;
  }
})
