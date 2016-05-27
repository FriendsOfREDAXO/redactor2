$.Redactor.prototype.underline = function() {
	return {
		langs: {
			de: {
				"underline": "Unterstrichen"
			},
			en: {
				"underline": "Underline"
			}
		},
		init: function() {
			var button = this.button.add('underline', this.lang.get('underline'));
//			this.button.setAwesome('blockquote', 'fa-quote-left');
			
			this.button.addCallback(button, this.underline.set);
		},
		set: function() {
			this.inline.format('underline');
		}
	};
};