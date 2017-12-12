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
			var grouplinkMap = openLinkMap('', '&clang='+ that.opts.clang_id);
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