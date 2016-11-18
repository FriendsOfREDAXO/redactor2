$.Redactor.prototype.redo = function() {
	return {
		langs: {
			de: {
				"redo": "Wiederholen"
			},
			en: {
				"redo": "Redo"
			}
		},
		init: function() {
			var button = this.button.add('redo', this.lang.get('redo'));
			this.button.setIcon(button, '<i class="fa fa-repeat"></i>');
			this.button.addCallback(button, this.buffer.redo);
		}
	};
};