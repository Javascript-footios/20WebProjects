const postContainer = document.getElementById("post-container");
const loading = document.querySelector(".loader");
const filter = document.getElementById("filter");

let limit = 5;
let page = 1;

async function getPosts() {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
  );
  const data = await res.json();
  return data;
}

async function showPosts() {
  // loading.classList.add("show");
  const posts = await getPosts();
  posts.forEach((post) => {
    const postEl = document.createElement("article");
    postEl.classList.add("post");
    postEl.innerHTML = `
            <div class="number">${post.id}</div>
              <section class="post-info">
                <h2 class="post-title">${post.title}</h2>
                  <p class="post-body">
                  ${post.body}
                  </p>
              </section>
            `;
    postContainer.appendChild(postEl);
    // loading.classList.remove("show");
  });

  console.log(posts);
}

function filterPosts(e) {
  const term = e.target.value.toUpperCase();
  const posts = document.querySelectorAll(".post");
  console.log(posts);
  posts.forEach((post) => {
    const title = post.querySelector(".post-title").innerText.toUpperCase();
    const body = post.querySelector(".post-body").innerText.toUpperCase();

    if (title.indexOf(term) > -1 || body.indexOf(term) > -1) {
      post.style.display = "fles";
    } else {
      post.style.display = "none";
    }
  });
}

function showLoading() {
  loading.classList.add("show");

  setTimeout(() => {
    loading.classList.remove("show");

    setTimeout(() => {
      page++;
      showPosts();
    }, 300);
  }, 1000);
}

showPosts();

window.addEventListener("scroll", () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if (scrollTop + clientHeight >= scrollHeight - 5) {
    showLoading();
  }
});

filter.addEventListener("input", filterPosts);
