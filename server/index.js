const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
