$.Redactor.prototype.heading3 = function() {
	return {
			langs: {
				de: {
					"heading3": "Überschrift 3"
				},
				en: {
					"heading3": "Header 3"
				}
			},
		init: function() {
			var button = this.button.add('heading3', this.lang.get('heading3'));
			this.button.setIcon(button, '<i class="fa fa-header"></i>');
			this.button.addCallback(button, this.heading3.set);
		},
		set: function() {
			this.block.format('h3');
		}
	};
};