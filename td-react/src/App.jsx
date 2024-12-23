import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function MainContent(props){
    return (
        <p>Bonjour, on est le {props.jour}, {props.mois}, {props.anne} et il est {props.heure}:{props.min}:{props.sec}</p>
    )
}
function Foot (props){
    return (
        <footer>Tous droits réservés ©{props.anne}  - {props.nom} {props.prenom}" - Le texte doit s'afficher tout en bas de la page et centré au millieu</footer>
    )
}
function Header() {
    return (
        <header>
            <img src={"https://upload.wikimedia.org/wikipedia/commons/4/4f/Logo_universit%C3%A9_c%C3%B4te_azur.png"} alt="Image" style={{ width: 'auto', height: '100px' }}/>
            <h1>Introduction à React</h1>
            <h2>A la découverte des premières notions de React</h2>
        </header>
    );
}

function App() {
  const [count, setCount] = useState(0)
    const currentDate = new Date();
    const jour = currentDate.toLocaleDateString('fr-FR', { weekday: 'long' });
    const mois = currentDate.toLocaleDateString('fr-FR', { month: 'long' });
    const anne = currentDate.getFullYear();
    const heure = currentDate.getHours().toString().padStart(2, '0');
    const min = currentDate.getMinutes().toString().padStart(2, '0');
    const sec = currentDate.getSeconds().toString().padStart(2, '0');

  return (
    <>
        <Header />
        <MainContent
            jour={jour}
            mois={mois}
            anne={anne}
            heure={heure}
            min={min}
            sec={sec}
        />
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Emsi + mbds</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
        <Foot anne={anne} nom={"Asri"} prenom={"Mohamed Amine"} />
    </>
  )
}

export default App
