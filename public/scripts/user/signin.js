/**
 * Created by Administrator on 4/6/2015.
 */

angular.module('theme.user', [])
.controller('SigninCtrl', ['$scope', 'authenResouce', '$location' ,'DEFAULT_ROUTE', function ($scope, authenResouce, $location, DEFAULT_ROUTE) {
        $scope.username = "admin@example.com";
        $scope.password = "password";
        
        $scope.submit = function () {
            $scope.form.$setDirty();
            if($scope.form.$valid){
                authenResouce.login({
                        username: $scope.username,
                        password: $scope.password
                    }
                ).success(function (payload) {
                    $location.path(DEFAULT_ROUTE);
                    });
            }
        }
    }]);