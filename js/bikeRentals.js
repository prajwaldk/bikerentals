/* Jquery section for the menu Click */
$(document).ready(function () {
    $("#menu li a").on('click', function (e) {
        e.preventDefault();
        var page = $(this).data('page');
        $("#products .page:not('.hide')").stop().fadeOut('fast', function () {
            $(this).addClass('hide');
            $('#products .page[data-page="' + page + '"]').fadeIn('slow').removeClass('hide');
        });
    });
});

/* Read File From Json */
function loadJSON(file, callback) {
    var xobj = new XMLHttpRequest();
    //xobj.overrideMimeType("application/json");
    xobj.open('GET', file, true);
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            callback(xobj.responseText);
        }
    };
    xobj.send(null);
}

/* Dynamically generate the division for the images */
function generateThumbnail(){
    var grid = document.createElement('div');
    var thumbnail = document.createElement('div');
    var img = document.createElement('img');
    var p1 = document.createElement('p');
    var p2 = document.createElement('p');
        
        grid.setAttribute('class', 'col-lg-4 col-sm-6');
        thumbnail.setAttribute('class', 'thumbnail');
        img.setAttribute('src', '');
        p1.setAttribute('class', 'font-weight-normal');
        p2.setAttribute('class', 'font-weight-bold');
        thumbnail.appendChild(img);
        thumbnail.appendChild(p1);
        thumbnail.appendChild(p2);
        grid.appendChild(thumbnail);
    return grid;
} 

/* Self Load Function, Products are categorized according to the Product type 
 Place Holder Images are read and displayed as given in the JSON*/
(function init() {
    loadJSON("../json/bikerentals.json", function (text) {
        var data = JSON.parse(text);
        var j = 0;
        var k = 0;
        var l = 0;

        for (i = 0; i < data.products.length; i++) {
            if (data.products[i].product_type === 'bike') {
                var container = document.querySelector("#bikes .row"); 
                var grid = generateThumbnail();
                container.appendChild(grid);

                var imageContainer = document.querySelectorAll("#bikes .thumbnail");
                while(j<imageContainer.length){ 
                    var x = imageContainer[j].querySelectorAll("img, .font-weight-normal, .font-weight-bold");
                        x[0].src = data.products[i].image
                        x[1].innerText = data.products[i].name
                        x[2].innerText = '$' + data.products[i].price
                j++;
            }
                
        }else if (data.products[i].product_type === 'accessory') {
            var container = document.querySelector("#helmet .row"); 
                var grid = generateThumbnail();
                container.appendChild(grid);

                var imageContainer = document.querySelectorAll("#helmet .thumbnail");
                while(k<imageContainer.length){ 
                    var x = imageContainer[k].querySelectorAll("img, .font-weight-normal, .font-weight-bold");
                        x[0].src = data.products[i].image
                        x[1].innerText = data.products[i].name
                        x[2].innerText = '$' + data.products[i].price
                k++;
            }
        }else if (data.products[i].product_type === 'addon') {
            var container = document.querySelector("#insurance .row"); 
                var grid = generateThumbnail();
                container.appendChild(grid);

                var imageContainer = document.querySelectorAll("#insurance .thumbnail");
                while(l<imageContainer.length){ 
                    var x = imageContainer[l].querySelectorAll("img, .font-weight-normal, .font-weight-bold");
                        x[0].src = data.products[i].image
                        x[1].innerText = data.products[i].name
                        x[2].innerText = '$' + data.products[i].price
                l++;
            }
        }


    }
    });
})()

