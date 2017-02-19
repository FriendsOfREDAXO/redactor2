Redactor-Editor
===============

Addon für REDAXO 5: Bindet den WYSIWYG-Editor [Redactor](http://imperavi.com/redactor/) im Backend ein.

![Screenshot](https://raw.githubusercontent.com/FriendsOfREDAXO/redactor2/assets/redactor2.png)

## Beschreibung

Textareas mit der Klasse `redactorEditor2-%profileName%` werden automatisch von einem normalen Texteingabefeld in einen WYSIWYG-Editor umgewandelt, z. B. `<textarea class="redactorEditor2-full"></textarea>`, in yForm-Textareas im "Individuelle Attribute"-Feld: `{"class":"redactorEditor2-full"}`

Im Backend können verschiedene Profile mit unterschiedlichen Konfigurationseinstellungen für den Redactor-Editor angelegt werden.

Es gibt die Möglichkeit, dem Editor eigene CSS-Styles zu geben. Dafür muss lediglich im Ordner `/assets/addons/redactor2` eine Datei mit dem Namen `skin.css` angelegt werden.

## Codebeispiele

__Modul-Input:__

```html
<fieldset class="form-horizontal">
  <div class="form-group">
    <label class="col-sm-2 control-label" for="value-1">VALUE 1</label>
    <div class="col-sm-10">
      <textarea class="form-control redactorEditor2-full" id="value-1" name="REX_INPUT_VALUE[1]">REX_VALUE[1]</textarea>
    </div>
  </div>
</fieldset>
```

__Modul-Output:__

```php
REX_VALUE[id="1" output="html"]
```

__Via Modul oder AddOn ein Profil anlegen:__

```php
<?php
  if (!redactor2::profileExists('simple')) {
    redactor2::insertProfile('simple', 'Lorem Ipsum', '300', '800', 'relative', 'bold,table');
  }
?>
```
