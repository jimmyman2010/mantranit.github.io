
    <div class="col-xs-12 col-md-6 text-center">
        <?php
        $item = $contentRow->data[0];
        $indexBox++;
        $positionItem++;
        require($item->template . '.php');
        ?>
        <?php if($item->template !== 'contentNoExpansion') { ?>
        <div class="offer-detail-mobile" id="<?= $keyPage.'-m-box-'.($indexSection+1).'-'.$positionItem ?>"></div>
        <?php } ?>
    </div>
    <div class="col-xs-12 col-md-6 text-center">
        <?php
        $item = $contentRow->data[1];
        $indexBox++;
        $positionItem++;
        require($item->template . '.php');
        ?>
        <?php if($item->template !== 'contentNoExpansion') { ?>
        <div class="offer-detail-mobile" id="<?= $keyPage.'-m-box-'.($indexSection+1).'-'.$positionItem ?>"></div>
        <?php } ?>
    </div>
    <div class="col-xs-12">
        <?php $item = $contentRow->data[0]; ?>
        <?php if($item->template !== 'contentNoExpansion') { ?>
        <?php $positionItem--; ?>
        <div class="offer-detail-desktop left" id="<?= $keyPage.'-d-box-'.($indexSection+1).'-'.$positionItem ?>"></div>
        <?php } ?>

        <?php $item = $contentRow->data[1]; ?>
        <?php if($item->template !== 'contentNoExpansion') { ?>
        <?php $positionItem++; ?>
        <div class="offer-detail-desktop right" id="<?= $keyPage.'-d-box-'.($indexSection+1).'-'.$positionItem ?>"></div>
        <?php } ?>
    </div>
