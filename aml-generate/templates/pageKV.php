<div class="col-xs-12">
    <?php if($contentPage->kvMobile) { ?>
    <figure class="hidden-xs hidden-sm"><img src="<?= process_image($contentPage->kvDesktop) ?>" alt="<?= strip_tags($contentPage->kvAlt) ?>" title="<?= strip_tags($contentPage->kvAlt) ?>" class="img-responsive" /></figure>
    <figure class="visible-xs visible-sm"><img src="<?= process_image($contentPage->kvMobile) ?>" alt="<?= strip_tags($contentPage->kvAlt) ?>" title="<?= strip_tags($contentPage->kvAlt) ?>" class="img-responsive" /></figure>
    <?php } else { ?>
    <figure><img src="<?= process_image($contentPage->kvDesktop) ?>" alt="<?= strip_tags($contentPage->kvAlt) ?>" title="<?= strip_tags($contentPage->kvAlt) ?>" class="img-responsive" /></figure>
    <?php } ?>
    <h3 class="text-center"><?= process_icon($contentPage->intro) ?></h3>
</div>