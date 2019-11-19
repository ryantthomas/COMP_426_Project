let debounce = function(callbackFunc, wait) {
    let timeout = 0;
    return (...args) => {
        const context = this;
        timeout = setTimeout(() => callbackFunc.apply(context, args), wait);
    };
};

let str = `Adele , Joey + Rory , Draaco Aventura , Justin Bieber , Peer van Mladen , Chris Janson , One Direction , Drake , Carrie Underwood , Ed Sheeran , Taylor Swift , SayWeCanFly , Selena Gomez , Chris Brown , Nicki Minaj , Fifth Harmony , Thomas Rhett  , Eminem , Beyonce , 
    Meghan Trainor , Twenty One Pilots , Fetty Wap , 5 Seconds Of Summer , Jason Aldean , Luke Bryan , Blake Shelton , Rihanna , Elvis Presley , Ariana Grande , JD Shelburne , Lil Wayne , Demi Lovato , Maroon 5 , Sam Hunt , George Strait , Wiz Khalifa , Miranda Lambert , DJ Khaled , 
    Porno for Pyros , Katy Perry , Miley Cyrus , Tim McGraw , The Weeknd , Macklemore & Ryan Lewis , Ellie Goulding , Michael Jackson , Rascal Flatts , Britney Spears , Zac Brown Band , Hearty2Raw , Future , Lady Antebellum , Adam Levine , Janet Jackson , Keith Urban , Sam Smith , 
    Jason Derulo , Tori Kelly , 2Pac , Ciara , Old Dominion , Randy Houser , Eric Church , Shakira , Bruno Mars , Little Big Town , Rick Ross , Toby Keith , Brian Collins , Sia , Dixie Chicks , Kanye West , Shania Twain , Enrique Iglesias , The Band Perry , Kellie Pickler , Randy Owen , 
    Kelsea Ballerini , Lana Del Rey , Freddie Mercury , Martin Garrix , Brett Eldredge , Trey Songz , Young Thug , Mariah Carey , Jennifer Lopez , Shawn Mendes , Halsey , The XX , Kurt Stevens , R. Kelly , 50 Cent , Kenny Chesney , Linkin Park , Akon , Avenged Sevenfold , John Legend , 
    Cole Swindell , Justin Moore , Jewel , Maddie & Tae , Chris Young , Hunter Hayes , Canaan Smith , Madonna , Albert Phillips , Brantley Gilbert , Coldplay , Jay Z , Lady Gaga , Lil Fizz , Iggy Azalea , Chase Rice , Danielle Bradbery , Dustin Lynch , Kacey Musgraves , Alan Jackson , 
    Backstreet Boys ,Hank Williams, Jr., The Vamps , Jaden Smith , JoJo , Kendrick Lamar , Becky G , Josh Turner , Brad Paisley , Gwen Stefani , Mikel Knight , Rachel Platten , Reba McEntire , Darius Rucker , Florida Georgia Line , Barbra Streisand , Fall Out Boy , Prince , K. Michelle , 
    Little Mix , BLACKBEAR , Calvin Harris , Jana Kramer , Kenny Rogers , T.I. , Troye Sivan , Brothers Osborne , Rita Ora , TLC , Aaliyah , Kirk Franklin , Kid Rock , Skrillex , Ed Roman , Don Williams , Lonestar , Nelly , Willie Nelson , Zonke , Charli XCX , X Ambassadors , Jessie J , 
    Westlife , Tinashe , DMX , Meek Mill , Usher , BRANDY CLARK , Dolly Parton , Foo Fighters , Mark Wills , Prince Royce , Pentatonix , Flo Rida , Whitney Houston , Avril Lavigne , Pharrell Williams , Dwight Yoakam , Lee Brice , Barbara Mandrell , Black Veil Brides , Jamey Johnson , 
    Jimmy Fortune , YonnieMcfly , Johnny Cash , Nick Jonas , Vince Gill , Imagine Dragons , Jake Owen , Larry Hernandez , Martina McBride , Colt Ford , Dierks Bentley , Guns N Roses , Justin Timberlake , Kelly Clarkson , Metallica , Scotty McCreery , The Weekend , Bim Skala Bim , Mark Ronson , 
    Merle Haggard , Bea Miller , Alessia Cara , A Thousand Horses , Brooks & Dunn , Elle King , Rod Stewart , The Cadillac Three , Jacob Whitesides , Ja Rule , Lauren Alaina , Marc Anthony , The Game , The Pussycat Dolls , Tyler Farr , Clare Dunn , Adam Lambert , Andrea Bocelli , Gary Allan , 
    George Jones , Joe Jonas , Krystal Keith , Ray Charles , Red Hot Chili Peppers , The Oak Ridge Boys , Kevin Gates , Cassadee Pope , August Alsina , Rich Homie Quan , Air Supply , Brandy , OneRepublic , Pitbull , Robin Thicke , Snoop Dogg , Travis Tritt , Chvrches , Lorde , Alison Krauss & Union Station , 
    A$AP Rocky , Jeremih , Panic! At the Disco , Sheryl Crow , Trace Adkins , Tyga , Ruby Rose , Bone Thugs-n-Harmony , David Nail , Duran Duran , Kip Moore , Wallpaper. , Dej Loaf , Ashley Monroe , Christina Aguilera , Diana Ross , Luciano Pavarotti , Lucky Dube , Nas , Norah Jones , Mason Noise , 
    Madelyn Victoria , Alicia Keys , Avicii , Bryan Adams , Faith Hill , MGK , Scarface , Austin Mahone , Disclosure , James Bay , Xander Demos , Jony Privat , Charlie Puth , Amy Winehouse , G-Eazy , Gretchen Wilson , Jhen_ Aiko , Mumford & Sons , Nickelback , Sara Evans , Sean Paul , Spice Girls , 
    Train , William Michael Morgan , Alejandro Fernððndez , Conway Twitty , Dr. Dre , Ice-T , Jennifer Nettles , June Carter Cash `;
let terms = str.split(" , ");


//Function that reaches into textbox and appends values that match
let matches = function() {
    //Sets the list to equal nothing and then 
    let $artistsList = $("#artists");
    $artistsList.replaceWith(`<div id="artists" class="artists"></div>`);
    $artistsList = $("#artists");
    let inputValue = document.getElementById("search-box").value;
    for(let i = 0; i < terms.length; i++) {
        if(terms[i].toUpperCase().startsWith(inputValue.toUpperCase())) {
            $artistsList.append(`<p class="list-item subtitle">${terms[i]}</p>`);
        }
    }
}

let setEvents = function() {
    const $root = $('#root');
    $root.on("input", ".input", debounce(matches, 200));
}

$(function() {
    setEvents();
  });