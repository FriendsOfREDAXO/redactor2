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
			this.button.setIcon(button, '<i class="fa fa-header"></i>');
			this.button.addCallback(button, this.heading6.set);
		},
		set: function() {
			this.block.format('h6');
		}
	};
};