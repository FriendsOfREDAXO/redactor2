<?php
	$func = rex_request('func', 'string');
	$success = '';
	$error = '';

	if ($func == 'copy') {
		$profile_id = rex_request('profile_id', 'int');
		if ($profile_id > 0) {
			$sql = rex_sql::factory();
			
			try {
				$sql->setQuery('INSERT INTO '.rex::getTablePrefix() . 'redactor2_profiles (name, description, urltype, externalurltarget, minheight, maxheight, characterlimit, toolbarfixed, shortcuts, linkify, imagetag, redactor_plugins, redactor_customplugins) SELECT name, description, urltype, externalurltarget, minheight, maxheight, characterlimit, toolbarfixed, shortcuts, linkify, imagetag, redactor_plugins, redactor_customplugins FROM '.rex::getTablePrefix() . 'redactor2_profiles WHERE id = ?', [$profile_id]);
				$success = $this->i18n('profiles_message_copy_success');
			} catch (rex_sql_exception $e) {
				$error = $sql->getError();
			}
			
			$func = '';
		}
	}
	
	if ($success != '') {
		echo rex_view::success($success);
	}
	
	if ($error != '') {
		echo rex_view::error($error);
	}

	if ($func == '') {
		$list = rex_list::factory("SELECT `id`, `name`, `description`, CONCAT('redactorEditor2-',`name`) as `cssclass` FROM `".rex::getTablePrefix()."redactor2_profiles` ORDER BY `name` ASC");
		$list->addTableAttribute('class', 'table-striped');
		$list->setNoRowsMessage($this->i18n('profiles_norowsmessage'));

		// icon column
		$thIcon = '<a href="'.$list->getUrl(['func' => 'add']).'"><i class="rex-icon rex-icon-add-action"></i></a>';
		$tdIcon = '<i class="rex-icon fa-file-text-o"></i>';
		$list->addColumn($thIcon, $tdIcon, 0, ['<th class="rex-table-icon">###VALUE###</th>', '<td class="rex-table-icon">###VALUE###</td>']);
		$list->setColumnParams($thIcon, ['func' => 'edit', 'id' => '###id###']);
		
		$funcs = $this->i18n('profiles_column_functions');

		$list->addColumn($funcs, '<i class="rex-icon rex-icon-duplicate"></i> ' . $this->i18n('profiles_copy'), -1, ['<th class="rex-table-action" colspan="1">###VALUE###</th>', '<td class="rex-table-action">###VALUE###</td>']);

		$list->setColumnLabel('name', $this->i18n('profiles_column_name'));
		$list->setColumnLabel('description', $this->i18n('profiles_column_description'));
		$list->setColumnLabel('cssclass', $this->i18n('profiles_column_cssclass'));
		$list->setColumnLabel($funcs, $this->i18n('profiles_column_functions'));
		
		$list->setColumnParams('name', ['id' => '###id###', 'func' => 'edit']);
		$list->setColumnParams($funcs, ['func' => 'copy', 'profile_id' => '###id###']);

		$list->removeColumn('id');

		$content = $list->get();

		$fragment = new rex_fragment();
		$fragment->setVar('content', $content, false);
		$content = $fragment->parse('core/page/section.php');

		echo $content;
	} else if ($func == 'add' || $func == 'edit') {
		$id = rex_request('id', 'int');

		if ($func == 'edit') {
			$formLabel = $this->i18n('profiles_formcaption_edit');
		} elseif ($func == 'add') {
			$formLabel = $this->i18n('profiles_formcaption_add');
		}

		$form = rex_form::factory(rex::getTablePrefix().'redactor2_profiles', '', 'id='.$id);

		//Start - add name-field
			$field = $form->addTextField('name');
			$field->setLabel($this->i18n('profiles_label_name'));
		//End - add name-field

		//Start - add description-field
			$field = $form->addTextField('description');
			$field->setLabel($this->i18n('profiles_label_description'));
		//End - add description-field

		//Start - add minheight-field
			$field = $form->addTextField('minheight');
			$field->setLabel($this->i18n('profiles_label_minheight'));
		//End - add minheight-field

		//Start - add maxheight-field
			$field = $form->addTextField('maxheight');
			$field->setLabel($this->i18n('profiles_label_maxheight'));
		//End - add maxheight-field

		//Start - add characterlimit-field
			$field = $form->addTextField('characterlimit');
			$field->setLabel($this->i18n('profiles_label_characterlimit'));
		//End - add characterlimit-field

		//Start - add urltype-field
			$field = $form->addSelectField('urltype');
			$field->setLabel($this->i18n('profiles_label_urltype'));

			$select = $field->getSelect();
			$select->setSize(1);
			$select->addOption($this->i18n('profiles_label_urltype_option_relative'), 'relative');
			$select->addOption($this->i18n('profiles_label_urltype_option_absolute'), 'absolute');
		//End - add urltype-field
		
		//Start - add externalurltarget-field
			$field = $form->addSelectField('externalurltarget');
			$field->setLabel($this->i18n('profiles_label_externalurltarget'));

			$select = $field->getSelect();
			$select->setSize(1);
			$select->addOption($this->i18n('profiles_label_externalurltarget_option_blank'), 'blank');
			$select->addOption($this->i18n('profiles_label_externalurltarget_option_self'), 'self');
		//End - add externalurltarget-field

		//Start - add toolbarfixed-field
			$field = $form->addSelectField('toolbarfixed');
			$field->setLabel($this->i18n('profiles_label_toolbarfixed'));
			
			$select = $field->getSelect();
			$select->setSize(1);
			$select->addOption($this->i18n('profiles_label_toolbarfixed_option_true'), '1');
			$select->addOption($this->i18n('profiles_label_toolbarfixed_option_false'), '0');
		//End - add toolbarfixed-field
		
		//Start - add shortcuts-field
			$field = $form->addSelectField('shortcuts');
			$field->setLabel($this->i18n('profiles_label_shortcuts'));
			
			$select = $field->getSelect();
			$select->setSize(1);
			$select->addOption($this->i18n('profiles_label_shortcuts_option_true'), '1');
			$select->addOption($this->i18n('profiles_label_shortcuts_option_false'), '0');
		//End - add shortcuts-field
		
		//Start - add linkify-field
			$field = $form->addSelectField('linkify');
			$field->setLabel($this->i18n('profiles_label_linkify'));
			
			$select = $field->getSelect();
			$select->setSize(1);
			$select->addOption($this->i18n('profiles_label_linkify_option_true'), '1');
			$select->addOption($this->i18n('profiles_label_linkify_option_false'), '0');
		//End - add linkify-field
		
		//Start - add imagetag-field
			$field = $form->addTextField('imagetag');
			$field->setLabel($this->i18n('profiles_label_imagetag'));
		//End - add imagetag-field
		
		//Start - add redactor_plugins-field
			$field = $form->addTextAreaField('redactor_plugins');
			$field->setLabel($this->i18n('profiles_label_redactorplugins'));

			$field = $form->addRawField('
				<dl class="rex-form-group form-group">
					<dt>
						&nbsp;
					</dt>
					<dd>
						<p><a href="javascript:void(0);" onclick="$(\'#rex-redactor-plugins-help\').toggle(\'fast\');">Zeige/verberge Hilfe</a></p>
						<div id="rex-redactor-plugins-help" style="display:none">'.
							'<b>anchorlink</b><br>'.
							$this->i18n('profiles_plugins_anchorlink_description').'<br>'.
							'<br>'.
							'<b>alignment</b><br>'.
							$this->i18n('profiles_plugins_alignment_description').'<br>'.
							'<br>'.
							'<b>blockquote</b><br>'.
							$this->i18n('profiles_plugins_blockquote_description').'<br>'.
							'<br>'.
							'<b>bold</b><br>'.
							$this->i18n('profiles_plugins_bold_description').'<br>'.
							'<br>'.
							'<b>cleaner</b><br>'.
							$this->i18n('profiles_plugins_cleaner_description').'<br>'.
							'<br>'.
							'<b>clips[Snippetname1=Snippettext1|Snippetname2=Snippettext2]</b><br>'.
							$this->i18n('profiles_plugins_clips_description').'<br>'.
							'<br>'.
							'<b>deleted</b><br>'.
							$this->i18n('profiles_plugins_deleted_description').'<br>'.
							'<br>'.
							'<b>emaillink</b><br>'.
							$this->i18n('profiles_plugins_emaillink_description').'<br>'.
							'<br>'.
							'<b>externallink</b><br>'.
							$this->i18n('profiles_plugins_externallink_description').'<br>'.
							'<br>'.
							'<b>fontcolor[Weiss=#ffffff|Schwarz=#000000]</b><br>'.
							$this->i18n('profiles_plugins_fontcolor_description').'<br>'.
							'<br>'.
							'<b>fontfamily[Arial|Times]</b><br>'.
							$this->i18n('profiles_plugins_fontfamily_description').'<br>'.
							'<br>'.
							'<b>fontsize[12px|15pt|120%]</b><br>'.
							$this->i18n('profiles_plugins_fontsize_description').'<br>'.
							'<br>'.
							'<b>format[Absatz Klein=p.small|Absatz Mittel=p.middle|Absatz Gross=p.big]</b><br>'.
							$this->i18n('profiles_plugins_format_description').'<br>'.
							'<br>'.
							'<b>fullscreen</b><br>'.
							$this->i18n('profiles_plugins_fullscreen_description').'<br>'.
							'<br>'.
							'<b>groupheading[1|2|3|4|5|6]</b><br>'.
							$this->i18n('profiles_plugins_groupheading_description').'<br>'.
							'<br>'.
							'<b>grouplink[email|external|internal|media|telephone|anchor]</b><br>'.
							$this->i18n('profiles_plugins_grouplink_description').'<br>'.
							'<br>'.
							'<b>grouplist[unorderedlist|orderedlist|indent|outdent]</b><br>'.
							$this->i18n('profiles_plugins_grouplist_description').'<br>'.
							'<br>'.
							'<b>heading1</b><br>'.
							$this->i18n('profiles_plugins_heading1_description').'<br>'.
							'<br>'.
							'<b>heading2</b><br>'.
							$this->i18n('profiles_plugins_heading2_description').'<br>'.
							'<br>'.
							'<b>heading3</b><br>'.
							$this->i18n('profiles_plugins_heading3_description').'<br>'.
							'<br>'.
							'<b>heading4</b><br>'.
							$this->i18n('profiles_plugins_heading4_description').'<br>'.
							'<br>'.
							'<b>heading5</b><br>'.
							$this->i18n('profiles_plugins_heading5_description').'<br>'.
							'<br>'.
							'<b>heading6</b><br>'.
							$this->i18n('profiles_plugins_heading6_description').'<br>'.
							'<br>'.
							'<b>horizontalrule</b><br>'.
							$this->i18n('profiles_plugins_horizontalrule_description').'<br>'.
							'<br>'.
							'<b>internallink</b><br>'.
							$this->i18n('profiles_plugins_internallink_description').'<br>'.
							'<br>'.
							'<b>italic</b><br>'.
							$this->i18n('profiles_plugins_italic_description').'<br>'.
							'<br>'.
							'<b>media</b><br>'.
							$this->i18n('profiles_plugins_media_description').'<br>'.
							'<br>'.
							'<b>medialink</b><br>'.
							$this->i18n('profiles_plugins_medialink_description').'<br>'.
							'<br>'.
							'<b>orderedlist</b><br>'.
							$this->i18n('profiles_plugins_orderedlist_description').'<br>'.
							'<br>'.
							'<b>paragraph</b><br>'.
							$this->i18n('profiles_plugins_paragraph_description').'<br>'.
							'<br>'.
							'<b>properties</b><br>'.
							$this->i18n('profiles_plugins_properties_description').'<br>'.
							'<br>'.
							'<b>redo</b><br>'.
							$this->i18n('profiles_plugins_redo_description').'<br>'.
							'<br>'.
							'<b>source</b><br>'.
							$this->i18n('profiles_plugins_source_description').'<br>'.
							'<br>'.
							'<b>styles[code=Code|kbd=Shortcut|mark=Markiert|samp=Sample|var=Variable]</b><br>'.
							$this->i18n('profiles_plugins_styles_description').'<br>'.
							'<br>'.
							'<b>sub</b><br>'.
							$this->i18n('profiles_plugins_sub_description').'<br>'.
							'<br>'.
							'<b>sup</b><br>'.
							$this->i18n('profiles_plugins_sup_description').'<br>'.
							'<br>'.
							'<b>table</b><br>'.
							$this->i18n('profiles_plugins_table_description').'<br>'.
							'<br>'.
							'<b>telephonelink</b><br>'.
							$this->i18n('profiles_plugins_telephonelink_description').'<br>'.
							'<br>'.
							'<b>textdirection</b><br>'.
							$this->i18n('profiles_plugins_textdirection_description').'<br>'.
							'<br>'.
							'<b>underline</b><br>'.
							$this->i18n('profiles_plugins_underline_description').'<br>'.
							'<br>'.
							'<b>undo</b><br>'.
							$this->i18n('profiles_plugins_undo_description').'<br>'.
							'<br>'.
							'<b>unorderedlist</b><br>'.
							$this->i18n('profiles_plugins_unorderedlist_description').'<br>'.
							'
						</div>
					</dd>
				</dl>
			');
		//End - add redactor_plugins-field

		//Start - add redactor_custom_plugins-field
			$field = $form->addTextAreaField('redactor_customplugins');
			$field->setLabel($this->i18n('profiles_label_redactorcustomplugins'));
			
			$field = $form->addRawField('
				<dl class="rex-form-group form-group">
					<dt>
						&nbsp;
					</dt>
					<dd>
						<p>'.$this->i18n('profiles_label_redactorcustomplugins_help').'</p>
					</dd>
				</dl>
			');
		//End - add redactor_custom_plugins-field
		
		if ($func == 'edit') {
			$form->addParam('id', $id);
		}

		$content = $form->get();

		$fragment = new rex_fragment();
		$fragment->setVar('class', 'edit', false);
		$fragment->setVar('title', $formLabel, false);
		$fragment->setVar('body', $content, false);
		$content = $fragment->parse('core/page/section.php');

		echo $content;
	}
