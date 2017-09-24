<?php
    
    include 'info.php';
    if($mysqli->connect_errno)
        echo '{"Estado":-1}';
    else{
        $query="select a.id_partido,date_format(a.fecha_partido,'%d/%m/%Y') as fecha_partido, a.id_campeonato, a.id_tipo_partido, b.anio_campeonato,d.categoria, c.tipo_partdio from partidos a inner join campeonatos b on(a.id_campeonato=b.id_campeonato) INNER join tipo_partido c on(a.id_tipo_partido=c.id_tipo_partido) inner join categorias d on(b.id_categoria=d.id_categoria) where a.id_partido=".$datos->id;
        $result = $mysqli->query($query);
        if($result->num_rows>0){
            $outp = "";
            while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
                if ($outp != "") {$outp .= ",";}
                $q="select a.id_equipo, a.puntos,b.equipo,b.maestro_encargado from equipos_x_partido a INNER join equipo b on(a.id_equipo=b.id_equipo) WHERE a.id_partido=".$rs["id_partido"];
                $r = $mysqli->query($q);
                $eq="";
                if($r->num_rows>0)
                    while($res=$r->fetch_array(MYSQLI_ASSOC)){
                        if ($eq != "") {$eq .= ",";}
                        $eq .= '{"Id":"'  . $res["id_equipo"] . '",';
                        $eq .= '"Equipo":"'  . $res["equipo"] . '",';
                        $eq .= '"Maestro":"'. $res["maestro_encargado"]. '"}';
                    }
                $eq='['.$eq.']';
                $outp .= '{"Id":"'  . $rs["id_partido"] . '",';
                $outp .= '"Fecha":"'  . $rs["fecha_partido"] . '",';
                $outp .= '"Id_campeonato":"'  . $rs["id_campeonato"] . '",';
                $outp .= '"Id_tipo":"'  . $rs["id_tipo_partido"] . '",';
                $outp .= '"Anio":"'  . $rs["anio_campeonato"] . '",';
                $outp .= '"Categoria":"'  . $rs["categoria"] . '",';
                $outp .= '"Equipos":'  . $eq . ',';
                $outp .= '"Tipo":"'. $rs["tipo_partdio"]. '"}';
            }
            //$outp ='{"records":['.$outp.']}';  
            echo $outp;
        }
        else
            echo '{"Estado":0}';
    }
    $mysqli->close();
?>