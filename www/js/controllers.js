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
  $scope.feat_strains = fbutil.syncArray('featured/strain');
  $scope.feat_growers = fbutil.syncArray('featured/grower');
}])

.controller('ProductDetailCtrl', function($scope, $stateParams, fbutil) {
  $scope.product = fbutil.syncObject('products/' + $stateParams.productId);
  $scope.breakdown = fbutil.syncObject('breakdown/' + $stateParams.productId);
  $scope.purchase_grams = 3.5;
})

.controller('ProductCtrl', ['$scope', 'fbutil', 'FBURL', function($scope, fbutil, FBURL) {
  $scope.products = fbutil.syncArray('products');
}])

.controller('GrowerDetailCtrl', function($scope, $stateParams, fbutil) {
  $scope.grower = fbutil.syncObject('growers/' + $stateParams.growerId);
})

.controller('PatientCtrl', function($scope, $stateParams, fbutil, simpleLogin) {
  var patientId = simpleLogin.getUID();
  $scope.patient = fbutil.syncObject('users/' + patientId);
})

.controller('PurchaseConfirmedCtrl', function($scope, $stateParams, fbutil, simpleLogin) {
  $scope.product = fbutil.syncObject('products/' + $stateParams.productId);
  $scope.purchase_grams = $stateParams.grams;
  $scope.total_cost = $stateParams.total;

  var uid = simpleLogin.getUID();
  $scope.orderList = fbutil.syncArray('users/' + uid + '/orders', {limit: 10, endAt: null});
  console.log($scope.orderList);
  $scope.addOrder = function() {
    $scope.orderList.$add({title: $scope.product.title, product_id: $scope.product.$id, total_cost: $scope.total_cost, grams: $scope.purchase_grams, timestamp: Firebase.ServerValue.TIMESTAMP, status: "processing"});
    window.location.href = '#/app/home';
    window.location.reload();
  }
})

.controller('PurchaseHistoryCtrl', function($scope, fbutil, simpleLogin) {
  var uid = simpleLogin.getUID();
  console.log(uid);
  $scope.orders = fbutil.syncArray('users/' + uid + '/orders');
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
