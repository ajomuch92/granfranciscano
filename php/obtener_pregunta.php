<?php
    include 'info.php';
    if($mysqli->connect_errno)
        echo '{"Estado":-1}';
    else{
        $query="SELECT pregunta,respuesta from preguntas WHERE id_preguntas=".$datos->id;
        $result = $mysqli->query($query);
        if($result->num_rows>0){
            $outp = "";
            while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
                if ($outp != "") {$outp .= ",";}
                $outp .= '{"Pregunta":"'  . $rs["pregunta"] . '",';
                $outp .= '"Respuesta":"'. $rs["respuesta"]. '"}';
            }
            //$outp ='{"records":['.$outp.']}';  
            echo $outp;
        }
        else
            echo '{"Estado":0}';
    }
    $mysqli->close();
?>