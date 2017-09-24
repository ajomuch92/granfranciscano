<?php
    
    include 'info.php';
    if($mysqli->connect_errno)
        echo '{"Estado":-1}';
    else{
        $query="SELECT equipo,maestro_encargado from equipo WHERE id_equipo=".$datos->id;
        $result = $mysqli->query($query);
        if($result->num_rows>0){
            $outp = "";
            while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
                if ($outp != "") {$outp .= ",";}
                $outp .= '{"Equipo":"'  . $rs["equipo"] . '",';
                $outp .= '"Maestro":"'. $rs["maestro_encargado"]. '"}';
            }
            //$outp ='{"records":['.$outp.']}';  
            echo $outp;
        }
        else
            echo '{"Estado":0}';
    }
    $mysqli->close();
?>