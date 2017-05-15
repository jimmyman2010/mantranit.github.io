<div class="col-xs-12">
    <figure class="hidden-xs hidden-sm"><img src="<?= $contentPage->kvDesktop ?>" alt="<?= $contentPage->kvAlt ?>" title="<?= $contentPage->kvAlt ?>" class="img-responsive" /></figure>
    <figure class="visible-xs visible-sm"><img src="<?= $contentPage->kvMobile ? $contentPage->kvMobile : $contentPage->kvDesktop ?>" alt="<?= $contentPage->kvAlt ?>" title="<?= $contentPage->kvAlt ?>" class="img-responsive" /></figure>
    <h3 class="text-center"><?= $contentPage->intro ?></h3>
</div>