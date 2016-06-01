$.Redactor.prototype.horizontalrule = function() {
	return {
		langs: {
			de: {
				"horizontalrule": "Linie"
			},
			en: {
				"horizontalrule": "Line"
			}
		},
		init: function() {
			var button = this.button.add('horizontalrule', this.lang.get('horizontalrule'));
			this.button.setIcon(button, '<i class="fa fa-minus"></i>');
			this.button.addCallback(button, this.horizontalrule.set);
		},
		set: function() {
			this.insert.html('<hr>');
		}
	};
};