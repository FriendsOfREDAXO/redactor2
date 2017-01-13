$.Redactor.prototype.fontfamily = function() {
	return {
		langs: {
			de: {
				"fontfamily": "Schriftart",
				"fontfamily_remove": "Schriftart entfernen",
			},
			en: {
				"fontfamily": "Fontfamily",
				"fontfamily_remove": "Remove fontfamily",
			}
		},
		init: function () {
			if (!this.opts.fontfamily) return;
			var fonts = this.opts.fontfamily;
			
			var that = this;
			var dropdown = {};
			
			$.each(fonts, function(i, s) {
				dropdown['s' + i] = {
					title: s,
					func: function() {
						that.fontfamily.set(s);
					}
				};
			});
			
			dropdown['s' + fonts.length] = {
				title: this.lang.get('fontfamily_remove'),
				func: function() {
					that.fontfamily.remove();
				}
			};
			
			var button = this.button.add('fontfamily', this.lang.get('fontfamily'));
			this.button.setIcon(button, '<i class="fa fa-font"></i>');
			this.button.addDropdown(button, dropdown);
		},
		set: function(value) {
			this.inline.format('span', 'style', 'font-family:' + value + ';');
		},
		remove: function() {
			this.inline.removeStyleRule('font-family');
		}
	};
};