$.Redactor.prototype.blockquote = function() {
	return {
			langs: {
				de: {
					"blockquote": "Zitat"
				},
				en: {
					"blockquote": "Quote"
				}
			},
		init: function() {
			var button = this.button.add('blockquote', this.lang.get('blockquote'));
//			this.button.setAwesome('blockquote', 'fa-quote-left');
			
			this.button.addCallback(button, this.blockquote.set);
		},
		set: function() {
			this.block.format('blockquote');
		}
	};
};