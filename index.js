import express from "express";

const app = express();

const PORT = parseInt(process.env.PORT) || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});

app.use((req, res) => {
  res.status(404).json({
    error: "Not found",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
