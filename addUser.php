<?php
header('Content-Type: application/json; charset=utf-8');

$login = $_POST['login'];
$email = $_POST['email'];
$date_birth = $_POST['date_birth'];
$gender = $_POST['gender'];
$phone = $_POST['phone'];
$role = $_POST['role'] ?? 'student'; // значение по умолчанию

if(empty($login) || empty($email) || empty($date_birth)){
    echo json_encode(['success'=>0, 'msg'=>'Заполните обязательные поля']);
    exit;
}

$connection = @pg_connect('host=localhost port=5432 dbname=postgres user=postgres password=postgres');
if(!$connection){
    echo json_encode(['success'=>0, 'msg'=>'Ошибка подключения к БД']);
    exit;
}

// преобразование даты
$date_sql = date('Y-m-d', strtotime(str_replace('.', '-', $date_birth)));

// Очистка телефона
$phone_clean = preg_replace('/[^0-9]/', '', $phone);

$sql = "INSERT INTO users (login, email, date_birth, gender, phone, role) 
        VALUES ('$login', '$email', '$date_sql', '$gender', '$phone_clean', '$role')";
$res = pg_query($connection, $sql);

if($res){
    echo json_encode(['success'=>1]);
} else {
    echo json_encode(['success'=>0, 'msg'=>'Ошибка добавления пользователя']);
}

pg_close($connection);
?>