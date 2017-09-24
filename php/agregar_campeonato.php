<?php
    
    include 'info.php';
    if($mysqli->connect_errno)
        echo '{"Estado":-1}';
    else{
        $query="insert into campeonatos(anio_campeonato,id_categoria, id_estado) values(\"". $datos->anio. "\",\"".$datos->categoria."\",1) ";
        $result = $mysqli->query($query);
        if($result){
            echo '{"Estado":1}';            
        }
        else
            echo '{"Estado":0}';
    }
    $mysqli->close();
?>