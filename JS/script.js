const postsContainer = document.getElementById("posts-container");
const loadMoreButton = document.getElementById("load-more");
const searchInput = document.getElementById("search-input");

let visiblePosts = 6;
let currentCategory = "All";
let searchTerm = "";


/* =========================
   DISPLAY POSTS
========================= */

function displayPosts() {

    postsContainer.innerHTML = "";

    const filteredPosts = posts.filter(post => {

        const matchesCategory =
            currentCategory === "All" ||
            post.category === currentCategory;

        const searchText =
            searchTerm.toLowerCase();

        const matchesSearch =
            post.title.toLowerCase().includes(searchText) ||
            post.excerpt.toLowerCase().includes(searchText) ||
            post.category.toLowerCase().includes(searchText) ||
            post.tags.some(tag =>
                tag.toLowerCase().includes(searchText)
            );

        return matchesCategory && matchesSearch;
    });


    const postsToDisplay =
        filteredPosts.slice(0, visiblePosts);


    postsToDisplay.forEach(post => {

        const card = document.createElement("article");

        card.className = "post-card";

        card.innerHTML = `

    <div class="post-image">

        <img
            src="${post.image}"
            alt="${post.title}"
            loading="lazy"
        >

    </div>

    <div class="post-content">

        <span class="category">
            ${post.category}
        </span>

        <h3>
            ${post.title}
        </h3>

        <p>
            ${post.excerpt}
        </p>

        <span class="post-date">
            ${post.date}
        </span>

        <a
            href="blog.html?id=${post.id}"
            class="read-more"
        >
            Read Article →
        </a>

    </div>

`;

        postsContainer.appendChild(card);
    });


    if (visiblePosts >= filteredPosts.length) {
        loadMoreButton.style.display = "none";
    } else {
        loadMoreButton.style.display = "inline-block";
    }
}


/* =========================
   LOAD MORE
========================= */

loadMoreButton.addEventListener("click", () => {

    visiblePosts += 3;

    displayPosts();

});


/* =========================
   SEARCH
========================= */

searchInput.addEventListener("input", () => {

    searchTerm = searchInput.value;

    visiblePosts = 6;

    displayPosts();

});


/* =========================
   CATEGORY FILTER
========================= */

const categoryButtons =
    document.querySelectorAll(".category-btn");


categoryButtons.forEach(button => {

    button.addEventListener("click", () => {

        categoryButtons.forEach(btn =>
            btn.classList.remove("active")
        );

        button.classList.add("active");

        currentCategory =
            button.dataset.category;

        visiblePosts = 6;

        displayPosts();

    });

});


/* =========================
   DARK MODE
========================= */

const themeToggle =
    document.getElementById("theme-toggle");


function updateThemeIcon() {

    if (document.body.classList.contains("dark")) {

        themeToggle.textContent = "☀️";

    } else {

        themeToggle.textContent = "🌙";

    }

}


themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    const isDark =
        document.body.classList.contains("dark");

    localStorage.setItem(
        "theme",
        isDark ? "dark" : "light"
    );

    updateThemeIcon();

});


/* Load saved theme */

const savedTheme =
    localStorage.getItem("theme");


if (savedTheme === "dark") {

    document.body.classList.add("dark");

}


updateThemeIcon();


/* =========================
   INITIALIZE
========================= */

displayPosts();


/* =========================
   HERO TYPEWRITER EFFECT
========================= */

const heroLine1 = document.getElementById("hero-line-1");
const heroLine2 = document.getElementById("hero-line-2");

const firstLine = "Stories worth";
const secondLine = "reading.";

let firstIndex = 0;
let secondIndex = 0;


function typeFirstLine() {

    if (firstIndex < firstLine.length) {

        heroLine1.textContent += firstLine.charAt(firstIndex);

        firstIndex++;

        setTimeout(typeFirstLine, 100);

    } else {

        setTimeout(typeSecondLine, 250);

    }
}


function typeSecondLine() {

    if (secondIndex < secondLine.length) {

        heroLine2.textContent += secondLine.charAt(secondIndex);

        secondIndex++;

        setTimeout(typeSecondLine, 120);

    }

}


typeFirstLine();

/* =========================
   MOBILE MENU
========================= */

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {

    navLinks.classList.toggle("active");

});