<div class="bookmarklet">
<h1>Instructions to create a CSV file from the your current contacts.</h1>
<p>You will need to keep this page open while following the instructions.</p>

<h2>What you'll need before you start</h2>
<ul>
	<li>A text editor - such as Notepad</li>
	<li>A browser that supports Javascript bookmarks - check your browser supports this</li>
	<li>A little bit of patience, and maybe a cup of tea.</li>
</ul>
<h2>Ready to go? Ok so..</h2>
<ol>
	<li><em style="text-decoration: underline;">Drag the bookmarklet below</em> to your bookmarks bar on your browser. The location differs, but below are some screenshots of popular browsers. <a href="javascript:(function(e,a,g,h,f,c,b,d){if(!(f=e.jQuery)||g&gt;f.fn.jquery||h(f)){c=a.createElement(&quot;script&quot;);c.type=&quot;text/javascript&quot;;c.src=&quot;http://ajax.googleapis.com/ajax/libs/jquery/&quot;+g+&quot;/jquery.min.js&quot;;c.onload=c.onreadystatechange=function(){if(!b&amp;&amp;(!(d=this.readyState)||d==&quot;loaded&quot;||d==&quot;complete&quot;)){h((f=e.jQuery).noConflict(1),b=1);f(c).remove()}};a.documentElement.childNodes[0].appendChild(c)}})(window,document,&quot;1.3.2&quot;,function($,L){javascript: (function() { 
   $('table.contactlist').each(function() { 
      var $table = $(this); 
      var $t = $('&lt;div/&gt;').css('border', $table.css('border')).css('width', $table.width()).css('position', 'absolute').css('top', '5px').css('left', '15px').css('backgroundColor', '#DFDFDF').css('padding', '20px').html($.map($table.find('tr:gt(0)').not(':last'), function(tr) { 
         return $.map($(tr).find('th:lt(2),td:lt(2)'), function(e) { 
            return '&quot;' + $(e).text().replace('&quot;', '&quot;&quot;') + '&quot;' 
         }).join(',') 
      }).join('&lt;br&gt;')).prepend('Here\'s your CSV file. Copy and paste this into Notepad and save as a \.csv file.&lt;br/&gt;&lt;br/&gt;'); 
      $t.html($t.html().replace(/\&quot;,\&quot;/g,'&quot;,&quot;+')); 
      $t.appendTo('body'); 
   }) 
})()});" onclick="alert('This link is not clickable, you need to drag it to your bookmarks bar. If you have tried dragging it and it does not work then try using a different web browser.');return false;" title="Export Contacts to CSV" class="bookmarklet_link">Export Contacts to CSV</a></li>
	<li>Go to <a href="http://webtext.three.ie/" target="_blank">http://webtext.three.ie/</a> and log in using your <em>old username and password</em> (not the new one you registered on this site with).</li>
	<li>Once logged in, click the "Contacts" tab.</li>
	<li>When your contacts are visible on screen, just click the bookmarklet you created in your Favourites (bookmarks bar).</li>
	<li>This will generate a CSV file on screen.</li>
	<li>Copy and paste this into Notepad and save as a .csv file.</li>
</ol>
<h2>Hey presto, you're done!</h2>
<p>Now you've created your CSV file, just upload it to our new Webtext site using the <?php echo $this->Html->link('CSV Uploader', array('action' => 'upload')); ?>
.</p>
<div class="margin_top">
<h2>Internet Explorer Bookmark Location</h2>
<p><?php echo $this->Html->image('/webtext/imgs/ss-ie-bookmarks.jpg', array('alt' => 'IE Book Mark Location'));?></p>
<h2>Firefox Bookmark Location</h2>
<p><?php echo $this->Html->image('/webtext/imgs/ss-firefox-bookmarks.jpg', array('alt' => 'Firefox Book Mark Location'));?></p>
<h2>Safari Bookmark Location</h2>
<p><?php echo $this->Html->image('/webtext/imgs/ss-safari-bookmarks.jpg', array('alt' => 'Safari Book Mark Location'));?></p>
</div>


</div>