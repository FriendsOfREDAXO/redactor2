$.Redactor.prototype.heading4 = function() {
	return {
			langs: {
				de: {
					"heading4": "Überschrift 4"
				},
				en: {
					"heading4": "Header 4"
				}
			},
		init: function() {
			var button = this.button.add('heading4', this.lang.get('heading4'));
//			this.button.setAwesome('blockquote', 'fa-quote-left');
			
			this.button.addCallback(button, this.heading4.set);
		},
		set: function() {
			this.block.format('h4');
		}
	};
};