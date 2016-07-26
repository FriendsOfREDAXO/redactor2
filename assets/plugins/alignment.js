(function($)
{
	$.Redactor.prototype.alignment = function()
	{
		return {
			langs: {
				de: {
					"align": "Ausrichtung",
					"align-left": "Linksbündig",
					"align-center": "Zentriert",
					"align-right": "Rechtsbündig",
					"align-justify": "Blocksatz"
				},
				en: {
					"align": "Align",
					"align-left": "Align Left",
					"align-center": "Align Center",
					"align-right": "Align Right",
					"align-justify": "Align Justify"
				}
			},
			init: function()
			{
				var that = this;
				var dropdown = {};

				dropdown.left = { title: that.lang.get('align-left'), func: that.alignment.setLeft };
				dropdown.center = { title: that.lang.get('align-center'), func: that.alignment.setCenter };
				dropdown.right = { title: that.lang.get('align-right'), func: that.alignment.setRight };
				dropdown.justify = { title: that.lang.get('align-justify'), func: that.alignment.setJustify };

				var button = this.button.add('alignment', this.lang.get('align'));
				this.button.setIcon(button, '<i class="fa fa-align-left"></i>');
				this.button.addDropdown(button, dropdown);
			},
			removeAlign: function()
			{
				this.block.removeClass('text-center');
				this.block.removeClass('text-right');
				this.block.removeClass('text-justify');
			},
			setLeft: function()
			{
				this.buffer.set();
				this.alignment.removeAlign();
			},
			setCenter: function()
			{
				this.buffer.set();
				this.alignment.removeAlign();
				this.block.addClass('text-center');
			},
			setRight: function()
			{
				this.buffer.set();
				this.alignment.removeAlign();
				this.block.addClass('text-right');
			},
			setJustify: function()
			{
				this.buffer.set();
				this.alignment.removeAlign();
				this.block.addClass('text-justify');
			}
		};
	};
})(jQuery);