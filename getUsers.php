<?php
header('Content-Type: application/json; charset=utf-8');

$connection = @pg_connect('host=localhost port=5432 dbname=postgres user=postgres password=postgres');
if(!$connection){
    echo json_encode([]);
    exit;
}

$sql = "SELECT id_user, login, email, date_birth, gender, phone, role 
        FROM users ORDER BY login";
$res = pg_query($connection, $sql);

$rows = [];
if($res){
    $rows = pg_fetch_all($res) ?: [];
}

echo json_encode($rows);
pg_close($connection);
?>