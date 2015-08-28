
function start (){
    var assets=[
        {
            type: 'image',
            name: 'img1',
            src: 'http://findicons.com/files/icons/1580/devine_icons_part_2/128/home.png'
        },

        {
            type: 'image',
            name: 'img2',
            src: 'https://cdn2.iconfinder.com/data/icons/windows-8-metro-style/128/home.png'
        },

        {
            type: 'image',
            name: 'img3',
            src: 'https://cdn1.iconfinder.com/data/icons/MetroStation-PNG/128/MB__home.png'
        }
    ];
    var id=0;
    var logoCreationController={
        init: function(){
            var divContainer=$('#container');

            var logoMakerDiv=$('<div>')
                .attr('id','logoMaker')
                .appendTo(divContainer);

            var drawArea=$('<div>')
                .attr('id','draw-area')
                .css({
                    height: '400px',
                    width: '300px',
                    borderWidth: '2',
                    borderStyle: 'solid',
                    borderColor: 'black'
                })
                .appendTo(logoMakerDiv)
                .ready( function(){
                    itemListUpdate.call(this);
                })
                .on('change', function(){
                    itemListUpdate.call(this);
                })
                .on('click', function(ev){
                    var target=$(ev.target);
                    if(target.is('img')){
                        target=target.parent();
                    }
                    popOutImageMenu(target);
                });

            var itemList=$('<div>')
                .attr('id','item-lis')
                .css({
                    height: '200px',
                    width: '300px',
                    borderWidth: '2',
                    borderStyle: 'solid',
                    borderColor: 'black'
                })
                .appendTo(logoMakerDiv)


            var contextMenu=$('<div>')
                .attr('id','context-menu')
                .appendTo(logoMakerDiv);


            var startMenu=generalMenu()
                .appendTo(contextMenu);

            var saveButton=$('<button>')
                .addClass('save-button')
                .html('save')
                .appendTo(logoMakerDiv)
                .click(function() {
                    html2canvas($("#logoMaker"), {
                        onrendered: function(canvas) {
                            theCanvas = canvas;
                            console.log(theCanvas.toDataURL())
                        }
                    });
                });
            var s=$('<div>')
                .attr('img-out')
                .appendTo(logoMakerDiv);
            function generalMenu(){
                var menu=$('<div>')
                    .attr('id', 'general-menu');

                var commandList=$('<ul>')
                    .attr('id','option-list')
                    .appendTo(menu)
                    .on('click',function(ev){
                        var that=$(ev.target);

                        var id=that.attr('id');

                        switch(id){
                            case 'background-option':
                                optionBody
                                    .html(backgroundMenu())
                                    .show();
                                break;
                            case 'image-option':
                                optionBody
                                    .html(imageMenu(assets))
                                    .show();
                                break;
                            case 'text-option':
                                optionBody
                                    .html(txtMenu())
                                    .show();
                                break;
                            default :
                                optionBody
                                    .html('')
                                    .hide();
                                break;
                        }
                    });

                var background=$('<li>')
                    .attr('id','background-option')
                    .html('Background')
                    .appendTo(commandList)

                var image=$('<li>')
                    .attr('id','image-option')
                    .html('Image')
                    .appendTo(commandList);

                var text=$('<li>')
                    .attr('id','text-option')
                    .html('Text')
                    .appendTo(commandList);

                var optionBody=$('<div>')
                    .appendTo(menu)
                    .attr('id','option-body')
                    .hide();


                return menu;
            }

            function backgroundMenu(){
                var bgMenu=$('<ul>');

                var color=$('<li>')
                    .attr('id','bg-color-picker')
                    .html('ColorPicker')
                    .appendTo(bgMenu);

                return bgMenu;
            }
            function imageMenu(contentObjects){

                var menu=$('<div>')
                    .addClass('dropdown');

                var button=$('<button>')
                    .addClass('btn btn-default dropdown-toggle')
                    .attr('type','button')
                    .attr('id',"dropdownMenu1")
                    .attr('data-toggle',"dropdown")
                    .attr('aria-haspopup','true')
                    .attr('aria-expanded','true')
                    .html('Images')
                    .appendTo(menu);

                var span=$('<span>')
                    .addClass('caret')
                    .appendTo(button);

                var imgMenu=$('<ul>')
                    .addClass('dropdown-menu')
                    .attr('aria-labelledby','dropdownMenu1')
                    .appendTo(menu)
                    .on('click',function(ev){
                        var that=$(ev.target);

                        if(that.is('li')){
                            var item=drawItem().appendTo(drawArea);
                            var id=that.attr('id');
                            var index=id.slice(-1);
                            addContentToItem(assets[+index],item);
                            itemListUpdate.call(drawArea)
                        }
                    });

                var image=$('<li>')
                    .appendTo(imgMenu);

                for(var i= 0, len=contentObjects.length; i<len; i+=1 ){
                    var image=$('<li>')
                        .appendTo(imgMenu)
                        .attr('data-stc', contentObjects[i].src)
                        .html(contentObjects[i].name)
                        .attr('id','image-list-item-'+i);
                }

                return menu;
            }
            function txtMenu(){
                var txtMenu=$('<ul>');

                var text=$('<li>')
                    .attr('id','text-creator')
                    .html('textCreator')
                    .appendTo(txtMenu);

                return txtMenu;
            }

            function popOutImageMenu(target) {
                var that = $(target);

                if(!that.hasClass('item')){
                    return;
                }

                var target='';
                if(that.is('li')) {
                    target = '#' + that.attr('data-id');
                } else{
                    target='#'+that.attr('id');
                }

                var div = $('<div>');
                var input = $('<input>').appendTo(div);
                var applBtn = $('<button>')
                    .html('Apply')
                    .appendTo(div)
                    .on('click', function () {
                        var t = $(target);
                        var i = t.find('img');

                        var scale = input.val();
                        var w = t.width();
                        var h = t.height();

                        var wI = i.width();
                        var hI = i.height();

                        t.width(w * scale);
                        t.height(h * scale);

                        i.width(wI * scale);
                        i.height(hI * scale);
                        div.dialog('close');

                    });
                div.dialog();
            }
            function itemListUpdate() {
                var that = $(this);
                var items = that.find('.item');
                itemList.html('');

                var count=$('<span>')
                    .addClass('item')
                    .attr('id','count')
                    .css({
                        display:'block'
                    })
                    .html('Count: '+items.length)
                    .appendTo(itemList);
                var ul=$('<ul>')
                    .appendTo(itemList)
                    .on('click',function(ev){
                        popOutImageMenu(ev.target);
                    });

                items.each(function(){
                    var that=$(this);

                    var item=$('<li>')
                        .addClass('item')
                        .attr('id',that.attr('name')+'-item')
                        .attr('data-id', that.attr('id'))
                        .html(that.attr('name')+'-item')
                        .css({
                            display:'block'
                        })
                        .appendTo(ul);
                });

            }
            function drawItem(){
                var item=$('<div>')
                    .addClass('item')
                    .attr('id',id++)
                    .draggable({
                        containment: 'parent'
                    })
                    .attr('name',id-1);

                return item;
            }
            function addContentToItem(contentObject, jqItem){
                if(!contentObject || !contentObject.type){
                    throw new Error('Error');
                }
                var type=contentObject.type;

                switch (type){
                    case 'image':
                        var image=$('<img>')
                            .attr('src',contentObject.src)
                            .appendTo(jqItem);

                        jqItem.width(150);
                        jqItem.height(150);
                        break;
                    default :
                        break;

                }
            }
        }
    };

    return logoCreationController;
}

var c =start().init();

