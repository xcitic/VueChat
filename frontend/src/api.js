import axios from 'axios'

// Use different endpoints for different API endpoints (seperate each service into microservices)
const endpoint = axios.create({
  baseURL: 'http://localhost:3000/api/',
  json: true
})

export default {
  // Base api call method
  async apiCall (method, resource, data) {
    // TODO pass the authToken
    let authToken = 'tempToken'
    return endpoint({
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
    return this.apiCall('post', '/login', data)
  },

  logout () {
    return this.apiCall('get', '/logout')
  },

  getUser () {
    return this.apiCall('get', '/user')
  }
}
