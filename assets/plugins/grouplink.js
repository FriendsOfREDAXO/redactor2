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
				"grouplink_grouplinktext": "Linktext",
				"grouplink_insert": "Insert",
				"grouplink_abort": "Abort"
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
		},
		setTelephone: function()
		{
			this.modal.addTemplate('grouplink', this.grouplink.getTelephoneTemplate());
			this.modal.load('grouplink', this.lang.get('grouplink_telephone'), 600);
			
			var button = this.modal.getActionButton();
			button.on('click', this.grouplink.insertTelephone);
			
			this.modal.show();
		},
		setExternal: function()
		{
			this.modal.addTemplate('grouplink', this.grouplink.getExternalTemplate());
			this.modal.load('grouplink', this.lang.get('grouplink_external'), 600);
			
			var button = this.modal.getActionButton();
			button.on('click', this.grouplink.insertExternal);
			
			this.modal.show();
		},
		setInternal: function()
		{
			var that = this;
			var grouplinkMap = openLinkMap();
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
		insertExternal: function() {
			var grouplinktext = $('#externalgrouplink_grouplinktext').val();
			var grouplinkurl = $('#externalgrouplink_grouplinkurl').val();
			this.modal.close();
			
			var selectedText = this.selection.text();
			
			if (selectedText != '') {
				var grouplinktext = selectedText;
			}
			
			this.insert.html('<a href="'+grouplinkurl+'" target="_blank">'+grouplinktext+'</a>');
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