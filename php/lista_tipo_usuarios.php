<?php
    
    include 'info.php';
    if($mysqli->connect_errno)
        echo '{"Estado":-1}';
    else{
        $query="select id_tipo_usuario,tipo_usuario from tipos_usuarios";
        $result = $mysqli->query($query);
        if($result->num_rows>0){
            $outp = "";
            while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
                if ($outp != "") {$outp .= ",";}
                $outp .= '{"Id_tipo_usuario":"'  . $rs["id_tipo_usuario"] . '",';
                $outp .= '"Tipo_usuario":"'. $rs["tipo_usuario"]. '"}';
            }
            $outp ='{"records":['.$outp.']}';  
            echo $outp;
        }
        else
            echo '{"Estado":0}';
    }
    $mysqli->close();
?>