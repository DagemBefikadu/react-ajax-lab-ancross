import React from 'react'

export default function DisplayCards(props) {

const villagerList = props.villagers.map(villager=>{
    return <li>
    {/* <img src={villager['image_uri']} alt="" /> */}
    <img src={villager.image_uri} alt="{villager.name['name-USen']}" />
    <p>{villager.name['name-USen']} </p>
    </li>
  })
    return (
        <div>
            <h1>
                This is display cards component
                <ul>
                {villagerList}
                </ul>
            </h1>
        </div>
    )
}
