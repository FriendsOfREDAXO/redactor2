$.Redactor.prototype.heading1 = function() {
	return {
			langs: {
				de: {
					"heading1": "Überschrift 1"
				},
				en: {
					"heading1": "Header 1"
				},
				es: {
					"heading1": "Título 1"
				}
			},
		init: function() {
			var button = this.button.add('heading1', this.lang.get('heading1'));
			this.button.setIcon(button, '<i class="fa fa-header"></i>');
			this.button.addCallback(button, this.heading1.set);
		},
		set: function() {
			this.block.format('h1');
            this.selection.remove();
		}
	};
};