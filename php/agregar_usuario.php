<?php
    
    include 'info.php';
    if($mysqli->connect_errno)
        echo '{"Estado":-1}';
    else{
        $verificar=$mysqli->query("select id_usuario from usuarios where correo='".$datos->correo."'");
        if($verificar->num_rows==0){            
            $query="INSERT INTO usuarios(nombre_usuario, correo, contrasenia, fecha_registro, id_tipo_usuario) 
            VALUES ('".$datos->nombre."','".$datos->correo."',sha1('".$datos->contrasenia."'),now(),'".$datos->tipoUsuario."')";        
            $result = $mysqli->query($query);
            if($result){
                echo '{"Estado":1}';            
            }
            else
                echo '{"Estado":0}';
        }else
            echo '{"Estado":2}';
    }
    $mysqli->close();
?>