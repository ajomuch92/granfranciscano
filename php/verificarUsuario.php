<?php
    
    include 'info.php';
    if($mysqli->connect_errno)
        echo '{"Estado":-1}';
    else{
        $query="select nombre_usuario, id_usuario from usuarios where correo = '". $datos->mail. "' and contrasenia = sha1('".$datos->password."') ";
        $result = $mysqli->query($query);
        if($result->num_rows>0){
            session_start();
            while($fila=$result->fetch_row()){
                $_SESSION['id_usuario']= $fila[1];
                $a="insert into log(fecha_hora,id_usuario) values(now(),".$fila[1].")";
                $mysqli->query($a);
            }
            $_SESSION['auth']=true;
            echo '{"Estado":1}';            
        }
        else
            echo '{"Estado":0}';
    }
    $mysqli->close();
?>