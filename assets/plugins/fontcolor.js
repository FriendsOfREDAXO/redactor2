$.Redactor.prototype.fontcolor = function() {
	return {
		langs: {
			de: {
				"fontcolor": "Schriftfarbe",
				"fontcolor_remove": "Schriftfarbe entfernen",
			},
			en: {
				"fontcolor": "Fontcolor",
				"fontcolor_remove": "Remove fontcolor",
			}
		},
		init: function () {
			if (!this.opts.fontcolor) return;
			var colors = this.opts.fontcolor;
			
			var that = this;
			var dropdown = {};
			
			$.each(colors, function(i, s) {
				dropdown['s' + i] = {
					title: s[0],
					func: function() {
						that.fontcolor.set(s[1]);
					}
				};
			});
			
			dropdown['s' + colors.length] = {
				title: this.lang.get('fontcolor_remove'),
				func: function() {
					that.fontcolor.remove();
				}
			}
			
			var button = this.button.add('fontcolor', this.lang.get('fontcolor'));
			this.button.setIcon(button, '<i class="fa fa-paint-brush"></i>');
			this.button.addDropdown(button, dropdown);
		},
		set: function(value) {
			this.inline.format('span', 'style', 'color: ' + value + ';');
		},
		remove: function() {
			this.inline.removeFormat();
			//this.inline.removeStyleRule('color');
		}
	};
};