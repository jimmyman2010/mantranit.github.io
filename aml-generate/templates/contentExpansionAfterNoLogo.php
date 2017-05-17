
<div id="<?= $keyPage.'-content-'.($indexSection+1).'-'.$positionItem ?>">

    <div class="row">
        <div class="col-md-8">
            <?= $item->offerBody ?>

            <?php if($item->tandcUrl) { ?>
                <p><a class="link-tnc-no-expand" target="_blank" href="<?= $item->tandcUrl ?>">Terms &amp; Conditions <span class="aml-text-yellow">&gt; more</span></a></p>
            <?php } ?>
            <?php if($item->tandcBody && $item->tandcBody != '<p><br></p>' && $item->tandcBody != '<div><br></div>') { ?>
                <p><a class="link-tnc" href="#">Terms &amp; Conditions <span class="aml-text-yellow">&gt; more</span></a></p>
                <div class="offer-tnc">
                    <?= $item->tandcBody ?>
                </div>
            <?php } ?>

            <?php if($item->cta) { ?>
                <p class="text-center"><a class="btn-aml" id="<?= $keyPage.'-en-cta'.($indexBox >= 10 ? $indexBox : '0'.$indexBox) ?>" href="<?= $item->ctaUrl ?>" target="_blank"><?= $item->cta ?></a></p>
            <?php } ?>

            <?php if($item->hotelHighlight && $item->hotelHighlight != '<p><br></p>' && $item->hotelHighlight != '<div><br></div>') { ?>
                <h5 class="hidden-xs hidden-sm">Hotel Highlight</h5>
                <h5 class="title-offer-hl visible-xs visible-sm" data-offer-id="<?= $keyPage.'-en-box'.($indexBox >= 10 ? $indexBox : '0'.$indexBox) ?>">Hotel Highlight <span class="aml-text-yellow">&gt; more</span></h5>
                <div class="offer-hl">
                    <?= $item->hotelHighlight ?>
                </div>
            <?php } ?>

            <?php if($item->extraBody && $item->extraBody != '<p><br></p>' && $item->extraBody != '<div><br></div>') { ?>
                <?= $item->extraBody ?>
            <?php } ?>
        </div>
        <div class="col-md-4 pull-right-md hidden-xs hidden-sm">
            <div class="btn-close" data-target="<?= $keyPage.'-en-box'.($indexBox >= 10 ? $indexBox : '0'.$indexBox) ?>">Close To View Other Offers</div>
        </div>
    </div>
    <div class="row">
        <div class="col-xs-12 text-center visible-xs visible-sm">
            <div class="btn-close" data-target="<?= $keyPage.'-en-box'.($indexBox >= 10 ? $indexBox : '0'.$indexBox) ?>">Close To View Other Offers</div>
        </div>
    </div>
</div>
