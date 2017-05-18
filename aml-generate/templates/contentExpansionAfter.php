
<div id="<?= $keyPage.'-content-'.($indexSection+1).'-'.$positionItem ?>">
    <div class="row">
        <div class="col-xs-12 col-md-10 text-center-xs">
            <ul class="offer-logo list-inline list-unstyled">
                <?php if($item->logo) { ?>
                <li<?php if(!($item->period && ($item->period && count($item->period) > 0))) { echo ' style="border: none;"'; } ?>>
                    <?php if($item->logoUrl) { ?>
                    <a target="_blank" href="<?= $item->logoUrl ?>" title="<?= strip_tags($item->brandName) ?>">
                    <?php } ?>
                        <img alt="<?= strip_tags($item->brandName) ?>" data-src="<?= process_image($item->logo) ?>" src="<?= process_image($siteData->logo) ?>" class="img-responsive brand-logo" />
                    <?php if($item->logoUrl) { ?>
                    </a>
                    <?php } ?>
                </li>
                <?php } ?>

                <?php if($item->period && ($item->period && count($item->period) > 0)) { ?>
                <li<?php if(!$item->logo) { echo ' style="max-width: none; border: none;"'; } ?>>
                    <?php foreach($item->period as $iR => $range) { ?>
                        <?php if($iR > 0) { ?>
                            <br><br class="visible-xs visible-sm">
                        <?php } ?>
                        <strong><?= $range->name ?>:</strong>
                        <br class="visible-xs visible-sm">
                        <?= process_icon($range->value) ?>
                    <?php } ?>
                </li>
                <?php } ?>
            </ul>
        </div>
        <div class="col-md-2 text-right hidden-xs hidden-sm">
            <div class="btn-close" data-target="<?= $keyPage.'-en-box'.($indexBox >= 10 ? $indexBox : '0'.$indexBox) ?>"><?= CLOSE ?></div>
        </div>
    </div>
    <div class="row">
        <div class="col-md-8">
            <?= process_icon($item->offerBody) ?>

            <?php if($item->tandcUrl) { ?>
            <p><a class="link-tnc-no-expand" target="_blank" href="<?= $item->tandcUrl ?>"><?= TANDC ?> <?= MORE ?></a></p>
            <?php } ?>
            <?php if($item->tandcBody && $item->tandcBody != '<p><br></p>' && $item->tandcBody != '<div><br></div>') { ?>
            <p><a class="link-tnc" href="#"><?= TANDC ?> <?= MORE ?></a></p>
            <div class="offer-tnc">
                <?= process_icon($item->tandcBody) ?>
            </div>
            <?php } ?>

            <?php if($item->cta) { ?>
            <p class="text-center"><a class="btn-aml" id="<?= $keyPage.'-en-cta'.($indexBox >= 10 ? $indexBox : '0'.$indexBox) ?>" href="<?= $item->ctaUrl ?>" target="_blank"><?= $item->cta ?></a></p>
            <?php } ?>

            <?php if($item->hotelHighlight && $item->hotelHighlight != '<p><br></p>' && $item->hotelHighlight != '<div><br></div>') { ?>
            <h5 class="hidden-xs hidden-sm"><?= HOTEL_HIGHLIGHT ?></h5>
            <h5 class="title-offer-hl visible-xs visible-sm" data-offer-id="<?= $keyPage.'-en-box'.($indexBox >= 10 ? $indexBox : '0'.$indexBox) ?>"><?= HOTEL_HIGHLIGHT ?> <?= MORE ?></h5>
            <div class="offer-hl">
                <?= process_icon($item->hotelHighlight) ?>
            </div>
            <?php } ?>

            <?php if($item->extraBody && $item->extraBody != '<p><br></p>' && $item->extraBody != '<div><br></div>') { ?>
                <?= process_icon($item->extraBody) ?>
            <?php } ?>
        </div>
        <?php if(is_array($item->gallery) && count($item->gallery) > 0) { ?>
        <div class="col-md-4 pull-right-md">
            <ul class="list-unstyled offer-gallery">
                <?php
                foreach ($item->gallery as $image) {
                    echo '<li><img data-src="'.process_image($image->src).'" src="'.process_image($siteData->logo).'" alt="' . ($image->alt ? strip_tags($image->alt) : strip_tags($item->brandName)) . '" title="' . ($image->alt ? strip_tags($image->alt) : strip_tags($item->brandName)) . '" class="img-responsive"></li>';
                }

                ?>
            </ul>
        </div>
        <?php } ?>
        <div class="col-xs-12 text-center visible-xs visible-sm">
            <div class="btn-close" data-target="<?= $keyPage.'-en-box'.($indexBox >= 10 ? $indexBox : '0'.$indexBox) ?>"><?= CLOSE ?></div>
        </div>
    </div>
</div>
