<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8"/>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <meta name="keyword" content="jimmy man, mantran, man tran, frontend, developer, backend, full-stack, html, stylesheet, grunt, ruby, nodejs, javascript, jquery, backbonejs, angularjs, php, phpunit, yii2, symfony, lavarel, wordpress"/>
    <meta name="description" content="A freelance Front-end and Back-end developer with the excellent coding standards. W3C standards, SEO and capabilities of different web browsers are factors I always keep in mind while developing websites."/>
    <meta name="p:domain_verify" content="29a6026dd8de40359663d7726ffa4984"/>
    <!-- favicon -->
    <link rel="shortcut icon" href="../assets/images/favicon/favicon.ico"/>
    <link rel="apple-touch-icon" href="../assets/images/favicon/favicon-ios.png" type="image/png"/>
    <link rel="icon" href="../assets/images/favicon/favicon.png" type="image/png"/>

    <title>AML generate online - Man Tran</title>
    <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"/>
    <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"/>

    <link rel="stylesheet" href="css/main.css"/>

</head>
<body>
<div id="loading"></div>
<div id="body-style" style="visibility: hidden; position: absolute; z-index: 1; max-width: 20px; overflow: hidden;"></div>

<div id="wrapper" class="site-wrapper">

    <!-- Page Content -->
    <div id="page-content-wrapper">
        <div class="header-top">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-md-4">
                        <div class="text-right clearfix">
                            <button type="button" id="ok" class="btn btn-primary">
                                <span>SAVE</span>
                                <span><i class="fa fa-refresh fa-spin"></i> SAVING</span>
                            </button>
                            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#modalPreview">Preview</button>
                        </div>
                    </div>
                    <?php $data = isset($_GET['data']) ? $_GET['data'] : ''; ?>
                    <?php $dataArr = explode('_', str_replace('.json', '', $data)); ?>
                    <div class="col-md-4">
                        <div class="form-group" style="margin: 10px 0;">
                            <?php
                            $dir = getcwd() . "/data/";
                            $lod = '';
                            $tod = '';
                            // Open a directory, and read its contents
                            if (is_dir($dir)){
                                if ($dh = opendir($dir)){
                                    while (($file = readdir($dh)) !== false){
                                        $ext = pathinfo($file, PATHINFO_EXTENSION);
                                        if($ext === 'json') {
                                            $selected = '';
                                            if($file === $data) {
                                                $selected = 'selected';
                                            }
                                            if(strpos($file, 'lod') >= 0){
                                                $lod .= '<option value="' . $file . '" ' . $selected . '>' . $file . '</option>';
                                            } else {
                                                $tod .= '<option value="' . $file . '" ' . $selected . '>' . $file . '</option>';
                                            }
                                        }
                                    }
                                    closedir($dh);
                                }
                            }
                            ?>
                            <select name="selectData" id="selectData" class="form-control">
                                <option value="">-- Select --</option>
                                <?= $tod ?>
                                <?= $lod ?>
                            </select>
                        </div>
                    </div>
                    <div class="col-md-4 text-right">
                        <h3 class="pull-left" style="margin: 15px 0"><?= implode(' ', $dataArr) ?></h3>
