var inicio=angular.module('inicio_sesion',[])
        inicio.controller('controladorinicio',['$scope','$http',function($scope,$http){
            $scope.resultado="";
            $scope.iniciarSesion=function(){
                var inicio=$http.post('php/verificarUsuario.php',{mail:$scope.email, password:$scope.password});
                inicio.then(function(response){
                   var status=response.data.Estado; 
                    if(status==0)
                        Materialize.toast('Error al iniciar sesión, contraseña o usuario no válido', 3000, 'rounded');;
                    if(status==-1)
                       Materialize.toast('No se puede establecer conexión con la base de datos', 3000, 'rounded');
                    if(status==1)
                       location.href="inicio.html";
                });
            };
            
            $scope.verificar=function(){
                var inicio=$http.post('php/auth.php');
                inicio.then(function(response){
                   var status=response.data.Auth; 
                    if(status==1)
                       location.href="inicio.html";
                });
            };
            
        }])