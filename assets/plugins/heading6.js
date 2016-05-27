$.Redactor.prototype.heading6 = function() {
	return {
			langs: {
				de: {
					"heading6": "Überschrift 6"
				},
				en: {
					"heading6": "Header 6"
				}
			},
		init: function() {
			var button = this.button.add('heading6', this.lang.get('heading6'));
//			this.button.setAwesome('blockquote', 'fa-quote-left');
			
			this.button.addCallback(button, this.heading6.set);
		},
		set: function() {
			this.block.format('h6');
		}
	};
};