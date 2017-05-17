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

    <link rel="stylesheet" href="summernote/summernote.css"/>
    <link rel="stylesheet" href="css/main.css"/>

</head>
<body>

<div id="body-style" style="visibility: hidden; position: absolute; z-index: 1; max-width: 20px; overflow: hidden;"></div>

<div id="wrapper" class="site-wrapper">

    <!-- Page Content -->
    <div id="page-content-wrapper">
        <div class="header-top">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-md-6">
                        <div class="text-center clearfix">
                            <button type="button" id="ok" class="btn btn-primary">OK</button>

                            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#modalPreview">Preview</button>
                            <button type="button" class="btn btn-primary pull-left" data-toggle="modal" data-target="#modalLoadData">Load data</button>
                        </div>
                    </div>
                    <div class="col-md-6 text-right">
                        <input type="file" id="input-html" accept="text/html"/>

                        <button id="upload-html" class="btn btn-primary" type="button">
                            <span class="normal">Upload</span>
                            <span class="process"><i class="fa fa-refresh fa-spin"></i> Uploading</span>
                        </button>
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
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label>File Name</label>
                                                <input type="text" name="fileName" class="form-control" readonly="readonly" />
                                            </div>
                                        </div>

                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label>Default Image</label>
                                                <input type="text" name="defaultImage" class="form-control" />
                                            </div>
                                        </div><div class="col-md-6">
                                            <div class="form-group">
                                                <label>Default Url</label>
                                                <input type="text" name="defaultUrl" class="form-control" />
                                            </div>
                                        </div>

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
                                    <hr>
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
                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label>Logo</label>
                                                <input type="text" name="logo" class="form-control" />
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label>Logo Url</label>
                                                <input type="text" name="logoUrl" class="form-control" />
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
                                                <input type="text" name="ogDescription" class="form-control" />
                                            </div>
                                        </div>

                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label>od</label>
                                                <input type="text" name="od" class="form-control" />
                                            </div>
                                            <div class="form-group">
                                                <label>defaultPage</label>
                                                <input type="text" name="defaultPage" class="form-control" readonly="readonly" />
                                            </div>
                                        </div>
                                    </div>

                                    <hr>
                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label>kvDesktop</label>
                                                <input type="text" name="kvDesktop" class="form-control" />
                                            </div>
                                            <div class="form-group">
                                                <label>kvMobile</label>
                                                <input type="text" name="kvMobile" class="form-control" />
                                            </div>
                                            <div class="form-group">
                                                <label>kvAlt</label>
                                                <input type="text" name="kvAlt" class="form-control" />
                                            </div>
                                            <div class="form-group">
                                                <label>intro</label>
                                                <textarea name="intro" class="form-control"></textarea>
                                            </div>
                                        </div>

                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label>before qr</label>
                                                <input type="text" name="beforeQr" class="form-control" />
                                            </div>
                                            <div class="form-group">
                                                <label>qr code</label>
                                                <input type="text" name="qrCode" class="form-control" />
                                            </div>
                                            <div class="form-group">
                                                <label>after qr</label>
                                                <input type="text" name="afterQr" class="form-control" />
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
                                <input type="text" name="prefix" class="form-control">
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

                <div class="panel-body panel-body--section list-group">

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
                        <button type="button" class="edit-item btn btn-sm btn-info">Edit</button>
                        <input type="hidden" class="data-item" />
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="text-center">
                        <h4 class="note"></h4>
                        <button type="button" class="edit-item btn btn-sm btn-info">Edit</button>
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
                        <button type="button" class="edit-item btn btn-sm btn-info">Edit</button>
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

