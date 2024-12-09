import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();
const apiKey = process.env.WEATHER_API_KEY; //environment variable for API key

app.use(
  cors({
    //bypasses security restrictions and allows connection flow from origin
    origin: ["http://localhost:3001"],
  })
);

//api call for locations from city searches, limited to 5 due to OpenWeather's api limitations
app.get("/api/location", async (req, res) => {
  const keyWord = req.query.q;
  const response = await fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${keyWord}&limit=5&appid=${apiKey}`
  );
  const data = await response.json();
  res.json(data);
});

//api call for weather based on location
app.get("/api/weather", async (req, res) => {
  const lat = req.query.lat;
  const lon = req.query.lon;
  const temp = req.query.units;

  const response = await fetch(
    `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=${temp}&appid=${apiKey}`
  );
  const data = await response.json();
  res.json(data);
});

app.listen(3000, () => console.log("Server is running on port 3000")); //check to see if backend runs after startup
