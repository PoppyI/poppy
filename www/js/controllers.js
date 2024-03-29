angular.module('starter.controllers', ['firebase.utils'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $location, fbutil, simpleLogin) {
  //used so that user who aren't logged in are sent back to loggin page.
  if(simpleLogin.getUID() == false) {
    $location.path('/login');
  }

  $scope.user = fbutil.syncObject('users/' + simpleLogin.getUID());

  //expose logout function to scope
  $scope.logout = function() {
    simpleLogin.logout();
    $scope.user = null;
    $location.path('/login');
  };
})

.controller('HomeCtrl', ['$scope', 'fbutil', function($scope, fbutil) {
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

.controller('PurchaseConfirmedCtrl', function($scope, $stateParams, fbutil, simpleLogin, Orders) {
  $scope.product = fbutil.syncObject('products/' + $stateParams.productId);
  $scope.purchase_grams = $stateParams.grams;
  $scope.total_cost = $stateParams.total;

  var uid = simpleLogin.getUID();
  $scope.orderList = fbutil.syncArray('/orders');
  console.log($scope.orderList);
  $scope.addOrder = function() {
    var orderId = Orders.add($scope.product.title, $scope.product.$id, $scope.total_cost, $scope.purchase_grams, uid, "simplelogin:1");
    Orders.set(uid, orderId);
    Orders.set("simplelogin:1", orderId);

    window.location.href = '#/app/home';
    window.location.reload();
  }
})

.controller('PurchaseHistoryCtrl', function($scope, fbutil, simpleLogin, Orders) {
  var uid = simpleLogin.getUID();
  $scope.orders = Orders.get(uid);
  $scope.updateStatus = function(id) {
    var order = fbutil.syncObject('orders/'+id+'/status');
    order.$value = "received";
    order.$save();
    window.location.reload();
  }
})

.controller('CustomerOrdersCtrl', function($scope, fbutil, simpleLogin, Orders) {
  $scope.orders = fbutil.syncArray('orders');

  $scope.updateStatus = function(id, status) {
    console.log(status);
    var order = fbutil.syncObject('orders/'+id+'/status');
    order.$value = status;
    order.$save();
    window.location.reload();
  }
})

.controller('LoginCtrl', ['$scope', 'simpleLogin', '$location', 'fbutil', function($scope, simpleLogin, $location, fbutil) {

  $scope.login = {email: null, password: null, confirm: null};
  $scope.createMode = false;

  $scope.login = function() {
    $scope.err = null;
    simpleLogin.login($scope.login.email, $scope.login.pass)
      .then(function(/* user */) {
        routeTo();
        // window.location.href = '#/app/home';
        // window.location.reload();
      }, function(err) {
        $scope.err = errMessage(err);
      });
  };

  $scope.createAccount = function() {
    $scope.err = null;
    if( assertValidAccountProps() ) {
      simpleLogin.createAccount($scope.login.email, $scope.login.pass)
        .then(function(/* user */) {
          $location.path('#/app/home');
        }, function(err) {
          $scope.err = errMessage(err);
        });
    }
  };

  function assertValidAccountProps() {
    if( !$scope.login.email ) {
      $scope.err = 'Please enter an email address';
    }
    else if( !$scope.login.pass || !$scope.login.confirm ) {
      $scope.err = 'Please enter a password';
    }
    else if( $scope.createMode && $scope.login.pass !== $scope.login.confirm ) {
      $scope.err = 'Passwords do not match';
    }
    return !$scope.err;
  }

  function errMessage(err) {
    return angular.isObject(err) && err.code? err.code : err + '';
  }

  function routeTo() {
    var user = fbutil.syncArray('users/simplelogin:1');
    if(user.type == 'cultivator') {
      window.location.href = '#/app/browse';
    } else {
      window.location.href = '#/app/home';
    }
  }
}]);
