javascript: (function() { 
   $('table.contactlist').each(function() { 
      var $table = $(this); 
      var $t = $('<div/>').css('border', $table.css('border')).css('width', $table.width()).css('position', 'absolute').css('top', '5px').css('left', '15px').css('backgroundColor', '#DFDFDF').css('padding', '20px').html($.map($table.find('tr:gt(0)').not(':last'), function(tr) { 
         return $.map($(tr).find('th:lt(2),td:lt(2)'), function(e) { 
            return '"' + $(e).text().replace('"', '""') + '"' 
         }).join(',') 
      }).join('<br>')).prepend('Here\'s your CSV file. Copy and paste this into Notepad and save as a \.csv file.<br/><br/>'); 
      $t.html($t.html().replace(/\",\"/g,'","+')); 
      $t.appendTo('body'); 
   }) 
})()