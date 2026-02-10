<?php
header('Content-Type: application/json; charset=utf-8');

$event_name = $_POST['event_name'];
$description = $_POST['description'];
$event_date = $_POST['event_date'];
$event_time = $_POST['event_time'];
$location = $_POST['location'];
$organizer_id = $_POST['organizer_id'];
$max_participants = $_POST['max_participants'] ?? null;
$category = $_POST['category'] ?? 'other';

if(empty($event_name) || empty($event_date) || empty($organizer_id)){
    echo json_encode(['success'=>0, 'msg'=>'Заполните обязательные поля']);
    exit;
}

$connection = @pg_connect('host=localhost port=5432 dbname=postgres user=postgres password=postgres');
if(!$connection){
    echo json_encode(['success'=>0, 'msg'=>'Ошибка подключения к БД']);
    exit;
}

// преобразование даты
$date_sql = date('Y-m-d', strtotime(str_replace('.', '-', $event_date)));

$sql = "INSERT INTO events (event_name, description, event_date, event_time, location, organizer_id, max_participants, category) 
        VALUES ('$event_name', '$description', '$date_sql', '$event_time', '$location', $organizer_id, " 
        . ($max_participants ? "$max_participants" : "NULL") . ", '$category')";
$res = pg_query($connection, $sql);

if($res){
    echo json_encode(['success'=>1]);
} else {
    echo json_encode(['success'=>0, 'msg'=>'Ошибка добавления мероприятия']);
}

pg_close($connection);
?>