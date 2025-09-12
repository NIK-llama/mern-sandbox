const express = require("express");
const mongoose = require("mongoose");

const { userRouter } = require("./routes/user");
const { courseRouter } = require("./routes/course");
const { adminRouter } = require("./routes/admin");

const app = express();

app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/course", courseRouter);

async function main() {
    await mongoose.connect("mongodb+srv://nik:29IcOSqcV4g1qgfN@cluster0.5lf5tpm.mongodb.net/courseAppDB");
    app.listen(3000);
}

main();