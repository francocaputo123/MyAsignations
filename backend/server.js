import express from "express";
import fetch from "node-fetch";
import cors from "cors"

const app = express();
const PORT = 3001;

app.use(cors())

app.get("/api/asignaciones/:legajo", async (req, res) => {
  const { legajo } = req.params;

  const url =
    `http://proveedores.alsea.com.ar:48080` +
    `/asignaciones-server/mobile/main/asignaciones/legajos/${legajo}`;

  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "AndroidApp/1.0",
        "Accept": "application/json"
      }
    });

    const data = await response.json();
    res.json(data);

  } catch (err) {
    res.status(500).json({ error: "Error servidor" });
  }
});

app.listen(PORT, () =>
  console.log(`Backend activo en http://localhost:${PORT}`)
);
