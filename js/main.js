import ui from "./ui.js"
import api from "./api.js"

const setFilmes = new Set()
async function adicionarChave() {
  try {
    const filmes = await api.buscarFilmes()
    filmes.forEach(filme => {
      const chaveFilme = `${filme.nome.trim().toLowerCase()}`
      setFilmes.add(chaveFilme)
    })
  } catch (error) {
    alert("Erro ao adicionar chave")
  }
};

const nomeComRegex = /^[a-zA-Z0-9]*$/
const generoComRegex = /^[a-zA-Z]*$/
function validarGenero(genero) {
  return generoComRegex.test(genero)
}
function validarNome(nome) {
  return nomeComRegex.test(nome)
}
function removerEspacos(string) {
  return string.replaceAll(/\s+/g, '')
}

document.addEventListener("DOMContentLoaded", () => {
  ui.renderizarFilmes()
  adicionarChave()

  const formularioFilme = document.getElementById("filme-form")
  const botaoCancelar = document.getElementById("botao-cancelar")


  formularioFilme.addEventListener("submit", manipularSubmissaoFormulario)
  botaoCancelar.addEventListener("click", manipularCancelamento)
  inputBusca.addEventListener("input", manipularBusca)

})

async function manipularSubmissaoFormulario(event) {
  event.preventDefault()
  const id = document.getElementById("filme-id").value
  const nome = document.getElementById("filme-nome").value
  const genero = document.getElementById("filme-genero").value
  const data = document.getElementById("filme-data").value

  const nomeSemEspaco = removerEspacos(nome)
  const generoSemEspaco = removerEspacos(genero)

  const chaveNovoFilme = `${nome.trim().toLowerCase()}`

  if (setFilmes.has(chaveNovoFilme)) {
    alert("Esse filme já existe")
    return
  }

  if (!validarData(data)) {
    alert("Parece que o filme ainda não foi lançado.")
    return
  }
  if (!validarNome(nomeSemEspaco)) {
    alert("O filme só pode conter letras e números")
    return
  }
  if (!validarGenero(generoSemEspaco)) {
    alert("O gênero só pode conter letras")
    return
  }

  try {
    if (id) {
      await api.editarFilme({ id, nome, genero, data })
    } else {
      await api.salvarFilme({ nome, genero, data })
    }
    ui.renderizarFilmes()
  } catch {
    alert("Erro ao salvar filme")
  }

}

function manipularCancelamento() {
  ui.limparFormulario()
}

async function manipularBusca() {
  const termoBusca = document.getElementById("campo-busca").value
  try {
    const filmesFiltrados = await api.buscarFilmePorTermo(termoBusca)
    ui.renderizarFilmes(filmesFiltrados)
  } catch (error) {
    alert("Erro ao buscar filmes")
  }

}

function validarData(data) {
  const dataAtual = new Date()
  const dataInserida = new Date(data)
  return dataInserida <= dataAtual
}