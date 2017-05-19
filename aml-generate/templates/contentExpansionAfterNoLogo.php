<div id="<?= $keyPage.'-content-'.($indexSection+1).'-'.$positionItem ?>">

    <div class="row">
        <div class="col-md-9">
            <?php if(property_exists($item, 'offerText') && $item->offerText) { ?>
            <h5><?= OFFER ?></h5>
            <?php } ?>
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
                <p class="text-center"><a class="btn-aml" id="<?= $keyPage.'-'.LANG.'-cta'.($indexBox >= 10 ? $indexBox : '0'.$indexBox) ?>" href="<?= $item->ctaUrl ?>" target="_blank"><?= $item->cta ?></a></p>
            <?php } ?>
            <?php if(property_exists($item, 'hotelHighlight') && $item->hotelHighlight && $item->hotelHighlight != '<p><br></p>' && $item->hotelHighlight != '<div><br></div>') { ?>
                <h5 class="hidden-xs hidden-sm"><?= HOTEL_HIGHLIGHT ?></h5>
                <h5 class="title-offer-hl visible-xs visible-sm" data-offer-id="<?= $keyPage.'-'.LANG.'-box'.($indexBox >= 10 ? $indexBox : '0'.$indexBox) ?>"><?= HOTEL_HIGHLIGHT ?> <?= MORE ?></h5>
                <div class="offer-hl">
                    <?= process_icon($item->hotelHighlight) ?>
                </div>
            <?php } ?>
            <?php if(property_exists($item, 'extraBody') && $item->extraBody && $item->extraBody != '<p><br></p>' && $item->extraBody != '<div><br></div>') { ?>
                <?= process_icon($item->extraBody) ?>
            <?php } ?>
        </div>
        <div class="col-md-3 pull-right-md hidden-xs hidden-sm">
            <div class="btn-close" data-target="<?= $keyPage.'-'.LANG.'-box'.($indexBox >= 10 ? $indexBox : '0'.$indexBox) ?>"><?= CLOSE ?></div>
        </div>
    </div>
    <div class="row">
        <div class="col-xs-12 text-center visible-xs visible-sm">
            <div class="btn-close" data-target="<?= $keyPage.'-'.LANG.'-box'.($indexBox >= 10 ? $indexBox : '0'.$indexBox) ?>"><?= CLOSE ?></div>
        </div>
    </div>
</div>
