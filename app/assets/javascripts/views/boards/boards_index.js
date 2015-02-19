TrelloClone.Views.BoardsIndex = Backbone.CompositeView.extend({
  template: JST['boards/board_index'],

  events: {
    'submit form': 'createBoard'
  },

  initialize: function () {
    this.listenTo(this.collection, 'sync', this.render);
    this.listenTo(this.collection, 'add', this.addBoard);
    this.listenTo(this.collection, 'remove', this.removeBoard);

    this.collection.each(this.addBoard.bind(this));
  },

  createBoard: function (event) {
    var that = this;
    event.preventDefault();
    var formData = $(event.currentTarget).serializeJSON();
    var board = new TrelloClone.Models.Board(formData);
    board.save({},{
      success: function () {
        that.collection.add(board);
        that.$('form')[0].reset();
      }
    });
  },

  addBoard: function (board) {
    var boardItemView = new TrelloClone.Views.BoardsIndexItem({
      model: board
    });
    this.addSubview('.boards', boardItemView);
  },

  removeBoard: function (board) {
    var boardItemView = _.find(
      this.subviews('.boards'),
      function (subview) {
        return subview.model === board;
      }
    );

    this.removeSubview('.boards', boardItemView);
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();

    return this;
  }
})
