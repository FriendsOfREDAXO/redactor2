$.Redactor.prototype.orderedlist = function() {
	return {
		langs: {
			de: {
				"orderedlist": "Sortierte Liste"
			},
			en: {
				"orderedlist": "Ordered list"
			}
		},
		init: function() {
			var button = this.button.add('orderedlist', this.lang.get('orderedlist'));
			this.button.setIcon(button, '<i class="fa fa-list-ol"></i>');
			this.button.addCallback(button, this.orderedlist.set);
		},
		set: function() {
			this.list.toggle('orderedlist');
		}
	};
};