<?php
    
    include 'info.php';
    if($mysqli->connect_errno)
        echo '{"Estado":-1}';
    else{
        $query="select id_estado,estado from estados";
        $result = $mysqli->query($query);
        if($result->num_rows>0){
            $outp = "";
            while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
                if ($outp != "") {$outp .= ",";}
                $outp .= '{"Id":"'  . $rs["id_estado"] . '",';
                $outp .= '"Estado":"'. $rs["estado"]. '"}';
            }
            $outp ='{"records":['.$outp.']}';  
            echo $outp;
        }
        else
            echo '{"Estado":0}';
    }
    $mysqli->close();
?>