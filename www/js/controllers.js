angular.module('starter.controllers', ['firebase.utils'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
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
});
