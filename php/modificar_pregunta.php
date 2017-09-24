<?php
    
    include 'info.php';
    if($mysqli->connect_errno)
        echo '{"Estado":-1}';
    else{
        $query="update preguntas set pregunta='".$datos->pregunta."', respuesta='".$datos->respuesta."' where id_preguntas=".$datos->id_pregunta;
        $result = $mysqli->query($query);
        if($result){
            echo '{"Estado":1}';            
        }
        else
            echo '{"Estado":0}';
    }
    $mysqli->close();
?>