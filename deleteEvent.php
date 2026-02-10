<?php
header('Content-Type: application/json; charset=utf-8');

$id_event = $_POST['id_event'];

if(empty($id_event)){
    echo json_encode(['success'=>0, 'msg'=>'ID мероприятия не указан']);
    exit;
}

$connection = @pg_connect('host=localhost port=5432 dbname=postgres user=postgres password=postgres');
if(!$connection){
    echo json_encode(['success'=>0, 'msg'=>'Ошибка подключения к БД']);
    exit;
}

$sql = "DELETE FROM events WHERE id_event = $id_event";
$res = pg_query($connection, $sql);

if($res && pg_affected_rows($res) > 0){
    echo json_encode(['success'=>1]);
} else {
    echo json_encode(['success'=>0, 'msg'=>'Мероприятие не найдено']);
}

pg_close($connection);
?>