<?php
	$func = rex_request('func', 'string');
	
	if ($func == '') {
		$list = rex_list::factory("SELECT `id`, `name`, `description` FROM `".rex::getTablePrefix()."redactor2_profiles` ORDER BY `name` ASC");
		$list->addTableAttribute('class', 'table-striped');
		$list->setNoRowsMessage($this->i18n('profiles_norowsmessage'));
		
		// icon column
		$thIcon = '<a href="'.$list->getUrl(['func' => 'add']).'"><i class="rex-icon rex-icon-add-action"></i></a>';
		$tdIcon = '<i class="rex-icon fa-file-text-o"></i>';
		$list->addColumn($thIcon, $tdIcon, 0, ['<th class="rex-table-icon">###VALUE###</th>', '<td class="rex-table-icon">###VALUE###</td>']);
		$list->setColumnParams($thIcon, ['func' => 'edit', 'id' => '###id###']);
		
		$list->setColumnLabel('name', $this->i18n('profiles_column_name'));
		$list->setColumnLabel('description', $this->i18n('profiles_column_description'));
		
		$list->setColumnParams('name', ['id' => '###id###', 'func' => 'edit']);
		
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
		
		//Start - add urltype-field
			$field = $form->addSelectField('urltype');
			$field->setLabel($this->i18n('profiles_label_urltype'));
			
			$select = $field->getSelect();
			$select->setSize(1);
			$select->addOption($this->i18n('profiles_label_urltype_option_relative'), 'relative');
			$select->addOption($this->i18n('profiles_label_urltype_option_absolute'), 'absolute');
		//End - add urltype-field
		
		//Start - add redactor_buttons-field
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
							'<b>cleaner</b><br>'.
							$this->i18n('profiles_plugins_cleaner_description').'<br>'.
							'<br>'.
							'<b>clips[Snippetname1=Snippettext1|Snippetname2=Snippettext2]</b><br>'.
							$this->i18n('profiles_plugins_clips_description').'<br>'.
							'<br>'.
							'<b>emaillink</b><br>'.
							$this->i18n('profiles_plugins_emaillink_description').'<br>'.
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
							'<b>fullscreen</b><br>'.
							$this->i18n('profiles_plugins_fullscreen_description').'<br>'.
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
							'<b>limiter[20]</b><br>'.
							$this->i18n('profiles_plugins_limiter_description').'<br>'.
							'<br>'.
							'<b>paragraph</b><br>'.
							$this->i18n('profiles_plugins_paragraph_description').'<br>'.
							'<br>'.
							'<b>rex_linkmap</b><br>'.
							$this->i18n('profiles_plugins_rex_linkmap_description').'<br>'.
							'<br>'.
							'<b>rex_mediapool_image</b><br>'.
							$this->i18n('profiles_plugins_rex_mediapool_image_description').'<br>'.
							'<br>'.
							'<b>rex_mediapool_link</b><br>'.
							$this->i18n('profiles_plugins_rex_mediapool_link_description').'<br>'.
							'<br>'.
							'<b>table</b><br>'.
							$this->i18n('profiles_plugins_table_description').'<br>'.
							'<br>'.
							'<b>textdirection</b><br>'.
							$this->i18n('profiles_plugins_textdirection_description').'<br>'.
							'<br>'.
							'<b>video</b><br>'.
							$this->i18n('profiles_plugins_video_description').'<br>'.
							'
						</div>
					</dd>
				</dl>
			');
		//End - add redactor_buttons-field
		
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
?>