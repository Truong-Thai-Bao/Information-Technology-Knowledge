
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
            let d=document.getElementById("Ads");
            let s="";
            for(let l of Data)
                s+=`<div>${l.name}</div></li>`;
            d.innerHTML+=s;
        })
    }

// function Ads() {
//     fetch("Data/ads.json")
//         .then(res => res.json())
//         .then(Data => {
//             let d = document.getElementById("Ads");
//             let s = "";
//             for (let item of Data) {
//                 s += `<div><img src="${item.img}" alt="${item.name}" /></div>`;
//             }
//             d.innerHTML += s;
//         })
//         .catch(error => {
//             console.error("Error fetching or processing data:", error);
//         });
// }


    
function Content() {
    fetch("Data/art.json").then(res => res.json()).then(Data => {
        fetch("Data/Languages.json").then(res => res.json()).then(LangsData => {
            let d = document.getElementById("con");
            let s = "";

            for (let i = 0; i < Data.length; i++) {
                let l = Data[i];    
                let langItems = ""; // Khởi tạo lại langItems cho mỗi bài viết

                for (let key in l) {
                    if (key.startsWith("lang") && l[key]) {
                        langItems += `<li><a href="${getLangSrc(l[key], LangsData)}">${l[key]}</a></li>`;
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
                        <div>
                            <ul class="type flex">
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
});
});
}

function getLangSrc(langName, LangsData) {
    const langInfo = LangsData.find(lang => lang.name === langName);
    return langInfo ? langInfo.src : "#"; // Trả về "#", hoặc giá trị mặc định khác nếu không tìm thấy
}
window.onload=()=>{ 
    Langs();
    Ads();
    Content();



    //thanh tìm kiếm
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




//Login
document.addEventListener("DOMContentLoaded", function() {
    const wrapper = document.querySelector('.wrapper');
    const loginLink = document.querySelector('.login-link');
    const registerLink = document.querySelector('.register-link');
    const btnPopup = document.querySelector('.btnLogin-popup');
    const iconClose = document.querySelector('.icon-close');
    // const newposts = document.querySelector('.new-posts');
    const passwordInput = document.querySelector('input[type="password"]');
    const eyeIcon = document.querySelector('.fa-eye');
    
        eyeIcon.addEventListener('click', () => {
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
        } else {
            passwordInput.type = 'password';
        }
    });

    // newposts.addEventListener('click', () => {
    //     newposts.classList.add('active');
    // })

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

});



// Nếu cuộn top =0 thì sẽ scroll theo
// const sidebar = document.querySelector(".left");
// const cos =document.querySelector('.cos');
// window.addEventListener("scroll", function() {
//     const scrollY = window.scrollY;
//     sidebar.style.height = `calc(100vh - ${scrollY}px)`;
//     cos.style.height=`calc(100vh - ${scrollY}px)`;
// });


$(document).ready(() => {
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
//Hover
    $(".by a").hover(function(){
        if($(this).next().position().top+$(this).next().outerHeight()>$(window).height()){
            $(this).next().removeClass("info");
            $(this).next().addClass("infoUp");
        }
        else{
            $(this).next().addClass("info");
            $(this).next().removeClass("infoUp");
        }
    });

    $(".vid").click(function(event){
        event.preventDefault();
        $("html, body").animate({
          scrollTop: $("#video").offset().top
        }, 800);
      });

}); 

    // let box = document.querySelector(".video");
    // window.onmousemove=function(e){
    //     let x = e.clientX/3;
    //     video.style.transform = "perspective(1000px) rotateY(" + x +"deg)";
    // }


//VIDEO
    document.addEventListener("DOMContentLoaded", function () {
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
    
     