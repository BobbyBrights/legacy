<?php
//Allows shortcodes to be added to text widgets
add_filter( 'widget_text', 'do_shortcode', 11);
add_shortcode('ang_contact_form',	'angular_contact_form');


function angular_contact_form($a, $c){
	//$s = '##ANGULAR_CONTACT_FORM_WIDGET##' . "<pre>".json_encode($a)."</pre>" . "<pre>".json_encode($c)."</pre>";
	$s = ' <style type="text/css">
      .css-form input.ng-invalid.ng-dirty {
        background-color: #FA787E;
      }
    
      .css-form input.ng-valid.ng-dirty {
        background-color: #78FA89;
      }
    </style><script type="text/javascript">
	
	function Controller($scope) {
  $scope.master= {};
 
  $scope.update = function(user) {
    $scope.master= angular.copy(user);
  };
 
  $scope.reset = function() {
    $scope.user = angular.copy($scope.master);
  };
 
  $scope.isUnchanged = function(user) {
    return angular.equals(user, $scope.master);
  };
 
  $scope.reset();
}
</script>'; 
	$s .= '<div ng-controller="Controller">
      <form name="form" class="css-form" novalidate>
        Name:
          <input type="text" ng-model="user.name" name="uName" required /><br />
        E-mail:
          <input type="email" ng-model="user.email" name="uEmail" required/><br />
        <div ng-show="form.uEmail.$dirty && form.uEmail.$invalid">Invalid:
          <span ng-show="form.uEmail.$error.required">Tell us your email.</span>
          <span ng-show="form.uEmail.$error.email">This is not a valid email.</span>
        </div>
    
        Gender: <input type="radio" ng-model="user.gender" value="male" />male
        <input type="radio" ng-model="user.gender" value="female" />female<br />
    
        <input type="checkbox" ng-model="user.agree" name="userAgree" required />
        I agree: <input ng-show="user.agree" type="text" ng-model="user.agreeSign"
                  required /><br />
        <div ng-show="!user.agree || !user.agreeSign">Please agree and sign.</div>
    
        <button ng-click="reset()" ng-disabled="isUnchanged(user)">RESET</button>
        <button ng-click="update(user)"
                ng-disabled="form.$invalid || isUnchanged(user)">SAVE</button>
      </form>
    </div>';
	return $s;
}

?>