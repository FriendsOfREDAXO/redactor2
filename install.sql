CREATE TABLE IF NOT EXISTS `%TABLE_PREFIX%redactor2_profiles` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL DEFAULT '',
  `description` varchar(255) NOT NULL DEFAULT '',
  `urltype` varchar(50) NOT NULL,
  `minheight` smallint(5) unsigned NOT NULL,
  `maxheight` smallint(5) unsigned NOT NULL,
  `characterlimit` smallint(5) unsigned NOT NULL,
  `toolbarfixed` tinyint(1) unsigned NOT NULL,
  `shortcuts` tinyint(1) unsigned NOT NULL,
  `linkify` tinyint(1) unsigned NOT NULL,
  `redactor_plugins` text NOT NULL,
  `redactor_customplugins` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT IGNORE INTO `%TABLE_PREFIX%redactor2_profiles` (`id`, `name`, `description`, `minheight`, `maxheight`, `characterlimit`, `urltype`, `shortcuts`, `linkify`, `redactor_plugins`, `redactor_customplugins`) VALUES
(1, 'full', 'Standard Redactor-Konfiguration', '300', '800', '0', 'relative', '0', '1', 'alignment,blockquote,bold,cleaner,clips[Snippetname1=Snippettext1|Snippetname2=Snippettext2],deleted,emaillink,externallink,fontcolor[Weiss=#ffffff|Schwarz=#000000],fontfamily[Arial|Times],fontsize[12px|15pt|120%],fullscreen,groupheading[1|2|3|4|5|6],grouplink[email|external|internal|media|telephone],grouplist[unorderedlist|orderedlist|indent|outdent],heading1,heading2,heading3,heading4,heading5,heading6,horizontalrule,internallink,italic,media,medialink,orderedlist,paragraph,properties,redo,source,styles[code=Code|kbd=Shortcut|mark=Markiert|samp=Sample|var=Variable],sub,sup,table,telephonelink,textdirection,underline,undo,unorderedlist','');