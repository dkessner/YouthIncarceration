let img;

let label_positions = [
    {name: "Devonshire", x:120, y:80},
    {name: "Foothill", x:277, y:88},
    {name: "West Valley", x:82, y:171},
    {name: "Van Nuys", x:186, y:167},
    {name: "North Hollywood", x:257, y:167},
    {name: "West Los Angeles", x:149, y:277},
    {name: "Hollywood", x:306, y:264},
    {name: "Northeast", x:405, y:265},
    {name: "Wilshire", x:306, y:318},
    {name: "Rampart", x:367, y:301},
    {name: "Central", x:398, y:320},
    {name: "Hollenbeck", x:452, y:298},
    {name: "Southwest", x:321, y:357},
    {name: "Newton", x:384, y:370},
    {name: "77th St", x:336, y:403},
    {name: "Pacific", x:240, y:431},
    {name: "Southeast", x:380, y:451},
    {name: "Harbor", x:368, y:632},
];

function preload() {
    img = loadImage("lapd_division_map.jpg");
}

function setup() {
    createCanvas(480, 718);
}

function draw() {
    background(100);
    image(img, 0, 0);

    let selected = "";
    for (let label of label_positions) {
        if (dist(mouseX, mouseY, label.x, label.y) < 20)
            selected = label.name;
    }

    text(selected, 50, height-100);
    text(mouseX + " " + mouseY, 50, height-50);
}
