$.Redactor.prototype.format = function() {
	return {
		langs: {
			de: {
				"format": "Format"
			},
			en: {
				"format": "Format"
			}
		},
		init: function() {
			
			if (!this.opts.format) return;
			var format = this.opts.format;
			
			var that = this;
			var dropdown = {};
			
			$.each(format, function(i, s)
			{
				dropdown[i] = {
					title: '<span class="'+s[1].split(".")[1]+'">'+s[0]+'</span>',
					func: function() {
						that.format.set(s[1]);
					}
				};
			});
			
			var button = this.button.add('format', this.lang.get('format'));
			this.button.setIcon(button, '<i class="re-icon-format"></i>');
			this.button.addDropdown(button, dropdown);
		},
		set: function(args) {
			this.block.format(args.split(".")[0], 'class', args.split(".")[1]);
		}
	};
};