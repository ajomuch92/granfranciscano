<?php
    
    include 'info.php';
    if($mysqli->connect_errno)
        echo '{"Estado":-1}';
    else{
        $query="select a.id_usuario,a.nombre_usuario, a.correo, date_format(a.fecha_registro,'%d/%m/%Y') as fecha_registro,a.id_tipo_usuario,b.tipo_usuario from usuarios a inner JOIN tipos_usuarios b on(a.id_tipo_usuario=b.id_tipo_usuario)";
        $result = $mysqli->query($query);
        if($result->num_rows>0){
            $outp = "";
            while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
                if ($outp != "") {$outp .= ",";}
                $outp .= '{"Id":"'  . $rs["id_usuario"] . '",';
                $outp .= '"Nombre":"'  . $rs["nombre_usuario"] . '",';
                $outp .= '"Correo":"'  . $rs["correo"] . '",';
                $outp .= '"Tipo":"'  . $rs["tipo_usuario"] . '",';
                $outp .= '"Id_tipo":"'  . $rs["id_tipo_usuario"] . '",';
                $outp .= '"Fecha":"'. $rs["fecha_registro"]. '"}';
            }
            $outp ='{"records":['.$outp.']}';  
            echo $outp;
        }
        else
            echo '{"Estado":0}';
    }
    $mysqli->close();
?>