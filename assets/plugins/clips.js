$.Redactor.prototype.clips = function()
{
	return {
		init: function ()
		{
			if (!this.opts.clips) return;
			var clips = this.opts.clips;
			
			var that = this;
			var dropdown = {};

			$.each(clips, function(i, s)
			{
				dropdown['s' + i] = {
					title: s[0],
					func: function() {
						that.clips.set(s[1]);
					}
				};
			});
			
			var button = this.button.add('clips', 'Clips');
			this.button.setIcon(button, '<i class="fa fa-th-large"></i>');
			this.button.addDropdown(button, dropdown);
		},
		set: function (value)
		{
			this.insert.html(value);
		}
	};
};