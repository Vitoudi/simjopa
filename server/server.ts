import { app } from "./app";
import { auth } from "./middlewares/auth";
import { committesRouter } from "./routes/committes";
import { router as journalistsRouter } from "./routes/journalists";
import { loginRouter } from "./routes/login";
import { postsRouter } from "./routes/posts";
import { signUpRouter } from "./routes/signUp";
import { usersRouter } from "./routes/users";

const PORT = 8080;

app.use("/journalists", journalistsRouter);
app.use("/posts", postsRouter);
app.use("/committes", committesRouter);
app.use("/users", usersRouter);
app.use("/login", loginRouter);
app.use("/signup", signUpRouter);
app.use(auth);


app.listen(PORT, () => console.log("listening on port: " + PORT));
