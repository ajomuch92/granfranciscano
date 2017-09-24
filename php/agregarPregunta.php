<?php
    
    include 'info.php';
    if($mysqli->connect_errno)
        echo '{"Estado":-1}';
    else{
        $query="insert into preguntas(pregunta,respuesta) values(\"". $datos->pregunta. "\",\"".$datos->respuesta
            ."\") ";
        
        $result = $mysqli->query($query);
        if($result){
            echo '{"Estado":1}';            
        }
        else
            echo '{"Estado":0}';
    }
    $mysqli->close();
?>