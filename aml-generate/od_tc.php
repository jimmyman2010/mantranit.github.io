<?php
$main = isset($_REQUEST['main']) ? $_REQUEST['main'] : NULL;
$other = isset($_REQUEST['other']) ? $_REQUEST['other'] : NULL;

if(!$main || !$other){
    echo '<h1>No data</h1>';
    exit(0);
}

$jsonMain = file_get_contents( getcwd() . '/data/' . $main);

$siteData = json_decode($jsonMain);

$jsonOther = file_get_contents( getcwd() . '/data/' . $other);
$tmp = json_decode($jsonOther);

$siteData->pages->{$tmp->defaultPage} = $tmp->pages->{$tmp->defaultPage};

$menu = '';
foreach ($siteData->pages as $keyPage => $contentPage) {
    if($keyPage === $siteData->defaultPage) {
        $defaultPage = $contentPage;
    }
    foreach ($contentPage->sections as $indexSection => $contentSection) {
        $menu .= '<li data-page="'.$keyPage.'">
                    <a href="#' . $contentSection->hash. '" data-target="' .$keyPage. '-section-'.($indexSection+1).'">'.$contentSection->name.'</a>
                  </li>';
    }
}

function process_image($src, $page = ''){
    if (strpos($src, 'http') === false) {
        global $siteData;
        if($page !== '') {
            return $siteData->pages->{$page}->defaultImage . $src;
        } else {
            return $siteData->pages->{$siteData->defaultPage}->defaultImage . $src;
        }
    }
    return $src;
}

function process_icon($body){
    global $siteData;
    $body = str_replace('(A)', '<img src="' . process_image($siteData->defaultIcon) . '" alt="(A)" class="icon-am" />', $body);
    $body = str_replace('［A］', '<img src="' . process_image($siteData->defaultIcon) . '" alt="(A)" class="icon-am" />', $body);
    return str_replace('[A]', '<img src="' . process_image($siteData->defaultIcon) . '" alt="(A)" class="icon-am" />', $body);
}

const LANG = 'tc';
const MORE = '<span class="aml-text-yellow">&gt; 更多</span>';
const CLOSE = '關閉並查看其他優惠';
const TANDC = '條款及細則';
const HOTEL_HIGHLIGHT = '酒店簡介';
const OFFER = '優惠詳情';

?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title><?= $siteData->title ?></title>
    <link href="http://res.e.asiamiles.com/res/asiamil_mkt_prod1/OD_2017_bootstrap.min.css" rel="stylesheet">
    <link href="http://res.e.asiamiles.com/res/asiamil_mkt_prod1/OD_2017_aml.css" rel="stylesheet">
    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
    <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
    <meta name="description" content="@asiamileslimited">
    <link rel="image_src" href="<?= process_image($siteData->ogImage) ?>">
    <meta name="title" content="<?= $siteData->ogTitle ?>">
    <meta property="og:title" content="<?= $siteData->ogTitle ?>">
    <meta property="og:image" content="<?= process_image($siteData->ogImage) ?>">
    <meta property="og:description" content="<?= $siteData->ogDescription ?>">
    <style type="text/css">
        #header{ border-top: none; height: 82px; border-bottom-width: 5px; }
        header.scroll #header .selector-lang{ padding-top: 16px; }
        .icon-am { margin-top: -5px; }
        h4 .icon-am { width: 14px; }
        .aml-text-yellow { white-space: nowrap; }
        #content h3{ font-size: 14px; line-height: 17px; margin: 15px 10px 25px; }
        .btn-aml { padding: 0 10px; line-height: 42px; }
        .offer-detail-desktop ul,
        .offer-detail-desktop ol { padding-left: 30px; }
        .offer-detail-desktop .line-break > li { margin-top: 10px; }
        #nav .selector-section{ white-space: nowrap; }
        #nav #selector-section-scroll{ text-align: center; }
        #content .offer-item figure,
        #content .offer-item-no-expand figure{ margin-bottom: 0; }
        #content .offer-item h6 span,
        #content .offer-item-no-expand h6 span{ line-height: 1.3; }
        .offer-item-image{ margin-bottom: 15px; }
        .offer-item-image figure{ padding-bottom: 65%; background-color: #f5f5f5; }
        .offer-item-image .hidden-sm{ padding-bottom: 32%; }
        .offer-item-image .loaded{ padding-bottom: 0; text-align: center; }
        .offer-item-image figure img{ opacity: 0; width: 0; height: 0; display: inline-block;
            -webkit-transition: opacity 0.3s;
            -moz-transition: opacity 0.3s;
            -ms-transition: opacity 0.3s;
            -o-transition: opacity 0.3s;
            transition: opacity 0.3s;
        }
        .offer-item-image .loaded img{ opacity: 1; width: 100%; height: auto; }
        .offer-gallery img{ opacity: 0;
            -webkit-transition: opacity 0.3s;
            -moz-transition: opacity 0.3s;
            -ms-transition: opacity 0.3s;
            -o-transition: opacity 0.3s;
            transition: opacity 0.3s;
        }
        .offer-gallery .loaded{ opacity: 1; }

        #nav h2.nav span{ display: block; max-width: 400px; margin: 0 auto; border: 1px solid #facf00; overflow: hidden;
            -webkit-border-radius: 5px;  -moz-border-radius: 5px;  border-radius: 5px;
        }
        #nav h2.nav a{  float: left; width: 50%; padding: 5px 15px; text-align: center; }
        #nav h2.nav a:hover, #nav h2.nav a.active{  color: #272f38;  background-color: #facf00;  }
        .link-tnc-no-expand{ text-decoration: none !important; }
        .offer-detail-desktop ul,
        .offer-detail-mobile ul{ list-style: disc; }
        .offer-detail-desktop .list-unstyled,
        .offer-detail-mobile .list-unstyled{ list-style: none; }
        @media screen and (max-width: 768px) {
            .img-responsive{ width: 100%; }
            .offer-logo li{ display: block; }
            .offer-logo .brand-logo{ max-width: 170px; display: inline-block; }
        }
        @media screen and (min-width: 769px) {
            .btn-aml { line-height: 44px; }
            #header .selector-lang{ padding-top: 14px; }
            #header .row{ padding: 16px 40px; }
            header.scroll #header .row{ padding: 10px 40px; }
            #header .nav-toggle{ margin-top: 11px; }
            #nav h2.nav span{ -webkit-border-radius: 10px;  -moz-border-radius: 10px;  border-radius: 10px;  }
            #nav h2.nav a{  padding: 10px 20px;  }
        }
    </style>
    <script>
        window.defaultPage = '<?= $siteData->defaultPage ?>';
    </script>
