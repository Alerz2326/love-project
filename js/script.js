const musicButton =
    document.getElementById("musicButton");

const musicControl =
    document.getElementById("musicControl");

const music =
    document.getElementById("backgroundMusic");

const pages =
    document.querySelectorAll(".page");

const nextButtons =
    document.querySelectorAll(".next-button");

const yesButton =
    document.getElementById("yesButton");

const noButton =
    document.getElementById("noButton");


/* =========================
   MUSIC
========================= */

const musicPath =
    "assets/music/the_night_we_met.mp3";


music.src = musicPath;

music.preload = "auto";

music.loop = true;


/* =========================
   CHANGE PAGE
========================= */

function changePage(pageId) {

    pages.forEach(function(page) {

        page.classList.remove("active");

    });


    const targetPage =
        document.getElementById(pageId);


    if (!targetPage) {

        console.error(
            "Page not found:",
            pageId
        );

        return;

    }


    targetPage.classList.add("active");

}


/* =========================
   START MUSIC
========================= */

musicButton.addEventListener(
    "click",
    async function() {

        try {

            await music.play();


            musicButton.innerHTML = `
                <span class="music-icon">♫</span>
                <span>در حال پخش...</span>
            `;


            musicControl.classList.add("visible");


            setTimeout(function() {

                changePage("pageTwo");

            }, 650);


        } catch (error) {

            console.error(
                "MUSIC ERROR:",
                error
            );


            musicButton.innerHTML = `
                <span class="music-icon">!</span>
                <span>مشکل در پخش موسیقی</span>
            `;

        }

    }
);


/* =========================
   MUSIC CONTROL
========================= */

musicControl.addEventListener(
    "click",
    async function() {

        if (music.paused) {

            try {

                await music.play();

                musicControl.textContent = "♫";

            } catch (error) {

                console.error(
                    "Music play error:",
                    error
                );

            }

        } else {

            music.pause();

            musicControl.textContent = "Ⅱ";

        }

    }
);


/* =========================
   NEXT BUTTONS
========================= */

nextButtons.forEach(function(button) {

    button.addEventListener(
        "click",
        function() {

            const nextPage =
                button.dataset.next;

            changePage(nextPage);

        }
    );

});


/* =========================
   YES
========================= */

yesButton.addEventListener("click", async function() {

    try {

        const response = await fetch(
            "https://love-project-api.alireza10-sh.workers.dev/",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    answer: "yes"
                })
            }
        );

        if (!response.ok) {
            throw new Error("Server error");
        }

        changePage("pageEight");

    } catch (error) {

        console.error("Could not send YES:", error);

        // حتی اگر ارسال پیام مشکل داشت،
        // صفحه برای کاربر قفل نمی‌شود.
        changePage("pageEight");
    }

});


/* =========================
   NO
========================= */

noButton.addEventListener("click", async function() {

    try {

        const response = await fetch(
            "https://love-project-api.alireza10-sh.workers.dev/",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    answer: "no"
                })
            }
        );

        if (!response.ok) {
            throw new Error("Server error");
        }

        changePage("pageNine");

    } catch (error) {

        console.error("Could not send NO:", error);

        // حتی اگر ارسال پیام مشکل داشت،
        // صفحه برای کاربر قفل نمی‌شود.
        changePage("pageNine");
    }

});


/* =========================
   AUDIO ERROR
========================= */

music.addEventListener(
    "error",
    function() {

        console.error(
            "Audio file could not be loaded."
        );

        console.error(
            "Expected path:",
            musicPath
        );

    }
);