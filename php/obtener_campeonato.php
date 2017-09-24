<?php
    
    include 'info.php';
    if($mysqli->connect_errno)
        echo '{"Estado":-1}';
    else{
        $query="SELECT anio_campeonato from campeonatos WHERE id_campeonato=".$datos->id;
        $result = $mysqli->query($query);
        if($result->num_rows>0){
            $outp = "";
            while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
                if ($outp != "") {$outp .= ",";}
                $outp .= '{"Anio":'  . $rs["anio_campeonato"] . '}';
            }
            //$outp ='{"records":['.$outp.']}';  
            echo $outp;
        }
        else
            echo '{"Estado":0}';
    }
    $mysqli->close();
?>