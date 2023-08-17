function Langs(){
    fetch("Data/Languages.json").then(res=>res.json()).then(Data=>{
        let d=document.getElementById("languages");
        let s="";
        for(let l of Data)
            s+=`<li><a href="${l.src}">${l.name}</a></li>`;
        d.innerHTML+=s;
    })
}
function Ads(){
    fetch("Data/ads.json").then(res=>res.json()).then(Data=>{
        let d=document.getElementById("ads");
        let s="";
        for(let i of Data)
            s+=`<div><img src="Images/${i.img}.jpg" alt="ads"></div>`;
        d.innerHTML+=s;
    })
}
    
function Content() {
    fetch("Data/art.json").then(res => res.json()).then(Data => {
        let d = document.getElementById("con");
        let s = "";

        for (let i = 0; i < Data.length; i++) {
            let l = Data[i];
            let langItems = ""; // Khởi tạo lại langItems cho mỗi bài viết

            for (let j = 1; l[`lang ${j}`]; j++) {
                let lang = l[`lang ${j}`];  
                if (lang === "Python") {
                    langItems += `<li><a href="http://127.0.0.1:5501/python.html">${lang}</a></li>`;
                }
            }

            if (langItems) {
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
    }

    d.innerHTML += s;
})
}

function getLangSrc(langName, LangsData) {
    const langInfo = LangsData.find(lang => lang.name === langName);
    return langInfo ? langInfo.src : "#"; // Trả về "#", hoặc giá trị mặc định khác nếu không tìm thấy
}

//Gợi ý tìm kiếm
function Suggestion(){
    var suggestionList = $(".suggestion-list");
    var searchInput = $(".search-input");
    
    searchInput.on("input", function () {
        var searchText = $(this).val().toLowerCase(); 
        suggestionList.empty();
    
        $("h3" || "#type").each(function () {
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
        if ($(window).width() <= 700) {
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

window.onload=()=>{
    Langs();
    Ads();
    Content();
    Suggestion();
}
document.addEventListener("DOMContentLoaded", function() {

//Login
    const wrapper = document.querySelector('.wrapper');
    const loginLink = document.querySelector('.login-link');
    const registerLink = document.querySelector('.register-link');
    const btnPopup = document.querySelector('.btnLogin-popup');
    const iconClose = document.querySelector('.icon-close');
    const passwordInput = document.querySelector('input[type="password"]');
    const eyeIcon = document.querySelector('.fa-eye');
    
        eyeIcon.addEventListener('click', () => {
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
        } else {
            passwordInput.type = 'password';
        }
    });

    registerLink.addEventListener('click', () => {
        wrapper.classList.add('active');
    });

    loginLink.addEventListener('click', () => {
        wrapper.classList.remove('active');
    });

    btnPopup.addEventListener('click', () => {
        wrapper.classList.add('active-popup');
    });

    iconClose.addEventListener('click', () => {
        wrapper.classList.remove('active-popup');
    });



//VIDEO
    const videoContainer = document.querySelector('.video-container');
    const prevButton = videoContainer.querySelector('.prev-button');
    const nextButton = videoContainer.querySelector('.next-button');
    const videos = videoContainer.querySelectorAll('iframe');

    let currentIndex = 0; //vị trí hiện tại của video

    prevButton.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + videos.length) % videos.length;
        updateVisibleVideos();
    }); //sk khi nhấp <

    nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % videos.length;
        updateVisibleVideos();
    }); //sk khi nhấp >

    function updateVisibleVideos() {
        videos.forEach((video, index) => {
            if (
                index === currentIndex ||
                index === (currentIndex - 1 + videos.length) % videos.length || // Previous video
                index === (currentIndex + 1) % videos.length // Next video
            ) {
                video.style.display = 'block';
            } else {
                video.style.display = 'none';
            }
        });
    } //update vị trí hiện tại      

    // Show the first video initially
    updateVisibleVideos();
});



$(document).ready(() => {
//Back top
    $("#backtop").hide();
    $("#backtop").click(() => {
        $("html, body").animate({
            scrollTop: 0
        }, 1000);
    });
    $(window).scroll(function() {
        if ($(this).scrollTop() >= 100){
            $("#backtop").show("slow");
        } else{
            $("#backtop").hide("slow"); 
        }
    });


//Video
$(".vid").click(function(event){
        event.preventDefault();
        $("html, body").animate({
        scrollTop: $("#video").offset().top   
        }, 800);
    });
//MENU
    let menuClicked = false;   // Biến để theo dõi việc click vào #menu
    $("#menu").on("click",function(){
        if(menuClicked===false){
            $("#sidebar").toggleClass("open");
            $(this).toggleClass("open");
            menuClicked=true;
        }
        else{
            $("#sidebar").toggleClass("close");
            $(this).toggleClass("close");
            menuClicked=false;
        }
    })
}); 

//new post
function add(){
    $("#logIn").toggleClass("err");
}
function remove(){
    $("#logIn").removeClass("err");
}   