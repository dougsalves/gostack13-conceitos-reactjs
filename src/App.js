import React, { useState, useEffect } from "react";

import api from './services/api'

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([])
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [techs, setTechs] = useState([])

  async function handleAddRepository() {
    const newRepository = await api.post('repositories', {
      title,
      url,
      techs
    })

    setRepositories([...repositories, newRepository.data])
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`)

    const updatedRepositories = repositories.filter(repository => {
      return repository.id !== id
    })

    setRepositories(updatedRepositories)
  }

  useEffect(() => {
    api.get('repositories').then((resp) => {
      setRepositories(resp.data)
      console.log(resp.data)
    })
  }, [])

  return (
    <div>
      <section id="form-group">
        <div className="input-block">
          <label htmlFor="title">Title</label>
          <input 
            type="text" id="title" 
            value={title} onChange={e => setTitle(e.target.value)}
          />
        </div>
        
        <div className="input-block">
          <label htmlFor="url">GitHub URL</label>
          <input 
            type="text" id="url"
            value={url} onChange={e => setUrl(e.target.value)}
          />
        </div>
        
        <div className="input-block">
          <label htmlFor="techs">Techs (separe por ",")</label>
          <input 
            type="text" id="techs"
            value={techs} onChange={e => setTechs(e.target.value.split(','))}
          />
        </div>

        <button onClick={handleAddRepository}>Adicionar</button>
      </section>

      <ul data-testid="repository-list">
        {repositories.map(repositorie => {
          return (
            <li key={repositorie.id}>
              {repositorie.title}
              <button
                type='button'
                onClick={() => handleRemoveRepository(repositorie.id)}
              >
                Remover
            </button>
            </li>
          )
        })}
      </ul>
    </div>
  );
}

export default App;
