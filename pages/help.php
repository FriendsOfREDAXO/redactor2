<?php
/**
 * This file is part of the redactor2 package.
 *
 * @author (c) Friends Of REDAXO
 * @author <friendsof@redaxo.org>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

$file = rex_file::get(rex_path::addon('redactor2', 'README.md'));
$body = rex_markdown::factory()->parse($file);
$fragment = new rex_fragment();
$fragment->setVar('body', $body, false);
$help = $fragment->parse('core/page/section.php');
echo $help;
?>
