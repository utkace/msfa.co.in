let folders = ["Free_Art_Education", "Seedling_Exhibition_2013", "Singing_Workshop"];
let imgs = {};
let imageItems = [];
let dir = "img/gallery/large/";
let i=0;

for(let j=0; j<folders.length; j++)
    imgs[folders[j]] = [];

function getImages(i) {
    //let fakeName = ['A Random Name', 'Second Random Name', 'Third Random Name', 'Fourth Random Name', 'the Huhahalakajkahskj', 'sdjfkhsakjdfhjksdhfks'];
    $.ajax({
        url:dir+folders[i]+"/",
        //async: false,
        success: function (data) {
            //document.write(data);
            let j = 1;
            $(data).find("a:contains(.jpg)").each(function () {
                // create object
                let imageUrl = this.href;
                let filename = imageUrl.split("/");
                filename = filename[filename.length-1];
                imageUrl = imageUrl.replace(filename, dir+folders[i]+"/"+filename);


                //console.log(dir+folders[i]+"/"+filename);

                let imgObj = {
                    'title': folders[i] + " " + j,
                    'url': imageUrl
                };
                imgs[folders[i]].push(imgObj);
                j++;
                /*let imageObj = {
                    'title': fakeName[parseInt(imageTitle)],
                    'thumbnail': [imageUrl.replace("large", "small"), imageUrl.replace("large", "small")],
                    'large': [imageUrl, imageUrl],
                    'img_title': [fakeName[parseInt(imageTitle)], fakeName[parseInt(imageTitle)]],
                    'button_list': [],
                    'tags': [folders[i]]
                };
                //console.log(imageObj);
                imageItems.push(imageObj);*/
            });
            console.log("Found " + imgs[folders[i]].length + " images in " + folders[i] + ".");
        },
        error: function(e){
            console.log(e);
        },
        complete: function(d) {
            if(i<folders.length-1)
                getImages(i+1);
            else {
                console.log(imgs);
                for(let directory in imgs){
                    let n = imgs[directory].length;  // number of images in directory
                    //console.log(directory);
                    let large= [];
                    let thumbnails = [];
                    let titles = [];
                    // collect all urls and titles of the directory
                    for(j=0; j<n; j++){
                        large.push(imgs[directory][j].url);
                        thumbnails.push(imgs[directory][j].url.replace("large", "small"));
                        titles.push(imgs[directory][j].title);
                    }
                    for(j=0; j<n; j++){
                        let ctitles = titles;
                        let clarge = large;
                        let cthumbnails = thumbnails;

                        //console.log(ctitles);
                        let temp = ctitles[j];
                        ctitles = ctitles.filter(item => item !== temp);
                        ctitles.unshift(temp);

                        temp = clarge[j];
                        clarge = clarge.filter(item => item !== temp);
                        clarge.unshift(temp);

                        temp = cthumbnails[j];
                        cthumbnails = cthumbnails.filter(item => item !== temp);
                        cthumbnails.unshift(temp);
                        //console.log(ctitles);

                        let imageObj = {
                            'title': imgs[directory][j].title,
                            'thumbnail': cthumbnails,
                            'large': clarge,
                            'img_title': ctitles,
                            'button_list': [],
                            'tags': [directory]
                        };
                        imageItems.push(imageObj);
                    }
                }
                console.log(imageItems);

                //////// -Preloader- /////////
                $('.loading').hide(); // Hide preloader when document is fully loaded

                makeGrid();
            }
        }
    });
    // console.log("Found " + images.length + " images in " + folders[i] + ".");
}

function makeGrid() {
    $("#gallery-container").elastic_grid({
        'showAllText': 'All',
        'filterEffect': 'scaleup', // moveup, scaleup, fallperspective, fly, flip, helix , popup
        'hoverDirection': true,
        'hoverDelay': 0,
        'hoverInverse': false,
        'expandingSpeed': 500,
        'expandingHeight': 500,
        'items': imageItems
    });
}


// Elastic Grid Testing by generating Fake images
/*function fakeImages() {
    tags = ['portrait', 'landscape', 'hulalala'];
    for(let i=0; i<10; i++){
        let imageObj = {
            'title'         : 'Swiss chard pumpkin',
            'thumbnail'     : ['http://localhost/msfa/gallery/small/folder1/3.png', 'http://localhost/msfa/gallery/small/folder1/2.png'],
            'large'         : ['http://localhost/msfa/gallery/large/folder1/3.png', 'http://localhost/msfa/gallery/large/folder1/2.png'],
            'img_title'     : ['title1', 'title'],
            'button_list'   : [],
            'tags'          : [tags[Math.floor(Math.random()*3)]]
        };
        imageItems.push(imageObj);
    }
    makeGrid();
}*/

$(document).ready(function () {
    getImages(0);
});
