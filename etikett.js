;(function($, undefined) {
  var tagTemplate = _.template([
    "<span class='etikett-tag'>",
      "<%= name %>",
      "<span class='etikett-remove'></span>",
    "</span>"
  ].join(''));

  var TagView = Backbone.View.extend({
    events: {
      "click .etikett-remove": "clickRemove",
      "keydown input": "inputChange",
      "keyup input": "autosizeInput"
    },

    initialize: function() {
      _.bindAll(this, 'render', 'addTag', 'inputChange', 'removeTag');
      this.listenTo(this.collection, 'add', this.addTag);
      this.listenTo(this.collection, 'remove', this.removeTag);
    },

    render: function() {
      this.$el.html('<input/>');
      this.collection.each(this.addTag);
      return this;
    },

    autosizeInput: function(event) {
      var input = $(event.target);
      var dummy = $('<span/>')
        .css({ font: input.css('font'), display: 'none' })
        .text(input.val());
      this.$el.append(dummy);
      input.width(dummy.width() + 15);
      dummy.remove();
    },

    inputChange: function(event) {
      if (!~[13,188].indexOf(event.keyCode)) return;
      event.preventDefault();

      var input = $(event.target);
      var tagName = input.val();
      this.collection.add(new Backbone.Model({name: tagName}));
      input.val('');
    },

    addTag: function(tag) {
      var tagEl = $(tagTemplate(tag.toJSON()))
        .data({model:tag})
        .attr('data-cid', tag.cid);
      var lastTag = this.$('.etikett-tag:last');
      if (!lastTag.length) this.$el.prepend(tagEl);
      else this.$('.etikett-tag:last').after(tagEl);
    },

    clickRemove: function(event) {
      event.preventDefault();
      var tagEl = $(event.target).parents('.etikett-tag');
      this.collection.remove(tagEl.data('model'));
    },

    removeTag: function(tag) {
      var tagEl = $("[data-cid=" + tag.cid + "]").remove();
    }
  });

  $.fn.etikett = function(options) {
    var self = $(this);
    if (self.length > 1) return self.each($.fn.etikett);
    else if (!self.length) return;

    if (self.data('etikett')) return self.data('etikett');

    var tag = new Backbone.Model({name:'johanna'});
    var tag2 = new Backbone.Model({name:'finland'});
    var tags = new Backbone.Collection([tag,tag2]);
    var view = new TagView({collection: tags});
    self.append(view.render().$el);

    var etikett = {
      view: view,
      tags: tags
    };

    self.data('etikett', etikett);
    return etikett;
  };
})(jQuery);
