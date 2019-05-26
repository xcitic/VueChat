import axios from 'axios'

// Can use different clients for different API endpoints (seperate each service into microservices)
const client = axios.create({
  baseURL: 'http://localhost:3000/api/',
  json: true
})

export default {
  // Base api call method
  async execute (method, resource, data) {
    // TODO pass the JWT token
    let authToken = 'tempToken'
    return client({
      method,
      url: resource,
      data,
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    }).then(req => {
      return req.data
    })
  },
  // All the API calls

  login (data) {
    return this.execute('post', '/login', data)
  },

  logout () {
    return this.execute('get', '/logout')
  },

  getUser () {
    return this.execute('get', '/user')
  }
}
