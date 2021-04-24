let lapd_division_map;
let lhda;
let x, y;

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
    {area: 19, name: "Mission", x:200, y:85},
    {area: 20, name: "Olympic", x:326, y:329},
    {area: 21, name: "Topanga", x:15, y:159}
];

function preload() {
    lapd_division_map = loadImage("lapd_division_map.jpg");
    lhda = loadTable("dfFinalCombined.csv", "csv", "header");
}

function setup() {
    //createCanvas(480, 718);
    createCanvas(960, 800);
    console.log(lhda.getRowCount());

    x = width/2;
    y = 100;
}

function draw() {
    background(100);

    image(lapd_division_map, 0, 0);
    displayMissingLabels();

    let selected = "";

    for (let label of label_positions) {
        if (dist(mouseX, mouseY, label.x, label.y) < 20)
        {
            selected = label.area + " " + label.name;

            displayStats(label.area);
        }
    }

    text(selected, 50, height-100);
    text(mouseX + " " + mouseY, 50, height-50);
}

function displayMissingLabels()
{
    fill(0);
    text("Mission", 200, 85);
    text("Olympic", 326, 329);
    text("Topanga", 15, 159);
}

function displayStats(area){
  let row = lhda.getRow(area-1);
  
  //draw background rect
  //strokeWeight(5);
  //stroke(135, 134, 134);
  fill(255, 255, 247);
  rect(x, y, 510, 470);
  
  //textFont(header);
  fill(0);
  //textAlign(CENTER, CENTER);
  //text("Data", x+250, y+30);
  
  //blue box
  noFill();
  //strokeWeight(3);0
  //stroke(66, 135, 245);
  rect(x+16, y+85, 205, 60);

  fill(0);
  textSize(14);
  let areaName = row.getString("areaName");
  textAlign(CORNER, CORNER);
  text("Area Name: " + areaName, x+20, y+100);
  let count = row.getString("count");
  text("Total Number of Arrests: " +count, x+20, y+120);
  textSize(14);
  let femaleCount = row.getString("femaleArrestNums");
  let femalePercent = row.getString("femaleArrestPercentages");
  let shortFemalePercent = femalePercent.substring(0, 2);
  text("Female arrests: "+femaleCount+" or "+shortFemalePercent+"%", x+20, y+140);
  
  //descent red box
  //stroke(235, 103, 103);
  
  noFill();
  rect(x+16, y+165, 205, 120);

  fill(0);
  textSize(14);
  text("Female 'Descent' Breakdown", x+27, y+180);
  textSize(14);
  let h = row.getString("femaleDescentH");
  text("H (Hispanic): " + h, x+20, y+200);
  let b = row.getString("femaleDescentB");
  text("B (Black): "+b, x+20, y+220);
  let w = row.getString("femaleDescentW");
  text("W (White): "+w, x+20, y+240);
  let a = row.getString("femaleDescentA");
  text("A (Asian): "+a, x+20, y+260);
  let o = row.getString("femaleDescentO");
  text("O (Other): "+o, x+20, y+280);

  //age purple box
  //stroke(156, 56, 255);
  noFill();
  rect(x+16, y+305, 205, 127);
  fill(0);
  text("Female Age Breakdown", x+27, y+320);
  let thirteen = row.getString("Num13YearOlds");
  text("13-Year-Olds: "+thirteen, x+20, y+340);
  let fourteen = row.getString("Num14YearOlds");
  text("14-Year-Olds: "+fourteen, x+20, y+360);
  let fifteen = row.getString("Num15YearOlds");
  text("15-Year-Olds: "+fifteen, x+20, y+380);
  let sixteen = row.getString("Num16YearOlds");
  text("16-Year-Olds: "+sixteen, x+20, y+400);
  let seventeen = row.getString("Num17YearOlds");
  text("17-Year-Olds: "+seventeen, x+20, y+420);
  
  /*to get the max charge things:
  row.getString("MostCommonCharge1"), Charge1Num, 2, etc
  take the string that is returned and 
  */
  
  //common charge box green
  //stroke('#1BD132');
  noFill();
  rect(x+259, y+85, 205, 140);
  fill(0);
  text("Most Common Charges", x+270, y+100);
  let charge1 = row.getString("MostCommonCharge1");
  let charge1num = row.getString("Charge1Num");
  text("1. "+charge1+", "+charge1num+" arrests", x+270, y+120);
  let charge1desc = chargeDesc(charge1);
  textSize(12);
  text("-> "+charge1desc, x+290, y+140);
  
  textSize(14);
  let charge2 = row.getString("MostCommonCharge2");
  let charge2num = row.getString("Charge2Num");
  text("2. "+charge2+", "+charge2num+" arrests", x+270, y+160);
  let charge2desc = chargeDesc(charge2);
  textSize(12);
  text("-> "+charge2desc, x+290, y+180);
  
  textSize(14);
  let charge3 = row.getString("MostCommonCharge3");
  let charge3num = row.getString("Charge3Num");
  text("3. "+charge3+", "+charge3num+" arrests", x+270, y+200);
  let charge3desc = chargeDesc(charge3);
  textSize(12);
  text("->"+charge3desc, x+290, y+220);
}


function chargeDesc(c){
  let result;
  if(c == "211PC"){
    result = "Robbery";
  }
  else if(c == "45.3(A)LAM"){
    result = "Night time curfew restriction";
  }
    else if(c == "245(A)(1)PC"){
    result = "Assault with deadly weapon";
  }
  else if(c == "242PC"){
    result = "Battery";
  }
  else if(c == "243(A)PC"){
    result = "Battery on domestic partner";
  }
  else if(c == "487(A)PC"){
    result = "Grand theft > $400";
  }
  else if(c == "45.03LAMC"){
    result = "Night time curfew restriction";
  }
  else if(c == "490.1(A)PC"){
    result = "Petty theft <= $50";
  }
  else if(c == "422(A)PC"){
    result = "Criminal threat";
  }
  else if(c == "10851(A)VC"){
    result = "Joyriding";
  }
  else if(c == "308(B)PC"){
    result = "Minor purchase/provide tobacco";
  }
  else if(c == "11362.3(A)H"){
    result = "Smoking weed in public";
  }
  else if(c == "530.5(A)PC"){
    result = "Identity theft";
  }
  else if(c == "594(A)(2)PC"){
    result = "Vandalism w/ damages < $400";
  }
  else if(c == "243(B)PC"){
    result = "Battery on police/peace officer";
  }
  else if(c == "63.44BLAMC"){
    result = "Breaking park regulations";
  }
  else if(c == "43.13.2LAMC"){
    result = "Present at gambling";
  }
  else if(c == "25662(A)BP"){
    result = "In posession of alcoholic beverage";
  }
  else if(c == "594(A)(1)PC"){
    result = "Defacing property";
  }
  else if(c == "148.9(A)PC"){
    result = "Fake identification to peace officer";
  }
  else if(c == "602.5(B)PC"){
    result = "Unauthorized entry in noncommercial dwelling";
  }
  else if(c == "484(A)PC"){
    result = "Grand theft > $400";
  }
  else if(c == "25658BP"){
    result = "Consume/purchase alcohol";
  }
  else if(c == "490.1PC"){
    result = "Petty theft <= $50";
  }
  else{
    result = "N/A";
  }
  return result;
}
