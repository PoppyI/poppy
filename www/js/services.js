angular.module('starter.services', ['firebase'])

.factory('Orders', function($firebase, FBURL) {
  var ref = new Firebase(FBURL + '/orders');
  var userRef = new Firebase(FBURL + '/users');

  return {
    get: function(uid) {
      var orders = [];
      var userOrderRef = userRef.child(uid).child("orders");
      userOrderRef.on("child_added", function(user_snap) {
        ref.child(user_snap.key()).once("value", function(order_snap) {
          orders.push(order_snap.val());
        })
      });
      return orders;
    },
    set: function(uid, key) {
      userRef.child(uid).child("orders/" + key).set(true);
    },
    add: function(title, prodId, totalCost, grams, customer, producer) {
      var returnRef = ref.push({
        id: null, title: title, product_id: prodId, total_cost: totalCost, grams: grams, timestamp: Firebase.ServerValue.TIMESTAMP, status: "requested", customer: customer, producer: producer
      });

      var orderId = returnRef.key();
      ref.child("/"+orderId+"/id").set(orderId);
      return orderId;
    }
  }
})
