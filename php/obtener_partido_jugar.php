<?php
    
    include 'info.php';
    if($mysqli->connect_errno)
        echo '{"Estado":-1}';
    else{
        $query="SELECT a.id_equipo, b.equipo,a.puntos FROM equipos_x_partido a INNER JOIN equipo b ON(a.id_equipo=b.id_equipo) WHERE a.id_partido=".$datos->id;
        $result = $mysqli->query($query);
        if($result->num_rows>0){
            $outp = "";
            while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
                if ($outp != "") {$outp .= ",";}
                $outp .= '{"Id_equipo":"'  . $rs["id_equipo"] . '",';
                $outp .= '"Equipo":"'  . $rs["equipo"] . '",';
                $outp .= '"Puntos":"'. $rs["puntos"]. '"}';
            }
            $outp ='{"records":['.$outp.']}';  
            echo $outp;
        }
        else
            echo '{"Estado":0}';
    }
    $mysqli->close();
?>