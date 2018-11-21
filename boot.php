<?php

if (rex::isBackend() && !empty(rex::getUser())) {

    // TODO:
    // Sprache es auch beachten / Abhängig von Sprachdateien in langs ?
    // Profiles sind Sprachen der Profiles anpassen
    // $customPlugins reinladen ?
    // skin dynamisch reinladen -> lieber über project AddOn
    // clang_id in Profile ?
    // $redactorLanguage im Profile ??

    rex_view::addCssFile($this->getAssetsUrl('vendor/redactor.css'));
    rex_view::addJsFile($this->getAssetsUrl('vendor/redactor.js'));

    rex_view::addCssFile($this->getAssetsUrl('redactor_custom.css'));
    rex_view::addJsFile($this->getAssetsUrl('redactor_plugins.min.js'));
    rex_view::addJsFile($this->getAssetsUrl('redaxo.js'));

    if (!file_exists($this->getAssetsUrl('cache/profiles.js'))) {
        redactor2::createJavascriptFile();
    }

    rex_view::addJsFile($this->getAssetsUrl('cache/profiles.js'));
    rex_view::addJsFile($this->getAssetsUrl('langs/'.redactor2::getRedactorLanguage().'.js'));

}
