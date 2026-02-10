<?php
header('Content-Type: application/json; charset=utf-8');

$connection = @pg_connect('host=localhost port=5432 dbname=postgres user=postgres password=postgres');
if(!$connection){
    echo json_encode([]);
    exit;
}

$sql = "SELECT e.id_event, e.event_name, e.description, e.event_date, e.event_time, 
               e.location, e.organizer_id, u.login as organizer_name, 
               e.max_participants, e.category, e.created_at,
               (SELECT COUNT(*) FROM event_participants ep WHERE ep.event_id = e.id_event) as current_participants
        FROM events e
        LEFT JOIN users u ON e.organizer_id = u.id_user
        ORDER BY e.event_date DESC, e.event_time";
$res = pg_query($connection, $sql);

$rows = [];
if($res){
    $rows = pg_fetch_all($res) ?: [];
}

echo json_encode($rows);
pg_close($connection);
?>