<?php
	class redactor2 {

		public static function insertProfile ($name, $description = '', $minheight = '300', $maxheight = '800', $urltype = 'relative', $characterlimit = 0, $toolbarfixed = 0, $shortcuts = 0, $linkify = 1, $redactorPlugins = '', $redactorCustomPlugins = '') {
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
			$sql->setValue('redactor_customplugins', $redactorCustomPlugins);

			try {
				$sql->insert();
				return $sql->getLastId();
			} catch (rex_sql_exception $e) {
				return $e->getMessage();
			}
		}

		public static function profileExists ($name) {
			$sql = rex_sql::factory();
			$profile = $sql->setQuery("SELECT `name` FROM `".rex::getTablePrefix()."redactor2_profiles` WHERE `name` = ".$sql->escape($name)."")->getArray();
			unset($sql);

			if (!empty($profile)) {
				return true;
			} else {
				return false;
			}
		}
		
		public static function clean($content) {
			//Start - remove empty tags
				do {
					$tmp = $content;
					$content = preg_replace('#<([^ >]+)[^>]*>[[:space:]]*</\1>#', '', $content);
				} while ($content !== $tmp);
			//End - remove empty tags
			
			return $content;
		}
	}
