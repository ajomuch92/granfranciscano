<?php
    include 'info.php';
    if($mysqli->connect_errno)
        echo '{"Estado":-1}';
    else{
        $query="UPDATE partidos SET id_estado=2 WHERE id_partido=".$datos->id;
        $result = $mysqli->query($query);
        if($result){
                for($i=0;$i<count($datos->equipos);$i++){
                    $a="UPDATE equipos_x_partido SET puntos=".$datos->equipos[$i]->Puntos." WHERE id_partido=".$datos->id." AND id_equipo=".$datos->equipos[$i]->Id_equipo;
                    $mysqli->query($a);
                }
            echo '{"Estado":1}';            
        }
        else
            echo '{"Estado":0}';
    }
    $mysqli->close();
?>