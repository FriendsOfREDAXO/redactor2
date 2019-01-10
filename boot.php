<?php

if (rex::isBackend() && !empty(rex::getUser())) {

    rex_view::addCssFile($this->getAssetsUrl('vendor/redactor.css'));
    rex_view::addJsFile($this->getAssetsUrl('vendor/redactor.js'));

    rex_view::addCssFile($this->getAssetsUrl('redactor_custom.css'));
    rex_view::addJsFile($this->getAssetsUrl('redactor_plugins.js'));
    rex_view::addJsFile($this->getAssetsUrl('redaxo.js'));

    rex_view::addJsFile($this->getAssetsUrl('cache/profiles_'.redactor2::getCurrentLanguage().'.js'));
    rex_view::addJsFile($this->getAssetsUrl('langs/'.redactor2::getCurrentLanguage().'.js'));

    rex_view::setJsProperty('clang_id',rex_clang::getCurrentId());
}

// uncomment in case you want to edit the plugins
// \redactor2::createRedactorPlugInsFile();

