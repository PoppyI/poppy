angular.module('starter', ['ionic', 'starter.controllers', 'simpleLogin', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('login', {
      url: "/login",
      templateUrl: "templates/login.html",
      controller: "LoginCtrl"
  })

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'AppCtrl'
  })

  .state('app.home', {
    url: "/home",
    views: {
      'menuContent': {
        templateUrl: "templates/home.html",
        controller: 'HomeCtrl'
      }
    }
  })

  .state('app.browse', {
    url: "/browse",
    views: {
      'menuContent': {
        templateUrl: "templates/browse.html",
        controller: 'ProductCtrl'
      }
    }
  })

  .state('app.product_breakdown', {
    url: "/breakdown/:productId",
    views: {
      'menuContent': {
        templateUrl: "templates/product_breakdown.html",
        controller: 'ProductDetailCtrl'
      }
    }
  })

  .state('app.product_detail', {
    url: "/product_detail/:productId",
    views: {
      'menuContent': {
        templateUrl: "templates/product_detail.html",
        controller: 'ProductDetailCtrl'
      }
    }
  })

  .state('app.purchase', {
    url: "/purchase/:productId",
    views: {
      'menuContent': {
        templateUrl: "templates/purchase.html",
        controller: 'ProductDetailCtrl'
      }
    }
  })

  .state('app.purchase_confirmed', {
    url: "/purchase_confirmed/:productId/:grams/:total",
    views: {
      'menuContent': {
        templateUrl: "templates/purchase_confirmed.html",
        controller: 'PurchaseConfirmedCtrl'
      }
    }
  })

  .state('app.purchase_history', {
    url: "/purchase_history",
    views: {
      'menuContent': {
        templateUrl: "templates/purchase_history.html",
        controller: 'PurchaseHistoryCtrl'
      }
    }
  })

  .state('app.customer_orders', {
    url: "/customer_orders",
    views: {
      'menuContent': {
        templateUrl: "templates/customer_orders.html",
        controller: 'CustomerOrdersCtrl'
      }
    }
  })

  .state('app.grower_detail', {
    url: "/grower_detail/:growerId",
    views: {
      'menuContent': {
        templateUrl: "templates/grower_detail.html",
        controller: 'GrowerDetailCtrl'
      }
    }
  })

  .state('app.patient_profile', {
    url: "/patient_profile",
    views: {
      'menuContent': {
        templateUrl: "templates/patient_profile.html",
        controller: 'PatientCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');
});
