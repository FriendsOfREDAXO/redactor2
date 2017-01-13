$.Redactor.prototype.fontsize = function() {
	return {
		langs: {
			de: {
				"fontsize": "Schriftgrösse",
				"fontsize_remove": "Schriftgrösse entfernen",
			},
			en: {
				"fontsize": "Fontsize",
				"fontsize_remove": "Remove fontsize",
			}
		},
		init: function() {
			if (!this.opts.fontsize) return;
			var fonts = this.opts.fontsize;
			
			var that = this;
			var dropdown = {};
			
			$.each(fonts, function(i, s) {
				dropdown['s' + i] = {
					title: s,
					func: function() {
						that.fontsize.set(s);
					}
				};
			});
			
			dropdown['s' + fonts.length] = {
				title: this.lang.get('fontsize_remove'),
				func: function() {
					that.fontsize.remove();
				}
			};
			
			var button = this.button.add('fontsize', this.lang.get('fontsize'));
			this.button.setIcon(button, '<i class="fa fa-text-height"></i>');
			this.button.addDropdown(button, dropdown);
		},
		set: function(size) {
			this.inline.format('span', 'style', 'font-size: ' + size + ';');
		},
		remove: function() {
			this.inline.removeStyleRule('font-size');
		}
	};
};