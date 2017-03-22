<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 10/28/2015
 * Time: 9:27 AM
 */

$base = $_SERVER['REQUEST_SCHEME'] . '://' . $_SERVER['HTTP_HOST'];
header('Location: ' . $base);
exit;