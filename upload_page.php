<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

session_start();

if (isset($_FILES["icon_file"]) && !empty($_FILES['icon_file'])) {
    require_once("modules/upload.php");

    $icon_file = $_FILES["icon_file"];
    $upload_file = upload_file($_SESSION["user_id"], $icon_file, 0);

    switch ($upload_file) {
        case 0:
            echo "The file has been uploaded";
            break;
        case 1:
            echo "Error 1: Wrong mode";
            break;
        case 2:
            echo "Error 2: The folder does not exist";
            break;
        case 3:
            echo "Error 3: The extension of the file is not allowed";
            break;
        case 4:
            echo "Error 4: The size of the file is too large";
            break;
        case 5:
            echo "Error 5: Unknown error";
            break;
    }

}

if (isset($_FILES["pic_file"]) && !empty($_FILES['pic_file'])) {
    require_once("modules/upload.php");

    $icon_file = $_FILES["pic_file"];
    $upload_file = upload_file($_SESSION["user_id"], $icon_file, 1);

    switch ($upload_file) {
        case 0:
            echo "The file has been uploaded";
            break;
        case 1:
            echo "Error 1: Wrong mode";
            break;
        case 2:
            echo "Error 2: The folder does not exist";
            break;
        case 3:
            echo "Error 3: The extension of the file is not allowed";
            break;
        case 4:
            echo "Error 4: The size of the file is too large";
            break;
        case 5:
            echo "Error 5: Unknown error";
            break;
    }

}

if (isset($_FILES["script_file"]) && !empty($_FILES['script_file'])) {
    require_once("modules/upload.php");

    $icon_file = $_FILES["script_file"];
    $upload_file = upload_file($_SESSION["user_id"], $icon_file, 2);

    switch ($upload_file) {
        case 0:
            echo "The file has been uploaded";
            break;
        case 1:
            echo "Error 1: Wrong mode";
            break;
        case 2:
            echo "Error 2: The folder does not exist";
            break;
        case 3:
            echo "Error 3: The extension of the file is not allowed";
            break;
        case 4:
            echo "Error 4: The size of the file is too large";
            break;
        case 5:
            echo "Error 5: Unknown error";
            break;
    }

}
?>



<!DOCTYPE html>
<html>
<head>
    <title>Upload your files</title>
</head>
<body>
<form enctype="multipart/form-data" action="" method="POST">
    <p>Upload an icon</p>
    <input type="file" name="icon_file"></input><br/>
    <input type="submit" value="Upload"></input>
</form>
<br>
<br>
<br>
<form enctype="multipart/form-data" action="" method="POST">
    <p>Upload a picture</p>
    <input type="file" name="pic_file"></input><br/>
    <input type="submit" value="Upload"></input>
</form>
<br>
<br>
<br>
<form enctype="multipart/form-data" action="" method="POST">
    <p>Upload a script</p>
    <input type="file" name="script_file"></input><br/>
    <input type="submit" value="Upload"></input>
</form>
<br>
<br>
<br>
</body>
</html>
