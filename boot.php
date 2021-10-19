<?php

if (rex::isBackend() && rex::getUser()) {
    if (rex::isDebugMode() && rex_request_method() == 'get') {
        $compiler = new rex_scss_compiler();
        $compiler->setRootDir($this->getPath());
        $compiler->setScssFile($this->getPath('assets/redactor_dark.scss'));
        $compiler->setCssFile($this->getPath('assets/redactor_dark.css'));
        $compiler->compile();
        rex_file::copy($this->getPath('assets/redactor_dark.css'), $this->getAssetsPath('redactor_dark.css'));
    }
}

if (rex::isBackend() && !empty(rex::getUser())) {
    rex_view::addCssFile($this->getAssetsUrl('vendor/redactor.css'));
    rex_view::addJsFile($this->getAssetsUrl('vendor/redactor.js'));

    rex_view::addCssFile($this->getAssetsUrl('redactor_custom.css'));
    rex_view::addCssFile($this->getAssetsUrl('redactor_dark.css'));
    rex_view::addJsFile($this->getAssetsUrl('redactor_plugins.js'));
    rex_view::addJsFile($this->getAssetsUrl('redaxo.js'));

    rex_view::addJsFile($this->getAssetsUrl('cache/profiles_'.redactor2::getCurrentLanguage().'.js'));
    rex_view::addJsFile($this->getAssetsUrl('langs/'.redactor2::getCurrentLanguage().'.js'));

    rex_view::setJsProperty('clang_id', rex_clang::getCurrentId());
}

// uncomment in case you want to edit the plugins
// \redactor2::createRedactorPlugInsFile();

