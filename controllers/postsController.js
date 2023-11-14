const posts = require('../db/arrayPosts')

function index (req, res) {

    res.format({
        html: () => {        
            res.type("html")
            const html = [`<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
            <h1>Lista dei post</h1>`];

            html.push("<ul class=''>");

            posts.forEach(post => {
                html.push(`<li>
                    <h2>${post.title}</h2>
                    <p>${post.content}</p>
                    <img src="/assets/images/${post.image}" alt="${post.title}" class="w-25"><br>`);
            
                post.tags.forEach(tag => {
                    html.push(`<span class="badge bg-primary">${tag}</span>`);
                });
            
                html.push(`</li>`);
            });

            res.send(html.join(""));
        },
        json: () => {
            res.type("json").send(JSON.stringify(posts))
        },
        default: () => {
            res.status(406).send("Not Acceptable");
        },
    })
}

function show (req, res) {
    const slug = req.params.slug;
    const post = posts.find(post => post.slug === slug);

    if (post) {
        res.format({
            html: () => {
                res.type("html")
                const html = [`<h1>${post.title}</h1>`];

                html.push(`<p>${post.content}</p>`);

                html.push(`<img src="/assets/images/${post.image}" alt="${post.title}" class="w-25"><br>`);

                post.tags.forEach(tag => {
                    html.push(`<span class="badge bg-primary">${tag}</span>`);
                });

                res.send(html.join(""));
            },
            json: () => {
                res.type("json").send(JSON.stringify(post))
            },
            default: () => {
                res.status(406).send("Not Acceptable");
            },
        })
    } else {
        res.status(404).send("Post not found");
    }
}

function create (req, res) {
    res.format({
        html: () => {
            res.type("html").send(
                "<h1>Creazione nuovo post</h1>"
            );
        },
        default: () => {
            res.status(406).send("Not Acceptable");
        },
    })
}

function download (req, res) {
    const slug = req.params.slug;
    const post = posts.find(post => post.slug === slug);

    if (post) {
        res.download(`./public/assets/images/${post.image}`, `${post.slug}.png`);
    } else {
        res.status(404).send("Post not found");
    }

}
module.exports = {
  index,
  show,
  create,
  download,
}