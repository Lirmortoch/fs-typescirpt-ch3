import express from 'express';
const app = express();
app.use(express.json());

const PORT = 3000;

app.get('/api/ping', (_req, res) => {
  console.log('Someone pinged there!');
  res.send('pong');
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`)
});