;(function($, undefined) {
  var tagTemplate = _.template([
    "<span class='etikett-tag'>",
      "<%= name %>",
      "<span class='etikett-remove'></span>",
    "</span>"
  ].join(''));

  var TagView = Backbone.View.extend({
    events: {
      "click .etikett-remove": "clickRemove"
    },

    initialize: function() {
      _.bindAll(this, 'render', 'addTag');
      this.listenTo(this.collection, 'add', this.addTag);
      this.listenTo(this.collection, 'remove', this.removeTag);
    },

    render: function() {
      this.$el.html('');
      this.collection.each(this.addTag);
      return this;
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
