$.Redactor.prototype.sup = function() {
	return {
		langs: {
			de: {
				"sup": "Hochgestellt"
			},
			en: {
				"sup": "Sup"
			}
		},
		init: function() {
			var button = this.button.add('sup', this.lang.get('sup'));
			this.button.setIcon(button, '<i class="fa fa-superscript"></i>');
			this.button.addCallback(button, this.sup.set);
		},
		set: function() {
			this.inline.format('sup');
		}
	};
};