import { useEffect, useState } from 'react';
import './App.css';
import DisplayCards from './DisplayCards';

function App() {
  let [data, setData] = useState({villagers: []})
  const [search, setSearch] = useState("")

  const handleChange = (e) => {
    setSearch(e.target.value)
  }

  useEffect(() => {
    fetch('http://acnhapi.com/v1/villagers/')
    .then(response=> response.json())
    .then(rdata=>{
      rdata = Object.values(rdata)
      setData({villagers: rdata})
      console.log('Villagers Data:', rdata)
    })
  }, [])
  
  // const getFilteredVillagers = () => {
  //   return data.villagers.filter((v) => {
  //     //we have to return something that is true or false so a boolean
  //     return v.name["name-USen"].toLowerCase().includes(search.toLowerCase())
  //       })
  // }

  const getFilteredVillagers = () => {
    let searchTerm = search.toLowerCase()
    return data.villagers.filter((v) => {
      let lowerCaseName = v.name["name-USen"]
      //we have to return something that is true or false so a boolean
      return lowerCaseName.includes(searchTerm)
        })
  }

  // const villagerList = data.villagers.map(villager=>{
  //   return <li>{villager.name['name-USen']}</li>
  // })
  return (
    <div className="App">
      <label htmlFor="villager-search">Search</label>
      <input type="text" 
      id="villager-search"
      value={search}
      onChange={handleChange}
      />
      <DisplayCards villagers={getFilteredVillagers()}/>
      {/* <ul>{villagerList}</ul> */}
    </div>
  );
}

export default App;
