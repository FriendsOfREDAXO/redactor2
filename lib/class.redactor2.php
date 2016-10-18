<?php
	class redactor2 {
		
		public static function insertProfile ($name, $description = '', $minheight = '300', $maxheight = '800', $urltype = 'relative', $redactorPlugins = '') {
			$sql = rex_sql::factory();
			$sql->setTable(rex::getTablePrefix().'redactor2_profiles');
			$sql->setValue('name', $name);
			$sql->setValue('description', $description);
			$sql->setValue('minheight', $minheight);
			$sql->setValue('maxheight', $maxheight);
			$sql->setValue('urltype', $urltype);
			$sql->setValue('redactor_plugins', $redactorPlugins);
			
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
	}
?>