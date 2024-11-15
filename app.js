const express = require("express")
const app = express()
const userModel = require("./models/user.model")
require("./config/db.config")


app.set("view engine", "ejs")
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.get("/", function (req, res) {
  res.render("index")
})
app.get("/card", async function (req, res) {
  let users = await userModel.find();
  res.render("card", { users })
})
app.post('/register', async function (req, res) {
  console.log('Request received:', req.body);


  const user = await userModel.create({ name: req.body.name, age: req.body.age, email: req.body.email });
  console.log('User created:', user);
  res.redirect('/card');
});
app.get("/delete/:id", async function (req, res) {
  await userModel.findOneAndDelete({ _id: req.params.id })
  res.redirect("/card")
})

app.get('/update/:id', async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).send('User not found');
    }
    res.render('edit', { user });
  } catch (error) {
    console.error('Error fetching user:', error.message);
    res.status(500).send('Error fetching user');
  }
});
app.get('/update-note/:id', async (req, res) => {
  const userId = req.params.id;
  const { name, age, email } = req.query;


  await userModel.findByIdAndUpdate(userId, { name, age, email });
  res.redirect('/card');
});


app.listen(3000, function (err) {
  console.log("success");

})