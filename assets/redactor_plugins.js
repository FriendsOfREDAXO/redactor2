$.Redactor.prototype.alignment = function()
{
	return {
		langs: {
			de: {
				"align": "Ausrichtung",
				"align-left": "Linksbündig",
				"align-center": "Zentriert",
				"align-right": "Rechtsbündig",
				"align-justify": "Blocksatz"
			},
			en: {
				"align": "Align",
				"align-left": "Align Left",
				"align-center": "Align Center",
				"align-right": "Align Right",
				"align-justify": "Align Justify"
			},
			es: {
				"align": "Alinear",
				"align-left": "Alinear a la izquierda",
				"align-center": "Alinear al centro",
				"align-right": "Alinear a la derecha",
				"align-justify": "Alinear justificado"
			}
		},
		init: function()
		{
			var that = this;
			var dropdown = {};

			dropdown.left = { title: that.lang.get('align-left'), func: that.alignment.setLeft };
			dropdown.center = { title: that.lang.get('align-center'), func: that.alignment.setCenter };
			dropdown.right = { title: that.lang.get('align-right'), func: that.alignment.setRight };
			dropdown.justify = { title: that.lang.get('align-justify'), func: that.alignment.setJustify };

			var button = this.button.add('alignment', this.lang.get('align'));
			this.button.setIcon(button, '<i class="fa fa-align-left"></i>');
			this.button.addDropdown(button, dropdown);
		},
		removeAlign: function()
		{
			this.block.removeClass('text-center');
			this.block.removeClass('text-right');
			this.block.removeClass('text-justify');
			this.block.removeClass('text-left'); // kreatif: added to force left align
		},
		setLeft: function()
		{
			this.buffer.set();
			this.alignment.removeAlign();
			this.block.addClass('text-left'); // kreatif: added to force left align
		},
		setCenter: function()
		{
			this.buffer.set();
			this.alignment.removeAlign();
			this.block.addClass('text-center');
		},
		setRight: function()
		{
			this.buffer.set();
			this.alignment.removeAlign();
			this.block.addClass('text-right');
		},
		setJustify: function()
		{
			this.buffer.set();
			this.alignment.removeAlign();
			this.block.addClass('text-justify');
		}
	};
};

