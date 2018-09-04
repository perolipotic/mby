
<?php

    $to ='lipotic.pero@gmail.com';    
    $subject = 'Enswitch.com website message';
    $firstName = $_POST['firstName'];
    $lastName = $_POST['lastName'];
    $company = $_POST['company'];
    $email = $_POST['email'];
    $message = $_POST['message'];
    $body = '
    <html>
    <head>
      <title>Enswitch contact form</title>
    </head>
    <body>
      <p>First name: '.$firstName.'</p>
      <p>Last name: '.$lastName.'</p>
      <p>Company: '.$company.'</p>
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
