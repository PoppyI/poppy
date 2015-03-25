angular.module('starter.controllers', ['firebase.utils'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, simpleLogin, $location) {
  //used so that user who aren't logged in are sent back to loggin page.
  if(simpleLogin.getUID() == false) {
    $location.path('/login');
  }

  //expose logout function to scope
  $scope.logout = function() {
    simpleLogin.logout();
    $location.path('/login');
  };
})

.controller('HomeCtrl', ['$scope', 'fbutil', 'FBURL', function($scope, fbutil, FBURL) {
  $scope.products = fbutil.syncArray('products', {limit: 2, endAt: null});
  $scope.featured = fbutil.syncArray('featured');
}])

.controller('ProductDetailCtrl', function($scope, $stateParams, fbutil) {
  $scope.product = fbutil.syncObject('products/' + $stateParams.productId);
})

.controller('ProductCtrl', ['$scope', 'fbutil', 'FBURL', function($scope, fbutil, FBURL) {
  $scope.products = fbutil.syncArray('products');
}])

.controller('PurchaseConfirmedCtrl', function($scope, $stateParams, fbutil) {
  $scope.product = fbutil.syncObject('products/' + $stateParams.productId);
  $scope.purchase_grams = $stateParams.grams;
})

.controller('LoginCtrl', ['$scope', 'simpleLogin', '$location', function($scope, simpleLogin, $location) {
  $scope.email = null;
  $scope.pass = null;

  $scope.login = function(email, pass) {
    $scope.err = null;
    simpleLogin.login(email, pass)
      .then(function(/* user */) {
        window.location.href = '#/app/home';
        window.location.reload();
      }, function(err) {
        $scope.err = errMessage(err);
      });
  };

  function assertValidAccountProps() {
    if( !$scope.email ) {
      $scope.err = 'Please enter an email address';
    }
    else if( !$scope.pass || !$scope.confirm ) {
      $scope.err = 'Please enter a password';
    }
    else if( $scope.createMode && $scope.pass !== $scope.confirm ) {
      $scope.err = 'Passwords do not match';
    }
    return !$scope.err;
  }

  function errMessage(err) {
    return angular.isObject(err) && err.code? err.code : err + '';
  }
}]);
