$.Redactor.prototype.bold = function() {
	return {
		langs: {
			de: {
				"bold": "Fett"
			},
			en: {
				"bold": "Bold"
			}
		},
		
//		shortcutsAdd: {
//			'ctrl+b, meta+b': { func: 'inline.format', params: ['bold'] },
//		},
		
		init: function() {
			var button = this.button.add('bold', this.lang.get('bold'));
//			this.button.setAwesome('blockquote', 'fa-quote-left');
			
			this.button.addCallback(button, this.bold.set);
		},
		set: function() {
			this.inline.format('bold');
		}
	};
};