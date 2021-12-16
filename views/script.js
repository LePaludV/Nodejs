$(function () {
    
    $(".prev").click(function (e) { 
        e.preventDefault();
        var url=window.location.href
        var s = url.split('=')
        var r1=(Number(s[1])-1+100)%100
        window.open("/item?rank="+r1,"_self")
        
    });

    $(".next").click(function (e) { 
        e.preventDefault();
        var url=window.location.href
        var s = url.split('=')
        var r1=(Number(s[1])+1+100)%100
        window.open("/item?rank="+r1,"_self")
        
    });
    
    $(".rating").rating();

    $(".rating").click(function (e) { 
        e.preventDefault();
        
        var note=$('.rating').rating('get rating')
        var rank = window.location.href.split('=')[1]

        console.log(note,rank);
        $.ajax({
            type: "get",
            url: "/setRating",
            data: {
                note:note,
                book:rank},
            dataType: "text",
            success: function (response) {
                
            }
        });

    });
}); 