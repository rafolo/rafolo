# app/assets/javascripts/angular/controllers/RestaurantIndexCtrl.js.coffee

@restauranteur.controller 'RestaurantIndexCtrl', ['$scope', '$location', '$http', ($scope, $location, $http) ->
  $scope.restaurants = []
  $http.get('./restaurants.json').success((data) ->
    $scope.restaurants = data
  )

  # Add the following lines
  $scope.viewRestaurant = (id) ->
    $location.url "/restaurants/#{id}"
]