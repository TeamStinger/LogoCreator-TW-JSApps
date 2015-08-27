$.fn.gallery = function (imageCollection) {

    function sortByAuthorName(imageCollection, inReverse) {
        var sortedCollection = _.sortBy(imageCollection, 'author');
        if(inReverse){
            sortedCollection.reverse();
        }

        return sortedCollection;
    }

    function sortByImgName(imageCollection, inReverse){
        var sortedCollection = _.sortBy(imageCollection, 'imgName');
        if(inReverse){
            sortedCollection.reverse();
        }

        return sortedCollection;
    }

    var $container = $('<div>');
    var $imgContainer = $('<div>');
    var $img = $('<img>');
    var $imgHeader = $('<p>');

    _.each(imageCollection,function(img){

        $img.attr('src', img.src);
        $imgHeader.text(img.author);

        $imgContainer.appendChild($img);
        $imgContainer.appendChild($imgHeader);

        $container.appendChild($imgContainer);
    });

    return this;
};

$.gallery([]);