<!-- Modal Face -->
<div class="modal fade" id="modalContent" tabindex="-1" role="dialog" aria-labelledby="modalContentLabel">
    <div class="modal-dialog modal-lg modal-xlg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title" id="modalContentLabel">Content type</h4>
            </div>
            <div class="modal-body">
                <form id="form-item">
                    <div class="row">
                        <div class="form-group col-xs-12">
                            <select name="template" class="form-control">
                                <option value="contentExpansion">Expansion</option>
                                <option value="contentNoExpansion">No Expansion</option>
                            </select>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-7">
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
                            <hr>
                            <div class="row">
                                <div class="form-group col-xs-12">
                                    <label>KV Desktop:</label>
                                    <input type="text" class="form-control" name="imageDesktop">
                                </div>
                                <div class="form-group col-xs-12">
                                    <label>KV Mobile:</label>
                                    <input type="text" class="form-control" name="imageMobile">
                                </div>
                            </div>
                        </div>
                        <div class="col-md-5">

                            <div class="show-no-expansion" style="display: none;">
                                <h4>No expansion</h4>
                                <div class="row">
                                    <div class="form-group col-xs-12">
                                        <label>External Link:</label>
                                        <input type="url" class="form-control" name="externalLink">
                                    </div>
                                </div>
                            </div>

                            <div class="show-expansion">
                                <h4>Expansion</h4>
                                <div class="row">
                                    <div class="form-group col-xs-12">
                                        <label>Logo:</label>
                                        <input type="text" class="form-control" name="logo">
                                    </div>
                                    <div class="form-group col-xs-12">
                                        <label>Logo url:</label>
                                        <input type="url" class="form-control" name="logoUrl">
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="form-group col-xs-12">
                                        <label>Period:</label>
                                        <div id="period" class="summernote"></div>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="row">
                                            <div class="form-group col-xs-12">
                                                <label>CTA:</label>
                                                <input type="text" class="form-control" name="cta">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="row">
                                            <div class="form-group col-xs-12">
                                                <label>CTA Url:</label>
                                                <input type="text" class="form-control" name="ctaUrl">
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <hr>
                    <div class="show-expansion">
                        <h4>Expansion</h4>

                        <div class="row">
                            <div class="col-sm-8">
                                <div class="row">
                                    <div class="form-group col-xs-12">
                                        <label>Offer & How to join:</label>
                                        <div id="offerBody" class="summernote">
                                            <h5>Offer</h5>
                                            <ol>
                                                <li>Offer 1</li>
                                            </ol>
                                            <h5>How to join:</h5>
                                            <ol>
                                                <li>Step 1</li>
                                            </ol>
                                        </div>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="form-group col-xs-12">
                                        <label>T&C Url:</label>
                                        <input type="text" class="form-control" name="tandcUrl">
                                    </div>
                                    <div class="form-group col-xs-12">
                                        <label>Terms & Conditions:</label>
                                        <div id="tandcBody" class="summernote">
                                            <ol>
                                                <li>Term 1</li>
                                            </ol>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="col-sm-4">
                                <div class="row">
                                    <div class="form-group col-xs-12">
                                        <label>Image 1:</label>
                                        <input type="url" class="form-control" name="galleryImage0">
                                    </div>
                                    <div class="form-group col-xs-12">
                                        <label>Alt 1:</label>
                                        <input type="url" class="form-control" name="galleryAlt0">
                                    </div>
                                    <hr>
                                    <div class="form-group col-xs-12">
                                        <label>Image 2:</label>
                                        <input type="url" class="form-control" name="galleryImage1">
                                    </div>
                                    <div class="form-group col-xs-12">
                                        <label>Alt 2:</label>
                                        <input type="url" class="form-control" name="galleryAlt1">
                                    </div>
                                    <hr>
                                    <div class="form-group col-xs-12">
                                        <label>Image 3:</label>
                                        <input type="url" class="form-control" name="galleryImage2">
                                    </div>
                                    <div class="form-group col-xs-12">
                                        <label>Alt 3:</label>
                                        <input type="url" class="form-control" name="galleryAlt2">
                                    </div>
                                    <hr>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="form-group col-xs-12">
                                <label>Hotel highlight:</label>
                                <div id="hotelHighlight" class="summernote">

                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="form-group col-xs-12">
                                <label>Extra Body below CTA:</label>
                                <div id="extraBody" class="summernote"></div>
                            </div>
                        </div>

                    </div>

                </form>
            </div>
            <div class="modal-footer">
                <button type="button" id="ok-item" class="btn btn-primary">OK</button>
            </div>
        </div>
    </div>
</div>

<!-- Modal InputJson -->
<div class="modal fade" id="modalInputJson" tabindex="-1" role="dialog" aria-labelledby="modalInputJsonLabel">
    <div class="modal-dialog modal-lg modal-xlg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title" id="modalInputJsonLabel">Content type</h4>
            </div>
            <div class="modal-body">

                <div class="row">
                    <div class="form-group col-xs-12">
                        <textarea name="inputJson" class="form-control" rows="20">JSON format</textarea>
                    </div>
                </div>

            </div>
            <div class="modal-footer">
                <button type="button" id="input-json" class="btn btn-primary">OK</button>
            </div>
        </div>
    </div>
</div>

<!-- Modal InputJson -->
<div class="modal fade" id="modalLoadData" tabindex="-1" role="dialog" aria-labelledby="modalLoadDataLabel">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title" id="modalLoadDataLabel">Select data</h4>
            </div>
            <div class="modal-body">

                <div class="row">
                    <div class="form-group col-xs-12">
                        <select name="selectData" id="selectData" class="form-control">
                            <option value="">-- Select --</option>
                            <?php
                            $dir = getcwd() . "/data/";

                            // Open a directory, and read its contents
                            if (is_dir($dir)){
                                if ($dh = opendir($dir)){
                                    while (($file = readdir($dh)) !== false){
                                        $ext = pathinfo($file, PATHINFO_EXTENSION);
                                        if($ext === 'json') {
                                            echo '<option value="' . $file . '">' . $file . '</option>';
                                        }
                                    }
                                    closedir($dh);
                                }
                            }

                            ?>
                        </select>
                    </div>
                </div>

            </div>
            <div class="modal-footer">
                <button type="button" id="fill" class="btn btn-primary">OK</button>
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
                                                echo '<option value="' . $file . '">' . $file . '</option>';
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
                            <select name="other" id="previewOther" class="form-control" disabled="disabled">
                                <option value="">-- Select --</option>
                                <?php
                                $dir = getcwd() . "/data/";

                                // Open a directory, and read its contents
                                if (is_dir($dir)){
                                    if ($dh = opendir($dir)){
                                        while (($file = readdir($dh)) !== false){
                                            $ext = pathinfo($file, PATHINFO_EXTENSION);
                                            if($ext === 'json') {
                                                echo '<option value="' . $file . '">' . $file . '</option>';
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
                                <option value="en">English</option>
                                <option value="tc">Traditional Chinese</option>
                                <option value="sc">Simplified Chinese</option>
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
<script src="summernote/summernote.min.js"></script>
<script src="js/jquery.hotkeys.js"></script>
<script src="js/main.js"></script>

<script>
    $("#menu-toggle").click(function(e) {
        e.preventDefault();
        $("#wrapper").toggleClass("toggled");
    });
    $('.to-top').click(function(e){
        var body = $("html, body");
        body.stop().animate({scrollTop:0}, '500', 'swing');
    });

</script>
</body>
</html>

