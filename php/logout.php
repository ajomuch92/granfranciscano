<?php
    session_start();
    unset($_SESSION['auth']);
    echo '{"logout":1}'
?>