DROP TABLE IF EXISTS `%TABLE_PREFIX%redactor2_profiles`;

CREATE TABLE `%TABLE_PREFIX%redactor2_profiles` (
  `id` int(11) UNSIGNED NOT NULL,
  `name` varchar(30) NOT NULL DEFAULT '',
  `description` varchar(255) NOT NULL DEFAULT '',
  `urltype` varchar(50) NOT NULL,
  `redactor_buttons` text NOT NULL,
  `redactor_plugins` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `%TABLE_PREFIX%redactor2_profiles` (`id`, `name`, `description`, `urltype`, `redactor_plugins`) VALUES
(1, 'full', 'Standard Redactor-Konfiguration', 'relative', 'cleaner,clips[Snippetname1=Snippettext1|Snippetname2=Snippettext2],fontcolor[Weiss=#ffffff|Schwarz=#000000],fontfamily[Arial|Times],fontsize[12px|15pt|120%],fullscreen,heading1,heading2,heading3,heading4,heading5,heading6,paragraph,rex_linkmap,rex_mediapool_image,rex_mediapool_link,table,textdirection,video');

ALTER TABLE `%TABLE_PREFIX%redactor2_profiles`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `%TABLE_PREFIX%redactor2_profiles`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;