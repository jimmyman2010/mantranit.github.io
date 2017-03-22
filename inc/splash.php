<header class="intro" id="container">
    <div class="quotearea">
        <a href="<?= $base ?>/quotes/<?= $dataQuotes[$quoteIndex]['slug'] ?>">
            <img src="<?= $base ?>/images/author/<?= slugify($dataQuotes[$quoteIndex]['author']) ?>.jpg" alt="<?= $dataQuotes[$quoteIndex]['author'] ?>" />
        </a>
        <div><span class="quote">&#8220;<?= $dataQuotes[$quoteIndex]['quote'] ?>&#8221;</span>
            <span class="external">
                <a href="http://en.wikipedia.org/wiki/<?= $dataQuotes[$quoteIndex]['author'] ?>" target="_blank">
                    &#8212; <span class="author"><?= $dataQuotes[$quoteIndex]['author'] ?></span> &#8212;
                </a>
            </span>
            <!-- Go to www.addthis.com/dashboard to customize your tools -->
            <div class="addthis_sharing_toolbox" data-url="<?= $base ?>/quotes/<?= $dataQuotes[$quoteIndex]['slug'] ?>" data-title="<?= $dataQuotes[$quoteIndex]['quote'] ?> - <?= $dataQuotes[$quoteIndex]['author'] ?>"></div>
        </div>
    </div>
    <button type="button" class="trigger" title="Guess what?" style="display: none">
        <svg width="100%" height="100%" viewBox="0 0 60 60" preserveAspectRatio="none">
            <g class="icon icon-grid">
                <rect x="32.5" y="5.5" width="22" height="22"/>
                <rect x="4.5" y="5.5" width="22" height="22"/>
                <rect x="32.5" y="33.5" width="22" height="22"/>
                <rect x="4.5" y="33.5" width="22" height="22"/>
            </g>
            <g class="icon icon-cross">
                <line x1="4.5" y1="55.5" x2="54.953" y2="5.046"/>
                <line x1="54.953" y1="55.5" x2="4.5" y2="5.047"/>
            </g>
        </svg>
    </button>
</header>