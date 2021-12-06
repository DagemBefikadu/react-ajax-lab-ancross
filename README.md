# 'AnCross', or 'a React Lesson about complex APIs'

### What are we doing?

**Glad you asked.** Today we will be making a react app that queries an API that returns an *object of objects*. We want to process that object and return an instance of each one, then make a feature where we can "favorite" as many instances as we want!

### The API

[Animal Crossing: New Horizons](https://acnhapi.com/doc)

Specifically, we'll be using the [villagers endpoints](https://acnhapi.com/doc#tag/Villagers) to render a list of villagers.

Check out the [all villagers endpoint](http://acnhapi.com/v1/villagers/) in your broswer to get an idea of what data we'll be working with.

## Getting Started

To start, let's go ahead and instantiate a new react app. We'll use:
``` bash
npx create-react-app villager_faves
```
and we won't need any additional NPM packages, so we're now ready to 
``` bash
cd villager_faves
code .
npm start
```

## Clear the canvas.

The first thing I like to do once I know my React App is working is to delete the boilerplate code given to us by `create-react-app`. From our `return(` statement, let's remove:
``` html
<header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
</header>
```

Great! Now we have a truly empty workspace.

## Fetch the Data

AJAX API calls are a "side effect", which means our fetch call will go inside the [useEffect](https://reactjs.org/docs/hooks-effect.html) hook.

Import useEffect at the top of App.js:

``` js
import { useEffect } from 'react'
```

Now add the useEffect to the App component, fetch the data, and print it to the console:

``` js
  useEffect(() => {
    fetch('http://acnhapi.com/v1/villagers/')
      .then(response => response.json())
      .then((rdata) => {
        console.log('Villager Data:', rdata)
      })
  }, [])
  ```

## Make the data iterable

Now, how do we surf through an object and turn it into a useable iterable? We want to render a card for *each and every object in here* so we know that this needs to be treated like an array. How do we do that?

Javascript has a really handy method called `Object.values()`. This method takes an *object* as an argument, and returns all the *values* within that object as an array. Re-assign `rdata` to hold the values from the response data in an array.

Adapt your useEffect to look like so:
``` js
  useEffect(() => {
    fetch('http://acnhapi.com/v1/villagers/')
    .then(response => response.json())
    .then((rdata) => {
      rdata = Object.values(rdata)
      console.log(rdata)
    })
  }, [])
```

Super! Now our `rdata` variable should represent an *array of objects*. This is much more usable given our app!

## Made the Data Useable

We want to use this data to (for now), render a list of every villager's name. Store the array of villagers in state so you can access it within the render method. What Hook do you need for this?

at the top, import useState
```js
import { useEffect, useState } from 'react'
```

Set up a villagerData state
```js
  let [data, setData] = useState({villagers: []})
```

Adapt the useEffect:

```js
  useEffect(() => {
    fetch('http://acnhapi.com/v1/villagers/')
      .then(response => response.json())
      .then((rdata) => {
        rdata = Object.values(rdata)
        setData({villagers: rdata})
        console.log('Villager Data:', rdata)
      })
  }, [])
```

## Render a list of villager names

Use the map iterator to render a list of villager names.

<details>
<summary></summary>
        
```js
  const villagerList = data.villagers.map((villager)=>{
    return <li>{villager.name['name-USen']}</li>
  })
  return (
    <div className="App">
      <ul>{villagerList}</ul> 
    </div>
  )
```
        
</details>

## Build It Out: DisplayCards
Now that we can pull in and display the data, we'll begin to build out our app! Eventually, we'll render several villager cards onto the page. Let's first send our villager data to a DisplayCards component that displays the image and name for each villager.


Replace the App.js content with a DisplayCards component that recieves a villagers prop:

```js
    <div className="App">
      <DisplayCards villagers={data.villagers}/>
    </div>
```

Now build out DisplayCards so it renders a list of villagers, displaying their name **and their image**. (Where is the image in the data?)

<details>
<summary>Solution</summary>

Inside of `DisplayCards.js`

```js
function DisplayCards(props) {
    const allVillagers = props.villagers.map(v=>{
        return (
            <li>
                <img src={v.image_uri} alt={v.name['name-USen']} />
                <p>{v.name['name-USen']}</p>
            </li>
        )
    })
    return (
        <ul>{allVillagers}</ul>
    )
}

export default DisplayCards
```
</details>
<br>
Got it? Well done!

## Add a Search Filter

But what if we wanted to add a feature where users could search for a particular villager? How could we implement dynamic search functionality, the like of which we used in Fruit Filter, here in this application? Take a moment to work independently and see if you can develop a feature which can handle this!

<details>
<summary></summary>


```js
  const dynamicSearch = () => {
      return data.hits.filter(villager => villager.name['name-USen'].toLowerCase().includes(search.toLowerCase()))
  }
```

and within the return...

```js
  <div className="searchBox">
    <input type="text" value={search} onChange={handleChange} />
  </div>
```

</details>

Finish that quick? Pack it into a separate component for extra practice!!

## Even further! Favorite functionality:

Awesome!! Now our users can search for a particular villager, and *just* render that villager. Neat! 
But what if we wanted to develop a list of favorites? It's not that difficult, remember we have all the pieces we need! We just need to develop a new state variable to track villagers that the user likes.

Let's do just that:
```js
let [favs, setFavs] = useState([])
```
Now, we just need to build a function that can populate that state. Let's stop and consider how we want our users to interact with our page.

For simplicity's sake, I think I would prefer if the user could simply click on a villager portrait, and that would populate that villager into the array. That's easy in react! Remember `onClick`?

```js
  const handleClick = (villager) => {
      setFavs([...favs, villager])
  }
```

PAUSE! How is our spread operator working here? Why are we using it here? 
React behaves a bit differently than we're used to. Traditionally, if we wanted to add to an array we would simply `.push()` to it, but React state, as we know, is a bit different.

We have a few different options to push array data to state, but this is a clean, easy to read and understand version. What we are doing is "spreading" the current favs state, and applying it to the "first" value of an array we're generating here. Hence the array notation. The *last* thing in the array will be the *new villager* we have created, the one being passed into `handleClick`.

Super!! So in terms of raw functionality, we now just need to display these villagers for the user to see. How can we reuse an existing React component to accomplish this?

**hint: we already have a displayCards component!**

<details>
<summary></summary>
In app.js...

```js
  <div className="favBox">
        <DisplayCards data={favs} />
  </div>

```

</details>

Ease McPease.

## But wait. There's more!

Our functionality is glorious at this point, but we currently have a few edge cases that need to be handled. Independently, try to work out what edge cases we need to handle, and how we can resolve them!

<details>
<summary>Don't you open this until you've given this a good shot.</summary>
First issue: We can send a villager to our faves array multiple times. While it does resemble my preference of having 45 instances of Chevre as my "favorite villagers" it's actually a fairly poor user experience. Here's how I might fix it:

```js
  const handleClick = (villager) => {
    if(!favs.includes(villager)){
      setFavs([...favs, villager])
    }
  }
```

simple enough!

Second issue: if we click a villager inside of our "faves" display, it results in an error. This is because we do *not* want onClick functionality for our faves to share the onClick functionality with our standard display. There are great ways to fix this, but here's a lazy solution that will easily patch right over:

```js
//in app.js
 <div>
    <DisplayCards clickie={true} handleClick={handleClick} data={dynamicSearch()}/>
  </div>
  <div className="favBox">
    <DisplayCards clickie={false} data={favs} />
  </div>
```
Simple enough, I've added a boolean value as props to each of my displayCards components. Now let's handle the logic on the DisplayCards end.

```js
// in DisplayCards.js
<div key={i} className="villagerCard" onClick={() => props.clickie ? props.handleClick(villager) : null}>
  <img className="villagerPic" src={villager['image_uri']} alt={villager.name['name-USen']} />
  <p>{villager.name['name-USen']}</p>
</div>

```

Again, there are other solutions to this problem! But in this case, we've patched right over the error. If "clickie" is true, great! Run the handleClick. However, if it is *not* then the computer will not even make the attempt to run the function. The onClick behavior resolves to `null`.

</details>

## Keep exploring!!

Explore more on this topic as you please; there's a lot of data within the animal crossing API, why not build out new app functionality? Have fun!
