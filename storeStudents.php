<?php
    $connection = pg_connect('host=localhost port=5432 dbname=postgres user=postgres password=postgres');
    $sql = "SELECT id, name, description, DATE(event_date) as event_date, location, status FROM student_events";
    $res = pg_query($connection,$sql);

    $rows = pg_fetch_all($res);
    
    echo json_encode($rows);
?>
