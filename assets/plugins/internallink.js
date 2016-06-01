$.Redactor.prototype.internallink = function() {
	return {
		langs: {
			de: {
				"internallink": "Interner Link"
			},
			en: {
				"internallink": "Internal link"
			}
		},
		init: function() {
			var button = this.button.add('internallink', this.lang.get('internallink'));
			this.button.setIcon(button, '<i class="fa fa-link"></i>');
			this.button.addCallback(button, this.internallink.show);
		},
		show: function() {
			var that = this;
			var linkMap = openLinkMap();
			$(linkMap).on('rex:selectLink', function (event, linkurl, linktext) {
				event.preventDefault();
				linkMap.close();
				
				that.internallink.set(linkurl, linktext);
			});
		},
		set: function(linkurl, linktext) {
			var selectedText = this.selection.text();
			
			if (selectedText != '') {
				var linktext = selectedText;
			}

			this.insert.html('<a href="'+linkurl+'">'+linktext+'</a>');
		}
	};
};