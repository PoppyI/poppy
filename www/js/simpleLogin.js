angular.module('simpleLogin', ['firebase', 'firebase.utils'])

  .factory('simpleLogin', ['$firebaseAuth', 'fbutil', 'createProfile',
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
        },

        createAccount: function(email, pass) {
          return auth.$createUser({email: email, password: pass})
            .then(function() {
              // authenticate so we have permission to write to Firebase
              return fns.login(email, pass);
            })
            .then(function(user) {
              // store user data in Firebase after creating account
              return createProfile(user.uid, email, name).then(function () {
                return user;
              });
            });
        }
      };

      auth.$onAuth(statusChange);
      statusChange();

      return fns;
    }])

    .factory('createProfile', ['fbutil', '$q', '$timeout', function(fbutil, $q, $timeout) {
      return function(id, email, name) {
        var ref = fbutil.ref('users', id), def = $q.defer();
        ref.set({email: email, fname: name||firstPartOfEmail(email)}, function(err) {
          $timeout(function() {
            if( err ) {
              def.reject(err);
            }
            else {
              def.resolve(ref);
            }
          })
        });

        function firstPartOfEmail(email) {
          return ucfirst(email.substr(0, email.indexOf('@'))||'');
        }

        function ucfirst (str) {
          str += '';
          var f = str.charAt(0).toUpperCase();
          return f + str.substr(1);
        }

        return def.promise;
      }
    }]);
