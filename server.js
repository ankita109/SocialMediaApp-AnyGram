const express =require("express");

const app =express();
const dbconnection=require("./db")
const usersRoute=require("./routes/usersRoute")
const postsRoute=require("./routes/postsRoute")
const path = require("path");

app.use(express.json({limit:'25mb'}))

app.use('/api/users/' , usersRoute)
app.use('/api/posts/', postsRoute)

const port = process.env.PORT || 5000;


if (process.env.NODE_ENV === "production") {
app.use('/',express.static( "/client/build"));
app.get("*", (req, res) => {
res.sendFile(path.resolve(__dirname, "client/build/index.html"));
});
}
app.listen(port,()=> console.log(`Server running on port ${port}`));