<!--                        <input type="file" id="input-html" accept="text/html"/>-->
<!---->
<!--                        <button id="upload-html" class="btn btn-primary" type="button">-->
<!--                            <span class="normal">Upload</span>-->
<!--                            <span class="process"><i class="fa fa-refresh fa-spin"></i> Uploading</span>-->
<!--                        </button>-->
                    </div>
                </div>
            </div>
        </div>
        <main role="main" class="main">
            <div class="container-fluid">

                <div id="main"></div>

                <div class="row">
                    <div class="col-sm-12">

                        <div class="tab-content">

                            <div id="design" class="tab-pane fade in active">
                                <form id="formMain">

                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label>Title</label>
                                                <input type="text" name="title" class="form-control" />
                                            </div>

                                            <div class="form-group">
                                                <label>Logo</label>
                                                <input type="text" name="logo" class="form-control" />
                                            </div>

                                            <div class="form-group">
                                                <label>Offer Digest</label>
                                                <input type="text" name="od" class="form-control" />
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <div class="form-group">
                                                        <label>File Name</label>
                                                        <input type="text" name="fileName" class="form-control" />
                                                    </div>
                                                </div>
                                                <div class="col-md-6">
                                                    <div class="form-group">
                                                        <label>defaultPage</label>
                                                        <input type="text" name="defaultPage" class="form-control" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label>File Js</label>
                                                <input type="text" name="fileJs" class="form-control" />
                                            </div>
                                            <div class="form-group">
                                                <label>Prefix Image Url</label>
                                                <input type="text" name="defaultImage" class="form-control" />
                                            </div>
                                        </div>
                                    </div>

                                    <hr>
                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label>KV Desktop</label>
                                                <input type="text" name="kvDesktop" class="form-control" />
                                            </div>
                                            <div class="form-group">
                                                <label>KV Mobile</label>
                                                <input type="text" name="kvMobile" class="form-control" />
                                            </div>
                                            <div class="form-group">
                                                <label>KV Alt</label>
                                                <input type="text" name="kvAlt" class="form-control" />
                                            </div>
                                            <div class="form-group">
                                                <label>Lead In</label>
                                                <textarea name="intro" class="form-control"></textarea>
                                            </div>
                                        </div>

                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label>before qr</label>
                                                <textarea name="beforeQr" class="form-control"></textarea>
                                            </div>
                                            <div class="form-group">
                                                <label>Image qr code</label>
                                                <input type="text" name="qrCode" class="form-control" />
                                            </div>
                                            <div class="form-group">
                                                <label>after qr</label>
                                                <input type="text" name="afterQr" class="form-control" />
                                            </div>
                                        </div>
                                    </div>



                                    <button type="button" data-toggle="collapse" data-target="#demo" class="btn btn-warning">Meta</button>

                                    <div id="demo" class="collapse">

                                        <hr>

                                        <div class="row">
                                            <div class="col-md-4">
                                                <div class="form-group">
                                                    <label>Facebook Image</label>
                                                    <input type="text" name="facebookImage" class="form-control" />
                                                </div>
                                            </div>
                                            <div class="col-md-4">
                                                <div class="form-group">
                                                    <label>Weibo Image</label>
                                                    <input type="text" name="weiboImage" class="form-control" />
                                                </div>
                                            </div>
                                            <div class="col-md-4">
                                                <div class="form-group">
                                                    <label>WeChat Image</label>
                                                    <input type="text" name="wechatImage" class="form-control" />
                                                </div>
                                            </div>
                                        </div>

                                        <div class="row">
                                            <div class="col-md-4">
                                                <div class="form-group">
                                                    <label>Url EN</label>
                                                    <input type="text" name="urlEN" class="form-control" />
                                                </div>
                                            </div>
                                            <div class="col-md-4">
                                                <div class="form-group">
                                                    <label>Url TC</label>
                                                    <input type="text" name="urlTC" class="form-control" />
                                                </div>
                                            </div>
                                            <div class="col-md-4">
                                                <div class="form-group">
                                                    <label>Url SC</label>
                                                    <input type="text" name="urlSC" class="form-control" />
                                                </div>
                                            </div>
                                        </div>
                                        <hr>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label>ogTitle</label>
                                                    <input type="text" name="ogTitle" class="form-control" />
                                                </div>
                                                <div class="form-group">
                                                    <label>ogImage</label>
                                                    <input type="text" name="ogImage" class="form-control" />
                                                </div>
                                                <div class="form-group">
                                                    <label>ogDescription</label>
                                                    <textarea name="ogDescription" class="form-control"></textarea>
                                                </div>
                                            </div>

                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label>To Top</label>
                                                    <input type="text" name="toTop" class="form-control" />
                                                </div>

                                                <div class="form-group">
                                                    <label>AML Icon</label>
                                                    <input type="text" name="defaultIcon" class="form-control" />
                                                </div>
                                                <div class="form-group">
                                                    <label>GA Key</label>
                                                    <input type="text" name="gaKey" class="form-control" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </form>

                                <hr>

                                <div id="section-html" class="panel-group">

                                </div>

                                <div class="buttons text-center">
                                    <br>
                                    <div class="panel-footer">
                                        <div class="text-center">
                                            <button type="button" id="add-section" class="btn btn-sm btn-info">Add Section</button>
                                        </div>

                                    </div>
                                    <br><br>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <footer class="footer row">
                    <div class="col-sm-12"><p>&copy; Man Tran</p></div>
                </footer>
            </div>
        </main>
    </div>
    <!-- /#page-content-wrapper -->

