const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(express.json());
app.use(cors({ origin: true }));

app.post("/authenticate", async (req, res) => {
    const { username } = req.body;
    try {
      const r = await axios.put(
        "https://api.chatengine.io/users/",
        { username: username, secret: username, first_name: username },
        { headers: { "Private-Key": "700c6b55-abb1-42a3-af48-f2a6a2141a4f" } }
      );
      return res.status(r.status).json(r.data);
    } catch (e) {
      if (e.response) {
        // If e.response exists, use its properties
        return res.status(e.response.status).json(e.response.data);
      } else {
        // Handle the case where e.response is undefined
        return res.status(500).json({ error: 'Internal Server Error' });
      }
    }
  });
  

app.listen(3001);