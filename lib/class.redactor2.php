<?php

class redactor2
{
    public static function insertProfile($name, $description = '', $minheight = '300', $maxheight = '800', $urltype = 'relative', $characterlimit = 0, $toolbarfixed = 0, $shortcuts = 0, $linkify = 1, $redactorPlugins = '')
    {
        $sql = rex_sql::factory();
        $sql->setTable(rex::getTablePrefix().'redactor2_profiles');
        $sql->setValue('name', $name);
        $sql->setValue('description', $description);
        $sql->setValue('minheight', $minheight);
        $sql->setValue('maxheight', $maxheight);
        $sql->setValue('urltype', $urltype);
        $sql->setValue('characterlimit', $characterlimit);
        $sql->setValue('shortcuts', $shortcuts);
        $sql->setValue('toolbarfixed', $toolbarfixed);
        $sql->setValue('shortcuts', $shortcuts);
        $sql->setValue('linkify', $linkify);
        $sql->setValue('redactor_plugins', $redactorPlugins);

        try {
            $sql->insert();
            return $sql->getLastId();
        } catch (rex_sql_exception $e) {
            return $e->getMessage();
        }
    }

    public static function profileExists($name)
    {
        $sql = rex_sql::factory();
        $profile = $sql->setQuery("SELECT `name` FROM `".rex::getTablePrefix()."redactor2_profiles` WHERE `name` = ".$sql->escape($name)."")->getArray();
        unset($sql);

        if (!empty($profile)) {
            return true;
        } else {
            return false;
        }
    }

    public static function clean($content)
    {
        do {
            $tmp = $content;
            $content = preg_replace('#<([^ >]+)[^>]*>[[:space:]]*</\1>#', '', $content);
        } while ($content !== $tmp);

        return $content;
    }

    public static function createJavascriptFile()
    {
        foreach (self::getLanguages() as $redactorLanguage) {

            $profiles = [];
            foreach (rex_sql::factory()->getArray("SELECT * FROM `" . rex::getTablePrefix() . "redactor2_profiles` ORDER BY `name` ASC") as $key => $profile) {

                $redactorPlugins = [];

                $name = $profile["name"];

                $profiles[$name]["linkSize"] = 1000;
                $profiles[$name]["imageCaption"] = false;
                $profiles[$name]["imageResizable"] = true;
                $profiles[$name]["imagePosition"] = true;
                $profiles[$name]["linkValidation"] = false;

                $profiles[$name]["linkify"] = ($profile['linkify']) ? true : false;
                $profiles[$name]["lang"] = $redactorLanguage;
                $profiles[$name]["minHeight"] = (int)$profile['minheight'];
                $profiles[$name]["maxHeight"] = (int)$profile['maxheight'];
                $profiles[$name]["urltype"] = $profile['urltype'];
                $profiles[$name]["toolbarFixed"] = ($profile['toolbarfixed']) ? true : false;
                $profiles[$name]["shortcutsAdd"] = ($profile['shortcuts']) ? true : false;
                $profiles[$name]["imageTag"] = $profile['imagetag'];
                $profiles[$name]["externalUrlTarget"] = $profile['externalurltarget'];
                if ($profile['characterlimit'] != 0) {
                    $profiles[$name]["limiter"] = $profile['characterlimit'];
                    $redactorPlugins[] = 'limiter';
                }

                if (trim($profile['redactor_plugins']) != '') {
                    $plugins = explode(',', $profile['redactor_plugins']);
                    foreach ($plugins as $plugin) {
                        $plugin = trim($plugin);
                        if (preg_match('/(.*)\[(.*)\]/', $plugin, $matches)) {

                            $parameters = explode('|', $matches[2]);
                            $parameterString = [];
                            foreach ($parameters as $parameter) {
                                if (strpos($parameter, '=') !== false) {
                                    list($key, $value) = explode('=', $parameter, 2);
                                    $parameterString[] = [$key, $value];
                                } else {
                                    $parameterString[] = $parameter;
                                }
                            }
                            $profiles[$name][$matches[1]] = $parameterString;
                            $redactorPlugins[] = $matches[1];
                        } else {
                            $redactorPlugins[] = $plugin;
                        }
                    }
                }

                $profiles[$name]['buttons'] = [];
                $profiles[$name]['plugins'] = $redactorPlugins;

                $content = 'redactor2_profiles = ' . json_encode($profiles, JSON_PRETTY_PRINT) . ';';

                if (!rex_file::put(rex_addon::get('redactor2')->getAssetsPath('cache/profiles_'.$redactorLanguage.'.js'), $content)) {
                    echo rex_view::error('profiles_'.$redactorLanguage.'.js - save error');
                }

            }

        }

    }

    static function getCurrentLanguage()
    {
        $currentLanguage = substr(rex::getProperty('lang'), 0, 2);
        if (!in_array($currentLanguage, self::getLanguages(), true)) {
            $currentLanguage = "en";
        }
        return $currentLanguage;
    }

    public static function getLanguages()
    {
        return ['de','en','es'];
    }

}
