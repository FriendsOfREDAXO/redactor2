$.Redactor.prototype.groupheading = function() {
	return {
		langs: {
			de: {
				"groupheading": "Überschrift",
				"groupheading_1": "Überschrift 1",
				"groupheading_2": "Überschrift 2",
				"groupheading_3": "Überschrift 3",
				"groupheading_4": "Überschrift 4",
				"groupheading_5": "Überschrift 5",
				"groupheading_6": "Überschrift 6",
			},
			en: {
				"groupheading": "Heading",
				"groupheading_1": "Heading 1",
				"groupheading_2": "Heading 2",
				"groupheading_3": "Heading 3",
				"groupheading_4": "Heading 4",
				"groupheading_5": "Heading 5",
				"groupheading_6": "Heading 6",
			}
		},
		init: function()
		{
			if (!this.opts.groupheading) return;
			var groupheading = this.opts.groupheading;
			
			var that = this;
			var dropdown = {};
			
			if (groupheading.indexOf("1") != -1) {
				dropdown.groupheading1 = { title: that.lang.get('groupheading_1'), func: that.groupheading.setGroupheading1 };
			}
			if (groupheading.indexOf("2") != -1) {
				dropdown.groupheading2 = { title: that.lang.get('groupheading_2'), func: that.groupheading.setGroupheading2 };
			}
			if (groupheading.indexOf("3") != -1) {
				dropdown.groupheading3 = { title: that.lang.get('groupheading_3'), func: that.groupheading.setGroupheading3 };
			}
			if (groupheading.indexOf("4") != -1) {
				dropdown.groupheading4 = { title: that.lang.get('groupheading_4'), func: that.groupheading.setGroupheading4 };
			}
			if (groupheading.indexOf("5") != -1) {
				dropdown.groupheading5 = { title: that.lang.get('groupheading_5'), func: that.groupheading.setGroupheading5 };
			}
			if (groupheading.indexOf("6") != -1) {
				dropdown.groupheading6 = { title: that.lang.get('groupheading_6'), func: that.groupheading.setGroupheading6 };
			}
			
			var button = this.button.add('groupheading', this.lang.get('groupheading'));
			this.button.setIcon(button, '<i class="fa fa-header"></i>');
			this.button.addDropdown(button, dropdown);
		},
		setGroupheading1: function()
		{
			this.block.format('h1');
		},
		setGroupheading2: function()
		{
			this.block.format('h2');
		},
		setGroupheading3: function()
		{
			this.block.format('h3');
		},
		setGroupheading4: function()
		{
			this.block.format('h4');
		},
		setGroupheading5: function()
		{
			this.block.format('h5');
		},
		setGroupheading6: function()
		{
			this.block.format('h6');
		},
	};
};