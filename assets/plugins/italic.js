$.Redactor.prototype.italic = function() {
	return {
		langs: {
			de: {
				"italic": "Kursiv"
			},
			en: {
				"italic": "Italic"
			}
		},
		
//		shortcutsAdd: {
//				'ctrl+i, meta+i': { func: 'inline.format', params: ['italic'] },
//		},
		
		init: function() {
			var button = this.button.add('italic', this.lang.get('italic'));
//			this.button.setAwesome('blockquote', 'fa-quote-left');
			
			this.button.addCallback(button, this.italic.set);
		},
		set: function() {
			this.inline.format('italic');
		}
	};
};