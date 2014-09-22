'use strict';
// Module constructor
angular.module('nb.resources')

    /*
     * Fetch the lottery summary info without any parameter
     * Fetch single lottery info with the lotteryId specified
    */
    .factory('Lottery', ['$resource', function ($resource){
    	return $resource(	'/lotteries/:lotteryId', 
    						{
                                lotteryId: '@lotteryId', 
                                dateFrom: '@dateFrom',
                                dateTo: '@dateTo'
                            },
    						{}
    					);
    }])
