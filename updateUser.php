<?php
header('Content-Type: application/json; charset=utf-8');

$id_user = $_POST['id_user'];
$login = $_POST['login'];
$email = $_POST['email'];
$date_birth = $_POST['date_birth'];
$gender = $_POST['gender'];
$phone = $_POST['phone'];
$role = $_POST['role'];

if(empty($id_user)){
    echo json_encode(['success'=>0, 'msg'=>'ID пользователя не указан']);
    exit;
}

$connection = @pg_connect('host=localhost port=5432 dbname=postgres user=postgres password=postgres');
if(!$connection){
    echo json_encode(['success'=>0, 'msg'=>'Ошибка подключения к БД']);
    exit;
}

$date_sql = date('Y-m-d', strtotime(str_replace('.', '-', $date_birth)));
$phone_clean = preg_replace('/[^0-9]/', '', $phone);

$sql = "UPDATE users SET 
        login = '$login',
        email = '$email',
        date_birth = '$date_sql',
        gender = '$gender',
        phone = '$phone_clean',
        role = '$role'
        WHERE id_user = $id_user";
$res = pg_query($connection, $sql);

if($res && pg_affected_rows($res) > 0){
    echo json_encode(['success'=>1]);
} else {
    echo json_encode(['success'=>0, 'msg'=>'Пользователь не найден или данные не изменились']);
}

pg_close($connection);
?>