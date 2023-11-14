function index (req, res) {

    res.format({
    text: () => {
      res.type("text").send("Hello World!");
    },
    html: () => {        
      res.type("html").send("<h1>Benvenuto nel mio blog!</h1>");
    },
    json: () => {
      res.type("json").send({
        message: "Hello World!",
      });
    },
    default: () => {
      res.status(406).send("Not Acceptable");
    },
  })
}

module.exports = {
  index,
}