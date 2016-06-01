$.Redactor.prototype.unorderedlist = function() {
	return {
		langs: {
			de: {
				"unorderedlist": "Unsortierte Liste"
			},
			en: {
				"unorderedlist": "Unordered list"
			}
		},
		init: function() {
			var button = this.button.add('unorderedlist', this.lang.get('unorderedlist'));
			this.button.setIcon(button, '<i class="fa fa-list-ul"></i>');
			this.button.addCallback(button, this.unorderedlist.set);
		},
		set: function() {
			this.list.toggle('unorderedlist');
		}
	};
};