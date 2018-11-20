<?php

if (rex::isBackend() && !empty(rex::getUser())) {
    //Start - extension points to delete the profiles-cache
    $deleteCacheFn = function (rex_extension_point $ep) {
        $params = $ep->getParams();
        $formParams = $params['form']->getParams();

        switch ($formParams['page']) {
                case 'redactor2/profiles':
                    if (file_exists($this->getAssetsUrl('cache/redactor2_profiles_de.js'))) {
                        unlink($this->getAssetsUrl('cache/redactor2_profiles_de.js'));
                    }
                    if (file_exists($this->getAssetsUrl('cache/redactor2_profiles_en.js'))) {
                        unlink($this->getAssetsUrl('cache/redactor2_profiles_en.js'));
                    }
                break;
            }
    };
    rex_extension::register('REX_FORM_SAVED', $deleteCacheFn);
    rex_extension::register('REX_FORM_DELETED', $deleteCacheFn);
    //End - extension points to delete the profiles-cache

    $redactorLanguage = rex::getProperty('lang');
    $redactorLanguage = substr($redactorLanguage, 0, 2);

    $customPlugins = [];

    if (!file_exists($this->getAssetsUrl('cache/redactor2_profiles_'.$redactorLanguage.'.js'))) {
        //Start - get profiles
        $sql = rex_sql::factory();
        $profiles = $sql->setQuery("SELECT * FROM `".rex::getTablePrefix()."redactor2_profiles` ORDER BY `name` ASC")->getArray();
        unset($sql);
        //End - get profiles

        $jsCode = [];
        $jsCode[] = 'function redactor2init() {';

        foreach ($profiles as $index => $profile) {
            $redactorConfig = [];

            $jsCode[] = 'var Editor'.$index.' = $(\'.redactorEditor2-'.$profile['name'].'\');';
            $jsCode[] = 'Editor'.$index.'.redactor({';
            $jsCode[] = '  callbacks: {';
            $jsCode[] = '    init: function() {';
            $jsCode[] = '      redactorSetup = true;';
            $jsCode[] = '    }';
            $jsCode[] = '  },';

            $jsCode[] = '  linkSize: 1000,';
            $jsCode[] = '  imageCaption: false,';
            $jsCode[] = '  imageResizable: true,';
            $jsCode[] = '  imagePosition: true,';
            $jsCode[] = '  linkValidation: false,';
            $jsCode[] = '  linkify: '.(($profile['linkify']) ? 'true' : 'false').',';
            $jsCode[] = '  lang: \''.$redactorLanguage.'\',';
            $jsCode[] = '  minHeight: '.$profile['minheight'].',';
            $jsCode[] = '  maxHeight: '.$profile['maxheight'].',';
            $jsCode[] = '  urltype: \''.$profile['urltype'].'\',';
            $jsCode[] = '  toolbarFixed: '.(($profile['toolbarfixed']) ? 'true' : 'false').',';
            $jsCode[] = '  shortcutsAdd: '.(($profile['shortcuts']) ? 'true' : 'false').',';
            $jsCode[] = '  imageTag: \''.$profile['imagetag'].'\',';
            $jsCode[] = '  externalUrlTarget: \''.$profile['externalurltarget'].'\',';
            if ($profile['characterlimit'] != 0) {
                $jsCode[] = '  limiter: '.$profile['characterlimit'].',';
            }

            //Start - get pluginconfiguration for core plugins
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
                                list($key, $value) = explode('=', $parameter, 2);
                                $parameterString .= "['".addslashes($key)."', '".addslashes($value)."'],";
                            } else {
                                $parameterString .= "'".$parameter."',";
                            }
                        }

                        $redactorConfig[] =  $matches[1].': ['.$parameterString.'],';
                        //End - explode parameters

                        $redactorPlugins[] = $matches[1];
                    } else {
                        $redactorPlugins[] = $plugin;
                    }
                }
            }
            //End - get pluginconfiguration for core plugins

            //Start - get pluginconfiguration for custom plugins
            if (trim($profile['redactor_customplugins']) != '') {
                $plugins = explode(',', $profile['redactor_customplugins']);
                foreach ($plugins as $plugin) {
                    list($pluginName, $pluginPath) = explode(':', $plugin);
                    $plugin = trim($pluginName);

                    $customPlugins[] = rex_url::assets($pluginPath);

                    if (preg_match('/(.*)\[(.*)\]/', $plugin, $matches)) {
                        //Start - explode parameters
                        $parameters = explode('|', $matches[2]);
                        $parameterString = '';
                        foreach ($parameters as $parameter) {
                            if (strpos($parameter, '=') !== false) {
                                list($key, $value) = explode('=', $parameter, 2);
                                $parameterString .= "['".addslashes($key)."', '".addslashes($value)."'],";
                            } else {
                                $parameterString .= "'".$parameter."',";
                            }
                        }

                        $redactorConfig[] =  $matches[1].': ['.$parameterString.'],';
                        $redactorPlugins[] = $matches[1];
                    //End - explode parameters
                    } else {
                        $redactorPlugins[] = $plugin;
                    }
                }
            }
            //End - get pluginconfiguration for custom plugins

            $jsCode[] = 'clang_id: '. rex_clang::getCurrent()->getId() .',';
            $jsCode[] = 'buttons: [],';
            $jsCode[] = 'plugins: [\'limiter\',\''.implode('\',\'', $redactorPlugins).'\'],';
            $jsCode[] = implode(PHP_EOL, $redactorConfig);

            $jsCode[] = '});';
        }

        $jsCode[] = '}';

        $jsCode[] = 'function redactor2loadassets() {';
        $jsCode[] = '	assetsToLoad = [';
        $jsCode[] = '	"'.$this->getAssetsUrl('vendor/redactor.js').'",';
        $jsCode[] = '	"'.$this->getAssetsUrl('redactor_plugins.min.js').'",';
        $jsCode[] = '	"'.$this->getAssetsUrl('langs/'.$redactorLanguage.'.js').'",';
        if (!empty($customPlugins)) {
            foreach ($customPlugins as $customPlugin) {
                $jsCode[] = '	"'.$customPlugin.'",';
            }
        }
        $jsCode[] = ']';
        $jsCode[] = '	redactor2preloader(assetsToLoad, function() {';
        $jsCode[] = '		redactor2init();';
        $jsCode[] = '	});';

        $jsCode[] = '	var link1 = document.createElement("link");';
        $jsCode[] = '	link1.rel = "stylesheet";';
        $jsCode[] = '	link1.href = "'.$this->getAssetsUrl('vendor/redactor.css').'";';
        $jsCode[] = '	document.head.appendChild(link1);';

        $jsCode[] = '	var link2 = document.createElement("link");';
        $jsCode[] = '	link2.rel = "stylesheet";';
        $jsCode[] = '	link2.href = "'.$this->getAssetsUrl('redactor_custom.css').'";';
        $jsCode[] = '	document.head.appendChild(link2);';

        if (file_exists($this->getAssetsPath('skin.css'))) {
            $jsCode[] = '	var link3 = document.createElement("link");';
            $jsCode[] = '	link3.rel = "stylesheet";';
            $jsCode[] = '	link3.href = "'.$this->getAssetsUrl('skin.css').'";';
            $jsCode[] = '	document.head.appendChild(link3);';
        }

        $jsCode[] = '}';

        if (!rex_file::put($this->getAssetsPath('cache/redactor2_profiles_'.$redactorLanguage.'.js').'', implode(PHP_EOL, $jsCode))) {
            echo 'js-file konnte nicht gespeichert werden';
        }
    }

    $jsCode = [];

    $jsCode[] = 'function redactor2preloader(array,callback){';
    $jsCode[] = '  var loader = function(src,handler){';
    $jsCode[] = '    var script = document.createElement("script");';
    $jsCode[] = '    script.src = src;';
    $jsCode[] = '    script.onload = script.onreadystatechange = function(){';
    $jsCode[] = '      script.onreadystatechange = script.onload = null;';
    $jsCode[] = '      handler();';
    $jsCode[] = '    }';
    $jsCode[] = '    var head = document.getElementsByTagName("head")[0];';
    $jsCode[] = '    (head || document.body).appendChild( script );';
    $jsCode[] = '  };';
    $jsCode[] = '  (function run(){';
    $jsCode[] = '    if(array.length!=0){';
    $jsCode[] = '      loader(array.shift(), run);';
    $jsCode[] = '    }else{';
    $jsCode[] = '      callback && callback();';
    $jsCode[] = '    }';
    $jsCode[] = '  })();';
    $jsCode[] = '}';


    $jsCode[] = '$(document).on(\'ready pjax:success\',function() {';
    $jsCode[] = '	if ($("[class*=\'redactorEditor2-\']").length > 0) {';
    $jsCode[] = '		redactor2preloader(["'.$this->getAssetsUrl('cache/redactor2_profiles_'.$redactorLanguage.'.js').'"], function() {';
    $jsCode[] = '			redactor2loadassets();';
    $jsCode[] = '		});';
    $jsCode[] = '	}';
    $jsCode[] = '});';
    if (!rex_file::put($this->getAssetsPath('cache/redactor2_base.js').'', implode(PHP_EOL, $jsCode))) {
        echo 'js-file konnte nicht gespeichert werden';
    }
    rex_view::addJsFile($this->getAssetsUrl('cache/redactor2_base.js'));
}
