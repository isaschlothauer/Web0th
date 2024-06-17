import express, { Express } from 'express';
const app: Express = express()
const port = 5001

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})