$.Redactor.prototype.styles = function()
{
	return {
		langs: {
			de: {
				"styles": "Styles"
			},
			en: {
				"styles": "Styles"
			}
		},
		init: function()
		{
			if (!this.opts.styles) return;
			var styles = this.opts.styles;
			
			var that = this;
			var dropdown = {};
			
			$.each(styles, function(i, s)
			{
				dropdown[s[0]] = {
					title: s[1],
					func: function() {
						that.styles.set(s[0]);
					}
				};
			});
			
			var button = this.button.add('styles', this.lang.get('styles'));
			this.button.setIcon(button, '<i class="fa fa-pencil-square-o"></i>');
			this.button.addDropdown(button, dropdown);
		},
		set: function(value) {
			this.inline.format(value);
		}
	};
};