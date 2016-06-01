$.Redactor.prototype.heading5 = function() {
	return {
			langs: {
				de: {
					"heading5": "Überschrift 5"
				},
				en: {
					"heading5": "Header 5"
				}
			},
		init: function() {
			var button = this.button.add('heading5', this.lang.get('heading5'));
			this.button.setIcon(button, '<i class="fa fa-header"></i>');
			this.button.addCallback(button, this.heading5.set);
		},
		set: function() {
			this.block.format('h5');
		}
	};
};