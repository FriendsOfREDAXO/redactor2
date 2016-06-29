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
			this.button.setIcon(button, '<i class="fa fa-picture-o"></i>');
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
			this.insert.html('<img src="index.php?rex_media_type=redactorImage&rex_media_file='+filename+'" alt="">');
		}
	};
};