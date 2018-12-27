<?php

rex_sql_table::get(rex::getTable('redactor2_profiles'))
    ->ensurePrimaryIdColumn()
    ->ensureColumn(new rex_sql_column('name', 'varchar(191)'))
    ->ensureColumn(new rex_sql_column('description', 'text'))
    ->ensureColumn(new rex_sql_column('urltype', 'varchar(191)'))
    ->ensureColumn(new rex_sql_column('externalurltarget', 'text'))
    ->ensureColumn(new rex_sql_column('minheight', 'int(5)'))
    ->ensureColumn(new rex_sql_column('maxheight', 'int(5)'))
    ->ensureColumn(new rex_sql_column('characterlimit', 'int(5)'))
    ->ensureColumn(new rex_sql_column('toolbarfixed', 'tinyint(1)'))
    ->ensureColumn(new rex_sql_column('shortcuts', 'tinyint(1)'))
    ->ensureColumn(new rex_sql_column('linkify', 'tinyint(1)'))
    ->ensureColumn(new rex_sql_column('imagetag', 'text'))
    ->ensureColumn(new rex_sql_column('redactor_plugins', 'text'))
    ->ensure();

rex_sql::factory()->setQuery('INSERT IGNORE INTO '.rex::getTable('redactor2_profiles').' (`id`, `name`, `description`, `minheight`, `maxheight`, `characterlimit`, `urltype`, `externalurltarget`, `shortcuts`, `linkify`, `imagetag`, `redactor_plugins`) VALUES
(1, "full", "Standard Redactor-Konfiguration", "300", "800", "0", "relative", "blank", "0", "1", "", "anchorlink,alignment,blockquote,bold,cleaner,clips[Snippetname1=Snippettext1|Snippetname2=Snippettext2],deleted,emaillink,externallink,fontcolor[Weiss=#ffffff|Schwarz=#000000],fontfamily[Arial|Times],fontsize[12px|15pt|120%],format[Absatz Klein=p.small|Absatz Mittel=p.middle|Absatz Gross=p.big],fullscreen,groupheading[1|2|3|4|5|6],grouplink[email|external|internal|media|telephone],grouplist[unorderedlist|orderedlist|indent|outdent],heading1,heading2,heading3,heading4,heading5,heading6,horizontalrule,internallink,italic,media,medialink,orderedlist,paragraph,properties,redo,source,styles[code=Code|kbd=Shortcut|mark=Markiert|samp=Sample|var=Variable],sub,sup,table,telephonelink,textdirection,underline,undo,unorderedlist");');
