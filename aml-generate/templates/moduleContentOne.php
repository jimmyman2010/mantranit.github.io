    <div class="col-xs-12 text-center">

        <?php
        $item = $contentRow->data[0];
        $indexBox++;
        $positionItem++;
        require($item->template . '.php');
        ?>

        <div class="offer-detail-mobile" id="<?= $keyPage.'-m-box-'.($indexSection+1).'-'.$positionItem ?>"></div>
    </div>
    <div class="col-xs-12">
        <div class="offer-detail-desktop" id="<?= $keyPage.'-d-box-'.($indexSection+1).'-'.$positionItem ?>"></div>
    </div>
