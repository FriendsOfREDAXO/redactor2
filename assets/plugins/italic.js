$.Redactor.prototype.italic = function() {
	return {
		langs: {
			de: {
				"italic": "Kursiv"
			},
			en: {
				"italic": "Italic"
			},
			es: {
				"italic": "Itálico"
			}
		},
		
		init: function() {
			var button = this.button.add('italic', this.lang.get('italic'));
			this.button.setIcon(button, '<i class="fa fa-italic"></i>');
			this.button.addCallback(button, this.italic.set);
		},
		set: function() {
			this.inline.format('italic');
		}
	};
};