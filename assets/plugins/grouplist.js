$.Redactor.prototype.grouplist = function() {
	return {
		langs: {
			de: {
				"grouplist": "Liste",
				"grouplist_unorderedlist": "Unsortierte Liste",
				"grouplist_orderedlist": "Sortierte Liste",
				"grouplist_indent": "Einzug",
				"grouplist_outdent": "Negativer Einzug",
			},
			en: {
				"grouplist": "List",
				"grouplist_unorderedlist": "Unordered list",
				"grouplist_orderedlist": "Ordered List",
				"grouplist_indent": "Indent",
				"grouplist_outdent": "Negative indent",
			}
		},
		init: function()
		{
			if (!this.opts.grouplist) return;
			var grouplist = this.opts.grouplist;
			
			var that = this;
			var dropdown = {};
			
			if (grouplist.indexOf("unorderedlist") != -1) {
				dropdown.unorderedlist = { title: that.lang.get('grouplist_unorderedlist'), func: that.grouplist.setUnorderedlist };
			}
			if (grouplist.indexOf("orderedlist") != -1) {
				dropdown.orderedlist = { title: that.lang.get('grouplist_orderedlist'), func: that.grouplist.setOrderedlist };
			}
			if (grouplist.indexOf("indent") != -1) {
				dropdown.indent = { title: that.lang.get('grouplist_indent'), func: that.grouplist.setIndent };
			}
			if (grouplist.indexOf("outdent") != -1) {
				dropdown.outdent = { title: that.lang.get('grouplist_outdent'), func: that.grouplist.setOutdent };
			}
			
			var button = this.button.add('grouplist', this.lang.get('grouplist'));
			this.button.setIcon(button, '<i class="fa fa-list"></i>');
			this.button.addDropdown(button, dropdown);
		},
		setUnorderedlist: function()
		{
			this.list.toggle('unorderedlist');
		},
		setOrderedlist: function()
		{
			this.list.toggle('orderedlist');
		},
		setIndent: function()
		{
			this.indent.increase();
		},
		setOutdent: function()
		{
			this.indent.decrease();
		},
	};
};