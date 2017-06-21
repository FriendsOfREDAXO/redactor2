<?php

\rex_sql_table::get(\rex::getTable('redactor2_profiles'))
    ->ensureColumn(new \rex_sql_column('linkify', 'tinyint', false, null, 'unsigned'))
    ->alter();
