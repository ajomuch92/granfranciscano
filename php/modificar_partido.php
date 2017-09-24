<?php
    
    include 'info.php';
    if($mysqli->connect_errno)
        echo '{"Estado":-1}';
    else{
        $query="UPDATE partidos SET fecha_partido='".$datos->fecha."',id_campeonato=".$datos->campeonato.",id_tipo_partido=".$datos->tipo_partido." WHERE id_partido=".$datos->id;
        $result = $mysqli->query($query);
        if($result){
                $q="delete from equipos_x_partido where id_partido=".$datos->id;
                $mysqli->query($q);
                for($i=0;$i<count($datos->equipos);$i++){
                    $a="insert into equipos_x_partido(id_partido,id_equipo,puntos) values (".$datos->id.",".$datos->equipos[$i]->Id.",0)";
                    $mysqli->query($a);
                }
            echo '{"Estado":1}';            
        }
        else
            echo '{"Estado":0}';
    }
    $mysqli->close();
?>