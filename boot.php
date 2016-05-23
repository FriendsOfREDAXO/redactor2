<?php
	if (rex::isBackend()) {
		rex_view::addCssFile($this->getAssetsUrl('redactor.css'));
//		rex_view::addCssFile($this->getAssetsUrl('redactor_custom.css'));
		rex_view::addJsFile($this->getAssetsUrl('redactor.js'));
		
		$redactorLanguage = rex::getProperty('lang');
		$redactorLanguage = substr($redactorLanguage, 0, 2);
		
		rex_view::addJsFile($this->getAssetsUrl('langs/'.$redactorLanguage.'.js'));
		
		//Start - get redactor-profiles
			$sql = rex_sql::factory();
			$profiles = $sql->setQuery("SELECT `name`, `urltype`, `redactor_plugins` FROM `".rex::getTablePrefix()."redactor2_profiles` ORDER BY `name` ASC")->getArray();
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
				
				$jsCode[] = '  lang: \''.$redactorLanguage.'\',';
				$jsCode[] = '  urltype: \''.$profile['urltype'].'\',';
				
				//Start - get pluginconfiguration
					$redactorPlugins = [];
					
					if (trim($profile['redactor_plugins']) != '') {
						$plugins = explode(',', $profile['redactor_plugins']);
						foreach ($plugins as $plugin) {
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
				
				$jsCode[] = 'shortcuts: [],';
				$jsCode[] = 'buttons: [],';
				$jsCode[] = 'plugins: [\''.implode('\',\'', $redactorPlugins).'\'],';
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
	
		//Start - use OUTPUT_FILTER-EP to use an custom callback
			rex_extension::register('OUTPUT_FILTER', function($param) {
				$page = rex_request('page', 'string');
				$opener_input_field = rex_request('opener_input_field', 'string');
				
				$content = $param->getSubject();
				
				if (substr($opener_input_field, 0, 9) == 'redactor_') {
					switch ($page) {
						case 'mediapool/media':
							$content = preg_replace("|javascript:selectMedia\(\'(.*)\', \'(.*)\'\);|", "javascript:window.opener.$('#".$opener_input_field."').redactor('rex_mediapool_image.selectMedia', '$1', '$2');self.close();", $content);
						break;
						case 'linkmap':
							$content = preg_replace("|javascript:insertLink\(\'(.*)\',\'(.*)\'\);|",  "javascript:window.opener.$('#".$opener_input_field."').redactor('rex_linkmap.insertLink', '$1', '$2');self.close();", $content);
						break;
					}
				}
				
				return $content;
			});
		//End - use OUTPUT_FILTER-EP to use an custom callback
	}
?>