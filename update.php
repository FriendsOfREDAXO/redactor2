<?php
	rex_sql_table::get(rex::getTable('redactor2_profiles'))
	->ensureColumn(new rex_sql_column('toolbarfixed', 'tinyint(1)'))
	->ensureColumn(new rex_sql_column('shortcuts', 'tinyint(1)'))
	->ensureColumn(new rex_sql_column('linkify', 'tinyint(1)'))
	->ensureColumn(new rex_sql_column('redactor_customplugins', 'text'))
	->alter();
?>