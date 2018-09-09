
<?php
    $to ='mby@mby.hr';    
    $subject = 'Upit s MBY webstranice';
    $lastName = $_POST['lastName'];
    $email = $_POST['email'];
    $message = $_POST['message'];
    $body = '
    <html>
    <head>
      <title>Mby Contact Form</title>
    </head>
    <body>
      <p>Name: '.$lastName.'</p>
      <p>Email: '.$email.'</p>
      <p>Message: '.$message.'</p>
    </body>
    </html>
    ';
    $headers[] = 'MIME-Version: 1.0';
    $headers[] = 'Content-type: text/html; charset=iso-8859-1';
    $headers[] = 'From: <'.$email.'>';
    
    $isSent = mail($to, $subject, $body, implode("\r\n", $headers));


    ?> 
