<?php

// Set JSON header
header('Content-Type: application/json');
// Disable Error Reporting
error_reporting(0);
// Start buffering
ob_start();

// recipient
$to = 'info@stretchingbeyondlimits.com';
// message subject
$subject = 'Email from stretchingbeyondlimits.com';

// Getting form values from _REQUEST
$name    = !empty($_REQUEST['name'])    ? $_REQUEST['name']    : '-';
$email   = !empty($_REQUEST['email'])   ? $_REQUEST['email']   : '-';
$message = !empty($_REQUEST['message']) ? $_REQUEST['message'] : '-';
$form    = !empty($_REQUEST['form'])    ? $_REQUEST['form']    : '-';

// Forming Message
$text = "
Hello Vita!

You received a message from stretchingbeyondlimits.com.

Sender: $name
Senders email address: $email
Message:
$message
";

$result = mail($to, $subject, $text);

// End Buffering
ob_end_clean();

// Return
echo json_encode(array(
    'message_send' => $result ? 'ok' : 'error',
    'hash'         => substr(md5(time()), 3, 7)
));
