(function () {
    var el = document.getElementById('typewriter');
    if (!el) return;
    var phrases = [
        'Software & Product Engineer',
        'Android Developer',
        'iOS App Maker',
        'Kotlin Enthusiast',
        'Indie App Creator',
        'Lead Product Engineer at MWM',
        'Sport & Tech Lover',
        'Builder of Radar Apps ⚾️',
        'Tennis Player 🎾',
        'French 🇫🇷',
        'Lover of my Job at MWM',
        'Building my server',
        'Building my "Google Drive" perso',
        'Working on ColorPop 🎨 1M+ downloads',
        'Working with great people'
    ];
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    var last = -1;
    function pick() {
        var i;
        do { i = Math.floor(Math.random() * phrases.length); } while (i === last);
        last = i;
        return phrases[i];
    }

    var pill = el.closest('h5');

    // Width of the pill once `phrase` is fully typed (measured without transition).
    function fullWidth(phrase) {
        var prevText = el.textContent, prevWidth = pill.style.width, prevTr = pill.style.transition;
        pill.style.transition = 'none';
        pill.style.width = 'auto';
        el.textContent = phrase;
        var w = pill.getBoundingClientRect().width;
        el.textContent = prevText;
        pill.style.width = prevWidth;
        pill.offsetWidth; // force reflow
        pill.style.transition = prevTr;
        return w;
    }

    // Morph the pill to the next phrase's width once, instead of resizing on every character.
    function morphTo(phrase) {
        if (!pill) return;
        pill.style.width = fullWidth(phrase) + 'px';
    }

    if (pill) {
        pill.classList.add('typewriter-pill');
        pill.style.width = pill.getBoundingClientRect().width + 'px';
        // Re-measure (text + cursor) once web fonts are loaded, since they change the text width.
        if (document.fonts && document.fonts.ready) {
            document.fonts.ready.then(function () {
                var prevTr = pill.style.transition;
                pill.style.transition = 'none';
                pill.style.width = fullWidth(el.textContent) + 'px';
                pill.offsetWidth; // force reflow
                pill.style.transition = prevTr;
            });
        }
    }

    var text = el.textContent;
    var current = pick();
    var pos = 0, deleting = false;
    // Start by erasing the SEO-friendly default text, then type random phrases.
    current = text; pos = text.length; deleting = true;

    function tick() {
        pos += deleting ? -1 : 1;
        el.textContent = current.substring(0, pos);
        var delay = deleting ? 12 : 60 + Math.random() * 50;
        if (!deleting && pos === current.length) {
            deleting = true; delay = 1800;
        } else if (deleting && pos === 0) {
            deleting = false; current = pick(); morphTo(current); delay = 600;
        }
        setTimeout(tick, delay);
    }
    setTimeout(tick, 2000);
})();
