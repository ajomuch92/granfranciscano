var inicio=angular.module("inicio",["ngRoute"]);
        inicio.config(function($routeProvider){
            $routeProvider
            .when('/agregar_pregunta',{
                templateUrl:'templates/agregar_pregunta.html',
                controller:'agregarPreguntaController'
            })
            .when('/lista_preguntas',{
                templateUrl:'templates/lista_preguntas.html',
                controller:'listaPreguntasController'
            })
            .when('/modificar_pregunta/:id_pregunta',{
                templateUrl:'templates/modificar_pregunta.html',
                controller:'modificarPreguntaController'
            })
            .when('/agregar_usuario',{
                templateUrl:'templates/agregar_usuario.html',
                controller:'agregarUsuarioController'
            })
            .when('/lista_usuarios',{
                templateUrl:'templates/lista_usuarios.html',
                controller:'listaUsuariosController'
            })
            .when('/modificar_usuario/:id_usuario/:id_tipo',{
                templateUrl:'templates/modificar_usuario.html',
                controller:'modificarUsuarioController'
            })
            .when('/modificar_contrasenia',{
                templateUrl:'templates/modificar_contrasenia.html',
                controller:'modificarContraseniaController'
            })
            .when('/agregar_equipo',{
                templateUrl:'templates/agregar_equipo.html',
                controller:'agregarEquipoController'
            })
            .when('/lista_equipos',{
                templateUrl:'templates/lista_equipos.html',
                controller:'listaEquiposController'
            })
            .when('/modificar_equipo/:id_equipo',{
                templateUrl:'templates/modificar_equipo.html',
                controller:'modificarEquipoController'
            })
            .when('/agregar_campeonato',{
                templateUrl:'templates/agregar_campeonato.html',
                controller:'agregarCampeonatoController'
            })
            .when('/lista_campeonatos',{
                templateUrl:'templates/lista_campeonatos.html',
                controller:'listaCampeonatosController'
            })
            .when('/modificar_campeonato/:id_campeonato/:id_categoria',{
                templateUrl:'templates/modificar_campeonato.html',
                controller:'modificarCampeonatoController'
            })
            .when('/agregar_partido',{
                templateUrl:'templates/agregar_partido.html',
                controller:'agregarPartidoController'
            })
            .when('/lista_partidos',{
                templateUrl:'templates/lista_partidos.html',
                controller:'listaPartidosController'
            })
            .when('/modificar_partido/:id_partido',{
                templateUrl:'templates/modificar_partido.html',
                controller:'modificarPartidoController'
            })
            .when('/jugar_partido/:id_partido',{
                templateUrl:'templates/jugar_partido.html',
                controller:'jugarPartidoController'
            });
        })
        inicio.controller('controladorinicio',['$scope','$http',function($scope,$http){
            $scope.verificar=function(){
                var inicio=$http.post('php/auth.php');
                inicio.then(function(response){
                   var status=response.data.Auth; 
                    if(status==0)
                       location.href="index.html";
                });
            };
            
            $scope.logout=function(){
                var inicio=$http.post('php/logout.php');
                inicio.then(function(response){
                   var status=response.data.logout; 
                    if(status==1)
                       location.href="index.html";
                });
            }
            
        }]);
        
        inicio.controller('agregarPreguntaController',['$scope','$http',function($scope,$http){
            $scope.guardar=function(){
                var inicio=$http.post('php/agregarPregunta.php',{pregunta:$scope.pregunta, respuesta:$scope.respuesta});
                inicio.then(function(response){
                   var status=response.data.Estado; 
                    if(status==0)
                        Materialize.toast('Error al guardar pregunta', 3000, 'rounded');
                    if(status==1){
                        $scope.pregunta="";
                        $scope.respuesta="";
                        Materialize.toast('Pregunta guardada', 3000, 'rounded');
                    }
                });
            }
        }]);
        
        inicio.controller('listaPreguntasController',['$scope','$http',function($scope,$http){
            $scope.cargar=function(){
                var datos=$http.post("php/lista_preguntas.php");
                datos.then(function (response){
                    $scope.items = response.data.records;
                });
            };
            $scope.eliminar=function(id_pregunta){
                //alert(id_pregunta);
                Materialize.toast('I am a toast!', 3000, 'rounded');
            };
        }]);

        inicio.controller('modificarPreguntaController',['$scope','$http','$routeParams',function($scope,$http,$routeParams){
            $scope.cargar=function(){
                var datos=$http.post("php/pregunta_con_filtro.php",{id:$routeParams.id_pregunta});
                datos.then(function (response){
                    var registro = response.data;
                    $scope.pregunta=registro.Pregunta;
                    $scope.respuesta=registro.Respuesta;
                });
            };
            $scope.guardarCambios=function(){
                var datos=$http.post("php/modificar_pregunta.php",{id_pregunta:$routeParams.id_pregunta,pregunta:$scope.pregunta,respuesta:$scope.respuesta});
                datos.then(function (response){
                    var status=response.data.Estado; 
                    if(status==0)
                        Materialize.toast('Error al guardar pregunta', 3000, 'rounded');
                    if(status==1){
                        Materialize.toast('Cambios guardados', 3000, 'rounded');
                        location.href="#!lista_preguntas";
                    }
                });
            };
        }]);

        inicio.controller('agregarUsuarioController',['$scope','$http','$routeParams',function($scope,$http,$routeParams){
            var datos=$http.post("php/lista_tipo_usuarios.php");
            datos.then(function(response){
               $scope.listaTipoUsuarios= response.data.records;
            });
            $scope.guardar=function(){
                var d=$http.post("php/agregar_usuario.php",{nombre:$scope.nombre,correo:$scope.correo, contrasenia:$scope.contrasenia,tipoUsuario:$scope.tipoUsuario});
                d.then(function(response){
                   var status=response.data.Estado;
                    if(status==0)
                        Materialize.toast('Error al guardar usuario', 3000, 'rounded');
                    else if(status==1){
                        $scope.nombre="";
                        $scope.correo="";
                        $scope.contrasenia="";
                        $scope.tipoUsuario="";
                        Materialize.toast('Usuario guardado', 3000, 'rounded');
                    }else{
                         Materialize.toast('Correo ya registrado', 3000, 'rounded');
                    }
                });
            };
        }]);
            
        inicio.controller('listaUsuariosController',['$scope','$http','$routeParams',function($scope,$http,$routeParams){
            var datos=$http.post("php/lista_usuarios.php");
            datos.then(function (response){
                $scope.items = response.data.records;
            });
            $scope.eliminar=function(id){
                var d=$http.post("php/eliminar_usuario.php",{id_usuario:id});
                d.then(function(response){
                   var status=response.data.Estado;
                    if(status==0)
                        Materialize.toast('Error al eliminar usuario', 3000, 'rounded');
                    else if(status==1){
                        Materialize.toast('Usuario eliminado', 3000, 'rounded');
                        location.href="#!lista_usuarios";
                    }
                });
            };
        }]);

        inicio.controller('modificarUsuarioController',['$scope','$http','$routeParams',function($scope,$http,$routeParams){
            var datos=$http.post("php/lista_tipo_usuario_selected.php",{selected:$routeParams.id_tipo});
            datos.then(function(response){
               $scope.listaTipoUsuarios= response.data.records;
            });
            var persona=$http.post("php/obtener_usuario.php",{id:$routeParams.id_usuario});
            persona.then(function(response){
                $scope.nombre=response.data.Nombre;
                $scope.correo=response.data.Correo;
            });
            $scope.guardarCambios=function(){
                var t;
                if($scope.tipoUsuario==null)
                    t=$routeParams.id_tipo;
                else
                    t=$scope.tipoUsuario;
                var d=$http.post("php/modificar_usuario.php",{id_usuario:$routeParams.id_usuario,nombre:$scope.nombre,correo:$scope.correo,tipo:t});
                d.then(function(response){
                   var status=response.data.Estado;
                    if(status==0)
                        Materialize.toast('Error al guardar usuario', 3000, 'rounded');
                    else if(status==1){
                        $scope.nombre="";
                        $scope.correo="";
                        Materialize.toast('Cambios guardados', 3000, 'rounded');
                        location.href="#!lista_usuarios";
                    }
                });
            };
            $scope.reestablecer=function(){
                var c=$http.post("php/reestablecer_contrasenia.php",{id_usuario:$routeParams.id_usuario});
                c.then(function(response){
                    var status=response.data.Estado;
                    if(status==0)
                        Materialize.toast('Error al reestablecer contraseña', 3000, 'rounded');
                    else if(status==1){
                        Materialize.toast('Contraseña reestablecida a 123', 3000, 'rounded');
                        location.href="#!lista_usuarios";
                    }
                });
            };
        }]);

        inicio.controller('modificarContraseniaController',['$scope','$http','$routeParams',function($scope,$http,$routeParams){
            var usuario=$http.post('php/auth.php');
            var id;
            usuario.then(function(response){
                id=response.data.Id;
            });
            $scope.reestablecer=function(){
                if($scope.contrasenia_1!=$scope.contrasenia_2)
                    Materialize.toast('No coinciden las contraseñas', 3000, 'rounded'); 
                else{
                    var datos=$http.post("php/modificar_contrasenia.php",{contrasenia:$scope.contrasenia_1,id_usuario:id});
                    datos.then(function(response){
                        var res=response.data.Estado;
                        $scope.msg=res;
                        if(res==0)
                            Materialize.toast('Error al guardar la contraseña', 3000, 'rounded');
                        else{
                            Materialize.toast('Contraseña cambiada con éxito', 3000, 'rounded');
                            location.href="#!lista_usuarios";
                        }
                    });
                }
            };
            
        }]);

        inicio.controller('agregarEquipoController',['$scope','$http','$routeParams',function($scope,$http,$routeParams){
            $scope.guardar=function(){
                var datos=$http.post("php/agregar_equipo.php",{equipo:$scope.nombre,maestro:$scope.maestro});
                datos.then(function(response){
                    var estado=response.data.Estado;
                    if(estado==0)
                        Materialize.toast('Error al guardar equipo', 3000, 'rounded');
                    else{
                        $scope.nombre="";
                        $scope.maestro="";
                        Materialize.toast('Equipo guardado', 3000, 'rounded');
                    }
                });
            };
        }]);

        inicio.controller('listaEquiposController',['$scope','$http','$routeParams',function($scope,$http,$routeParams){
            var equipos=$http.post('php/lista_equipos.php');
            equipos.then(function(response){
                $scope.items=response.data.records;
            });
            $scope.eliminar=function(id_equipo){
                var datos=$http.post("php/eliminar_equipo.php",{id:id_equipo});
                datos.then(function(response){
                    $scope.msg=response.data;
                    var estado=response.data.Estado;
                    if(estado==0)
                        Materialize.toast('Error al eliminar equipo', 3000, 'rounded');
                    else{
                        Materialize.toast('Equipo eliminado', 3000, 'rounded');
                        location.href="#!lista_equipos";
                    }
                });
            };
        }]);

        inicio.controller('modificarEquipoController',['$scope','$http','$routeParams',function($scope,$http,$routeParams){
            var equipo=$http.post('php/obtener_equipo.php',{id:$routeParams.id_equipo});
            equipo.then(function(response){
               $scope.nombre=response.data.Equipo;
               $scope.maestro=response.data.Maestro;
            });
            $scope.guardar=function(){
               var datos=$http.post("php/modificar_equipo.php",{equipo:$scope.nombre,maestro:$scope.maestro,id:$routeParams.id_equipo});
                datos.then(function(response){
                    var estado=response.data.Estado;
                    if(estado==0)
                        Materialize.toast('Error al guardar equipo', 3000, 'rounded');
                    else{
                        $scope.nombre="";
                        $scope.maestro="";
                        Materialize.toast('Cambios guardados', 3000, 'rounded');
                        location.href="#!lista_equipos";
                    }
                });
            };
        }]);

        inicio.controller('agregarCampeonatoController',['$scope','$http','$routeParams',function($scope,$http,$routeParams){
            var categorias=$http.post('php/lista_categorias.php');
            categorias.then(function(response){
                $scope.listaCategorias=response.data.records;
            });
            $scope.guardar=function(){
                var datos=$http.post('php/agregar_campeonato.php',{anio:$scope.anio,categoria:$scope.categoria});
                datos.then(function(response){
                    var estado=response.data.Estado;
                    if(estado==0)
                        Materialize.toast('Error al guardar campeonato', 3000, 'rounded');
                    else{
                        $scope.anio="";
                        Materialize.toast('Campeonato guardado', 3000, 'rounded');
                    }
                });
            };
        }]);

        inicio.controller('listaCampeonatosController',['$scope','$http','$routeParams',function($scope,$http,$routeParams){
            var campeonatosJugados=$http.post('php/lista_campeonatos_jugados.php');
            campeonatosJugados.then(function(response){
               $scope.campeonatosJugados=response.data.records; 
            });
            var campeonatosxJugados=$http.post('php/lista_campeonatos_x_jugar.php');
            campeonatosxJugados.then(function(response){
               $scope.campeonatos=response.data.records; 
            });
            $scope.eliminar=function(id_campeonato){
                var datos=$http.post('php/eliminar_campeonato.php',{id:id_campeonato});
                datos.then(function(response){
                    var estado=response.data.Estado;
                    if(estado==0)
                        Materialize.toast('Error al eliminar campeonato', 3000, 'rounded');
                    else if(estado==1){
                        Materialize.toast('Campeonato eliminado', 3000, 'rounded');
                        location.href="#!lista_campeonatos";
                    }else
                        Materialize.toast('Error fatal al eliminar campeonato', 3000, 'rounded');
                });
            };
        }]);

        inicio.controller('modificarCampeonatoController',['$scope','$http','$routeParams',function($scope,$http,$routeParams){
            var categorias=$http.post('php/lista_categorias.php');
            categorias.then(function(response){
                $scope.listaCategorias=response.data.records;
            });
            var camp=$http.post('php/obtener_campeonato.php',{id:$routeParams.id_campeonato});
            camp.then(function(response){
               $scope.anio=response.data.Anio; 
            });
            $scope.guardar=function(){
                var t;
                if($scope.categoria==null)
                    t=$routeParams.id_campeonato;
                else
                    t=$scope.categoria;
                var datos=$http.post('php/modificar_campeonato.php',{id:$routeParams.id_campeonato,anio:$scope.anio,categoria:t});
                datos.then(function(response){
                    var estado=response.data.Estado;
                    if(estado==0)
                        Materialize.toast('Error al guardar campeonato', 3000, 'rounded');
                    else{
                        Materialize.toast('Cambios guardados', 3000, 'rounded');
                        location.href="#!lista_campeonatos";
                    }
                });
            };
        }]);

        inicio.controller('agregarPartidoController',['$scope','$http','$routeParams',function($scope,$http,$routeParams){
            $scope.equipos=new Array();
            var campeonatosxJugados=$http.post('php/lista_campeonatos_x_jugar.php');
            campeonatosxJugados.then(function(response){
               $scope.listaCampeonato=response.data.records; 
            });
            var tipoPartidos=$http.post('php/lista_tipo_partidos.php');
            tipoPartidos.then(function(response){
                $scope.listaTipo=response.data.records; 
            });
            var equipos=$http.post('php/lista_equipos.php');
            equipos.then(function(response){
                $scope.listaEquipos=response.data.records;
            });
            $scope.aniadir=function(){
                var s=0;
                for(var i in $scope.equipos){
                    if($scope.equipos[i].Id==JSON.parse($scope.equipoSeleccionado).Id)
                        s++;
                }
                if(s==0)
                    $scope.equipos.push(JSON.parse($scope.equipoSeleccionado));;
            };
            $scope.remover=function(item){
                var x=$scope.equipos.indexOf(item);
                $scope.equipos.splice(x,1);
            }
            $scope.guardar=function(){
                var s=0;
                for(var i in $scope.equipos){
                    s++;
                }
                if(s==0){
                    Materialize.toast('No se han añadido equipos', 3000, 'rounded');
                    return;
                }
                var partido=$http.post('php/agregar_partido.php',{fecha:$scope.fecha,campeonato:$scope.campeonato,tipo_partido:$scope.tipo,equipos:$scope.equipos});
                partido.then(function(response){
                    var estado=response.data.Estado;
                    if(estado==0)
                        Materialize.toast('Error al guardar partido', 3000, 'rounded');
                    else{
                        $scope.fecha="";
                        $scope.campeonato="";
                        $scope.tipo="";
                        $scope.equipos=[];
                        Materialize.toast('Partido guardado', 3000, 'rounded');
                        location.href="#!lista_partidos";
                    }
                });
            };
        }]);

        inicio.controller('listaPartidosController',['$scope','$http','$routeParams',function($scope,$http,$routeParams){
            var campeonatosxJugados=$http.post('php/lista_campeonatos_x_jugar.php');
            campeonatosxJugados.then(function(response){
               $scope.listaCampeonato=response.data.records; 
            });
            $scope.mostrar=function(){
                var partidosNoJugados=$http.post('php/lista_partidos.php',{id:3,campeonato:$scope.campeonatoSeleccionado});
                partidosNoJugados.then(function(response){
                    $scope.partidosNoJugados=response.data.records;
                });
                var partidosJugados=$http.post('php/lista_partidos.php',{id:2,campeonato:$scope.campeonatoSeleccionado});
                partidosJugados.then(function(response){
                    $scope.partidosJugados=response.data.records;
                });
                var partidosXJugar=$http.post('php/lista_partidos.php',{id:1,campeonato:$scope.campeonatoSeleccionado});
                partidosXJugar.then(function(response){
                    $scope.partidosXJugar=response.data.records;
                }); 
            };
            $scope.eliminar=function(id_partido){
                var partido=$http.post('php/eliminar_partido.php',{id:id_partido});
                partido.then(function(response){
                    var estado=response.data.Estado;
                    if(estado==0)
                        Materialize.toast('Error al eliminar partido', 3000, 'rounded');
                    else{
                        Materialize.toast('Partido eliminado', 3000, 'rounded');
                        location.href="#!lista_partidos";
                    }
                });
            };
        }]);

        inicio.controller('modificarPartidoController',['$scope','$http','$routeParams',function($scope,$http,$routeParams){
            var datos=$http.post('php/obtener_partido.php',{id:$routeParams.id_partido});
            var tamanio=0;
            datos.then(function(response){
                $scope.partido=response.data;
                $scope.equipos=$scope.partido.Equipos;
                tamanio=Object.keys($scope.equipos).length;
            });
            $scope.equipos=new Array();
            var campeonatosxJugados=$http.post('php/lista_campeonatos_x_jugar.php');
            campeonatosxJugados.then(function(response){
               $scope.listaCampeonato=response.data.records; 
            });
            var tipoPartidos=$http.post('php/lista_tipo_partidos.php');
            tipoPartidos.then(function(response){
                $scope.listaTipo=response.data.records; 
            });
            var equipos=$http.post('php/lista_equipos.php');
            equipos.then(function(response){
                $scope.listaEquipos=response.data.records;
            });
            $scope.aniadir=function(){
                var s=0;
                for(var i in $scope.equipos){
                    if($scope.equipos[i].Id==JSON.parse($scope.equipoSeleccionado).Id)
                        s++;
                }
                if(s==0)
                    $scope.equipos.push(JSON.parse($scope.equipoSeleccionado));
            };
            $scope.remover=function(item){
                var x=$scope.equipos.indexOf(item);
                $scope.equipos.splice(x,1);
            }
            $scope.guardar=function(){
                var agregar=1;
                if($scope.partido.Fecha!=$scope.fecha && $scope.fecha!==undefined)
                    {$scope.partido.Fecha=$scope.fecha;}
                else{
                    var temp=$scope.partido.Fecha.split('/');
                    $scope.partido.Fecha=new Date(temp[2], temp[1] - 1, temp[0]);
                }
                if($scope.partido.Id_campeonato!=$scope.campeonato && $scope.campeonato!=null)
                    $scope.partido.Id_campeonato=$scope.campeonato;
                if($scope.partido.Id_tipo!=$scope.tipo && $scope.tipo!=null)
                    $scope.partido.Id_tipo=$scope.tipo;
                if(tamanio==Object.keys($scope.equipos).length)
                    agregar=0;
                var p=$http.post('php/modificar_partido.php',{id:$routeParams.id_partido,fecha:$scope.partido.Fecha,campeonato:$scope.partido.Id_campeonato,tipo_partido:$scope.partido.Id_tipo,equipos:$scope.equipos,add:agregar});
                p.then(function(response){
                    var estado=response.data.Estado;
                    if(estado==0)
                        Materialize.toast('Error al guardar partido', 3000, 'rounded');
                    else{
                        Materialize.toast('Cambios guardados', 3000, 'rounded');
                        location.href="#!lista_partidos";
                    }
                });
            };
            $scope.noJugar=function(){
                var datos=$http.post('php/no_jugar.php',{id:$routeParams.id_partido});
                datos.then(function(response){
                    var estado=response.data.Estado;
                    if(estado==0)
                        Materialize.toast('Error al guardar partido', 3000, 'rounded');
                    else{
                        Materialize.toast('Partido cambió de estado', 3000, 'rounded');
                        location.href="#!lista_partidos";
                    } 
                });
            };
        }]);

        inicio.controller('jugarPartidoController',['$scope','$http','$routeParams',function($scope,$http,$routeParams){
            $scope.mostrar=false;
            var equipos=$http.post('php/obtener_partido_jugar.php',{id:$routeParams.id_partido});
            equipos.then(function(response){
                $scope.equipos=response.data.records;
            });
            $scope.sumar=function(id_elemento){
                var pts=document.getElementById("puntos_"+id_elemento).value;
                for(var i in $scope.equipos){
                    if($scope.equipos[i].Id_equipo==id_elemento)
                        $scope.equipos[i].Puntos=parseInt($scope.equipos[i].Puntos)+parseInt(pts);
                }
            };
            $scope.restar=function(id_elemento){
                var pts=document.getElementById("puntos_"+id_elemento).value;
                for(var i in $scope.equipos){
                    if($scope.equipos[i].Id_equipo==id_elemento)
                        if(parseInt($scope.equipos[i].Puntos)-parseInt(pts)>=0)
                            $scope.equipos[i].Puntos=parseInt($scope.equipos[i].Puntos)-parseInt(pts);
                }
            };
            $scope.buscar=function(){
                var preg=$http.post('php/obtener_pregunta.php',{id:$scope.pregunta});
                preg.then(function(response){
                    $scope.mostrar=false;
                    $scope.pregunta_=response.data.Pregunta;
                    $scope.respuesta=response.data.Respuesta;                    
                });
            };
            $scope.visibilidad=function(){
                $scope.mostrar=!$scope.mostrar;  
            };
            $scope.terminarPartido=function(){
                var t=$http.post('php/finalizar_partido.php',{id:$routeParams.id_partido,equipos:$scope.equipos});
                t.then(function(response){
                     var estado=response.data.Estado;
                    if(estado==0)
                        Materialize.toast('Error al guardar partido', 3000, 'rounded');
                    else{
                        Materialize.toast('Partido finalizado', 3000, 'rounded');
                        location.href="#!lista_partidos";
                    }
                });
            };
        }]);