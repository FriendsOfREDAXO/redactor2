<?php

\rex_sql_table::get(\rex::getTable('redactor2_profiles'))
    ->ensureColumn(new \rex_sql_column('linkify', 'tinyint', false, 0, 'unsigned'))
    ->ensureColumn(new \rex_sql_column('redactor_customplugins', 'text', false, ''))
    ->alter();
