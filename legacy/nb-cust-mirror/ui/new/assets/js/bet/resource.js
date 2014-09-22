'use strict';

/* get bets collection from server
 * available query parameters :
 * dateRange:
 * winningBet:
 * settled:
 * drawId:
 *
 * value returned:
 * not exist: 404 not found
 * exist: 
 * [
 		{
 			bets:[	
 				{numbers_matched: value, lottery:{id: value,name:value}, created:value, winner:value, bet_effective_date:value, line:{bonus:value, standard:[....]}, settled:value, id:value},
 				{...}
 		  	],
 		  	drawId:value
 		},
 		...,
 		{		
 			bets:[...],
 			drawId:value
 		}
 	]

 *
 * If ':id' is attached after '/bets/' then the returned value is just for that sigle bet
 * :id : id of the bet
 * value returned:
 * 	{
		numbersMatched:value,
		lottery:{cron:value, line_price:value, scraper:value, name:value, id:value},
		settled:value,
		created:value,
		draw_id:value,
		line:{bonus:value, standard:[...]},
		winner:value,
		betEffectiveDate:value,
		id:value,
		paid:value
   	}
*/
angular.module('nb.resources')
	.factory('Bet',['$resource', function ($resource){
		//get betsCollection according to the specified drawId
		return $resource(	'/user/bets/:id', 
							{id: "@id"},{});
}]);
