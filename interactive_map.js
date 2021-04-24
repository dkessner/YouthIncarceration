let lapd_division_map;
let lhda;

let label_positions = [
    {area: 1, name: "Central", x:398, y:320},
    {area: 2, name: "Rampart", x:367, y:301},
    {area: 3, name: "Southwest", x:321, y:357},
    {area: 4, name: "Hollenbeck", x:452, y:298},
    {area: 5, name: "Harbor", x:368, y:632},
    {area: 6, name: "Hollywood", x:306, y:264},
    {area: 7, name: "Wilshire", x:306, y:318},
    {area: 8, name: "West Los Angeles", x:149, y:277},
    {area: 9, name: "Van Nuys", x:186, y:167},
    {area: 10, name: "West Valley", x:82, y:171},
    {area: 11, name: "Northeast", x:405, y:265},
    {area: 12, name: "77th St", x:336, y:403},
    {area: 13, name: "Newton", x:384, y:370},
    {area: 14, name: "Pacific", x:240, y:431},
    {area: 15, name: "North Hollywood", x:257, y:167},
    {area: 16, name: "Foothill", x:280, y:80},
    {area: 17, name: "Devonshire", x:120, y:88},
    {area: 18, name: "Southeast", x:380, y:451},
    {area: 19, name: "Mission", x:200, y:84},
    {area: 20, name: "Olympic", x:336, y:309},
    {area: 21, name: "Topanga", x:20, y:171}
];

function preload() {
    lapd_division_map = loadImage("lapd_division_map.jpg");
    lhda = loadTable("dfFinalCombined.csv", "csv", "header");
}

function setup() {
    createCanvas(480, 718);
    console.log(lhda.getRowCount());
}

function draw() {
    background(100);
    image(lapd_division_map, 0, 0);

    let selected = "";

    for (let label of label_positions) {
        if (dist(mouseX, mouseY, label.x, label.y) < 20)
            selected = label.area + " " + label.name;
    }

    text(selected, 50, height-100);
    text(mouseX + " " + mouseY, 50, height-50);
}
