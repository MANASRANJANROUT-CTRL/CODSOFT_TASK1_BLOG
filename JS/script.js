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
                ${post.image.toUpperCase()}
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

                <br>

                <a href="blog.html?id=${post.id}" class="read-more">
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


themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("dark");

});


/* =========================
   INITIALIZE
========================= */

displayPosts();