const url = "http://localhost:3000"

const converterData = (dataString) => {
  const [ano] = dataString.split("-")
  return ano
}

const api = {

  async buscarFilmes() {
    try {
      const response = await axios.get(`${url}/filmes`)
      const filmes = await response.data
      return filmes.map(filme => {
        return {
          ...filme,
          data: converterData(filme.data)
        }
      })
    }
    catch {
      alert('Erro ao buscar filmes')
      throw error
    }
  },

  async salvarFilme(filme) {
    try {
      const response = await axios.post(`${url}/filmes`, {
        ...filme,
        data: converterData(filme.data)
      })
      return await response.data
    }
    catch {
      alert('Erro ao salvar filme')
      throw error
    }
  },

  async buscarFilmePorId(id) {
    try {
      const response = await axios.get(`${url}/filmes/${id}`)
      const filme = await response.data
      return {
        ...filme,
        data: converterData(filme.data)
      }
    }
    catch {
      alert('Erro ao buscar filme')
      throw error
    }
  },

  async editarFilme(filme) {
    try {
      const response = await axios.put(`${url}/filmes/${filme.id}`, filme)
      return await response.data
    }
    catch {
      alert('Erro ao editar filme')
      throw error
    }
  },

  async excluirFilme(id) {
    try {
      const response = await axios.delete(`${url}/filmes/${id}`)
    }
    catch {
      alert('Erro ao excluir um filme')
      throw error
    }
  },

  async buscarFilmePorTermo(termo) {
    try {
      const filmes = await this.buscarFilmes()
      const termoEmMinusculo = termo.toLowerCase()
      const filmesFiltrados = filmes.filter(filme => {
        return filme.nome.toLowerCase().includes(termoEmMinusculo) || filme.genero.toLowerCase().includes(termoEmMinusculo)
      })
      return filmesFiltrados
    } catch (error) {
      alert("Erro ao filtrar filmes")
      throw error
    }
  },

  async atualizarFavorito(id, favorito) {
    try {
      const response = await axios.patch(`${url}/filmes/${id}`, { favorito })
      return response.data
    }
    catch (error) {
      alert('Erro ao atualizar o favorito')
      throw error
    }
  },
}

export default api