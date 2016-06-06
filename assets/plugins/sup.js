$.Redactor.prototype.sup = function() {
	return {
		langs: {
			de: {
				"sup": "Tiefgestellt"
			},
			en: {
				"sup": "Sup"
			}
		},
		init: function() {
			var button = this.button.add('sup', this.lang.get('sup'));
			this.button.setIcon(button, '<i class="fa fa-sup"></i>');
			this.button.addCallback(button, this.sup.set);
		},
		set: function() {
			this.inline.format('sup');
		}
	};
};