<?php
    
    include 'info.php';
    if($mysqli->connect_errno)
        echo '{"Estado":-1}';
    else{
        $query="select id_preguntas,pregunta, respuesta from preguntas";
        $result = $mysqli->query($query);
        if($result->num_rows>0){
            $outp = "";
            while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
                if ($outp != "") {$outp .= ",";}
                $outp .= '{"Pregunta":"'  . $rs["pregunta"] . '",';
                $outp .= '"Id":"'  . $rs["id_preguntas"] . '",';
                $outp .= '"Respuesta":"'. $rs["respuesta"]. '"}';
            }
            $outp ='{"records":['.$outp.']}';  
            echo $outp;
        }
        else
            echo '{"Estado":0}';
    }
    $mysqli->close();
?>