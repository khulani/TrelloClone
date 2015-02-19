TrelloClone.Views.List = Backbone.CompositeView.extend({
  template: JST['lists/list'],

  events: {
    'click button.list': 'deleteList',
    'submit form.card': 'createCard',
  },

  initialize: function (options) {
    this.boardView = options.boardView;

    // this.listenTo(this.model, 'sync', this.render);
    // this.listenTo(this.model.cards(), 'sync', this.render);
    this.listenTo(this.model.cards(), 'add', this.addCard);
    this.listenTo(this.model.cards(), 'remove', this.removeCard);

    this.last = 0;

    this.model.cards().each(this.addCard.bind(this));
  },

  createCard: function (event) {
    var that = this;
    event.preventDefault();
    var formData = $(event.currentTarget).serializeJSON();
    var card = new TrelloClone.Models.Card(formData);
    card.set({ ord: this.last });
    card.save({},{
      success: function () {
        that.model.cards().add(card);
      }
    });
  },

  addCard: function (card, ord) {
    if (!ord) {
      ord = this.last;
    }
    card.set({ ord: ord});
    this.last++;
    var cardView = new TrelloClone.Views.Card({
      model: card
    });
    this.addSubview('.cards', cardView, this.makeSortable.bind(this));
  },

  deleteList: function () {
    this.model.destroy();
  },

  removeCard: function (card) {
    var cardView = _.find(
      this.subviews('.cards'),
      function (subview) {
        return subview.model === card;
      }
    );

    this.removeSubview('.cards', cardView);
  },

  render: function () {
    var content = this.template({ list: this.model });
    this.$el.html(content);
    var $ul = this.$el.find('.cards');
    $ul.attr('id', 'sortable-' + this.model.id);
    $ul.attr('list', this.model.id);
    this.$el.addClass('list-style');
    this.$el.addClass('deletable');
    this.$el.attr('id', this.model.id);
    this.attachSubviews();
    this.makeSortable();
    return this;
  },

  makeSortable: function () {
    this.boardView.trigger('sortable');
  },

  hi: function () {
    console.log('hi');
  }
});
