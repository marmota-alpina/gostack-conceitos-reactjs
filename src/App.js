import React, {useState, useEffect} from "react";

import "./styles.css";
import api from "./services/api";

function App() {
  
  const [repositories, setRepositories] =  useState([]);

  useEffect(()=>{
    api.get('repositories').then((response)=>{
        setRepositories(response.data);
    })
  }, []);

  async function handleAddRepository() {
    api.post('repositories',{
      title: `My repository test ${Date.now()}`,
      url: 'https://github.com/rundev-br/gostack-conceitos-reactjs',
      techs: ['JavaScript', 'Node']
    }).then(response=>{
      setRepositories([...repositories, response.data]);
    })
  }

  async function handleRemoveRepository(id) {
    api.delete(`repositories/${id}`).then(response=>{
      const data = repositories.filter(repository=>{
        return repository.id!==id;
      })

      setRepositories(data);
      
    });
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository)=>{
          return (
            <li key={repository.id}>
              {repository.title}

              <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
              </button>
            </li>
          );
        })}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>

    </div>
  );
}

export default App;
