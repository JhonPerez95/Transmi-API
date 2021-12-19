import app from './config/server'

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`Server in port ${port}`)
})
