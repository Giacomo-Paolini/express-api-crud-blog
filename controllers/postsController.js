const posts = require('../db/arrayPosts.json')
const FileSystem = require('fs');
const path = require('path');

function index (req, res) {

    res.format({
        html: () => {        
            res.type("html")
            const html = [`<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
            <h1>Lista dei post</h1>`];

            html.push("<ul class=''>");

            posts.forEach(post => {
                let imageUrl = post.image.startsWith('http') ? post.image : `/assets/images/${post.image}`;

                html.push(`<li>
                    <h2>${post.title}</h2>
                    <p>${post.content}</p>
                    <img src="${imageUrl}" alt="${post.title}" class="w-25"><br>`);
                if(post.tags) {
                    post.tags.forEach(tag => {
                        html.push(`<span class="badge bg-primary">${tag}</span>`);
                    });
                }
            
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

                html.push(`<img src="${imageUrl}" alt="${post.title}" class="w-25"><br>`);

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
    let imageUrl = post.image.startsWith('http') ? post.image : `/assets/images/${post.image}`;


    if (post) {
        res.download(`${imageUrl}`, `${post.slug}.png`);
    } else {
        res.status(404).send("Post not found");
    }

}

function store(req, res) {
    const newPost = {
        title: req.body.title,
        content: req.body.content,
        slug: req.body.slug,
        image: req.body.image
    };

    console.log(newPost);

    posts.push(newPost);

    FileSystem.writeFileSync(path.resolve('./db/arrayPosts.json'), JSON.stringify(posts), (err) => {
        if (err) {
            console.log(err);
        }
    });

    res.format({
        html: () => {
            res.type("html").send(
                "<h1>Creazione nuovo post</h1>"
            );
        },
        json: () => {
            res.type("json").status(201).send(JSON.stringify(newPost));
        },
        default: () => {
            res.status(406).send("Not Acceptable");
        },
    });
}



module.exports = {
  index,
  show,
  create,
  download,
  store,
}