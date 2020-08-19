import React, { useState, useEffect } from "react";

import api from './services/api'

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([])

  async function handleAddRepository() {
    const newRepository = await api.post('repositories', {
      title: `New Repository ${Date.now()}`,
      url: `http://teste.com/${Date.now()}`,
      techs: [
        "NodeJS",
        "Middlewares",
        "Params"
      ]
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
          <label htmlFor="name">Name</label>
          <input type="text" id="name" />
        </div>
        
        <div className="input-block">
          <label htmlFor="url">GitHub URL</label>
          <input type="text" id="url" />
        </div>
        
        <div className="input-block">
          <label htmlFor="techs">Techs</label>
          <input type="text" id="techs" />
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
