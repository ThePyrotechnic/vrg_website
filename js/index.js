const VRCHAT_PREFIX = 'vrchat://launch?ref=vrchat&id=';

function worldClicked(world) {
    let win = window.open(world.getAttribute('data-url'), '_blank');
    if (win)
        win.focus();
}

function darkModeToggle() {
    document.body.classList.toggle('body-dark');
    let btns = document.getElementsByClassName('btn');
    for (let a = 0; a < btns.length; a++)
        btns[a].classList.toggle('btn-dark');
    let titles = document.getElementsByClassName('title-text');
    for (let a = 0; a < titles.length; a++)
        titles[a].classList.toggle('title-text-dark');
    lightbulb = document.getElementById('dark-mode');
    lightbulb.setAttribute('src', (lightbulb.getAttribute('src') === 'svg/off-24px.svg') ? 'svg/on-24px.svg' : 'svg/off-24px.svg');
}

function loadJSON(file_path, callback) {
    let req = new XMLHttpRequest();
    req.overrideMimeType("application/json");
    req.open('GET', file_path, true);
    req.onreadystatechange = function () {
        if (req.readyState === 4 && req.status === 200) {
            callback(JSON.parse(req.responseText));
        }
    };
    req.send(null);
}

function parseWorlds(json) {
    let world_dict = {};
    let world_config = json["worlds"];
    for (let category in world_config) {
        if (!world_dict.hasOwnProperty(category)) world_dict[category] = [];

        for (let world in world_config[category]) {
            let world_data = world_config[category][world];
            let new_btn = document.createElement('button');
            new_btn.setAttribute('class', 'btn');
            new_btn.setAttribute('onClick', 'worldClicked(this)');
            new_btn.setAttribute('data-url',(world_data.hasOwnProperty('world_id')) ? VRCHAT_PREFIX + world_data['world_id'] : VRCHAT_PREFIX +  "unknown_id");

            let world_name = (world_data.hasOwnProperty('name')) ? world_data['name'] : 'Unnamed World';
            let world_author = (world_data.hasOwnProperty('author')) ? " - " + world_data['author'] : " - Anonymous";
            let world_thumb = (world_data.hasOwnProperty('thumbnail')) ? 'thumbnails/' + world_data['thumbnail'] : 'thumbnails/placeholder.png';

            new_btn.innerHTML += '<img src="' + world_thumb + '" class="thumbnail"><span class="label">' + world_name + world_author + '</span>';

            world_dict[category].push(new_btn);
        }
    }
    return world_dict;
}

function worldsJSONReady(json) {
    let world_dict = parseWorlds(json);
    for (let category in world_dict) {
        document.body.innerHTML +=
            '<div class="title-container">' +
            '<span class="title-text">' + category + '</span>' +
            '</div>' +
            '<div id="' + category + '-button-area" class="button-area flex-column">' +
            '</div>';
        let btn_area = document.getElementById(category + '-button-area');
        for (let world in world_dict[category]) {
            btn_area.appendChild(world_dict[category][world]);
        }
    }
}

document.addEventListener('DOMContentLoaded', function (event) {
    loadJSON('config.json', worldsJSONReady);
});
