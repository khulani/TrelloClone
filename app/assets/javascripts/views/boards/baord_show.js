TrelloClone.Views.BoardShow = Backbone.CompositeView.extend({
  template: JST['boards/board'],

  events: {
    'submit form.list': 'createList',
    'sortstart .lists': 'toggleDrag',
    'sortstop .lists': 'toggleDrag'
  },

  toggleDrag: function (event, ui) {
    if (this._dragging) {
      this._dragging = false;
      ui.item.removeClass('dragging');
    } else {
      this._dragging = true;
      ui.item.addClass('dragging');
    }
  },

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.model, 'destroy', this.remove)
    // this.listenTo(this.model.lists(), 'sync', this.render);
    this.listenTo(this.model.lists(), 'add', this.addList);
    this.listenTo(this.model.lists(), 'remove', this.removeList);

    this.on('sortable', this.makeSortable);
    this.last = 0;

    this.model.lists().each(this.addList.bind(this));
  },

  createList: function (event) {
    var that = this;
    event.preventDefault();
    var formData = $(event.currentTarget).serializeJSON();
    var list = new TrelloClone.Models.List(formData);
    list.set({ ord: that.last });
    list.save({},{
      success: function () {
        that.model.lists().add(list);
        that.last++;
        that.$('form')[0].reset();
      }
    });
  },

  addList: function (list) {
    list.set({ ord: this.last });
    this.last++;
    var listView = new TrelloClone.Views.List({
      model: list,
      boardView: this
    });
    this.addSubview('.lists', listView);
  },

  removeList: function (list) {
    var listView = _.find(
      this.subviews('.lists'),
      function (subview) {
        return subview.model === list;
      }
    );
    this.removeSubview('.lists', listView);
  },

  render: function () {
    var content = this.template({ board: this.model });
    this.$el.html(content);
    this.attachSubviews();
    this.makeSortable();
    this.$el.find('.lists').sortable({
      update: this.updateListOrder.bind(this)
    });
    return this;
  },

  updateListOrder: function (event, ui) {
    var order = $(event.target).sortable('toArray');
    for (var i = 0; i < order.length; i++) {
      var list = this.model.lists().get(order[i]);
      if (list.get('ord') != i) {
        list.set({ ord: i });
        list.save();
      }
    }
  },

  makeSortable: function () {
    console.log('triggered');
    if (this.model.sortableList()){
      this.$el.find('.cards').sortable({
        connectWith: this.model.sortableList(),
        update: this.updateCardOrder.bind(this)
      });
    }
  },

  updateCardOrder: function (event, ui) {
    var $listTarget = ui.item.parent();
    var toList = this.model.lists().get($listTarget.attr('list'));
    var fromList = this.model.lists().get(ui.item.attr('list'));
    var card = fromList.cards().get(
      ui.item.attr('id')
    );

    var order = $listTarget.sortable('toArray');
    for (var i = 0; i < order.length; i++) {
      var listCard = toList.cards().get(order[i]);
      if (listCard && listCard.get('ord') != i) {
        listCard.set({ ord: i });
        listCard.save();
      } else if (card.id == order[i]) {
        card.set({ ord: i, list_id: toList.id });
        card.save();
      }
    }
  },

  findListView: function (list) {
    return _.find(
      this.subviews('.lists'),
      function (subview) {
        return subview.model === list;
      }
    );
  }
});
