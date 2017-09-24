<?php
    
    include 'info.php';
    if($mysqli->connect_errno)
        echo '{"Estado":-1}';
    else{
        $query="UPDATE usuarios SET contrasenia=sha1('".$datos->contrasenia."') WHERE id_usuario=".$datos->id_usuario;
        $result = $mysqli->query($query);
        if($result){
            echo '{"Estado":1}';            
        }
        else
            echo '{"Estado":0}';
    }
    $mysqli->close();
?>