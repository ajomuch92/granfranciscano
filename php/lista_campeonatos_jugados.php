<?php
    
    include 'info.php';
    if($mysqli->connect_errno)
        echo '{"Estado":-1}';
    else{
        $query="SELECT a.id_campeonato,a.anio_campeonato,b.categoria, c.equipo FROM campeonatos a inner join categorias b on (a.id_categoria=b.id_categoria) inner join equipo c on (a.id_equipo_campeon=c.id_equipo) WHERE id_estado=2";
        $result = $mysqli->query($query);
        if($result->num_rows>0){
            $outp = "";
            while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
                if ($outp != "") {$outp .= ",";}
                $outp .= '{"Id":"'  . $rs["id_campeonato"] . '",';
                $outp .= '"Anio":"'  . $rs["anio_campeonato"] . '",';
                $outp .= '"Categoria":"'  . $rs["categoria"] . '",';
                $outp .= '"Campeon":"'. $rs["equipo"]. '"}';
            }
            $outp ='{"records":['.$outp.']}';  
            echo $outp;
        }
        else
            echo '{"Estado":0}';
    }
    $mysqli->close();
?>