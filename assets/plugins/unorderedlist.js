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
			
			this.button.addCallback(button, this.unorderedlist.set);
		},
		set: function() {
			this.list.toggle('unorderedlist');
		}
	};
};