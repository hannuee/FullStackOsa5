import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => { token = `bearer ${newToken}`}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = { headers: { Authorization: token } }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (id, updatedBlog) => {
  const config = { headers: { Authorization: token } }
  const response = await axios.put(baseUrl.concat('/', id), updatedBlog, config)
  return response.data
}

const deletion = async (id) => {
  const config = { headers: { Authorization: token } }
  const response = await axios.delete(baseUrl.concat('/', id), config)
  return response.data
}

export default { getAll, create, update, deletion, setToken }