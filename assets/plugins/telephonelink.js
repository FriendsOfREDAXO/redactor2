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