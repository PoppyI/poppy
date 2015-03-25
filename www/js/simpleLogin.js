angular.module('simpleLogin', ['firebase', 'firebase.utils'])

  .factory('simpleLogin', ['$firebaseAuth', 'fbutil',
    function($firebaseAuth, fbutil, createProfile, changeEmail) {
      var auth = $firebaseAuth(fbutil.ref());
      var listeners = [];

      function statusChange() {
        fns.user = auth.$getAuth();
        angular.forEach(listeners, function(fn) {
          fn(fns.user);
        });
      }

      var fns = {
        user: null,

        getUser: function() {
          return auth.$waitForAuth();
        },

        login: function(email, pass) {
          return auth.$authWithPassword({
            email: email,
            password: pass
          }, {rememberMe: true});
        },

        logout: function() {
          auth.$unauth();
        },

        watch: function(cb, $scope) {
          fns.getUser().then(function(user) {
            cb(user);
          });
          listeners.push(cb);
          var unbind = function() {
            var i = listeners.indexOf(cb);
            if( i > -1 ) { listeners.splice(i, 1); }
          };
          if( $scope ) {
            $scope.$on('$destroy', unbind);
          }
          return unbind;
        }
      };

      auth.$onAuth(statusChange);
      statusChange();

      return fns;
    }]);
