<?php
$connection = pg_connect('host=localhost port=5432 dbname=postgres user=postgres password=postgres');

if (!$connection) {
    echo "PostgreSQL connection FAILED!<br>";
    echo "Error: " . pg_last_error();
} else {
    echo "PostgreSQL connection SUCCESS!<br>";
    
    // Проверка таблицы users
    $result = pg_query($connection, "SELECT COUNT(*) as count FROM users");
    if ($result) {
        $row = pg_fetch_assoc($result);
        echo "Users table: " . $row['count'] . " records<br>";
    }
    
    // Проверка таблицы student_events
    $result = pg_query($connection, "SELECT COUNT(*) as count FROM student_events");
    if ($result) {
        $row = pg_fetch_assoc($result);
        echo "Events table: " . $row['count'] . " records<br>";
    }
    
    pg_close($connection);
}
?>