</div>
<!-- /#wrapper -->
<a href="javascript:void(0);" class="to-top"><i class="fa fa-angle-up"></i></a>

<script id="section" type="text/html">
    <form class="formSection">
        <div class="type-section panel panel-primary">
            <div class="panel-heading">
                <div class="row">
                    <div class="col-md-6">
                        <div class="form-group">
                            <label>Name</label>
                            <input type="text" name="name" class="form-control">
                        </div>
                        <div class="form-group">
                            <label>Prefix</label>
                            <select name="prefix" class="form-control">
                                <option value="Earn">Earn</option>
                                <option value="Redeem">Redeem</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label>Id</label>
                            <input type="text" name="id" class="form-control">
                        </div>
                        <div class="form-group">
                            <label>Hash</label>
                            <input type="text" name="hash" class="form-control">
                        </div>
                    </div>
                </div>
            </div>



            <div class="panel-body">
                <div class="text-center">
                    <button type="button" class="toggle-button btn"><span>Collapse <i class="fa fa-angle-up"></i></span><span>Expand <i class="fa fa-angle-down"></i></span></button>
                </div>
                <br>
                <div class="toggle-content">
                    <div class="panel-body--section">

                    </div>
                </div>

            </div>

            <div class="panel-footer">
                <div class="text-center">
                    <button type="button" class="add-row-1 btn btn-sm btn-info">Add Module 1 Content</button>
                    <button type="button" class="add-row-2 btn btn-sm btn-info">Add Module 2 Content</button>
                    <button type="button" class="delete-section btn btn-sm btn-danger pull-right">Delete section</button>
                </div>

            </div>
        </div>
    </form>
</script>

<script id="row-2" type="text/html">

    <div class="type-row panel panel-default">
        <div class="panel-heading">
            Module 2 Content
        </div>

        <div class="panel-body">
            <div class="row">
                <div class="col-md-6">
                    <div class="text-center">
                        <h4 class="note"></h4>
                        <button type="button" class="edit-item-general btn btn-sm btn-info">Edit General</button>
                        <button type="button" class="edit-item-logo btn btn-sm btn-info">Edit Logo</button>
                        <button type="button" class="edit-item-offer btn btn-sm btn-info">Edit Offer</button>
                        <button type="button" class="edit-item-tandc btn btn-sm btn-info">Edit TandC</button>
                        <button type="button" class="edit-item-other btn btn-sm btn-info">Edit Other</button>
                        <input type="hidden" class="data-item" />
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="text-center">
                        <h4 class="note"></h4>
                        <button type="button" class="edit-item-general btn btn-sm btn-info">Edit General</button>
                        <button type="button" class="edit-item-logo btn btn-sm btn-info">Edit Logo</button>
                        <button type="button" class="edit-item-offer btn btn-sm btn-info">Edit Offer</button>
                        <button type="button" class="edit-item-tandc btn btn-sm btn-info">Edit TandC</button>
                        <button type="button" class="edit-item-other btn btn-sm btn-info">Edit Other</button>
                        <input type="hidden" class="data-item" />
                    </div>
                </div>
            </div>
        </div>
        <div class="panel-footer">
            <div class="text-right">
                <button type="button" class="delete-row btn btn-sm btn-danger">Delete row</button>
            </div>
        </div>
    </div>

</script>

