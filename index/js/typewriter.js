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
            deleting = false; current = pick(); delay = 400;
        }
        setTimeout(tick, delay);
    }
    setTimeout(tick, 2000);
})();
