/**
 * Created by Administrator on 4/6/2015.
 */

angular.module('theme.directives', [])
.directive('logout', ['securityService', '$location0', 'ROUTE_LOGIN', function (securityService, $location, ROUTE_LOGIN) {
        return function($scope, element, attrs){
            element.bind('click', function () {
                securityService.destroySession();
                $scope.$apply(function () {
                    $location.path(ROUTE_LOGIN);
                });
            });  
        };
    }]);