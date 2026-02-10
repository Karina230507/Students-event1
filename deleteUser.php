<?php
header('Content-Type: application/json; charset=utf-8');

$id_user = $_POST['id_user'];

if(empty($id_user)){
    echo json_encode(['success'=>0, 'msg'=>'ID пользователя не указан']);
    exit;
}

$connection = @pg_connect('host=localhost port=5432 dbname=postgres user=postgres password=postgres');
if(!$connection){
    echo json_encode(['success'=>0, 'msg'=>'Ошибка подключения к БД']);
    exit;
}

$sql = "DELETE FROM users WHERE id_user = $id_user";
$res = pg_query($connection, $sql);

if($res && pg_affected_rows($res) > 0){
    echo json_encode(['success'=>1]);
} else {
    echo json_encode(['success'=>0, 'msg'=>'Пользователь не найден']);
}

pg_close($connection);
?>