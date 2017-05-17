<?php
/**
 * Created by PhpStorm.
 * User: MinhMan.Tran
 * Date: 5/16/2017
 * Time: 1:37 PM
 */

$data = isset($_POST['data']) ? json_decode($_POST['data']) : NULL;
if($data) {

    if($data->fileName) {

        echo '{"data": "'.$data->fileName.'"}';

        $myFile = fopen(getcwd() . '/data/' . $data->fileName, "w") or die("Unable to open file!");
        fwrite($myFile, json_encode($data));
        fclose($myFile);
    }
    else {
        echo '{"data": ""}';
    }

}
else {
    echo '{"data": ""}';
}