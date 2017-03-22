<?php
$base = $_SERVER['REQUEST_SCHEME'] . '://' . $_SERVER['HTTP_HOST'];
require "inc/database.php";
$current = $base . '/quotes/' . $dataQuotes[$quoteIndex]['slug'];
?>
<!DOCTYPE html>
<html lang="en" prefix="og: http://ogp.me/ns#">
<head>
	<meta charset="UTF-8" />
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">

	<meta property="og:title" content="<?= $dataQuotes[$quoteIndex]['quote'] ?> - <?= $dataQuotes[$quoteIndex]['author'] ?>" />
	<meta property="og:description" content="Man Tran - A freelance Front-end and Back-end developer" />
	<meta property="og:type" content="books.quotes" />
	<meta property="og:url" content="<?= $current ?>" />
    <meta property="og:image" content="<?= $base ?>/images/man-tran-facebook-share.png" />
    <meta property="og:image" content="<?= $base ?>/images/author/<?= slugify($dataQuotes[$quoteIndex]['author']) ?>.jpg" />
	<meta property="og:site_name" content="Man Tran" />

	<meta name="keyword" content="jimmy man, mantran, man tran, frontend, developer, backend, full-stack, html, stylesheet, grunt, ruby, nodejs, javascript, jquery, backbonejs, angularjs, php, phpunit, yii2, symfony, lavarel, wordpress" />
	<meta name="description" content="A freelance Front-end and Back-end developer with the excellent coding standards. W3C standards, SEO and capabilities of different web browsers are factors I always keep in mind while developing websites." />

	<title>Man Tran - A freelance Front-end and Back-end developer</title>

	<link rel="canonical" href="<?= $base ?>" />
	<link rel="publisher" href="https://plus.google.com/u/0/108386168130570085938" />

	<!-- favicon -->
	<link rel="shortcut icon" href="<?= $base ?>/assets/favicon/favicon.ico" />
	<link rel="apple-touch-icon" href="<?= $base ?>/assets/favicon/favicon-ios.png" type="image/png"/>
	<link rel="icon" href="<?= $base ?>/assets/favicon/favicon.png" type="image/png" />

	<!-- Google fonts -->
	<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Lato:300,400,400italic" type="text/css" />
	<link rel="stylesheet" href="<?= $base ?>/assets/css/font-awesome.min.css" type="text/css" />
	<link rel="stylesheet" href="<?= $base ?>/assets/css/global.min.css" type="text/css" />

</head>

<body>
	<div class="site-wrapper">
        <?php require_once "inc/splash.php"; ?>
		<section class="items-wrap">
            <?php require_once "inc/about.php"; ?>
			<p class="refresh"><a href="<?= $base ?>" class="fa fa-refresh" title="The other one"></a></p>
		</section>
	</div><!-- /container -->
	<script src="<?= $base ?>/assets/js/vendor.min.js" type="text/javascript"></script>
	<!-- custom script -->
	<script src="<?= $base ?>/assets/js/global.min.js" type="text/javascript"></script>
	<!-- Go to www.addthis.com/dashboard to customize your tools -->
	<script>
		$(function(){
			(function(d, s, id) {
				var js, fjs = d.getElementsByTagName(s)[0];
				if (d.getElementById(id)) return;
				js = d.createElement(s); js.id = id;
				js.src = "//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-50568dd4418a8df1";
				fjs.parentNode.insertBefore(js, fjs);
			}(document, 'script', 'addthis'));
		});
	</script>
</body>
</html>