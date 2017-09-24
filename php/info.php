<?php
    $datos = json_decode(file_get_contents("php://input")); 
    $server = "127.0.0.1";
    $user="root";
    $pass="";
    $bdd="gran_franciscano";
    $mysqli = new mysqli($server,$user, $pass,$bdd);
    $mysqli->query("SET NAMES utf8");
?>