$.Redactor.prototype.anchorlink = function() {
	return {
		langs: {
			de: {
				"anchorlink": "Ankerlink",
				"anchorlink_linktext": "Linktext",
				"anchorlink_anchor": "Anker",
				"anchorlink_insert": "Einfügen",
				"anchorlink_abort": "Abbrechen"
			},
			en: {
				"anchorlink": "Anchorlink",
				"anchorlink_linktext": "Linktext",
				"anchorlink_anchor": "Anchor",
				"anchorlink_insert": "Insert",
				"anchorlink_abort": "Abort"
			},
			es: {
				"anchorlink": "Enlace de anclaje",
				"anchorlink_linktext": "Texto del enlace",
				"anchorlink_anchor": "Ancla",
				"anchorlink_insert": "Insertar",
				"anchorlink_abort": "Abortar"
			}
		},
		getTemplate: function() {
			var selectedText = this.selection.text();

			var modalContent = '';
			modalContent += '<div class="modal-section" id="redactor-modal-anchorlink">';

			if (selectedText == '') {
				modalContent += '  <section>';
				modalContent += '    <label for="anchorlink_linktext">' + this.lang.get('anchorlink_linktext') + '</label>';
				modalContent += '    <input type="text" id="anchorlink_linktext">';
				modalContent += '  </section>';
			}

			modalContent += '  <section>';
			modalContent += '    <label for="anchorlink_anchor">' + this.lang.get('anchorlink_anchor') + '</label>';
			modalContent += '    <input type="text" id="anchorlink_anchor">';
			modalContent += '  </section>';
			modalContent += '  <section>';
			modalContent += '    <button id="redactor-modal-button-action">' + this.lang.get('anchorlink_insert') + '</button>';
			modalContent += '    <button id="redactor-modal-button-cancel">' + this.lang.get('anchorlink_abort') + '</button>';
			modalContent += '  </section>';
			modalContent += '</div>';

			return String() + modalContent;
		},
		init: function() {
			var button = this.button.add('anchorlink', this.lang.get('anchorlink'));
			this.button.setIcon(button, '<i class="fa fa-link"></i>');
			this.button.addCallback(button, this.anchorlink.show);
		},
		show: function() {
			this.modal.addTemplate('anchorlink', this.anchorlink.getTemplate());
			this.modal.load('anchorlink', this.lang.get('anchorlink'), 600);

			var button = this.modal.getActionButton();
			button.on('click', this.anchorlink.set);

			this.modal.show();

			setTimeout(function() {
				if ($('#anchorlink_linktext').length != 0) {
					document.getElementById('anchorlink_linktext').focus();
				} else {
					document.getElementById('anchorlink_anchor').focus();
				}
			}, 1);
		},
		set: function() {
			var linktext = $('#anchorlink_linktext').val();
			var anchor = $('#anchorlink_anchor').val();
			this.modal.close();

			var selectedText = this.selection.text();

			if (selectedText != '') {
				var linktext = selectedText;
			}

			this.insert.html('<a href="#'+anchor+'">'+linktext+'</a>');
		}
	};
};
$.Redactor.prototype.blockquote = function() {
	return {
		langs: {
			de: {
				"blockquote": "Zitat"
			},
			en: {
				"blockquote": "Quote"
			},
			es: {
				"blockquote": "Entrecomillas"
			}
		},
		init: function() {
			var button = this.button.add('blockquote', this.lang.get('blockquote'));
			this.button.setIcon(button, '<i class="fa fa-quote-left"></i>');
			this.button.addCallback(button, this.blockquote.set);
		},
		set: function() {
			this.block.format('blockquote');
		}
	};
};
$.Redactor.prototype.bold = function() {
	return {
		langs: {
			de: {
				"bold": "Fett"
			},
			en: {
				"bold": "Bold"
			},
			es: {
				"bold": "Negrita"
			}
		},
		init: function() {
			var button = this.button.add('bold', this.lang.get('bold'));
			this.button.setIcon(button, '<i class="fa fa-bold"></i>');
			this.button.addCallback(button, this.bold.set);
		},
		set: function() {
			this.inline.format('bold');
		}
	};
};
$.Redactor.prototype.cleaner = function() {
	return {
		langs: {
			de: {
				"cleaner": "Formatierungen entfernen"
			},
			en: {
				"cleaner": "Remove formats"
			},
			es: {
				"cleaner": "Eliminar formatos"
			}
		},
		init: function() {
			var button = this.button.add('cleaner', this.lang.get('cleaner'));
			this.button.setIcon(button, '<i class="fa fa-eraser"></i>');
			this.button.addCallback(button, this.cleaner.set);
		},
		set: function() {
			var isRedactorSelected = this.selection.isRedactor();
			if (this.selection.isRedactor()) {
				// remove what already can be removed
				this.inline.removeFormat();
				this.inline.removeAllAttr();
				this.inline.removeAllClass();

				// get the current selection
				var html = this.selection.html();

				// Strip out html
				html = html.replace(/(<([^>]+)>)/ig,"");

				// buffer
				this.buffer.set();

				// Replace selection with clean text
				this.selection.replace(html);

				// Sync code
				this.code.sync();
			}
		}
	};
};
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
$.Redactor.prototype.deleted = function() {
	return {
		langs: {
			de: {
				"deleted": "Durchgestrichen"
			},
			en: {
				"deleted": "Strikethrough"
			},
			es: {
				"deleted": "Tachado"
			}
		},
		init: function() {
			var button = this.button.add('deleted', this.lang.get('deleted'));
			this.button.setIcon(button, '<i class="fa fa-strikethrough"></i>');
			this.button.addCallback(button, this.deleted.set);
		},
		set: function() {
			this.inline.format('deleted');
		}
	};
};
$.Redactor.prototype.emaillink = function() {
	return {
		langs: {
			de: {
				"emaillink": "Emaillink",
				"emaillink_linktext": "Linktext",
				"emaillink_emailaddress": "Emailadresse",
				"emaillink_insert": "Einfügen",
				"emaillink_abort": "Abbrechen"
			},
			en: {
				"emaillink": "Emaillink",
				"emaillink_linktext": "Linktext",
				"emaillink_emailaddress": "Emailaddress",
				"emaillink_insert": "Insert",
				"emaillink_abort": "Abort"
			},
			es: {
				"emaillink": "Link de email",
				"emaillink_linktext": "Texto de link",
				"emaillink_emailaddress": "Dirección de email",
				"emaillink_insert": "Insertar",
				"emaillink_abort": "Cancelar"
			}
		},
		getTemplate: function() {
			var selectedText = this.selection.text();

			var modalContent = '';
			modalContent += '<div class="modal-section" id="redactor-modal-emaillink">';

			if (selectedText == '') {
				modalContent += '  <section>';
				modalContent += '    <label for="emaillink_linktext">' + this.lang.get('emaillink_linktext') + '</label>';
				modalContent += '    <input type="text" id="emaillink_linktext">';
				modalContent += '  </section>';
			}

			modalContent += '  <section>';
			modalContent += '    <label for="emaillink_emailaddress">' + this.lang.get('emaillink_emailaddress') + '</label>';
			modalContent += '    <input type="text" id="emaillink_emailaddress">';
			modalContent += '  </section>';
			modalContent += '  <section>';
			modalContent += '    <button id="redactor-modal-button-action">' + this.lang.get('emaillink_insert') + '</button>';
			modalContent += '    <button id="redactor-modal-button-cancel">' + this.lang.get('emaillink_abort') + '</button>';
			modalContent += '  </section>';
			modalContent += '</div>';

			return String() + modalContent;
		},
		init: function() {
			var button = this.button.add('emaillink', this.lang.get('emaillink'));
			this.button.setIcon(button, '<i class="fa fa-link"></i>');
			this.button.addCallback(button, this.emaillink.show);
		},
		show: function() {
			this.modal.addTemplate('emaillink', this.emaillink.getTemplate());
			this.modal.load('emaillink', this.lang.get('emaillink'), 600);

			var button = this.modal.getActionButton();
			button.on('click', this.emaillink.set);

			this.modal.show();

			setTimeout(function() {
				if ($('#emaillink_linktext').length != 0) {
					document.getElementById('emaillink_linktext').focus();
				} else {
					document.getElementById('emaillink_emailaddress').focus();
				}
			}, 1);
		},
		set: function() {
			var linktext = $('#emaillink_linktext').val();
			var emailaddress = $('#emaillink_emailaddress').val();
			this.modal.close();

			var selectedText = this.selection.text();

			if (selectedText != '') {
				var linktext = selectedText;
			}

			this.insert.html('<a href="mailto:'+emailaddress+'">'+linktext+'</a>');
		}
	};
};
$.Redactor.prototype.externallink = function() {
	return {
		langs: {
			de: {
				"externallink": "Externer Link",
				"externallink_linktext": "Linktext",
				"externallink_linkurl": "URL",
				"externallink_insert": "Einfügen",
				"externallink_abort": "Abbrechen"
			},
			en: {
				"externallink": "External link",
				"externallink_linktext": "Linktext",
				"externallink_linkurl": "URL",
				"externallink_insert": "Insert",
				"externallink_abort": "Cancel"
			},
			es: {
				"externallink": "Enlace externo",
				"externallink_linktext": "Texto de Link",
				"externallink_linkurl": "URL",
				"externallink_insert": "Insertar",
				"externallink_abort": "Cancelar"
			}
		},
		getTemplate: function() {
			var selectedText = this.selection.text();

			var modalContent = '';
			modalContent += '<div class="modal-section" id="redactor-modal-externallink">';

				if (selectedText == '') {
					modalContent += '  <section>';
					modalContent += '    <label for="externallink_linktext">' + this.lang.get('externallink_linktext') + '</label>';
					modalContent += '    <input type="text" id="externallink_linktext">';
					modalContent += '  </section>';
				}

				modalContent += '  <section>';
				modalContent += '    <label for="externallink_linkurl">' + this.lang.get('externallink_linkurl') + '</label>';
				modalContent += '    <input type="text" id="externallink_linkurl">';
				modalContent += '  </section>';
				modalContent += '  <section>';
				modalContent += '    <button id="redactor-modal-button-action">' + this.lang.get('externallink_insert') + '</button>';
				modalContent += '    <button id="redactor-modal-button-cancel">' + this.lang.get('externallink_abort') + '</button>';
				modalContent += '  </section>';
				modalContent += '</div>';

			return String() + modalContent;
		},
		init: function() {
			var button = this.button.add('externallink', this.lang.get('externallink'));
			this.button.setIcon(button, '<i class="fa fa-link"></i>');
			this.button.addCallback(button, this.externallink.show);
		},
		show: function() {
			this.modal.addTemplate('externallink', this.externallink.getTemplate());
			this.modal.load('externallink', this.lang.get('externallink'), 600);

			var button = this.modal.getActionButton();
			button.on('click', this.externallink.set);

			this.modal.show();

			setTimeout(function() {
				if ($('#externallink_linktext').length != 0) {
					document.getElementById('externallink_linktext').focus();
				} else {
					document.getElementById('externallink_linkurl').focus();
				}
			}, 1);
		},
		set: function() {
			var linktext = $('#externallink_linktext').val();
			var linkurl = $('#externallink_linkurl').val();
			this.modal.close();

			var selectedText = this.selection.text();

			if (selectedText != '') {
				var linktext = selectedText;
			}

			if (this.opts.externalUrlTarget == 'self') {
				this.insert.html('<a href="'+linkurl+'">'+linktext+'</a>');
			} else {
				this.insert.html('<a href="'+linkurl+'" target="_blank">'+linktext+'</a>');
			}
		}
	};
};
$.Redactor.prototype.fontcolor = function() {
	return {
		langs: {
			de: {
				"fontcolor": "Schriftfarbe",
				"fontcolor_remove": "Schriftfarbe entfernen",
			},
			en: {
				"fontcolor": "Fontcolor",
				"fontcolor_remove": "Remove fontcolor",
			},
			es: {
				"fontcolor": "Color de fuente",
				"fontcolor_remove": "Borrar color de fuente",
			}
		},
		init: function () {
			if (!this.opts.fontcolor) return;
			var colors = this.opts.fontcolor;

			var that = this;
			var dropdown = {};

			$.each(colors, function(i, s) {
				dropdown['s' + i] = {
					title: s[0],
					func: function() {
						that.fontcolor.set(s[1]);
					}
				};
			});

			dropdown['s' + colors.length] = {
				title: this.lang.get('fontcolor_remove'),
				func: function() {
					that.fontcolor.remove();
				}
			}

			var button = this.button.add('fontcolor', this.lang.get('fontcolor'));
			this.button.setIcon(button, '<i class="fa fa-paint-brush"></i>');
			this.button.addDropdown(button, dropdown);
		},
		set: function(value) {
			this.inline.format('span', 'style', 'color: ' + value + ';');
		},
		remove: function() {
			this.inline.removeFormat();
			//this.inline.removeStyleRule('color');
		}
	};
};
$.Redactor.prototype.fontfamily = function() {
	return {
		langs: {
			de: {
				"fontfamily": "Schriftart",
				"fontfamily_remove": "Schriftart entfernen",
			},
			en: {
				"fontfamily": "Fontfamily",
				"fontfamily_remove": "Remove fontfamily",
			},
			es: {
				"fontfamily": "Tipográfia",
				"fontfamily_remove": "Borrar tipográfia",
			}
		},
		init: function () {
			if (!this.opts.fontfamily) return;
			var fonts = this.opts.fontfamily;

			var that = this;
			var dropdown = {};

			$.each(fonts, function(i, s) {
				dropdown['s' + i] = {
					title: s,
					func: function() {
						that.fontfamily.set(s);
					}
				};
			});

			dropdown['s' + fonts.length] = {
				title: this.lang.get('fontfamily_remove'),
				func: function() {
					that.fontfamily.remove();
				}
			};

			var button = this.button.add('fontfamily', this.lang.get('fontfamily'));
			this.button.setIcon(button, '<i class="fa fa-font"></i>');
			this.button.addDropdown(button, dropdown);
		},
		set: function(value) {
			this.inline.format('span', 'style', 'font-family:' + value + ';');
		},
		remove: function() {
			this.inline.removeStyleRule('font-family');
		}
	};
};
$.Redactor.prototype.fontsize = function() {
	return {
		langs: {
			de: {
				"fontsize": "Schriftgrösse",
				"fontsize_remove": "Schriftgrösse entfernen",
			},
			en: {
				"fontsize": "Fontsize",
				"fontsize_remove": "Remove fontsize",
			},
			es: {
				"fontsize": "Tamaño de fuente",
				"fontsize_remove": "Borrar tamaño de fuente",
			}
		},
		init: function() {
			if (!this.opts.fontsize) return;
			var fonts = this.opts.fontsize;

			var that = this;
			var dropdown = {};

			$.each(fonts, function(i, s) {
				dropdown['s' + i] = {
					title: s,
					func: function() {
						that.fontsize.set(s);
					}
				};
			});

			dropdown['s' + fonts.length] = {
				title: this.lang.get('fontsize_remove'),
				func: function() {
					that.fontsize.remove();
				}
			};

			var button = this.button.add('fontsize', this.lang.get('fontsize'));
			this.button.setIcon(button, '<i class="fa fa-text-height"></i>');
			this.button.addDropdown(button, dropdown);
		},
		set: function(size) {
			this.inline.format('span', 'style', 'font-size: ' + size + ';');
		},
		remove: function() {
			this.inline.removeStyleRule('font-size');
		}
	};
};
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
$.Redactor.prototype.fullscreen = function() {
	return {
		langs: {
			de: {
				"fullscreen": "Vollbild"
			},
			en: {
				"fullscreen": "Fullscreen"
			},
			es: {
				"fullscreen": "Pantalla completa"
			}
		},
		init: function()
		{
			this.fullscreen.isOpen = false;

			var button = this.button.add('fullscreen', this.lang.get('fullscreen'));
			this.button.setIcon(button, '<i class="fa fa-expand"></i>');
			this.button.addCallback(button, this.fullscreen.toggle);

			if (this.opts.fullscreen)
			{
				this.fullscreen.toggle();
			}

		},
		enable: function()
		{
			this.fullscreen.isOpened = false;
			this.button.setActive('fullscreen');
			this.fullscreen.isOpen = true;

			if (!this.opts.fullscreen)
			{
				this.selection.save();
			}

			if (this.opts.toolbarExternal)
			{
				this.fullscreen.toolcss = {};
				this.fullscreen.boxcss = {};
				this.fullscreen.toolcss.width = this.$toolbar.css('width');
				this.fullscreen.toolcss.top = this.$toolbar.css('top');
				this.fullscreen.toolcss.position = this.$toolbar.css('position');
				this.fullscreen.boxcss.top = this.$box.css('top');
			}

			this.fullscreen.height = this.core.editor().height();

			if (this.opts.maxHeight)
			{
				this.core.editor().css('max-height', '');
			}

			if (this.opts.minHeight)
			{
				this.core.editor().css('min-height', '');
			}

			if (!this.$fullscreenPlaceholder)
			{
				this.$fullscreenPlaceholder = $('<div/>');
			}

			this.$fullscreenPlaceholder.insertAfter(this.$box);

			this.core.box().appendTo(document.body);
			this.core.box().addClass('redactor-box-fullscreen');

			$('body').addClass('redactor-body-fullscreen');
			$('body, html').css('overflow', 'hidden');

			this.fullscreen.resize();

			if (!this.opts.fullscreen)
			{
				this.selection.restore();
			}

			this.toolbar.observeScrollDisable();
			$(window).on('resize.redactor-plugin-fullscreen', $.proxy(this.fullscreen.resize, this));
			$(document).scrollTop(0, 0);

			var self = this;
			setTimeout(function()
			{
				self.fullscreen.isOpened = true;
			}, 10);

		},
		disable: function()
		{
			this.button.setInactive('fullscreen');
			this.fullscreen.isOpened = undefined;
			this.fullscreen.isOpen = false;
			this.selection.save();

			$(window).off('resize.redactor-plugin-fullscreen');
			$('body, html').css('overflow', '');

			this.core.box().insertBefore(this.$fullscreenPlaceholder);
			this.$fullscreenPlaceholder.remove();

			this.core.box().removeClass('redactor-box-fullscreen').css({ width: 'auto', height: 'auto' });
			this.core.box().removeClass('redactor-box-fullscreen');

			if (this.opts.toolbarExternal)
			{
				this.core.box().css('top', this.fullscreen.boxcss.top);
				this.core.toolbar().css({
					'width': this.fullscreen.toolcss.width,
					'top': this.fullscreen.toolcss.top,
					'position': this.fullscreen.toolcss.position
				});
			}

			if (this.opts.minHeight)
			{
				this.core.editor().css('minHeight', this.opts.minHeight);
			}

			if (this.opts.maxHeight)
			{
				this.core.editor().css('maxHeight', this.opts.maxHeight);
			}

			this.core.editor().css('height', 'auto');
			this.selection.restore();
		},
		toggle: function()
		{
			return (this.fullscreen.isOpen) ? this.fullscreen.disable() : this.fullscreen.enable();
		},
		resize: function()
		{
			if (!this.fullscreen.isOpen)
			{
				return;
			}

			var toolbarHeight = this.button.toolbar().height();
			var padding = parseInt(this.core.editor().css('padding-top')) + parseInt(this.core.editor().css('padding-bottom'));
			var height = $(window).height() - toolbarHeight - padding;

			this.core.box().width($(window).width()).height(height);

			if (this.opts.toolbarExternal)
			{
				this.core.toolbar().css({
					'top': '0px',
					'position': 'absolute',
					'width': '100%'
				});

				this.core.box().css('top', toolbarHeight + 'px');
			}

			this.core.editor().height(height);
		}
	};
};
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
			},
			es: {
				"groupheading": "Título",
				"groupheading_1": "Título 1",
				"groupheading_2": "Título 2",
				"groupheading_3": "Título 3",
				"groupheading_4": "Título 4",
				"groupheading_5": "Título 5",
				"groupheading_6": "Título 6",
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
$.Redactor.prototype.grouplink = function() {
	return {
		langs: {
			de: {
				"grouplink": "Link",
				"grouplink_email": "Emaillink",
				"grouplink_email_emailaddress": "Emailadresse",
				"grouplink_external": "Externer Link",
				"grouplink_external_url": "URL",
				"grouplink_internal": "Interner Link",
				"grouplink_media": "Media Link",
				"grouplink_telephone": "Telefonlink",
				"grouplink_telephone_telephonenumber": "Telefonnummer",
				"grouplink_anchor": "Ankerlink",
				"grouplink_anchor_anchor": "Anker",
				"grouplink_grouplinktext": "Linktext",
				"grouplink_insert": "Einfügen",
				"grouplink_abort": "Abbrechen"
			},
			en: {
				"grouplink": "Link",
				"grouplink_email": "Emaillink",
				"grouplink_email_emailaddress": "Emailaddress",
				"grouplink_external": "External link",
				"grouplink_external_url": "URL",
				"grouplink_internal": "Internal link",
				"grouplink_media": "Media link",
				"grouplink_telephone": "Telephonelink",
				"grouplink_telephone_telephonenumber": "Telephonenumber",
				"grouplink_anchor": "Anchorlink",
				"grouplink_anchor_anchor": "Anchor",
				"grouplink_grouplinktext": "Linktext",
				"grouplink_insert": "Insert",
				"grouplink_abort": "Abort"
			},
			es: {
				"grouplink": "Enlazar",
				"grouplink_email": "Enlace de email",
				"grouplink_email_emailaddress": "Dirección de email",
				"grouplink_external": "Enlace externo",
				"grouplink_external_url": "URL",
				"grouplink_internal": "Enlace interno",
				"grouplink_media": "Enlace de medios",
				"grouplink_telephone": "Enlace telefónico",
				"grouplink_telephone_telephonenumber": "Número de teléfono",
				"grouplink_anchor": "Enlace de anclaje",
				"grouplink_anchor_anchor": "Ancla",
				"grouplink_grouplinktext": "Texto del enlace",
				"grouplink_insert": "Insertar",
				"grouplink_abort": "Cancelar"
			}
		},
		init: function()
		{
			if (!this.opts.grouplink) return;
			var grouplink = this.opts.grouplink;

			var that = this;
			var dropdown = {};

			if (grouplink.indexOf("email") != -1) {
				dropdown.email = { title: that.lang.get('grouplink_email'), func: that.grouplink.setEmail };
			}
			if (grouplink.indexOf("external") != -1) {
				dropdown.external = { title: that.lang.get('grouplink_external'), func: that.grouplink.setExternal };
			}
			if (grouplink.indexOf("internal") != -1) {
				dropdown.internal = { title: that.lang.get('grouplink_internal'), func: that.grouplink.setInternal };
			}
			if (grouplink.indexOf("media") != -1) {
				dropdown.media = { title: that.lang.get('grouplink_media'), func: that.grouplink.setMedia };
			}
			if (grouplink.indexOf("telephone") != -1) {
				dropdown.telephone = { title: that.lang.get('grouplink_telephone'), func: that.grouplink.setTelephone };
			}
			if (grouplink.indexOf("anchor") != -1) {
				dropdown.anchor = { title: that.lang.get('grouplink_anchor'), func: that.grouplink.setAnchor };
			}

			var button = this.button.add('grouplink', this.lang.get('grouplink'));
			this.button.setIcon(button, '<i class="fa fa-link"></i>');
			this.button.addDropdown(button, dropdown);
		},
		getEmailTemplate: function() {
			var selectedText = this.selection.text();

			var modalContent = '';
			modalContent += '<div class="modal-section" id="redactor-modal-emailgrouplink">';

			if (selectedText == '') {
				modalContent += '  <section>';
				modalContent += '    <label for="emailgrouplink_grouplinktext">' + this.lang.get('grouplink_grouplinktext') + '</label>';
				modalContent += '    <input type="text" id="emailgrouplink_grouplinktext">';
				modalContent += '  </section>';
			}

			modalContent += '  <section>';
			modalContent += '    <label for="emailgrouplink_emailaddress">' + this.lang.get('grouplink_email_emailaddress') + '</label>';
			modalContent += '    <input type="text" id="emailgrouplink_emailaddress">';
			modalContent += '  </section>';
			modalContent += '  <section>';
			modalContent += '    <button id="redactor-modal-button-action">' + this.lang.get('grouplink_insert') + '</button>';
			modalContent += '    <button id="redactor-modal-button-cancel">' + this.lang.get('grouplink_abort') + '</button>';
			modalContent += '  </section>';
			modalContent += '</div>';

			return String() + modalContent;
		},
		getTelephoneTemplate: function() {
			var selectedText = this.selection.text();

			var modalContent = '';
			modalContent += '<div class="modal-section" id="redactor-modal-telephonegrouplink">';

			if (selectedText == '') {
				modalContent += '  <section>';
				modalContent += '    <label for="telephonegrouplink_grouplinktext">' + this.lang.get('grouplink_grouplinktext') + '</label>';
				modalContent += '    <input type="text" id="telephonegrouplink_grouplinktext">';
				modalContent += '  </section>';
			}

			modalContent += '  <section>';
			modalContent += '    <label for="telephonegrouplink_telephonenumber">' + this.lang.get('grouplink_telephone_telephonenumber') + '</label>';
			modalContent += '    <input type="text" id="telephonegrouplink_telephonenumber">';
			modalContent += '  </section>';
			modalContent += '  <section>';
			modalContent += '    <button id="redactor-modal-button-action">' + this.lang.get('grouplink_insert') + '</button>';
			modalContent += '    <button id="redactor-modal-button-cancel">' + this.lang.get('grouplink_abort') + '</button>';
			modalContent += '  </section>';
			modalContent += '</div>';

			return String() + modalContent;
		},
		getAnchorTemplate: function() {
			var selectedText = this.selection.text();

			var modalContent = '';
			modalContent += '<div class="modal-section" id="redactor-modal-anchorgrouplink">';

			if (selectedText == '') {
				modalContent += '  <section>';
				modalContent += '    <label for="anchorgrouplink_grouplinktext">' + this.lang.get('grouplink_grouplinktext') + '</label>';
				modalContent += '    <input type="text" id="anchorgrouplink_grouplinktext">';
				modalContent += '  </section>';
			}

			modalContent += '  <section>';
			modalContent += '    <label for="anchorgrouplink_anchor">' + this.lang.get('grouplink_anchor_anchor') + '</label>';
			modalContent += '    <input type="text" id="anchorgrouplink_anchor">';
			modalContent += '  </section>';
			modalContent += '  <section>';
			modalContent += '    <button id="redactor-modal-button-action">' + this.lang.get('grouplink_insert') + '</button>';
			modalContent += '    <button id="redactor-modal-button-cancel">' + this.lang.get('grouplink_abort') + '</button>';
			modalContent += '  </section>';
			modalContent += '</div>';

			return String() + modalContent;
		},
		getExternalTemplate: function() {
			var selectedText = this.selection.text();

			var modalContent = '';
			modalContent += '<div class="modal-section" id="redactor-modal-externalgrouplink">';

			if (selectedText == '') {
				modalContent += '  <section>';
				modalContent += '    <label for="externalgrouplink_grouplinktext">' + this.lang.get('grouplink_grouplinktext') + '</label>';
				modalContent += '    <input type="text" id="externalgrouplink_grouplinktext">';
				modalContent += '  </section>';
			}

			modalContent += '  <section>';
			modalContent += '    <label for="externalgrouplink_grouplinkurl">' + this.lang.get('grouplink_external_url') + '</label>';
			modalContent += '    <input type="text" id="externalgrouplink_grouplinkurl">';
			modalContent += '  </section>';
			modalContent += '  <section>';
			modalContent += '    <button id="redactor-modal-button-action">' + this.lang.get('grouplink_insert') + '</button>';
			modalContent += '    <button id="redactor-modal-button-cancel">' + this.lang.get('grouplink_abort') + '</button>';
			modalContent += '  </section>';
			modalContent += '</div>';

			return String() + modalContent;
		},
		setEmail: function()
		{
			this.modal.addTemplate('grouplink', this.grouplink.getEmailTemplate());
			this.modal.load('grouplink', this.lang.get('grouplink_email'), 600);

			var button = this.modal.getActionButton();
			button.on('click', this.grouplink.insertEmail);

			this.modal.show();

			setTimeout(function() {
				if ($('#emailgrouplink_grouplinktext').length != 0) {
					document.getElementById('emailgrouplink_grouplinktext').focus();
				} else {
					document.getElementById('emailgrouplink_emailaddress').focus();
				}
			}, 1);
		},
		setTelephone: function()
		{
			this.modal.addTemplate('grouplink', this.grouplink.getTelephoneTemplate());
			this.modal.load('grouplink', this.lang.get('grouplink_telephone'), 600);

			var button = this.modal.getActionButton();
			button.on('click', this.grouplink.insertTelephone);

			this.modal.show();

			setTimeout(function() {
				if ($('#telephonegrouplink_grouplinktext').length != 0) {
					document.getElementById('telephonegrouplink_grouplinktext').focus();
				} else {
					document.getElementById('telephonegrouplink_telephonenumber').focus();
				}
			}, 1);
		},
		setAnchor: function()
		{
			this.modal.addTemplate('grouplink', this.grouplink.getAnchorTemplate());
			this.modal.load('grouplink', this.lang.get('grouplink_anchor'), 600);

			var button = this.modal.getActionButton();
			button.on('click', this.grouplink.insertAnchor);

			this.modal.show();

			setTimeout(function() {
				if ($('#anchorgrouplink_grouplinktext').length != 0) {
					document.getElementById('anchorgrouplink_grouplinktext').focus();
				} else {
					document.getElementById('anchorgrouplink_anchor').focus();
				}
			}, 1);
		},
		setExternal: function()
		{
			this.modal.addTemplate('grouplink', this.grouplink.getExternalTemplate());
			this.modal.load('grouplink', this.lang.get('grouplink_external'), 600);

			var button = this.modal.getActionButton();
			button.on('click', this.grouplink.insertExternal);

			this.modal.show();

			setTimeout(function() {
				if ($('#externalgrouplink_grouplinktext').length != 0) {
					document.getElementById('externalgrouplink_grouplinktext').focus();
				} else {
					document.getElementById('externalgrouplink_grouplinkurl').focus();
				}
			}, 1);
		},
		setInternal: function()
		{
			var that = this;
			var grouplinkMap = openLinkMap('', '&clang='+ rex.clang_id);
			$(grouplinkMap).on('rex:selectLink', function (event, grouplinkurl, grouplinktext) {
				event.preventDefault();
				grouplinkMap.close();

				that.grouplink.insertInternal(grouplinkurl, grouplinktext);
			});
		},
		setMedia: function()
		{
			var that = this;
			var mediapool = openMediaPool('redactor_mediagrouplink');
			$(mediapool).on('rex:selectMedia', function (event, filename) {
				event.preventDefault();
				mediapool.close();

				that.grouplink.insertMedia(filename);
			});
		},
		insertEmail: function()
		{
			var grouplinktext = $('#emailgrouplink_grouplinktext').val();
			var emailaddress = $('#emailgrouplink_emailaddress').val();
			this.modal.close();

			var selectedText = this.selection.text();

			if (selectedText != '') {
				var grouplinktext = selectedText;
			}

			this.insert.html('<a href="mailto:'+emailaddress+'">'+grouplinktext+'</a>');
		},
		insertTelephone: function()
		{
			var grouplinktext = $('#telephonegrouplink_grouplinktext').val();
			var telephonenumber = $('#telephonegrouplink_telephonenumber').val();
			this.modal.close();

			var selectedText = this.selection.text();

			if (selectedText != '') {
				var grouplinktext = selectedText;
			}

			this.insert.html('<a href="tel:'+telephonenumber+'">'+grouplinktext+'</a>');
		},
		insertAnchor: function()
		{
			var grouplinktext = $('#anchorgrouplink_grouplinktext').val();
			var anchor = $('#anchorgrouplink_anchor').val();
			this.modal.close();

			var selectedText = this.selection.text();

			if (selectedText != '') {
				var grouplinktext = selectedText;
			}

			this.insert.html('<a href="#'+anchor+'">'+grouplinktext+'</a>');
		},
		insertExternal: function() {
			var grouplinktext = $('#externalgrouplink_grouplinktext').val();
			var grouplinkurl = $('#externalgrouplink_grouplinkurl').val();
			this.modal.close();

			var selectedText = this.selection.text();

			if (selectedText != '') {
				var grouplinktext = selectedText;
			}

			if (this.opts.externalUrlTarget == 'self') {
				this.insert.html('<a href="'+grouplinkurl+'">'+grouplinktext+'</a>');
			} else {
				this.insert.html('<a href="'+grouplinkurl+'" target="_blank">'+grouplinktext+'</a>');
			}
		},
		insertInternal: function(grouplinkurl, grouplinktext) {
			var selectedText = this.selection.text();

			if (selectedText != '') {
				var grouplinktext = selectedText;
			}

			this.insert.html('<a href="'+grouplinkurl+'">'+grouplinktext+'</a>');
		},
		insertMedia: function(filename) {
			var selectedText = this.selection.text();

			if (selectedText != '') {
				var grouplinktext = selectedText;
			} else {
				var grouplinktext = filename;
			}

			this.insert.html('<a href="/media/'+filename+'">'+grouplinktext+'</a>');
		}
	};
};
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
			},
			es: {
				"grouplist": "Lista",
				"grouplist_unorderedlist": "Lista desordenada",
				"grouplist_orderedlist": "Lista ordenada",
				"grouplist_indent": "Sangría",
				"grouplist_outdent": "Sangría negativa",
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
$.Redactor.prototype.heading1 = function() {
	return {
			langs: {
				de: {
					"heading1": "Überschrift 1"
				},
				en: {
					"heading1": "Header 1"
				},
				es: {
					"heading1": "Título 1"
				}
			},
		init: function() {
			var button = this.button.add('heading1', this.lang.get('heading1'));
			this.button.setIcon(button, '<i class="fa fa-header"></i>');
			this.button.addCallback(button, this.heading1.set);
		},
		set: function() {
			this.block.format('h1');
            this.selection.remove();
		}
	};
};
$.Redactor.prototype.heading2 = function() {
	return {
			langs: {
				de: {
					"heading2": "Überschrift 2"
				},
				en: {
					"heading2": "Header 2"
				},
				es: {
					"heading2": "Título 2"
				}
			},
		init: function() {
			var button = this.button.add('heading2', this.lang.get('heading2'));
			this.button.setIcon(button, '<i class="fa fa-header"></i>');
			this.button.addCallback(button, this.heading2.set);
		},
		set: function() {
			this.block.format('h2');
            this.selection.remove();
		}
	};
};
$.Redactor.prototype.heading3 = function() {
	return {
			langs: {
				de: {
					"heading3": "Überschrift 3"
				},
				en: {
					"heading3": "Header 3"
				},
				es: {
					"heading3": "Título 3"
				}
			},
		init: function() {
			var button = this.button.add('heading3', this.lang.get('heading3'));
			this.button.setIcon(button, '<i class="fa fa-header"></i>');
			this.button.addCallback(button, this.heading3.set);
		},
		set: function() {
			this.block.format('h3');
            this.selection.remove();
		}
	};
};
$.Redactor.prototype.heading4 = function() {
	return {
			langs: {
				de: {
					"heading4": "Überschrift 4"
				},
				en: {
					"heading4": "Header 4"
				},
				es: {
					"heading4": "Título 4"
				}
			},
		init: function() {
			var button = this.button.add('heading4', this.lang.get('heading4'));
			this.button.setIcon(button, '<i class="fa fa-header"></i>');
			this.button.addCallback(button, this.heading4.set);
		},
		set: function() {
			this.block.format('h4');
            this.selection.remove();
		}
	};
};
$.Redactor.prototype.heading5 = function() {
	return {
			langs: {
				de: {
					"heading5": "Überschrift 5"
				},
				en: {
					"heading5": "Header 5"
				},
				es: {
					"heading5": "Título 5"
				}
			},
		init: function() {
			var button = this.button.add('heading5', this.lang.get('heading5'));
			this.button.setIcon(button, '<i class="fa fa-header"></i>');
			this.button.addCallback(button, this.heading5.set);
		},
		set: function() {
			this.block.format('h5');
            this.selection.remove();
		}
	};
};
$.Redactor.prototype.heading6 = function() {
	return {
			langs: {
				de: {
					"heading6": "Überschrift 6"
				},
				en: {
					"heading6": "Header 6"
				},
				es: {
					"heading6": "Título 6"
				}
			},
		init: function() {
			var button = this.button.add('heading6', this.lang.get('heading6'));
			this.button.setIcon(button, '<i class="fa fa-header"></i>');
			this.button.addCallback(button, this.heading6.set);
		},
		set: function() {
			this.block.format('h6');
            this.selection.remove();
		}
	};
};
$.Redactor.prototype.horizontalrule = function() {
	return {
		langs: {
			de: {
				"horizontalrule": "Linie"
			},
			en: {
				"horizontalrule": "Line"
			},
			es: {
				"horizontalrule": "Línea"
			}
		},
		init: function() {
			var button = this.button.add('horizontalrule', this.lang.get('horizontalrule'));
			this.button.setIcon(button, '<i class="fa fa-minus"></i>');
			this.button.addCallback(button, this.horizontalrule.set);
		},
		set: function() {
			this.insert.html('<hr>');
		}
	};
};
$.Redactor.prototype.internallink = function() {
	return {
		langs: {
			de: {
				"internallink": "Interner Link"
			},
			en: {
				"internallink": "Internal link"
			},
			es: {
				"internallink": "Enlace interno"
			}
		},
		init: function() {
			var button = this.button.add('internallink', this.lang.get('internallink'));
			this.button.setIcon(button, '<i class="fa fa-link"></i>');
			this.button.addCallback(button, this.internallink.show);
		},
		show: function() {
			var that = this;
			var linkMap = openLinkMap('', '&clang='+rex.clang_id);
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
$.Redactor.prototype.italic = function() {
	return {
		langs: {
			de: {
				"italic": "Kursiv"
			},
			en: {
				"italic": "Italic"
			},
			es: {
				"italic": "Itálico"
			}
		},

		init: function() {
			var button = this.button.add('italic', this.lang.get('italic'));
			this.button.setIcon(button, '<i class="fa fa-italic"></i>');
			this.button.addCallback(button, this.italic.set);
		},
		set: function() {
			this.inline.format('italic');
		}
	};
};
(function($)
{
	$.Redactor.prototype.limiter = function()
	{
		return {
			init: function()
			{
				if (!this.opts.limiter)
				{
					return;
				}

				this.core.editor().on('keydown.redactor-plugin-limiter', $.proxy(function(e)
				{
					var key = e.which;
					var ctrl = e.ctrlKey || e.metaKey;

					if (key === this.keyCode.BACKSPACE
					   	|| key === this.keyCode.DELETE
					    || key === this.keyCode.ESC
					    || key === this.keyCode.SHIFT
					    || (ctrl && key === 65)
					    || (ctrl && key === 82)
					    || (ctrl && key === 116)
					)
					{
						return;
					}

					var text = this.core.editor().text();
					text = text.replace(/\u200B/g, '');

					var count = text.length;
					if (count >= this.opts.limiter)
					{
						return false;
					}


				}, this));

			}
		};
	};
})(jQuery);
$.Redactor.prototype.media = function() {
	return {
		langs: {
			de: {
				"media": "Media einfügen"
			},
			en: {
				"media": "Insert media"
			},
			es: {
				"media": "Insertar media"
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
			var imageOpenTag = '';
			var imageCloseTag = '';

			if (this.opts.imageTag != '') {
				imageOpenTag = '<'+this.opts.imageTag+'>';
				imageCloseTag = '</'+this.opts.imageTag+'>';
			}

			this.insert.html(imageOpenTag+'<img src="index.php?rex_media_type=redactorImage&rex_media_file='+filename+'" alt="">'+imageCloseTag);
		}
	};
};
$.Redactor.prototype.medialink = function() {
	return {
		langs: {
			de: {
				"medialink": "Media Link"
			},
			en: {
				"medialink": "Media link"
			},
			es: {
				"medialink": "Enlace de Media"
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
$.Redactor.prototype.orderedlist = function() {
	return {
		langs: {
			de: {
				"orderedlist": "Sortierte Liste"
			},
			en: {
				"orderedlist": "Ordered list"
			},
			es: {
				"orderedlist": "Lista ordenada"
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
$.Redactor.prototype.paragraph = function() {
	return {
			langs: {
				de: {
					"paragraph": "Paragraph"
				},
				en: {
					"paragraph": "Paragraph"
				},
				es: {
					"paragraph": "Párrafo"
				}
			},
		init: function() {
			var button = this.button.add('paragraph', this.lang.get('paragraph'));
			this.button.setIcon(button, '<i class="fa fa-paragraph"></i>');
			this.button.addCallback(button, this.paragraph.set);
		},
		set: function() {
			this.block.format('p');
		}
	};
};
(function($)
{
	$.Redactor.prototype.properties = function()
	{
		return {
			langs: {
				de: {
					"properties": "Eigenschaften",
					"properties_save": "Speichern",
					"properties_abort": "Abbrechen"
				},
				en: {
					"properties": "Properties",
					"properties_save": "Save",
					"properties_abort": "Abort"
				},
				es: {
					"properties": "Propiedades",
					"properties_save": "Guardar",
					"properties_abort": "Cancelar"
				}
			},
			block: false,
			labelStyle: {
				'position': 'absolute',
				'padding': '2px 5px',
				'line-height': 1,
				'border-radius': '5px',
				'font-size': '10px',
				'color': 'rgba(255, 255, 255, .9)',
				'z-index': 99
			},
			getTemplate: function()
			{
				 return String()
				 + '<div class="modal-section" id="redactor-modal-properties">'
				 	+ '<section>'
				 		+ '<label id="modal-properties-id-label">ID</label>'
				 		+ '<input type="text" id="modal-properties-id" />'
				 	+ '</section>'
				 	+ '<section>'
					 	+ '<label id="modal-properties-class-label">Class</label>'
					 	+ '<input type="text" id="modal-properties-class" />'
					 + '</section>'
					+ '<section>'
						+ '<button id="redactor-modal-button-action">' + this.lang.get('properties_save') + '</button>'
						+ '<button id="redactor-modal-button-cancel">' + this.lang.get('properties_abort') + '</button>'
					+ '</section>'
				 + '</div>';
			},
			setup: function()
			{
				this.opts.properties = (typeof this.opts.properties === 'undefined') ? {} : this.opts.properties;
				this.opts.properties.id = (typeof this.opts.properties.id === 'undefined') ? true : this.opts.properties.id;
				this.opts.properties.classname = (typeof this.opts.properties.classname === 'undefined') ? true : this.opts.properties.classname;
				this.opts.properties.show = (typeof this.opts.properties.show === 'undefined') ? false : this.opts.properties.show;

			},
			init: function()
			{
				if (this.opts.type === 'pre' || this.opts.type === 'inline')
				{
					return;
				}

				this.properties.setup();

				this.properties.createLabelId(this.properties.labelStyle);
				this.properties.createLabelClass(this.properties.labelStyle);

				this.properties.setEvents();

				var button = this.button.add('properties', this.lang.get('properties'));
				this.button.setIcon(button, '<i class="fa fa-cog"></i>');
				this.button.addCallback(button, this.properties.show);

			},
			show: function()
			{
				this.modal.addTemplate('properties', this.properties.getTemplate());
				this.modal.load('properties', this.lang.get('properties'), 600);

				var button = this.modal.getActionButton().text(this.lang.get('properties_save'));
				button.on('click', this.properties.save);

				this.properties.showId();
				this.properties.showClass();

				this.modal.show();

			},
			createLabelId: function(css)
			{
				if (!this.opts.properties.show && !this.opts.properties.id)
				{
					return;
				}

				this.properties.labelId = $('<span />').attr('id', 'redactor-properties-label-id-' + this.uuid).attr('title', 'ID').hide();
				this.properties.labelId.css(css).css('background', 'rgba(229, 57, 143, .7)');
				$('body').append(this.properties.labelId);

			},
			createLabelClass: function(css)
			{
				if (!this.opts.properties.show && !this.opts.properties.classname)
				{
					return;
				}

				this.properties.labelClass = $('<span />').attr('id', 'redactor-properties-label-class-' + this.uuid).attr('title', 'class').hide();
				this.properties.labelClass.css(css).css('background', 'rgba(61, 121, 242, .7)');
				$('body').append(this.properties.labelClass);

			},
			setEvents: function()
			{
				this.core.element().on('click.callback.redactor', this.properties.showOnClick);
				$(document).on('mousedown.redactor-properties', $.proxy(this.properties.hideOnBlur, this));

				this.core.element().on('destroy.callback.redactor', $.proxy(function()
				{
					$(document).off('.redactor-properties');

				}, this));
			},
			showId: function()
			{
				if (this.opts.properties.id)
				{
					$('#modal-properties-id-label').show();
					$('#modal-properties-id').show().val($(this.properties.block).attr('id'));
				}
				else
				{
					$('#modal-properties-id, #modal-properties-id-label').hide();
				}
			},
			showClass: function()
			{
				if (this.opts.properties.classname)
				{
					$('#modal-properties-class-label').show();
					$('#modal-properties-class').show().val($(this.properties.block).attr('class'));
				}
				else
				{
					$('#modal-properties-class, #modal-properties-class-label').hide();
				}
			},
			save: function()
			{
				// id
				if (this.opts.properties.id)
				{
					var id = $('#modal-properties-id').val();
					if (typeof id === 'undefined' || id === '')
					{
						this.block.removeAttr('id', this.properties.block);
					}
					else
					{
						this.block.replaceAttr('id', id, this.properties.block);
					}
				}

				// class
				if (this.opts.properties.classname)
				{
					var classname = $('#modal-properties-class').val();
					if (typeof classname === 'undefined' || classname === '')
					{
						this.block.removeAttr('class', this.properties.block);
					}
					else
					{
						this.block.replaceClass(classname, this.properties.block);
					}
				}

				this.modal.close();
				this.properties.showOnClick(false);

			},
			showOnClick: function(e)
			{
				if (e !== false)
				{
					e.preventDefault();
				}

				var zindex = (typeof this.fullscreen !== 'undefined' && this.fullscreen.isOpen) ? 1052 : 99;

				this.properties.block = this.selection.block();
				if (!this.properties.block || !this.utils.isRedactorParent(this.properties.block) || this.utils.isCurrentOrParent(['figure', 'li']))
				{
					return;
				}

				var pos = $(this.properties.block).offset();

				var classname = this.properties.showOnClickClass(pos, zindex);
				this.properties.showOnClickId(pos, zindex, classname);

			},
			showOnClickId: function(pos, zindex, classname)
			{
				var id = $(this.properties.block).attr('id');
				if (this.opts.properties.show && this.opts.properties.id && typeof id !== 'undefined' && id !== '')
				{
					setTimeout($.proxy(function()
					{
						var width = (this.opts.properties.classname && typeof classname !== 'undefined' && classname !== '') ? this.properties.labelClass.innerWidth() : -3;
						this.properties.labelId.css({

							zIndex: zindex,
							top: pos.top - 13,
							left: pos.left + width

						}).show().text('#' + id);

					}, this), 10);
				}
			},
			showOnClickClass: function(pos, zindex)
			{
				var classname = $(this.properties.block).attr('class');
				if (this.opts.properties.show && this.opts.properties.classname && typeof classname !== 'undefined' && classname !== '')
				{
					this.properties.labelClass.css({

						zIndex: zindex,
						top: pos.top - 13,
						left: pos.left - 3

					}).show().text(classname);
				}

				return classname;
			},
			hideOnBlur: function(e)
			{
				if (e.target === this.properties.block)
				{
					return;
				}

				this.properties.hideOnBlurId();
				this.properties.hideOnBlurClass();

			},
			hideOnBlurId: function()
			{
				if (this.opts.properties.show && this.opts.properties.id)
				{
					this.properties.labelId.css('z-index', 99).hide();
				}
			},
			hideOnBlurClass: function()
			{
				if (this.opts.properties.show && this.opts.properties.classname)
				{
					this.properties.labelClass.css('z-index', 99).hide();
				}
			}
		};
	};
})(jQuery);
$.Redactor.prototype.redo = function() {
	return {
		langs: {
			de: {
				"redo": "Wiederholen"
			},
			en: {
				"redo": "Redo"
			},
			es: {
				"redo": "Rehacer"
			}
		},
		init: function() {
			var button = this.button.add('redo', this.lang.get('redo'));
			this.button.setIcon(button, '<i class="fa fa-repeat"></i>');
			this.button.addCallback(button, this.buffer.redo);
		}
	};
};
(function($)
{
	$.Redactor.prototype.source = function()
	{
		return {
			init: function()
			{
				var button = this.button.add('html', 'HTML');
				this.button.setIcon(button, '<i class="fa fa-code"></i>');
				this.button.addCallback(button, this.source.toggle);

				var style = {
					'width': '100%',
					'margin': '0',
					'background': '#1d1d1d',
					'box-sizing': 'border-box',
					'color': '#ccc',
					'font-size': '15px',
					'outline': 'none',
					'padding': '20px',
					'line-height': '24px',
					'font-family': 'Consolas, Menlo, Monaco, "Courier New", monospace'
				};

				this.source.$textarea = $('<textarea />');
				this.source.$textarea.css(style).hide();

				if (this.opts.type === 'textarea')
				{
					this.core.box().append(this.source.$textarea);
				}
				else
				{
					this.core.box().after(this.source.$textarea);
				}

				this.core.element().on('destroy.callback.redactor', $.proxy(function()
				{
					this.source.$textarea.remove();

				}, this));

			},
			toggle: function()
			{
				if (this.source.$textarea.hasClass('open'))
				{
    				this.source.hide();
                }
                else
                {
                    this.source.show();
                    this.source.$textarea.on('keyup.redactor-source', $.proxy(function()
                    {
                        var html = this.source.$textarea.val();
                        this.core.callback('change', html);

                    }, this));
                }
			},
			setCaretOnShow: function()
			{
				this.source.offset = this.offset.get();
				var scroll = $(window).scrollTop();

				var	width = this.core.editor().innerWidth();
				var height = this.core.editor().innerHeight();

				// caret position sync
				this.source.start = 0;
				this.source.end = 0;
				var $editorDiv = $("<div/>").append($.parseHTML(this.core.editor().html(), document, true));
				var $selectionMarkers = $editorDiv.find("span.redactor-selection-marker");

				if ($selectionMarkers.length > 0)
				{
					var editorHtml = $editorDiv.html().replace(/&amp;/g, '&');

					if ($selectionMarkers.length === 1)
					{
						this.source.start = this.utils.strpos(editorHtml, $editorDiv.find("#selection-marker-1").prop("outerHTML"));
						this.source.end = this.source.start;
					}
					else if ($selectionMarkers.length === 2)
					{
						this.source.start = this.utils.strpos(editorHtml, $editorDiv.find("#selection-marker-1").prop("outerHTML"));
						this.source.end = this.utils.strpos(editorHtml, $editorDiv.find("#selection-marker-2").prop("outerHTML")) - $editorDiv.find("#selection-marker-1").prop("outerHTML").toString().length;
					}
				}
			},
			setCaretOnHide: function(html)
			{
			    this.source.start = this.source.$textarea.get(0).selectionStart;
				this.source.end = this.source.$textarea.get(0).selectionEnd;

				// if selection starts from end
				if (this.source.start > this.source.end && this.source.end > 0)
				{
					var tempStart = this.source.end;
					var tempEnd = this.source.start;

					this.source.start = tempStart;
					this.source.end = tempEnd;
				}

				this.source.start = this.source.enlargeOffset(html, this.source.start);
				this.source.end = this.source.enlargeOffset(html, this.source.end);

				html = html.substr(0, this.source.start) + this.marker.html(1) + html.substr(this.source.start);

				if (this.source.end > this.source.start)
				{
					var markerLength = this.marker.html(1).toString().length;

					html = html.substr(0, this.source.end + markerLength) + this.marker.html(2) + html.substr(this.source.end + markerLength);
				}


				return html;

			},
			hide: function()
			{
				this.source.$textarea.removeClass('open').hide();
				this.source.$textarea.off('.redactor-source');

				var code = this.source.$textarea.val();

				code = this.paragraphize.load(code);
				code = this.source.setCaretOnHide(code);
				code = code.replace('&amp;<span id="selection-marker-1" class="redactor-selection-marker">​</span>', '<span id="selection-marker-1" class="redactor-selection-marker">​</span>&amp;');

				this.code.start(code);
				this.button.enableAll();
				this.core.editor().show().focus();
				this.selection.restore();
				this.placeholder.enable();

                this.core.callback('visual');
			},
			show: function()
			{
				this.selection.save();
				this.source.setCaretOnShow();

				var height = this.core.editor().height();
				var code = this.code.get();

                // callback
                code = this.core.callback('source', code);

				this.core.editor().hide();
				this.button.disableAll('html');

				this.source.$textarea.val(code).height(height).addClass('open').show();
				this.source.$textarea.on('keyup.redactor-source', $.proxy(function()
				{
					if (this.opts.type === 'textarea')
					{
						this.core.textarea().val(this.source.$textarea.val());
					}

				}, this));

				this.marker.remove();

				$(window).scrollTop(scroll);

				if (this.source.$textarea[0].setSelectionRange)
				{
					this.source.$textarea[0].setSelectionRange(this.source.start, this.source.end);
				}

				this.source.$textarea[0].scrollTop = 0;

				setTimeout($.proxy(function()
				{
					this.source.$textarea.focus();

				}, this), 0);
			},
			enlargeOffset: function(html, offset)
			{
				var htmlLength = html.length;
				var c = 0;

				if (html[offset] === '>')
				{
					c++;
				}
				else
				{
					for(var i = offset; i <= htmlLength; i++)
					{
						c++;

						if (html[i] === '>')
						{
							break;
						}
						else if (html[i] === '<' || i === htmlLength)
						{
							c = 0;
							break;
						}
					}
				}

				return offset + c;
			}
		};
	};
})(jQuery);
$.Redactor.prototype.styles = function()
{
	return {
		langs: {
			de: {
				"styles": "Styles"
			},
			en: {
				"styles": "Styles"
			},
			es: {
				"styles": "Estilos"
			}
		},
		init: function()
		{
			if (!this.opts.styles) return;
			var styles = this.opts.styles;

			var that = this;
			var dropdown = {};

			$.each(styles, function(i, s)
			{
				dropdown[s[0]] = {
					title: s[1],
					func: function() {
						that.styles.set(s[0]);
					}
				};
			});

			var button = this.button.add('styles', this.lang.get('styles'));
			this.button.setIcon(button, '<i class="fa fa-pencil-square-o"></i>');
			this.button.addDropdown(button, dropdown);
		},
		set: function(value) {
			this.inline.format(value);
		}
	};
};
$.Redactor.prototype.sub = function() {
	return {
		langs: {
			de: {
				"sub": "Tiefgestellt"
			},
			en: {
				"sub": "Sub"
			},
			es: {
				"sub": "Subíndice"
			}
		},
		init: function() {
			var button = this.button.add('sub', this.lang.get('sub'));
			this.button.setIcon(button, '<i class="fa fa-subscript"></i>');
			this.button.addCallback(button, this.sub.set);
		},
		set: function() {
			this.inline.format('sub');
		}
	};
};
$.Redactor.prototype.sup = function() {
	return {
		langs: {
			de: {
				"sup": "Hochgestellt"
			},
			en: {
				"sup": "Sup"
			},
			es: {
				"sup": "Sup"
			}
		},
		init: function() {
			var button = this.button.add('sup', this.lang.get('sup'));
			this.button.setIcon(button, '<i class="fa fa-superscript"></i>');
			this.button.addCallback(button, this.sup.set);
		},
		set: function() {
			this.inline.format('sup');
		}
	};
};
(function($)
{
	$.Redactor.prototype.table = function()
	{
		return {
			langs: {
				de: {
					"table": "Tabelle",
					"insert-table": "Tabelle einfügen",
					"insert-row-above": "Zeile oberhalb einfügen",
					"insert-row-below": "Zeile unterhalb einfügen",
					"insert-column-left": "Spalte links einfügen",
					"insert-column-right": "Spalte rechts einfügen",
					"add-head": "Kopfzeile hinzufügen",
					"delete-head": "Kopfzeile löschen",
					"delete-column": "Spalte löschen",
					"delete-row": "Zeile löschen",
					"delete-table": "Tabelle löschen"
				},
				en: {
					"table": "Table",
					"insert-table": "Insert table",
					"insert-row-above": "Insert row above",
					"insert-row-below": "Insert row below",
					"insert-column-left": "Insert column left",
					"insert-column-right": "Insert column right",
					"add-head": "Add head",
					"delete-head": "Delete head",
					"delete-column": "Delete column",
					"delete-row": "Delete row",
					"delete-table": "Delete table"
				},
				es: {
					"table": "Tabla",
					"insert-table": "Insertar tabla",
					"insert-row-above": "Insertar fila arriba",
					"insert-row-below": "Insertar fila debajo",
					"insert-column-left": "Insertar columna izquierda",
					"insert-column-right": "Insertar columna derecha",
					"add-head": "Agregar cabeza",
					"delete-head": "Borrar cabeza",
					"delete-column": "Borrar columna",
					"delete-row": "Borrar fila",
					"delete-table": "Borrar tabla"
				}
			},
			init: function()
			{
				var dropdown = {};

				dropdown.insert_table = {
									title: this.lang.get('insert-table'),
									func: this.table.insert,
									observe: {
										element: 'table',
										in: {
											attr: {
												'class': 'redactor-dropdown-link-inactive',
												'aria-disabled': true,
											}
										}
									}
								};

				dropdown.insert_row_above = {
									title: this.lang.get('insert-row-above'),
									func: this.table.addRowAbove,
									observe: {
										element: 'table',
										out: {
											attr: {
												'class': 'redactor-dropdown-link-inactive',
												'aria-disabled': true,
											}
										}
									}
								};

				dropdown.insert_row_below = {
									title: this.lang.get('insert-row-below'),
									func: this.table.addRowBelow,
									observe: {
										element: 'table',
										out: {
											attr: {
												'class': 'redactor-dropdown-link-inactive',
												'aria-disabled': true,
											}
										}
									}
								};

				dropdown.insert_column_left = {
									title: this.lang.get('insert-column-left'),
									func: this.table.addColumnLeft,
									observe: {
										element: 'table',
										out: {
											attr: {
												'class': 'redactor-dropdown-link-inactive',
												'aria-disabled': true,
											}
										}
									}
								};

				dropdown.insert_column_right = {
									title: this.lang.get('insert-column-right'),
									func: this.table.addColumnRight,
									observe: {
										element: 'table',
										out: {
											attr: {
												'class': 'redactor-dropdown-link-inactive',
												'aria-disabled': true,
											}
										}
									}
								};

				dropdown.add_head = {
									title: this.lang.get('add-head'),
									func: this.table.addHead,
									observe: {
										element: 'table',
										out: {
											attr: {
												'class': 'redactor-dropdown-link-inactive',
												'aria-disabled': true,
											}
										}
									}
								};

				dropdown.delete_head = {
									title: this.lang.get('delete-head'),
									func: this.table.deleteHead,
									observe: {
										element: 'table',
										out: {
											attr: {
												'class': 'redactor-dropdown-link-inactive',
												'aria-disabled': true,
											}
										}
									}
								};

				dropdown.delete_column = {
									title: this.lang.get('delete-column'),
									func: this.table.deleteColumn,
									observe: {
										element: 'table',
										out: {
											attr: {
												'class': 'redactor-dropdown-link-inactive',
												'aria-disabled': true,
											}
										}
									}
								};

				dropdown.delete_row = {
									title: this.lang.get('delete-row'),
									func: this.table.deleteRow,
									observe: {
										element: 'table',
										out: {
											attr: {
												'class': 'redactor-dropdown-link-inactive',
												'aria-disabled': true,
											}
										}
									}
								};

				dropdown.delete_table = {
									title: this.lang.get('delete-table'),
									func: this.table.deleteTable,
									observe: {
										element: 'table',
										out: {
											attr: {
												'class': 'redactor-dropdown-link-inactive',
												'aria-disabled': true,
											}
										}
									}
								};


				var button = this.button.add('table', this.lang.get('table'));
				this.button.setIcon(button, '<i class="fa fa-table"></i>');
				this.button.addDropdown(button, dropdown);
			},
			insert: function()
			{
				if (this.table.getTable())
				{
					return;
				}

				this.placeholder.hide();

				var rows = 2;
				var columns = 3;
				var $tableBox = $('<div>');
				var $table = $('<table />');


				for (var i = 0; i < rows; i++)
				{
					var $row = $('<tr>');

					for (var z = 0; z < columns; z++)
					{
						var $column = $('<td>' + this.opts.invisibleSpace + '</td>');

						// set the focus to the first td
						if (i === 0 && z === 0)
						{
							$column.append(this.marker.get());
						}

						$($row).append($column);
					}

					$table.append($row);
				}

				$tableBox.append($table);
				var html = $tableBox.html();

				this.buffer.set();

				var current = this.selection.current();
				if ($(current).closest('li', this.core.editor().get(0)).length !== 0)
				{
					$(current).closest('ul, ol').first().after(html);
				}
				else
				{
					this.air.collapsed();
					this.insert.html(html);
				}

				this.selection.restore();
				this.core.callback('insertedTable', $table);
			},
			getTable: function()
			{
				var $table = $(this.selection.current()).closest('table');

				if (!this.utils.isRedactorParent($table))
				{
					return false;
				}

				if ($table.length === 0)
				{
					return false;
				}

				return $table;
			},
			restoreAfterDelete: function($table)
			{
				this.selection.restore();
				$table.find('span.redactor-selection-marker').remove();

			},
			deleteTable: function()
			{
				var $table = this.table.getTable();
				if (!$table)
				{
					return;
				}

				this.buffer.set();


				var $next = $table.next();
				if (!this.opts.linebreaks && $next.length !== 0)
				{
					this.caret.start($next);
				}
				else
				{
					this.caret.after($table);
				}


				$table.remove();


			},
			deleteRow: function()
			{
				var $table = this.table.getTable();
				if (!$table)
				{
					return;
				}

				var $current = $(this.selection.current());

				this.buffer.set();

				var $current_tr = $current.closest('tr');
				var $focus_tr = $current_tr.prev().length ? $current_tr.prev() : $current_tr.next();
				if ($focus_tr.length)
				{
					var $focus_td = $focus_tr.children('td, th').first();
					if ($focus_td.length)
					{
						$focus_td.prepend(this.marker.get());
					}
				}

				$current_tr.remove();
				this.table.restoreAfterDelete($table);
			},
			deleteColumn: function()
			{
				var $table = this.table.getTable();
				if (!$table)
				{
					return;
				}

				this.buffer.set();

				var $current = $(this.selection.current());
				var $current_td = $current.closest('td, th');
				var index = $current_td[0].cellIndex;

				$table.find('tr').each($.proxy(function(i, elem)
				{
					var $elem = $(elem);
					var focusIndex = index - 1 < 0 ? index + 1 : index - 1;
					if (i === 0)
					{
						$elem.find('td, th').eq(focusIndex).prepend(this.marker.get());
					}

					$elem.find('td, th').eq(index).remove();

				}, this));

				this.table.restoreAfterDelete($table);
			},
			addHead: function()
			{
				var $table = this.table.getTable();
				if (!$table)
				{
					return;
				}

				this.buffer.set();

				if ($table.find('thead').length !== 0)
				{
					this.table.deleteHead();
					return;
				}

				var tr = $table.find('tr').first().clone();
				tr.find('td').replaceWith($.proxy(function()
				{
					return $('<th>').html(this.opts.invisibleSpace);
				}, this));

				$thead = $('<thead></thead>').append(tr);
				$table.prepend($thead);



			},
			deleteHead: function()
			{
				var $table = this.table.getTable();
				if (!$table)
				{
					return;
				}

				var $thead = $table.find('thead');
				if ($thead.length === 0)
				{
					return;
				}

				this.buffer.set();

				$thead.remove();

			},
			addRowAbove: function()
			{
				this.table.addRow('before');
			},
			addRowBelow: function()
			{
				this.table.addRow('after');
			},
			addColumnLeft: function()
			{
				this.table.addColumn('before');
			},
			addColumnRight: function()
			{
				this.table.addColumn('after');
			},
			addRow: function(type)
			{
				var $table = this.table.getTable();
				if (!$table)
				{
					return;
				}

				this.buffer.set();

				var $current = $(this.selection.current());
				var $current_tr = $current.closest('tr');
				var new_tr = $current_tr.clone();

				new_tr.find('th').replaceWith(function()
				{
					var $td = $('<td>');
					$td[0].attributes = this.attributes;

					return $td.append($(this).contents());
				});

				new_tr.find('td').html(this.opts.invisibleSpace);

				if (type === 'after')
				{
					$current_tr.after(new_tr);
				}
				else
				{
					$current_tr.before(new_tr);
				}


			},
			addColumn: function (type)
			{
				var $table = this.table.getTable();
				if (!$table)
				{
					return;
				}

				var index = 0;
				var current = $(this.selection.current());

				this.buffer.set();

				var $current_tr = current.closest('tr');
				var $current_td = current.closest('td, th');

				$current_tr.find('td, th').each($.proxy(function(i, elem)
				{
					if ($(elem)[0] === $current_td[0])
					{
						index = i;
					}

				}, this));

				$table.find('tr').each($.proxy(function(i, elem)
				{
					var $current = $(elem).find('td, th').eq(index);

					var td = $current.clone();
					td.html(this.opts.invisibleSpace);

					if (type === 'after')
					{
						$current.after(td);
					}
					else
					{
						$current.before(td);
					}

				}, this));


			}
		};
	};
})(jQuery);
$.Redactor.prototype.telephonelink = function() {
	return {
		langs: {
			de: {
				"telephonelink": "Telefon Link",
				"telephonelink_linktext": "Linktext",
				"telephonelink_phonelink": "Telefonnummer",
				"telephonelink_insert": "Einfügen",
				"telephonelink_abort": "Abbrechen"
			},
			en: {
				"telephonelink": "Telephone Link",
				"telephonelink_linktext": "Linktext",
				"telephonelink_phonelink": "Telephone Number",
				"telephonelink_insert": "Insert",
				"telephonelink_abort": "Abort"
			},
			es: {
				"telephonelink": "Enlace telefónico",
				"telephonelink_linktext": "Texto del enlace",
				"telephonelink_phonelink": "Número de teléfono",
				"telephonelink_insert": "Insertar",
				"telephonelink_abort": "Cancelar"
			}
		},
		getTemplate: function() {
			var selectedText = this.selection.text();

			var modalContent = '';
			modalContent += '<div class="modal-section" id="redactor-modal-telephonelink">';

			if (selectedText == '') {
				modalContent += '  <section>';
				modalContent += '    <label for="telephonelink_linktext">' + this.lang.get('telephonelink_linktext') + '</label>';
				modalContent += '    <input type="text" id="telephonelink_linktext">';
				modalContent += '  </section>';
			}

			modalContent += '  <section>';
			modalContent += '    <label for="telephonelink_phonelink">' + this.lang.get('telephonelink_phonelink') + '</label>';
			modalContent += '    <input type="text" id="telephonelink_phonelink">';
			modalContent += '  </section>';
			modalContent += '  <section>';
			modalContent += '    <button id="redactor-modal-button-action">' + this.lang.get('telephonelink_insert') + '</button>';
			modalContent += '    <button id="redactor-modal-button-cancel">' + this.lang.get('telephonelink_abort') + '</button>';
			modalContent += '  </section>';
			modalContent += '</div>';

			return String() + modalContent;
		},
		init: function() {
			var button = this.button.add('telephonelink', this.lang.get('telephonelink'));
			this.button.setIcon(button, '<i class="fa fa-link"></i>');
			this.button.addCallback(button, this.telephonelink.show);
		},
		show: function() {
			this.modal.addTemplate('telephonelink', this.telephonelink.getTemplate());
			this.modal.load('telephonelink', this.lang.get('telephonelink'), 600);

			var button = this.modal.getActionButton();
			button.on('click', this.telephonelink.set);

			this.modal.show();

			setTimeout(function() {
				if ($('#telephonelink_linktext').length != 0) {
					document.getElementById('telephonelink_linktext').focus();
				} else {
					document.getElementById('telephonelink_phonelink').focus();
				}
			}, 1);
		},
		set: function() {
			var linktext = $('#telephonelink_linktext').val();
			var phonenumber = $('#telephonelink_phonelink').val();
			this.modal.close();

			var selectedText = this.selection.text();

			if (selectedText != '') {
				var linktext = selectedText;
			}

			this.insert.html('<a href="tel:'+phonenumber+'">'+linktext+'</a>');
		}
	};
};
(function($)
{
	$.Redactor.prototype.textdirection = function()
	{
		return {
			langs: {
				de: {
					"change-text-direction": "RTL-LTR",
					"left-to-right": "Links nach rechts",
					"right-to-left": "Rechts nach links"
				},
				en: {
					"change-text-direction": "RTL-LTR",
					"left-to-right": "Left to Right",
					"right-to-left": "Right to Left"
				},
				es: {
					"change-text-direction": "RTL-LTR",
					"left-to-right": "Izquierda a derecha",
					"right-to-left": "Derecha a izquierda"
				}
			},
			init: function()
			{
				var that = this;
				var dropdown = {};

				dropdown.ltr = { title: that.lang.get('left-to-right'), func: that.textdirection.setLtr };
				dropdown.rtl = { title: that.lang.get('right-to-left'), func: that.textdirection.setRtl };

				var button = this.button.add('textdirection', this.lang.get('change-text-direction'));
				this.button.addDropdown(button, dropdown);
			},
			setRtl: function()
			{
				this.buffer.set();
				this.block.addAttr('dir', 'rtl');
			},
			setLtr: function()
			{
				this.buffer.set();
				this.block.removeAttr('dir');
			}
		};
	};
})(jQuery);
$.Redactor.prototype.underline = function() {
	return {
		langs: {
			de: {
				"underline": "Unterstrichen"
			},
			en: {
				"underline": "Underline"
			},
			es: {
				"underline": "Subrayar"
			}
		},
		init: function() {
			var button = this.button.add('underline', this.lang.get('underline'));
			this.button.setIcon(button, '<i class="fa fa-underline"></i>');
			this.button.addCallback(button, this.underline.set);
		},
		set: function() {
			this.inline.format('underline');
		}
	};
};
$.Redactor.prototype.undo = function() {
	return {
		langs: {
			de: {
				"undo": "Rückgängig"
			},
			en: {
				"undo": "Undo"
			},
			es: {
				"undo": "Deshacer"
			}
		},
		init: function() {
			var button = this.button.add('undo', this.lang.get('undo'));
			this.button.setIcon(button, '<i class="fa fa-undo"></i>');
			this.button.addCallback(button, this.buffer.undo);
		}
	};
};
$.Redactor.prototype.unorderedlist = function() {
	return {
		langs: {
			de: {
				"unorderedlist": "Unsortierte Liste"
			},
			en: {
				"unorderedlist": "Unordered list"
			},
			es: {
				"unorderedlist": "Lista desordenada"
			}
		},
		init: function() {
			var button = this.button.add('unorderedlist', this.lang.get('unorderedlist'));
			this.button.setIcon(button, '<i class="fa fa-list-ul"></i>');
			this.button.addCallback(button, this.unorderedlist.set);
		},
		set: function() {
			this.list.toggle('unorderedlist');
		}
	};
};
