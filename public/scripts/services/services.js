/**
 * Created by Administrator on 4/6/2015.
 */

angular.module('them.services', [])
.factory('authenResouce', ['$http', 'DOMAIN', function ($http, DOMAIN) {
        var login = function (params) {
            return $http.post(DOMAIN + '/api/auth/login', params);
        };

        var logout = function () {
            return $http.post(DOMAIN + "/api/auth/logout", '');
        }
        return {
            login: login,
            logout: logout
        }
    }])
.factory('securityService', ['$rootScope', '$http', '$cookieStore', 'DOMAIN', 'SESSION_COOKIE_NAME', function ($rootScope, $http, $cookieStore, DOMAIN, SESSION_COOKIE_NAME) {
        var priv = {
            session: null,
            currentUser: null,
            requestSent: false
        };

        var init = function (session) {
            var authorization;
            if(!session){
                if($cookieStore.get(SESSION_COOKIE_NAME)){
                    session = angular.fromJson($cookieStore.get(SESSION_COOKIE_NAME)) || null;
                }
            }else{
                $cookieStore.put(SESSION_COOKIE_NAME, angular.fromJson(session));
            }

            priv.session = session;
            if(priv.session && priv.session.token){
                authorization = priv.session.token;
            }

            $http.defaults.headers.common.Authorization = priv.session.token;
        };

        var destroySession = function () {
            priv.session = null;
            prive.currentUser = null;
            priv.requestSent = fase;

            $cookieStore.remove(SESSION_COOKIE_NAME);
            $http.defaults.heads.commom.Authorization = '';
        }

        return {
            init: init,
            destroySession: destroySession
        };
    }]);