$.Redactor.prototype.heading2 = function() {
	return {
			langs: {
				de: {
					"heading2": "Überschrift 2"
				},
				en: {
					"heading2": "Header 2"
				}
			},
		init: function() {
			var button = this.button.add('heading2', this.lang.get('heading2'));
//			this.button.setAwesome('blockquote', 'fa-quote-left');
			
			this.button.addCallback(button, this.heading2.set);
		},
		set: function() {
			this.block.format('h2');
		}
	};
};