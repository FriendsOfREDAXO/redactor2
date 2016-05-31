$.Redactor.prototype.media = function() {
	return {
		langs: {
			de: {
				"media": "Media einfügen"
			},
			en: {
				"media": "Insert media"
			}
		},
		init: function() {
			var button = this.button.add('media', this.lang.get('media'));
			
			this.button.addCallback(button, this.media.show);
		},
		show: function() {
			var that = this;
			var mediapool = openMediaPool('redactor_media');
			$(mediapool).on('rex:selectMedia', function (event, filename) {
				event.preventDefault();
				mediapool.close();
				
				that.media.set(filename);
			});
		},
		set: function(filename) {
			this.insert.html('<img src="/media/'+filename+'" alt="">');
		}
	};
};