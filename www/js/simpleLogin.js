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

        getUID: function() {
          if(auth.$getAuth() != null) {
            return auth.$getAuth().uid;
          } else {
            return false;
          }
        },

        login: function(email, pass) {
          return auth.$authWithPassword({
            email: email,
            password: pass
          }, {rememberMe: true});
        },

        logout: function() {
          auth.$unauth();
        }
      };

      auth.$onAuth(statusChange);
      statusChange();

      return fns;
    }]);
