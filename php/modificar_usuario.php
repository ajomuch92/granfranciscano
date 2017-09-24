<?php
    
    include 'info.php';
    if($mysqli->connect_errno)
        echo '{"Estado":-1}';
    else{
        $query="UPDATE usuarios SET nombre_usuario='".$datos->nombre."',correo='".$datos->correo."',id_tipo_usuario=".$datos->tipo." WHERE id_usuario=".$datos->id_usuario;
        $result = $mysqli->query($query);
        if($result){
            echo '{"Estado":1}';            
        }
        else
            echo '{"Estado":0}';
    }
    $mysqli->close();
?>