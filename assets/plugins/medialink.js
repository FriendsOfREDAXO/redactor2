$.Redactor.prototype.medialink = function() {
	return {
		langs: {
			de: {
				"medialink": "Media Link"
			},
			en: {
				"medialink": "Media link"
			}
		},
		init: function() {
			var button = this.button.add('medialink', this.lang.get('medialink'));
			this.button.setIcon(button, '<i class="fa fa-link"></i>');
			this.button.addCallback(button, this.medialink.show);
		},
		show: function() {
			var that = this;
			var mediapool = openMediaPool('redactor_medialink');
			$(mediapool).on('rex:selectMedia', function (event, filename) {
				event.preventDefault();
				mediapool.close();
				
				that.medialink.set(filename);
			});
		},
		set: function(filename) {
			var selectedText = this.selection.text();
			
			if (selectedText != '') {
				var linktext = selectedText;
			} else {
				var linktext = filename;
			}

			this.insert.html('<a href="/media/'+filename+'">'+linktext+'</a>');
		}
	};
};