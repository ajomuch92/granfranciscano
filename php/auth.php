<?php
    session_start();
    if(isset($_SESSION['auth'])){
        echo '{"Auth":1,"Id":'.$_SESSION['id_usuario'].'}';
    }else{
        echo '{"Auth":0}';
    }
?>