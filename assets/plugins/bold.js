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
		init: function() {
			var button = this.button.add('bold', this.lang.get('bold'));
			this.button.setIcon(button, '<i class="fa fa-bold"></i>');
			this.button.addCallback(button, this.bold.set);
		},
		set: function() {
			this.inline.format('bold');
		}
	};
};