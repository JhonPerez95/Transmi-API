import config from './config/config'
import app from './config/server'

const port = config.server.port

app.listen(port, () => {
  console.log(`Server in port ${port}`)
})
