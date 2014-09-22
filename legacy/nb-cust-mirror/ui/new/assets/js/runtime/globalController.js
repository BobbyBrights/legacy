angular.module('nb.global', [])
	.run(['$rootScope' , '$modal' ,'$state', 'Functions','Auth', function($rootScope, $modal, $state, Functions, Auth){
			
		//console.log('loading the global controller');
		var prizesModalInstance;

		$rootScope.openPrizesModal = function(){
			console.log('opening the prizes modal');
			prizesModalInstance = $modal.open({
				templateUrl: '/partials/modals/prizes.html',
				windowClass: 'prizes-modal-window'
			});
		};

		$rootScope.closePrizesModal = function(){
			prizesModalInstance.close();
		};


		$rootScope.goToHomePage = function(){
			if(true === Auth.isAuthenticated){
				$state.go('root.home');
			}
			else{
				$state.go('root');
			}
		};
		
		//this variable is controlling whether to display the loading spinner while the 
		//ui-rooter runing the initial page loading
		$rootScope.iniLoading = false;

		$rootScope.pageIniSessionCheck = false;

		/*var nextDrawDateObj = Functions.getNextDrawDate();
		$rootScope.nextDrawDate = nextDrawDateObj.shortStr;
		$rootScope.nextDrawDateLong = nextDrawDateObj.longStr;
		$rootScope.nextDrawTimeLeftStr = nextDrawDateObj.timeLeftStr;*/
	}]);