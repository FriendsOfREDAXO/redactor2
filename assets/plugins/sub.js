$.Redactor.prototype.sub = function() {
	return {
		langs: {
			de: {
				"sub": "Hochgestellt"
			},
			en: {
				"sub": "Sub"
			}
		},
		init: function() {
			var button = this.button.add('sub', this.lang.get('sub'));
			this.button.setIcon(button, '<i class="fa fa-sub"></i>');
			this.button.addCallback(button, this.sub.set);
		},
		set: function() {
			this.inline.format('sub');
		}
	};
};