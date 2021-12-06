import { useEffect, useState } from 'react';
import './App.css';
import DisplayCards from './DisplayCards';

function App() {
  let [data, setData] = useState({villagers: []})

  useEffect(() => {
    fetch('http://acnhapi.com/v1/villagers/')
    .then(response=> response.json())
    .then(rdata=>{
      rdata = Object.values(rdata)
      setData({villagers: rdata})
      console.log('Villagers Data:', rdata)
    })
  }, [])

  // const villagerList = data.villagers.map(villager=>{
  //   return <li>{villager.name['name-USen']}</li>
  // })
  return (
    <div className="App">
      <label htmlFor="villager-search"></label>
      <input type="text" 
      id="villager-search"
      value={search}
      onChange={onChange}
      />
      <DisplayCards villagers={data.villagers}/>
      {/* <ul>{villagerList}</ul> */}
    </div>
  );
}

export default App;
