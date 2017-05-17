
<div id="<?= $keyPage.'-content-'.($indexSection+1).'-'.$positionItem ?>">

    <div class="row">
        <div class="col-md-8">
            <?= $item->offerBody ?>

            <?php if($item->tandcUrl) { ?>
                <p><a class="link-tnc-no-expand" target="_blank" href="<?= $item->tandcUrl ?>"><?= TANDC ?> <?= MORE ?></a></p>
            <?php } ?>
            <?php if($item->tandcBody) { ?>
                <p><a class="link-tnc" href="#"><?= TANDC ?> <?= MORE ?></a></p>
                <div class="offer-tnc">
                    <?= $item->tandcBody ?>
                </div>
            <?php } ?>

            <?php if($item->cta) { ?>
                <p class="text-center"><a class="btn-aml" id="<?= $keyPage.'-en-cta'.($indexBox >= 10 ? $indexBox : '0'.$indexBox) ?>" href="<?= $item->ctaUrl ?>" target="_blank"><?= $item->cta ?></a></p>
            <?php } ?>

            <?php if($item->hotelHighlight) { ?>
                <h5 class="hidden-xs hidden-sm"><?= HOTEL_HIGHLIGHT ?></h5>
                <h5 class="title-offer-hl visible-xs visible-sm" data-offer-id="<?= $keyPage.'-en-box'.($indexBox >= 10 ? $indexBox : '0'.$indexBox) ?>"><?= HOTEL_HIGHLIGHT ?> <?= MORE ?></h5>
                <div class="offer-hl">
                    <?= $item->hotelHighlight ?>
                </div>
            <?php } ?>

            <?php if($item->extraBody) { ?>
                <?= $item->extraBody ?>
            <?php } ?>
        </div>
        <div class="col-md-4 pull-right-md hidden-xs hidden-sm">
            <div class="btn-close" data-target="<?= $keyPage.'-en-box'.($indexBox >= 10 ? $indexBox : '0'.$indexBox) ?>"><?= CLOSE ?></div>
        </div>
    </div>
    <div class="row">
        <div class="col-xs-12 text-center visible-xs visible-sm">
            <div class="btn-close" data-target="<?= $keyPage.'-en-box'.($indexBox >= 10 ? $indexBox : '0'.$indexBox) ?>"><?= CLOSE ?></div>
        </div>
    </div>
</div>
