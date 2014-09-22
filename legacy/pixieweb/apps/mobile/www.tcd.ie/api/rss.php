<?php
header('Content-Type: text/xml');
mysql_connect('wwwdb.tcd.ie', 'commspub', 'B2qQ6Rs') or
    die("Could not connect: " . mysql_error());
    
mysql_select_db("tcdcomms");
//mysql_set_charset('utf8');

$upper_limit = 10;

$sql = sprintf("SELECT title, IFNULL(modified_date, created_date) as _date, header_id h, IF((SELECT content FROM t_news WHERE t_news.header_id = h) IS NULL = 0, 'n', 'p') AS t FROM t_content_headers WHERE visible = 1 ORDER BY ifnull(modified_date, created_date) DESC LIMIT 0, %d;", $upper_limit);

$result = mysql_query($sql);
?><rss version="2.0" xml:lang="en" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:media="http://search.yahoo.com/mrss/" xmlns:atom="http://www.w3.org/2005/Atom" >
   <channel>
	  <title>News from Trinity College Dublin</title>
	  <link>http://www.tcd.ie/</link>
	  <atom:link rel="self" type="application/rss+xml" href="file:///Macintosh%20HD/Users/jamie/Documents/Web%20Server%20Files/Sites/assets/feeds/news.rss"/>
	  <description>News from Trinity College Dublin, The University of Dublin</description>
	  <dc:subject>Education Higher Education</dc:subject>
	  <language>en</language>
	  <dc:rights>Copyright 2013</dc:rights>
	  <managingEditor>webdes@tcd.ie (Trinity College Dublin)</managingEditor>
      <webMaster>webdes@tcd.ie</webMaster>
      <lastBuildDate>Tue, 16 Jul 2013 13:47:55 GMT</lastBuildDate>
      <pubDate>Tue, 16 Jul 2013 13:47:55 GMT</pubDate>
<?php
while ($row = mysql_fetch_array($result, MYSQL_NUM)) {
	$vs_date = date('Y-m-d', strtotime($row[1]));
	$utc_date = date('r', strtotime($row[1]));
	$this_year = date('Y');	
	$title = utf8_encode( $row[0] );
	$title = htmlspecialchars($title);
	
	$link = $row[3] == 'p' ? '//www.tcd.ie/Communications/news/pressreleases/pressRelease.php?headerID='.$row[2].'&amp;pressReleaseArchive=' . $this_year : '//www.tcd.ie/Communications/news/news.php?headerID='.$row[2].'&amp;vs_date'.$vs_date;
?>
<item>
	<title><?php echo $title ?></title>
	<description><?php echo $title; ?></description>
	<content:encoded><?php echo $title; ?></content:encoded>
	<link><?php echo $link; ?></link>
	<pubDate><?php echo $utc_date; ?></pubDate>
	<dc:creator>Communications Office</dc:creator>
	<enclosure url="" length="0" type="text/html" />
	<media:thumbnail url="//www.tcd.ie/assets/images/side/news/2013-07-19-pitch-drop.jpg" />
</item>
<?php
}

mysql_free_result($result);
?>
</channel>
</rss>
