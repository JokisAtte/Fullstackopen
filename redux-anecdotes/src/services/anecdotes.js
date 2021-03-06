import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const response = await axios.post(baseUrl, content)
  return response.data
}

const addVote = async (id) => {
  const url = baseUrl + `/${id}`
  const get = await axios.get(url)
  const anec = get.data
  const response = await axios.put(url,{...anec, votes: anec.votes + 1})
  return response.data
}

export default { getAll, createNew, addVote }