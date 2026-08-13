/* =========================
   GET ARTICLE ID
========================= */

const params = new URLSearchParams(
    window.location.search
);

const articleId = Number(
    params.get("id")
);


/* =========================
   FIND ARTICLE
========================= */

const article = posts.find(
    post => post.id === articleId
);


/* =========================
   CHECK ARTICLE
========================= */

if (!article) {

    document.querySelector(".article-container").innerHTML = `

        <div class="article-not-found">

            <h1>
                Article Not Found
            </h1>

            <p>
                Sorry, the article you're looking for
                doesn't exist.
            </p>

            <a href="index.html">
                ← Back to Home
            </a>

        </div>

    `;

} else {

    displayArticle();

}


/* =========================
   DISPLAY ARTICLE
========================= */

function displayArticle() {

    document.title =
        `${article.title} - InkSpace`;


    document.getElementById(
        "article-category"
    ).textContent =
        article.category;


    document.getElementById(
        "article-title"
    ).textContent =
        article.title;


    document.getElementById(
        "article-excerpt"
    ).textContent =
        article.excerpt;


    document.getElementById(
        "article-date"
    ).textContent =
        article.date;


    const articleImage =
        document.getElementById(
            "article-image"
        );


    articleImage.src =
        article.image;


    articleImage.alt =
        article.title;


    document.getElementById(
        "article-content"
    ).innerHTML =
        article.content;


    displayTags();

    displayRelatedArticles();

    setupSharing();

    loadComments();

}


/* =========================
   TAGS
========================= */

function displayTags() {

    const tagsContainer =
        document.getElementById(
            "article-tags"
        );


    tagsContainer.innerHTML = "";


    article.tags.forEach(tag => {

        const tagElement =
            document.createElement("span");


        tagElement.className =
            "article-tag";


        tagElement.textContent =
            `#${tag}`;


        tagsContainer.appendChild(
            tagElement
        );

    });

}


/* =========================
   RELATED ARTICLES
========================= */

function displayRelatedArticles() {

    const relatedContainer =
        document.getElementById(
            "related-posts"
        );


    const relatedPosts =
        posts
            .filter(post =>
                post.id !== article.id &&
                post.category === article.category
            )
            .slice(0, 3);


    relatedContainer.innerHTML = "";


    relatedPosts.forEach(post => {

        const card =
            document.createElement("article");


        card.className =
            "post-card";


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


                <a
                    href="blog.html?id=${post.id}"
                    class="read-more"
                >
                    Read Article →
                </a>

            </div>

        `;


        relatedContainer.appendChild(
            card
        );

    });

}


/* =========================
   SOCIAL SHARING
========================= */

function setupSharing() {

    const currentUrl =
        encodeURIComponent(
            window.location.href
        );


    const title =
        encodeURIComponent(
            article.title
        );


    document
        .getElementById("share-linkedin")
        .addEventListener("click", () => {

            window.open(
                `https://www.linkedin.com/sharing/share-offsite/?url=${currentUrl}`,
                "_blank"
            );

        });


    document
        .getElementById("share-x")
        .addEventListener("click", () => {

            window.open(
                `https://twitter.com/intent/tweet?text=${title}&url=${currentUrl}`,
                "_blank"
            );

        });


    document
        .getElementById("copy-link")
        .addEventListener("click", async () => {

            try {

                await navigator.clipboard.writeText(
                    window.location.href
                );

                document.getElementById(
                    "copy-link"
                ).textContent =
                    "Copied!";

                setTimeout(() => {

                    document.getElementById(
                        "copy-link"
                    ).textContent =
                        "Copy Link";

                }, 2000);

            } catch (error) {

                alert(
                    "Unable to copy link."
                );

            }

        });

}


/* =========================
   COMMENTS
========================= */

function getCommentKey() {

    return `inkspace-comments-${article.id}`;

}


function loadComments() {

    const comments =
        JSON.parse(
            localStorage.getItem(
                getCommentKey()
            )
        ) || [];


    const commentsList =
        document.getElementById(
            "comments-list"
        );


    commentsList.innerHTML = "";


    comments.forEach(comment => {

        const commentElement =
            document.createElement("div");


        commentElement.className =
            "comment";


        commentElement.innerHTML = `

            <strong>
                ${comment.name}
            </strong>

            <p>
                ${comment.text}
            </p>

        `;


        commentsList.appendChild(
            commentElement
        );

    });

}


document
    .getElementById("comment-form")
    .addEventListener("submit", event => {

        event.preventDefault();


        const name =
            document.getElementById(
                "comment-name"
            ).value.trim();


        const text =
            document.getElementById(
                "comment-text"
            ).value.trim();


        if (!name || !text) {
            return;
        }


        const comments =
            JSON.parse(
                localStorage.getItem(
                    getCommentKey()
                )
            ) || [];


        comments.push({
            name: name,
            text: text
        });


        localStorage.setItem(
            getCommentKey(),
            JSON.stringify(comments)
        );


        document.getElementById(
            "comment-form"
        ).reset();


        loadComments();

    });