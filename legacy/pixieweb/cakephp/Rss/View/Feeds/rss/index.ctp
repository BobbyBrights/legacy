<?php
// You should import Sanitize
App::uses('Sanitize', 'Utility');

$u = $this->Html->url('/'); 

$this->set('channelData', array(
    'title' => __("TCD News: Most Recent Items"),
    'link' => $u,
    'description' => __("Full text description"),
    'language' => 'en-us',
    'atom:link' => array(
	    'attrib' => array(
	        'href' => $u,
	        'rel' => 'self',
	        'type' => 'application/rss+xml'
	     )
     )
));

foreach ($items as $i) {
    $postTime = strtotime($i['Item']['created']);

    $postLink = 'http://www.tcd.ie/news/items#' . $i['Item']['id'];
    /*
    array(
        'controller' => 'items',
        'action' => 'view',
        $i['Item']['id']
    );
    */
    // This is the part where we clean the body text for output as the description
    // of the rss item, this needs to have only text to make sure the feed validates
    $bodyText = preg_replace('=\(.*?\)=is', '', $i['Item']['content']);
    $bodyText = $this->Text->stripLinks($bodyText);
    $bodyText = Sanitize::stripAll($bodyText);
    $bodyText = $this->Text->truncate($bodyText, 400, array(
        'ending' => '...',
        'exact'  => true,
        'html'   => true,
    ));

    echo $this->Rss->item(array(), array(
        'title' => $i['Item']['summary'],
        'link' => $postLink,
        'guid' => array('url' => $postLink, 'isPermaLink' => 'true'),
        'description' => $bodyText,
        'pubDate' => $postTime
    ));
}
?>