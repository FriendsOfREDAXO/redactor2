<?php
	if (rex::isBackend()) {
		rex_view::addCssFile($this->getAssetsUrl('redactor.css'));
		rex_view::addCssFile($this->getAssetsUrl('redactor_custom.css'));
		if (file_exists($this->getAssetsPath('skin.css'))) {
			rex_view::addCssFile($this->getAssetsUrl('skin.css'));
		}
		rex_view::addJsFile($this->getAssetsUrl('redactor.js'));
		
		$redactorLanguage = rex::getProperty('lang');
		$redactorLanguage = substr($redactorLanguage, 0, 2);
		
		rex_view::addJsFile($this->getAssetsUrl('langs/'.$redactorLanguage.'.js'));
		
		//Start - get redactor-profiles
			$sql = rex_sql::factory();
			$profiles = $sql->setQuery("SELECT * FROM `".rex::getTablePrefix()."redactor2_profiles` ORDER BY `name` ASC")->getArray();
			unset($sql);
			
			$jsCode = [];
			
			$jsCode[] = 'var redactorSetup = false;';
			$jsCode[] = 'function redactorInit() {';
			$jsCode[] = 'var Editor = null;';
			
			foreach ($profiles as $profile) {
				$jsCode[] = 'var Editor = $(\'.redactorEditor2-'.$profile['name'].'\');';

				$redactorConfig = [];
				
				$jsCode[] = 'if (redactorSetup == true && Editor.parent().is(\'.redactor-box\')) {';
				$jsCode[] = '  Editor.each(function() {';
				$jsCode[] = '    $(this).insertBefore($(this).parent()).next().remove();';
				$jsCode[] = '  });';
				$jsCode[] = '}';
				$jsCode[] = 'Editor.redactor({';
				$jsCode[] = '  initCallback: function() {';
				$jsCode[] = '    redactorSetup = true;';
				$jsCode[] = '  },';
				
				$jsCode[] = '  linkSize: 1000,';
				$jsCode[] = '  linkify: '.(($profile['linkify']) ? 'true' : 'false').',';
				$jsCode[] = '  lang: \''.$redactorLanguage.'\',';
				$jsCode[] = '  minHeight: '.$profile['minheight'].',';
				$jsCode[] = '  maxHeight: '.$profile['maxheight'].',';
				$jsCode[] = '  urltype: \''.$profile['urltype'].'\',';
				$jsCode[] = '  toolbarFixed: '.(($profile['toolbarfixed']) ? 'true' : 'false').',';
				$jsCode[] = '  shortcutsAdd: '.(($profile['shortcuts']) ? 'true' : 'false').',';
				$jsCode[] = '  imageTag: \'\',';
				if ($profile['characterlimit'] != 0) {
					$jsCode[] = '  limiter: '.$profile['characterlimit'].',';
					if (!in_array($this->getAssetsUrl('plugins/limiter.js'), rex_view::getJsFiles())) {
						rex_view::addJsFile($this->getAssetsUrl('plugins/limiter.js'));
					}
				}
				
				//Start - get pluginconfiguration
					$redactorPlugins = [];
					
					if (trim($profile['redactor_plugins']) != '') {
						$plugins = explode(',', $profile['redactor_plugins']);
						foreach ($plugins as $plugin) {
							$plugin = trim($plugin);
							if (preg_match('/(.*)\[(.*)\]/', $plugin, $matches)) {
								//Start - explode parameters
									$parameters = explode('|', $matches[2]);
									$parameterString = '';
									foreach ($parameters as $parameter) {
										if (strpos($parameter, '=') !== false) {
											list($key, $value) = explode('=',$parameter,2);
											$parameterString .= "['".addslashes($key)."', '".addslashes($value)."'],";
										} else {
											$parameterString .= "'".$parameter."',";
										}
									}
									
									$redactorConfig[] =  $matches[1].': ['.$parameterString.'],';
								//End - explode parameters
								
								$redactorPlugins[] = $matches[1];
								
								if (!in_array($this->getAssetsUrl('plugins/'.$matches[1].'.js'), rex_view::getJsFiles())) {
									rex_view::addJsFile($this->getAssetsUrl('plugins/'.$matches[1].'.js'));
								}
							} else {
								$redactorPlugins[] = $plugin;
								
								if (!in_array($this->getAssetsUrl('plugins/'.$plugin.'.js'), rex_view::getJsFiles())) {
									rex_view::addJsFile($this->getAssetsUrl('plugins/'.$plugin.'.js'));
								}
							}
						}
					}
				//End - get pluginconfiguration
				
				//Start - get pluginconfiguration for custom plugins
					if (trim($profile['redactor_customplugins']) != '') {
						$plugins = explode(',', $profile['redactor_customplugins']);
						foreach ($plugins as $plugin) {
							list($pluginName, $pluginPath) = explode(':', $plugin);
							$plugin = trim($pluginName);
							
							if (!in_array(rex_url::assets($pluginPath), rex_view::getJsFiles())) {
								rex_view::addJsFile(rex_url::assets($pluginPath));
							}
							
							if (preg_match('/(.*)\[(.*)\]/', $plugin, $matches)) {
								//Start - explode parameters
									$parameters = explode('|', $matches[2]);
									$parameterString = '';
									foreach ($parameters as $parameter) {
										if (strpos($parameter, '=') !== false) {
											list($key, $value) = explode('=',$parameter,2);
											$parameterString .= "['".addslashes($key)."', '".addslashes($value)."'],";
										} else {
											$parameterString .= "'".$parameter."',";
										}
									}
									
									$redactorConfig[] =  $matches[1].': ['.$parameterString.'],';
									$redactorPlugins[] = $matches[1];
								//End - explode parameters
							} else {
								$redactorPlugins[] = $pluginName;
							}
						}
					}
				//End - get pluginconfiguration for custom plugins
				
				$jsCode[] = 'buttons: [],';
				$jsCode[] = 'plugins: [\'limiter\',\''.implode('\',\'', $redactorPlugins).'\'],';
				$jsCode[] = implode(PHP_EOL, $redactorConfig);
				
				$jsCode[] = '});';
			}
			$jsCode[] = '}';
			
			$jsCode[] = '$(document).on(\'ready pjax:success\',function() {';
			$jsCode[] = '  redactorInit();';
			$jsCode[] = '});';
			
			if (!rex_file::put($this->getAssetsUrl('cache/redactor2_profiles.js').'', implode(PHP_EOL, $jsCode))) {
				echo 'js-file konnte nicht gespeichert werden';
			}
			
			rex_view::addJsFile($this->getAssetsUrl('cache/redactor2_profiles.js'));
		//End - get redactor-profiles
	}
?>