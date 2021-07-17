<?php
    $name = $_POST['modalName'];
	$phone = $_POST['modalPhone'];


	$to = "chikibriki500@gmail.com"; 
	// $date = date ("d.m.Y"); 
	// $time = date ("h:i");
	$from = $email;
	$subject = "Заявка c сайта";

	
	$msg="
    Имя: $name /n
	Фамилия: $surname /n
    Телефон: $phone /n
    Почта: $email"; 	
	mail($to, $subject, $msg, "From: $from ");

?>
