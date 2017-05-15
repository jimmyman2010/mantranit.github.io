
<div class="offer-item-no-expand" id="<?= $keyPage.'-en-box'.($indexBox >= 10 ? $indexBox : '0'.$indexBox) ?>">
    <a href="<?= $item->externalLink ?>" target="_blank" title="<?= strip_tags($item->headline) ?>"> </a>
    <div class="offer-item-image">
        <figure class="hidden-xs hidden-sm"><img data-src="<?= $item->imageDesktop ?>" alt="<?= strip_tags($item->headline) ?>" src="<?= $siteData->logo ?>" class="img-responsive"></figure>
        <figure class="visible-xs visible-sm"><img data-src="<?= $item->imageMobile ? $item->imageMobile : $item->imageDesktop ?>" src="<?= $siteData->logo ?>" alt="<?= strip_tags($item->headline) ?>" class="img-responsive"></figure>
    </div>
    <?php if($item->brandName) { ?>
    <p><?= $item->brandName ?></p>
    <?php } ?>
    <h4><?= $item->headline ?></h4>
    <p><?= $item->leadIn ?> <span class="aml-text-yellow">&gt; more</span></p>
    <?php if($item->tip) { ?>
    <h6><span><?= $item->tip ?></span></h6>
    <?php } ?>
</div>
