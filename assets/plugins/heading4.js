$.Redactor.prototype.heading4 = function() {
	return {
			langs: {
				de: {
					"heading4": "Überschrift 4"
				},
				en: {
					"heading4": "Header 4"
				},
				es: {
					"heading4": "Título 4"
				}
			},
		init: function() {
			var button = this.button.add('heading4', this.lang.get('heading4'));
			this.button.setIcon(button, '<i class="fa fa-header"></i>');
			this.button.addCallback(button, this.heading4.set);
		},
		set: function() {
			this.block.format('h4');
            this.selection.remove();
		}
	};
};