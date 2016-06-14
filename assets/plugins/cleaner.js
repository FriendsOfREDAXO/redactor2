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
			var selectedText = this.selection.text();
			
			if (selectedText != '') {
				var selectedText = this.clean.stripTags(selectedText);
				this.insert.html(selectedText);
			}
		}
	};
};