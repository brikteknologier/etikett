# Etikett

An unstyled tag entry component built upon backbone. It is different to other tag
components in that it is completely unstyled by default, and heavily opinionated.

## Usage

```html
<div id="etikett">
</div>

<script type="text/javascript" src="jquery.js"></script>
<script type="text/javascript" src="underscore.js"></script>
<script type="text/javascript" src="backbone.js"></script>
<script type="text/javascript" src="etikett.js"></script>

<script type="text/javascript">
  $("#etikett").etikett();
</script>
```

### `$.fn.etikett(options)`

Add a tag entry component to the given element.

#### Options

* `tags` (optional) a backbone collection containing a list of tag models. The
  tag models must have at least a property with the name of the tag (to specify
  which property, check out the `key` option below)
* `key` (optional) a string specifying the key on a tag object which should
  contain the name of the tag. defaults to `"tag"`

#### Access the model & view

```javascript
$('#etikett').etikett(); // create etikett
$('#etikett').data('etikett') // -> { view: Backbone.View, tags: Backbone.Collection }
```

You can alter the tags collection and the interface will automatically follow.

#### Getting and setting an array of tags

The object returned by `etikett()` also has `get()` and `set()` methods that
allow you to save and retrieve a regular array of tags. 


### Styling

Because etikett is unstyled, you need to add your own CSS. Here's what the
structure looks like, for reference:

```html
<div class="etikett">
  <span class="etikett-tag" data-cid="c4">
    Johanna Kurkela
    <span class="etikett-remove"></span>
  </span>
  <span class="etikett-tag" data-cid="c5">
    Finnish
    <span class="etikett-remove"></span>
  </span>
  <input class="etikett-input"/>
  <input class="etikett-keytrap" style="width:0px;opacity:0;border:none">
</div>
```

The main elements to style will be:
* `.etikett-tag` a tag
* `.etikett-tag.selected` a selected tag
* `.etikett-remove` a remove button
* `.etikett-input` the input area. should probably have a `max-width`

**You should probably not style these:**
* `.etikett-keytrap` this is the keytrap that receives backspace/delete events.
  It has to be displayed (no `display:none`), but should not actually be visible.
  The default `style` attribute of the element will take care of this.

The `data-cid` attributes are used for internal book-keeping by etikett.

## License

MIT
