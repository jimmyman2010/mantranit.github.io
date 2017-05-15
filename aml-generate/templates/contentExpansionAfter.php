
<div id="<?= $keyPage.'-content-'.($indexSection+1).'-'.$positionItem ?>">
    <div class="row">
        <div class="col-xs-12 col-md-10 text-center-xs">
            <ul class="offer-logo list-inline list-unstyled">
                <?php if($item->logo) { ?>
                <li<?php if(!$item->period) { echo ' style="border: none;"'; } ?>>
                    <?php if($item->logoUrl) { ?>
                    <a target="_blank" href="<?= $item->logoUrl ?>" title="<?= strip_tags($item->brandName) ?>">
                    <?php } ?>
                        <img alt="<?= strip_tags($item->brandName) ?>" data-src="<?= $item->logo ?>" src="<?= $siteData->logo ?>" class="img-responsive" />
                    <?php if($item->logoUrl) { ?>
                    </a>
                    <?php } ?>
                </li>
                <?php } ?>

                <?php if($item->period) { ?>
                <li<?php if(!$item->logo) { echo ' style="max-width: none; border: none;"'; } ?>><?= $item->period ?></li>
                <?php } ?>
            </ul>
        </div>
        <div class="col-md-2 text-right hidden-xs hidden-sm">
            <div class="btn-close" data-target="<?= $keyPage.'-en-box'.($indexBox >= 10 ? $indexBox : '0'.$indexBox) ?>">Close To View Other Offers</div>
        </div>
    </div>
    <div class="row">
        <div class="col-md-8">
            <?= $item->offerBody ?>

            <p><a class="link-tnc" href="#">Terms &amp; Conditions <span class="aml-text-yellow">&gt; more</span></a></p>
            <div class="offer-tnc">
                <?= $item->tandcBody ?>
            </div>
            <?php if($item->cta) { ?>
            <p class="text-center"><a class="btn-aml" id="<?= $keyPage.'-en-cta'.($indexBox >= 10 ? $indexBox : '0'.$indexBox) ?>" href="<?= $item->ctaUrl ?>" target="_blank"><?= $item->cta ?></a></p>
            <?php } ?>

            <?php if($item->hotelHighlight) { ?>
            <h5 class="hidden-xs hidden-sm">Hotel Highlight</h5>
            <h5 class="title-offer-hl visible-xs visible-sm">Hotel Highlight <span class="aml-text-yellow">&gt; more</span></h5>
            <div class="offer-hl">
                <?= $item->hotelHighlight ?>
            </div>
            <?php } ?>

            <?php if($item->extraBody) { ?>
                <?= $item->extraBody ?>
            <?php } ?>
        </div>
        <?php if(is_array($item->gallery) && count($item->gallery) > 0) { ?>
        <div class="col-md-4 pull-right-md">
            <ul class="list-unstyled offer-gallery">
                <?php
                foreach ($item->gallery as $image) {
                    echo '<li><img data-src="'.$image.'" src="'.$siteData->logo.'" alt="'.strip_tags($item->brandName).'" title="'.strip_tags($item->brandName).'" class="img-responsive"></li>';
                }

                ?>
            </ul>
        </div>
        <?php } ?>
        <div class="col-xs-12 text-center visible-xs visible-sm">
            <div class="btn-close" data-target="<?= $keyPage.'-en-box'.($indexBox >= 10 ? $indexBox : '0'.$indexBox) ?>">Close To View Other Offers</div>
        </div>
    </div>
</div>
