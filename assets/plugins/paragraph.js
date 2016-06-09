$.Redactor.prototype.paragraph = function() {
	return {
			langs: {
				de: {
					"paragraph": "Paragraph"
				},
				en: {
					"paragraph": "Paragraph"
				}
			},
		init: function() {
			var button = this.button.add('paragraph', this.lang.get('paragraph'));
			this.button.setIcon(button, '<i class="fa fa-paragraph"></i>');
			this.button.addCallback(button, this.paragraph.set);
		},
		set: function() {
			this.block.format('p');
		}
	};
};