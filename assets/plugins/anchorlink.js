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