<script id="row-1" type="text/html">

    <div class="type-row panel panel-default">
        <div class="panel-heading">
            Module 1 Content
        </div>

        <div class="panel-body">
            <div class="row">
                <div class="col-md-12">
                    <div class="text-center">
                        <h4 class="note"></h4>
                        <button type="button" class="edit-item-general btn btn-sm btn-info">Edit General</button>
                        <button type="button" class="edit-item-logo btn btn-sm btn-info">Edit Logo</button>
                        <button type="button" class="edit-item-offer btn btn-sm btn-info">Edit Offer</button>
                        <button type="button" class="edit-item-tandc btn btn-sm btn-info">Edit TandC</button>
                        <button type="button" class="edit-item-other btn btn-sm btn-info">Edit Other</button>
                        <input type="hidden" class="data-item" />
                    </div>
                </div>
            </div>
        </div>
        <div class="panel-footer">
            <div class="text-right">
                <button type="button" class="delete-row btn btn-sm btn-danger">Delete row</button>
            </div>
        </div>
    </div>

</script>


<!-- Modal InputJson -->
<div class="modal fade" id="modalContentGeneral" tabindex="-1" role="dialog" aria-labelledby="modalContentGeneralLabel">
    <div class="modal-dialog modal-lg modal-xlg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title" id="modalContentGeneralLabel">General Content: <span></span></h4>
            </div>
            <div class="modal-body">

                <form id="form-item-general">
                    <div class="row">
                        <div class="form-group col-xs-12">
                            <select name="template" class="form-control">
                                <option value="contentExpansion">Expansion</option>
                                <option value="contentNoExpansion">No Expansion</option>
                            </select>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6">

                            <div class="row">
                                <div class="form-group col-xs-12">
                                    <label>Note:</label>
                                    <input type="text" class="form-control" name="note">
                                </div>
                            </div>
                            <div class="row">
                                <div class="form-group col-xs-12">
                                    <label>Brand:</label>
                                    <input type="text" class="form-control" name="brandName">
                                </div>
                                <div class="form-group col-xs-12">
                                    <label>Headline:</label>
                                    <textarea name="headline" id="headline" class="form-control"></textarea>
                                </div>
                                <div class="form-group col-xs-12">
                                    <label>Lead In:</label>
                                    <textarea name="leadIn" id="leadIn" rows="5" class="form-control"></textarea>
                                </div>
                                <div class="form-group col-xs-12">
                                    <label>Tip:</label>
                                    <input type="text" class="form-control" name="tip">
                                </div>
                            </div>

                        </div>
                        <div class="col-md-6">

                            <div class="row">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label>KV Desktop:</label>
                                        <input type="text" class="form-control" name="imageDesktop">
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label>KV Mobile:</label>
                                        <input type="text" class="form-control" name="imageMobile">
                                    </div>
                                </div>
                            </div>
                            <hr>
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label>CTA:</label>
                                        <input type="text" class="form-control" name="cta">
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label>CTA Url:</label>
                                        <input type="text" class="form-control" name="ctaUrl">
                                    </div>
                                </div>
                            </div>

                            <hr>

                            <div class="row">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label>External Link:</label>
                                        <input type="url" class="form-control" name="externalLink">
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                </form>
            </div>

            <div class="modal-footer">
                <button type="button" id="input-json-general" class="btn btn-primary">OK</button>
            </div>
        </div>
    </div>
</div>


