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
		},
		set: function() {
			var linktext = $('#externallink_linktext').val();
			var linkurl = $('#externallink_linkurl').val();
			this.modal.close();
			
			var selectedText = this.selection.text();
			
			if (selectedText != '') {
				var linktext = selectedText;
			}
			
			this.insert.html('<a href="'+linkurl+'" target="_blank">'+linktext+'</a>');
		}
	};
};