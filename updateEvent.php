<?php
header('Content-Type: application/json; charset=utf-8');

$id_event = $_POST['id_event'];
$event_name = $_POST['event_name'];
$description = $_POST['description'];
$event_date = $_POST['event_date'];
$event_time = $_POST['event_time'];
$location = $_POST['location'];
$organizer_id = $_POST['organizer_id'];
$max_participants = $_POST['max_participants'] ?? null;
$category = $_POST['category'];

if(empty($id_event)){
    echo json_encode(['success'=>0, 'msg'=>'ID мероприятия не указан']);
    exit;
}

$connection = @pg_connect('host=localhost port=5432 dbname=postgres user=postgres password=postgres');
if(!$connection){
    echo json_encode(['success'=>0, 'msg'=>'Ошибка подключения к БД']);
    exit;
}

$date_sql = date('Y-m-d', strtotime(str_replace('.', '-', $event_date)));
$max_participants_sql = $max_participants ? "$max_participants" : "NULL";

$sql = "UPDATE events SET 
        event_name = '$event_name',
        description = '$description',
        event_date = '$date_sql',
        event_time = '$event_time',
        location = '$location',
        organizer_id = $organizer_id,
        max_participants = $max_participants_sql,
        category = '$category'
        WHERE id_event = $id_event";
$res = pg_query($connection, $sql);

if($res && pg_affected_rows($res) > 0){
    echo json_encode(['success'=>1]);
} else {
    echo json_encode(['success'=>0, 'msg'=>'Мероприятие не найдено или данные не изменились']);
}

pg_close($connection);
?>