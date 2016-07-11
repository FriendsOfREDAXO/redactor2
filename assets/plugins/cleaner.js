$.Redactor.prototype.cleaner = function() {
	return {
		langs: {
			de: {
				"cleaner": "Formatierungen entfernen"
			},
			en: {
				"cleaner": "Remove formats"
			}
		},
		init: function() {
			var button = this.button.add('cleaner', this.lang.get('cleaner'));
			this.button.setIcon(button, '<i class="fa fa-eraser"></i>');
			this.button.addCallback(button, this.cleaner.set);
		},
		set: function() {
			var isRedactorSelected = this.selection.isRedactor();
			if (this.selection.isRedactor()) {
				// remove what already can be removed
				this.inline.removeFormat();
				this.inline.removeAllAttr();
				this.inline.removeAllClass();
				
				// get the current selection
				var html = this.selection.html();
				
				// Strip out html
				html = html.replace(/(<([^>]+)>)/ig,"");
				
				// buffer
				this.buffer.set();
				
				// Replace selection with clean text
				this.selection.replace(html);
				
				// Sync code
				this.code.sync();
			}
		}
	};
};