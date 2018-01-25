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