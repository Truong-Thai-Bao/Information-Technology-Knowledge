
function Langs(){
    fetch("Data/Languages.json").then(res=>res.json()).then(Data=>{
        let d=document.getElementById("languages");
        let s="";
        for(let l of Data)
            s+=`<li><a href="#">${l.name}</a></li>`;
        d.innerHTML+=s;
    })
}

function Ads(){
    fetch("Data/ads.json").then(res=>res.json()).then(Data=>{
        let d=document.getElementById("Ads");
        let s="";
        for(let l of Data)
            s+=`<div>${l.name}</div></li>`;
        d.innerHTML+=s;
    })
}

function Content(){
        fetch("Data/art.json").then(res => res.json()).then(Data => {
            let d = document.getElementById("con");
            let s = "";
            const langKeys = Object.keys(Data).filter(key => key.startsWith("lang"));
            const langs = langKeys.map(key => Data[key]);
            let langItems = "";
             for (let i = 0; i < Data.length; i++) {
                let l = Data[i];
                if(langs[i])//Kiểm tra null trước khi chạy
                    for (let j = 0; j < langs[i].length; j++) {
                        langItems += `<li><a href="#">${langs[i][j]}</a></li>`;
                    }
    
                s += `
                <div class="art flex">
                    <div class="lef">
                        <div><h4 class="text">${l.vote} Votes</h4></div>
                        <div><h4 class="text">${l.ans} Answers</h4></div>
                        <div><h4 class="text">${l.view} Views</h4></div>
                    </div>
                    <div class="righ">
                        <h3>${l.title}</h3>
                        <div class="flex">
                            <div class="flex">
                                <ul class="type">
                                    ${langItems}    
                                </ul>
                            </div>
                            <div class="by">
                                <div class="flex">
                                    <h5 class="text">Posted by </h5>
                                    <a href="#" class="flex hide">
                                        <img src="Images/${l.img}" alt="">
                                        <h5 class="text">${l.name}</h5>
                                    </a>
                                    <div class="info">
                                        <div class="flex">
                                            <div><img src="Images/${l.img}" alt=""></div>
                                            <div>
                                                <h5 class="text">${l.name}</h5>
                                                <h5 class="text-min">${l.national}</h5>
                                            </div>
                                        </div>
                                        <h5 class="text-min">${l.sumPro}</h5>
                                    </div>
                                </div>
                                <h5 class="text">${l.time}</h5>
                            </div>
                        </div>
                    </div>
                </div>
                `;
            }
            d.innerHTML += s;   
        })
        
}
window.onload=()=>{ 
    Langs();
    Ads();
    Content();

    var suggestionList = $(".suggestion-list");
    var searchInput = $(".search-input");
    searchInput.on("input", function () {
        var searchText = $(this).val().toLowerCase(); 
        suggestionList.empty();

        $("h3"||"#type").each(function () {
            var title = $(this).text().toLowerCase();
            if (title.includes(searchText)) {
                var suggestionItem = $("<li>").text(title);
                suggestionList.append(suggestionItem);
            }
        });

        if (searchText.length > 0 && suggestionList.is(":hidden")) {
            suggestionList.slideDown();
        } else if (searchText.length === 0 && suggestionList.is(":visible")) {
            suggestionList.slideUp();
        }
    
        
    });



    suggestionList.on("click", "li", function () {
        if($(window).width() <= 700) {
            $('.slide').slideToggle();
        }
        var searchValue = $(this).text();
        searchInput.val(searchValue);

        var targetHeader = $("h3").filter(function () {
            return $(this).text().toLowerCase() === searchValue.toLowerCase();
        });

        if (targetHeader.length > 0) {
            var offsetTop = targetHeader.offset().top - $('h3').height() - $('h3').height();
            $("html, body").animate({
                scrollTop:offsetTop
            }, 500);
        }

        suggestionList.slideUp();
    });

}


document.addEventListener("DOMContentLoaded", function() {
    const wrapper = document.querySelector('.wrapper');
    const loginLink = document.querySelector('.login-link');
    const registerLink = document.querySelector('.register-link');
    const btnPopup = document.querySelector('.btnLogin-popup');
    const iconClose = document.querySelector('.icon-close');

    registerLink.addEventListener('click', ()=> {
         wrapper.classList.add('active')
    });

    loginLink.addEventListener('click', ()=> {
         wrapper.classList.remove('active')
    });

    btnPopup.addEventListener('click', ()=> {
         wrapper.classList.add('active-popup')
    });

    iconClose.addEventListener('click', ()=> {
         wrapper.classList.remove('active-popup')
    })
}); 

$(document).ready(() => {
    $("#backtop").hide();
    $("#backtop").click(() => {
        $("html, body").animate({
            scrollTop: 0
        }, 1000);
    });
    $(window).scroll(function() {
        if ($(this).scrollTop() >= 100){
            $("#backtop").show("slow")
        } else{
            $("#backtop").hide("slow")
        }
    })
});