<!-- Modal InputJson -->
<div class="modal fade" id="modalContentLogo" tabindex="-1" role="dialog" aria-labelledby="modalContentLogoLabel">
    <div class="modal-dialog modal-lg modal-xlg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title" id="modalContentLogoLabel">Logo Content: <span></span></h4>
            </div>
            <div class="modal-body">

                <form id="form-item-logo">

                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <label>Logo:</label>
                                <input type="text" class="form-control" name="logo">
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="form-group">
                                <label>Logo url:</label>
                                <input type="url" class="form-control" name="logoUrl">
                            </div>

                        </div>
                        <div class="col-md-4" style="border: 1px solid;">

                            <div class="row">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label>Name 1:</label>
                                        <input type="text" class="form-control" name="periodName0">
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label>Value 1:</label>
                                        <input type="text" class="form-control" name="periodValue0">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4" style="border: 1px solid;">

                            <div class="row">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label>Name 2:</label>
                                        <input type="text" class="form-control" name="periodName1">
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label>Value 2:</label>
                                        <input type="text" class="form-control" name="periodValue1">
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div class="col-md-4" style="border: 1px solid;">
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label>Name 3:</label>
                                        <input type="text" class="form-control" name="periodName2">
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label>Value 3:</label>
                                        <input type="text" class="form-control" name="periodValue2">
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>


                    <div class="row">
                        <div class="col-md-4" style="border: 1px solid;">
                            <div class="form-group">
                                <label>Image 1:</label>
                                <input type="url" class="form-control" name="galleryImage0">
                            </div>
                            <div class="form-group">
                                <label>Alt 1:</label>
                                <input type="url" class="form-control" name="galleryAlt0">
                            </div>
                        </div>
                        <div class="col-md-4" style="border: 1px solid;">
                            <div class="form-group">
                                <label>Image 2:</label>
                                <input type="url" class="form-control" name="galleryImage1">
                            </div>
                            <div class="form-group">
                                <label>Alt 2:</label>
                                <input type="url" class="form-control" name="galleryAlt1">
                            </div>
                        </div>
                        <div class="col-md-4" style="border: 1px solid;">
                            <div class="form-group">
                                <label>Image 3:</label>
                                <input type="url" class="form-control" name="galleryImage2">
                            </div>
                            <div class="form-group">
                                <label>Alt 3:</label>
                                <input type="url" class="form-control" name="galleryAlt2">
                            </div>
                        </div>
                    </div>

                </form>
            </div>

            <div class="modal-footer">
                <button type="button" id="input-json-logo" class="btn btn-primary">OK</button>
            </div>
        </div>
    </div>
</div>

<!-- Modal InputJson -->
<div class="modal fade" id="modalContentOffer" tabindex="-1" role="dialog" aria-labelledby="modalContentOfferLabel">
    <div class="modal-dialog modal-lg modal-xlg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title" id="modalContentOfferLabel">Offer Content: <span></span></h4>
            </div>
            <div class="modal-body">

                <div class="row">
                    <div class="col-xs-12">
                        <div class="form-group">
                            <label>Offer Header</label>
                            <input type="checkbox" id="offerText" />
                        </div>
                    </div>
                    <div class="col-xs-12">
                        <div class="form-group">
                            <label>Offer:</label>
                            <textarea id="offerBody" class="summernote"></textarea>
                        </div>
                    </div>
                </div>

            </div>

            <div class="modal-footer">
                <button type="button" id="input-json-offer" class="btn btn-primary">OK</button>
            </div>
        </div>
    </div>
</div>


<!-- Modal InputJson -->
<div class="modal fade" id="modalContentTandc" tabindex="-1" role="dialog" aria-labelledby="modalContentTandcLabel">
    <div class="modal-dialog modal-lg modal-xlg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title" id="modalContentTandcLabel">T and C Content: <span></span></h4>
            </div>
            <div class="modal-body">

                <div class="row">
                    <div class="col-xs-12">
                        <div class="form-group">
                            <label>T&C Url:</label>
                            <input type="text" class="form-control" name="tandcUrl" id="tandcUrl">
                        </div>
                    </div>
                    <div class="col-xs-12">
                        <div class="form-group">
                            <textarea id="tandcBody" class="summernote"></textarea>
                        </div>
                    </div>
                </div>

            </div>

            <div class="modal-footer">
                <button type="button" id="input-json-tandc" class="btn btn-primary">OK</button>
            </div>
        </div>
    </div>
</div>



<!-- Modal InputJson -->
<div class="modal fade" id="modalContentOther" tabindex="-1" role="dialog" aria-labelledby="modalContentOtherLabel">
    <div class="modal-dialog modal-lg modal-xlg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title" id="modalContentOtherLabel">Other Content: <span></span></h4>
            </div>
            <div class="modal-body">

                <div class="row">
                    <div class="col-xs-12">
                        <div class="form-group">
                            <label>hotelHighlight:</label>
                            <textarea id="hotelHighlight" class="summernote"></textarea>
                        </div>
                    </div>

                    <div class="col-xs-12">
                        <div class="form-group">
                            <label>extraBody:</label>
                            <textarea id="extraBody" class="summernote"></textarea>
                        </div>
                    </div>

                </div>

            </div>

            <div class="modal-footer">
                <button type="button" id="input-json-other" class="btn btn-primary">OK</button>
            </div>
        </div>
    </div>
