<div id="<?= $contentSection->id ?>">

    <div class="col-xs-12" id="<?= $keyPage. '-section-'.($indexSection+1) ?>">
        <div class="title-separator"><span>
                <div class="circle-earn <?= LANG ?>"><?= $contentSection->prefix ?></div>
                <?= $contentSection->name ?></span></div>
    </div>

    <?php
    foreach ($contentSection->rows as $indexRow => $contentRow) {
        require('' . $contentRow->template . '.php');
    }
    ?>

</div>