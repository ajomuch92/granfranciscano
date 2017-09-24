<?php    
    include 'info.php';
    if($mysqli->connect_errno)
        echo '{"Estado":-1}';
    else{
        $query="DELETE FROM equipo WHERE id_equipo=".$datos->id;
        $result = $mysqli->query($query);
        if($result){
            echo '{"Estado":1}';            
        }
        else
            echo '{"Estado":0}';
    }
    $mysqli->close();
?>