</head>
<body>
<script>
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
            (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
    ga('create', '<?= $siteData->gaKey ?>', 'auto');
    ga('send', 'pageview');
</script>
<div id="bk2top"><a class="scrollToTop" href="#"><img class="to-top" src="<?= $siteData->toTop ?>" /></a></div>
<header class="navbar-header">
    <div id="header">
        <div class="container-fluid">
            <div class="row">
                <div class="col-xs-7 col-md-3">
                    <div class="nav-toggle"><span></span><span></span><span></span></div>
                    <div class="navbar-brand">
                        <a class="logo" href="<?= $siteData->logoUrl ?>" title="亞洲萬里通" target="_top">
                            <img class="img-responsive" id="AM_Logo" alt="亞洲萬里通" src="<?= process_image($siteData->logo) ?>" />
                        </a>
                    </div>
                </div>
                <div class="hidden-xs hidden-sm col-md-6 text-center">
                    <ul class="selector-section list-inline list-unstyled hidden">
                        <?= $menu ?>
                    </ul>
                </div>
                <div class="col-xs-5 col-md-3 text-right">
                    <ul class="selector-lang list-inline list-unstyled">
                        <li>
                            <a href="<?= $siteData->urlEN ?>" class="lang_links">EN</a>
                        </li>
                        <li>
                            <a href="<?= $siteData->urlTC ?>" class="lang_links">繁</a>
                        </li>
                        <li>
                            <a href="<?= $siteData->urlSC ?>" class="lang_links">简</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="nav-menu">
            <ul class="list-unstyled">
                <li><a class="btn-menu-close" href="javascript:void(0)">&times;</a></li>
            </ul>
            <ul class="selector-section list-unstyled">
                <?= $menu ?>
            </ul>
        </div>
    </div>
    <div id="nav">
        <div class="container">
            <div class="row">
                <div class="col-xs-12 text-center">
                    <h1><img class="img-responsive" alt="Offer Digest" src="<?= process_image($siteData->od) ?>" /></h1>
                    <h2 class="nav">
                <span class="clearfix">
                    <a class="lod_page_link<?= $siteData->defaultPage === 'lod' ? ' active' : '' ?>" href="#lod" data-type="lod">生活消閒</a>
                    <a class="tod_page_link<?= $siteData->defaultPage === 'tod' ? ' active' : '' ?>" href="#tod" data-type="tod">旅遊</a>
                </span>
                    </h2>
                </div>
            </div>
            <div class="col-xs-12 text-center-md">
                <div id="selector-section-scroll" style="display: none;">
                    <ul class="selector-section list-inline list-unstyled">
                        <?= $menu ?>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</header>
<div id="content">
    <div class="container">
    <?php
    foreach ($siteData->pages as $keyPage => $contentPage) {
        echo '<div class="row od_page" style="display: none;" data-page="'.$keyPage.'">';

        $indexBox = 0;
        require('templates/pageKV.php');

        foreach ($contentPage->sections as $indexSection => $contentSection) {

            $positionItem = 0;
            require('templates/section.php');

        }
        echo '</div>';
    }
    ?>

    </div>
</div>
<footer>
    <div id="footer">
        <div class="container">
            <div class="row">
                <div class="col-xs-12 text-center">
                    <div id="social_btn">
                        <ul class="list-inline list-unstyled">
                            <li>
                                <a href="//www.facebook.com/sharer.php?u=<?= $siteData->urlEN ?>" target="_blank">
                                    <img width="16" height="23" class="nlui-widget" alt="Share to Facebook" src="<?= process_image($siteData->facebookImage) ?>" unselectable="on" />
                                </a>
                            </li>
                            <li>
                                <a href="//service.weibo.com/share/share.php?url=<?= $siteData->urlEN ?>" target="_blank">
                                    <img width="29" height="23" class="nlui-widget" alt="Share on Weibo" src="<?= process_image($siteData->weiboImage) ?>" unselectable="on" />
                                </a>
                            </li>
                            <li>
                                <a href="javascript:void(0);" data-target="#myModal_weChat" data-toggle="modal">
                                    <img width="29" height="23" class="nlui-widget" alt="Share on WeChat" src="<?= process_image($siteData->wechatImage) ?>" unselectable="on" />
                                </a>
                            </li>
                        </ul>
                    </div>
                    <p>版權所有 &copy; 「亞洲萬里通」由亞洲萬里通有限公司管理。</p>
                </div>
            </div>
        </div>
    </div>
</footer>
<div class="hidden" id="od_expansions">


    <?php
    foreach ($siteData->pages as $keyPage => $contentPage) {

        $indexBox = 0;

        foreach ($contentPage->sections as $indexSection => $contentSection) {

            $positionItem = 0;
            foreach ($contentSection->rows as $indexRow => $contentRow) {

                foreach ($contentRow->data as $indexItem => $item) {

                    $indexBox++;
                    $positionItem++;

                    if($item->template === 'contentExpansion') {

                        if($item->logo || ($item->period && count($item->period) > 0)) {
                            require('templates/contentExpansionAfter.php');
                        } else {
                            require('templates/contentExpansionAfterNoLogo.php');
                        }
                    }

                    if($item->template === 'contentExpansionNoLogo') {

                        require('templates/contentExpansionAfterNoLogo.php');
                    }
                }

            }

        }
    }
    ?>

</div>
<div class="modal fade in" id="myModal_weChat" role="dialog">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-body text-center">
                <p><strong><?= $defaultPage->beforeQr ?></strong></p>
                <p><img class="nlui-widget" src="<?= process_image($defaultPage->qrCode) ?>" alt="qr code" unselectable="on" /></p>
                <p><?= $defaultPage->afterQr ?></p>
                <p>
                    <button class="btn btn-primary" type="button" data-dismiss="modal">OK</button>
                </p>
            </div>
        </div>
    </div>
</div>
<script src="http://res.e.asiamiles.com/res/asiamil_mkt_prod1/OD_2017_jquery-1.12.4.min.js" type="text/javascript"></script>
<script src="http://res.e.asiamiles.com/res/asiamil_mkt_prod1/OD_2017_bootstrap.min.js" type="text/javascript"></script>
<script src="http://res.e.asiamiles.com/res/asiamil_mkt_prod1/OD_2017_jquery.waypoints.min.js" type="text/javascript"></script>
<script src="http://res.e.asiamiles.com/res/asiamil_mkt_prod1/OD_2017_TweenMax.min.js" type="text/javascript"></script>
<script src="http://res.e.asiamiles.com/res/asiamil_mkt_prod1/OD_2017_ScrollToPlugin.min.js" type="text/javascript"></script>
<!--<script src="http://res.e.asiamiles.com/res/asiamil_mkt_prod1/OD_2017_imagesloaded.pkgd.min.js" type="text/javascript"></script> -->
<script src="http://res.e.asiamiles.com/res/asiamil_mkt_prod1/OD_2017_iscroll-lite.js" type="text/javascript"></script>
<script src="http://res.e.asiamiles.com/res/asiamil_mkt_prod1/OD_2017_is.min.js" type="text/javascript"></script>
<script src="<?= $siteData->fileJs ?>" type="text/javascript"></script>
<!--<script src="scripts/TOD_201705_aml-en.js" type="text/javascript"></script>-->

</body>
</html>
