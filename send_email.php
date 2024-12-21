<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $phone = htmlspecialchars($_POST['phone']);
    $from_location = htmlspecialchars($_POST['from_location']);
    $to_destination = htmlspecialchars($_POST['to_destination']);
    $date_time = htmlspecialchars($_POST['date_time']);

    $to = "Arrowcab10@gmail.com";
    $subject = "New Taxi Reservation";
    $message = "
        Name: $name\n
        Email: $email\n
        Phone: $phone\n
        From Location: $from_location\n
        To Destination: $to_destination\n
        Date & Time: $date_time\n
    ";
    $headers = "From: $email";

    if (mail($to, $subject, $message, $headers)) {
        echo "Reservation sent successfully!";
    } else {
        echo "Failed to send reservation. Please try again later.";
    }
}
?>
