'use strict';

angular.module('nb.controllers')
	.controller('AccountPaymentController',[ '$scope', 'userInfoManager',
		function($scope, userInfoManager){
			$scope.userCards = [];

			//var monthShortNames = ['Jan','Feb','Mar','Apr','May','June','July','Aug','Sep','Oct','Nov','Dec'];
			$scope.monthArray   = [ {id:0, value:'Jan(01)'},{id:1, value:'Feb(02)'},{id:2, value:'Mar(03)'},{id:3, value:'Apr(04)'},{id:4, value:'May(05)'},{id:5, value:'June(06)'},
                                    {id:6, value:'July(07)'},{id:7, value:'Aug(08)'},{id:8, value:'Sep(09)'},{id:9, value:'Oct(10)'},{id:10, value:'Nov(11)'},{id:11, value:'Dec(12)'}];

			$scope.yearArray    = [];

			$scope.firstCardMonth = 1;

			//Private Part
            var currentDate     = new Date();
            var numOfYearsListed = 10;

			$scope.genYearArray = function(maxNumberYears){
                if(!maxNumberYears){
                    maxNumberYears = 10;
                }

                var currentYear = (new Date()).getFullYear();
                console.log('currentYear is:'+currentYear);

                for(var num=0;num<maxNumberYears;num++){
                    //$scope.yearArray.push({id:num, value: '' + (currentYear-num)});
                    $scope.yearArray.push((currentYear+maxNumberYears-1-num));
                }
            }

            $scope.getCardTypeName = function(cardTypeShort){
            	var cardTypeLongName = cardTypeShort;
            	switch(cardTypeShort){
            		case 'MC':
            			cardTypeLongName = 'Master Card';
            			break;
            		default:
            			cardTypeLongName = cardTypeShort;
            	}
            	return cardTypeLongName;
            }

            $scope.updateCardExpiryDate = function(cardObj, newDate){
            	console.log('the target card is:');
            	console.log(cardObj);
            	console.log(newDate);
            }


            $scope.closeDropDown = function(){
            	console.log('close');
            	//$('.dropdown').dropdown('toggle');
            	//$('.dropdown-menu').hide();
            	//$('.dropdown-menu').dropdown('toggle');
            	//$('[data-toggle="dropdown"]').parent().removeClass('open');
            	//$('.dropdown').removeClass('open');
            	//$('dropdown').toggled('close');
            	//$('dropdown').dropdown('toggle');

            	//$('.dropdown.open').removeClass('open');
			    //$('.dropdown-menu').hide();
			       
				$('.dropdown.open .dropdown-toggle').dropdown('toggle');
				       
				$('[data-toggle="dropdown"]').parent().removeClass('open');
            }

			/*******************
             * Main Logic Part *
             *******************/

            $scope.genYearArray(numOfYearsListed);


            userInfoManager.updateUserCards().then(function(){
            	$scope.userCards 	= userInfoManager.getUserCards();

            	console.log('the user cards are');
            	console.log($scope.userCards);
            },function(){

            });
	}]);