</div>


<!-- Modal InputJson -->
<div class="modal fade" id="modalPreview" tabindex="-1" role="dialog" aria-labelledby="modalPreviewLabel">
    <div class="modal-dialog" role="document">
        <div class="modal-content">

            <div class="modal-header">
                <h4 class="modal-title" id="modalPreviewLabel">Select data</h4>
            </div>
            <div class="modal-body">

                <div class="row">
                    <div class="form-group col-xs-6">
                        <div class="form-group">
                            <label>Main</label>
                            <select name="main" id="previewMain" class="form-control">
                                <option value="">-- Select --</option>
                                <?php
                                $dir = getcwd() . "/data/";

                                // Open a directory, and read its contents
                                if (is_dir($dir)){
                                    if ($dh = opendir($dir)){
                                        while (($file = readdir($dh)) !== false){
                                            $ext = pathinfo($file, PATHINFO_EXTENSION);
                                            if($ext === 'json') {
                                                if($file === $data) {
                                                    echo '<option value="' . $file . '" selected>' . $file . '</option>';
                                                } else {
                                                    echo '<option value="' . $file . '">' . $file . '</option>';
                                                }
                                            }
                                        }
                                        closedir($dh);
                                    }
                                }

                                ?>
                            </select>
                        </div>
                    </div>
                    <div class="form-group col-xs-6">
                        <div class="form-group">
                            <label>Other</label>
                            <select name="other" id="previewOther" class="form-control">
                                <option value="">-- Select --</option>
                                <?php
                                $dir = getcwd() . "/data/";

                                // Open a directory, and read its contents
                                if (is_dir($dir)){
                                    if ($dh = opendir($dir)){
                                        while (($file = readdir($dh)) !== false){
                                            $ext = pathinfo($file, PATHINFO_EXTENSION);
                                            if($ext === 'json') {
                                                if(strpos($file, $dataArr[0]) >= 0){
                                                    echo '<option value="' . $file . '" style="display:none;">' . $file . '</option>';
                                                } else {
                                                    echo '<option value="' . $file . '">' . $file . '</option>';
                                                }
                                            }
                                        }
                                        closedir($dh);
                                    }
                                }

                                ?>
                            </select>
                        </div>
                    </div>

                    <div class="form-group col-xs-12">
                        <div class="form-group">
                            <label>Other</label>
                            <select name="other" id="previewLang" class="form-control">
                                <option value="en" <?= $dataArr[3] === 'en' ? 'selected' : '' ?>>English</option>
                                <option value="tc" <?= $dataArr[3] === 'tc' ? 'selected' : '' ?>>Traditional Chinese</option>
                                <option value="sc" <?= $dataArr[3] === 'sc' ? 'selected' : '' ?>>Simplified Chinese</option>
                            </select>
                        </div>
                    </div>
                </div>

            </div>
            <div class="modal-footer">
                <button type="button" id="preview" class="btn btn-primary">OK</button>
            </div>

        </div>
    </div>
</div>



<script src="//code.jquery.com/jquery-2.2.4.min.js" integrity="sha256-BbhdlvQf/xTY9gja0Dq3HiwQF8LaCRTXxZKRutelT44=" crossorigin="anonymous"></script>
<script src="//code.jquery.com/ui/1.12.0/jquery-ui.min.js" integrity="sha256-eGE6blurk5sHj+rmkfsGYeKyZx3M4bG+ZlFyA7Kns7E=" crossorigin="anonymous"></script>
<script src="//maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
<script src="js/bootstrap-ckeditor-modal-fix.js"></script>
<script src="ckeditor/ckeditor.js"></script>
<script src="ckeditor/adapters/jquery.js"></script>
<script src="js/jquery.hotkeys.js"></script>
<script src="js/main.js"></script>

<script>
    $('.to-top').click(function(e){
        var body = $("html, body");
        body.stop().animate({scrollTop:0}, '500', 'swing');
    });

</script>
</body>
</html>

