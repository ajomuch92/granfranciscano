<?php
    include 'info.php';
    if($mysqli->connect_errno)
        echo '{"Estado":-1}';
    else{
        $query="insert into partidos(fecha_partido,id_campeonato,id_estado,id_tipo_partido) values(\"". $datos->fecha. "\",".$datos->campeonato.",1,".$datos->tipo_partido.") ";
        $result = $mysqli->query($query);
        if($result){
            $q="SELECT last_insert_id() as last";
            $r=$mysqli->query($q);
            $id=0;
            while($rs = $r->fetch_array(MYSQLI_ASSOC)) {
                $id=$rs["last"] ;
            }
            for($i=0;$i<count($datos->equipos);$i++){
                $q="insert into equipos_x_partido(id_partido,id_equipo,puntos) values(".$id.",".$datos->equipos[$i]->Id.",0)";
                $mysqli->query($q);
            }
            echo '{"Estado":1}';            
        }
        else
            echo '{"Estado":0}';
    }
    $mysqli->close();
?>