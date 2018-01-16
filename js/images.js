'use strict';

(function () {
    var sourceElement;

    var buildImageThumbnail = function (image) {
        const template = `<div class="photo-case mdl-shadow--2dp mdl-cell mdl-cell--4-col" draggable="true">
                            <img class="custom-img" src="img/${image}"/>
                         </div`
        return $(template);
    };

    var updateCollectionView = function () {
        const imageFilenames = getImageArr();
        let $collection = $(".main");
        for (let image of imageFilenames) {
            let $newThumbnail = buildImageThumbnail(image);
            $collection.append($newThumbnail);
        }
    };

    var getImageArr = function () {
        return [
            "dsc_6001.jpg", "dsc_6081.jpg", "dsc_6013.jpg", "dsc_6268.jpg",
            "dsc_6397.jpg", "dsc_6345.jpg", "dsc_6378.jpg", "dsc_6413.jpg", "dsc_6417.jpg"
        ];
    }

    var dragStarted = function (evt) {
        //start drag
        sourceElement = evt.target;
        evt.dataTransfer.setData("text/plain", evt.currentTarget.innerHTML);
        evt.dataTransfer.effectAllowed = "move";
    }

    function dragOver(evt) {
        //drag over
        evt.preventDefault();
        //specify operation
        evt.dataTransfer.dropEffect = "move";
    }

    function dropped(evt) {
        //drop
        evt.preventDefault();
        evt.stopPropagation();
        //update text in dragged item
        sourceElement.outerHTML = evt.currentTarget.innerHTML;
        //update text in drop target
        evt.currentTarget.innerHTML = evt.dataTransfer.getData("text/plain");
    }


    $(document).ready(function () {
        //build the html for each image card 
        updateCollectionView();

        let $dragItems = $('[draggable=true]');
        for (let item of $dragItems) {
            item.addEventListener('dragstart', dragStarted, false);
            item.addEventListener('drop', dropped, false);
            item.addEventListener('dragover', dragOver, false);
        }
    });
})()