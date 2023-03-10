import React, { useState, useEffect } from 'react';
//import { useRouter } from "next/router";
//useEffect
import '../node_modules/react-vis/dist/style.css';

//import logo from './logo.svg';
import './App.css';
import UserComponent from './components/UserComponent';
import UserService from './services/UserService';
import StockService from './services/StockService';
import GraphComponent from './components/GraphComponent';

function App() {
  const [currTicker, setTicker] = useState("");
  const [currGraphTick, setGraphTick] = useState("");
  const [pr, setPr] = useState([]);
  //const [username, setUsername] = useState("");
  // const router = useRouter();
  // let username = "";

  const handleChange = (ticker) => {
    setTicker(ticker);
  };

  const handleGraphChange = (event) => {
    setGraphTick(event.target.value);
  }

  function handleSubmitAdd(){
    console.log(currTicker.target.value);
    UserService.addTicker(currTicker.target.value, 1);
    setTicker("");
  }
    

  let prices = [];
  let counter = 1;
  async function api_request(ticker, sdate, edate) {

    let fetched = await StockService.getData(ticker, sdate, edate);

    fetched.forEach(element => {
      prices.push({x: counter, y: element.open})
      counter++;
    });
    
    //console.log(prices);
    setPr([...prices])

    return prices
  }

  // useEffect(() => {
  //   if(username === ""){
  //     router.push("/login")
  //   }
  // }, [router, username]);

  

  return (
    <div className="App">
        <UserComponent />
        
        <span>
          <div className="form__group field">
            <input type="input" className="form__field" onChange={handleChange} placeholder="Add" name="add" id='add' required />
            <label htmlFor="add" className="form__label">Add Ticker</label>
          </div>
        </span>
        <button onClick={() => {handleSubmitAdd()}}>Submit</button>

        <span>
          <div className="form__group field">
            <input type="input" className="form__field_delete" onChange={handleChange} placeholder="Delete" name="delete" id='delete' required />
            <label htmlFor="add" className="form__label_delete">Remove Ticker</label>
          </div>
        </span>
        <button className='button_delete' onClick={() => {UserService.deleteTicker(currTicker.target.value, 1)}}>Delete</button>

        <span>
          <div className="form__group field">
            <input type="input" className="form__field_graph" onChange={handleGraphChange} placeholder="Graph" name="graph" id='graph' required />
            <label htmlFor="add" className="form__label_graph">Generate Graph</label>
          </div>
        </span>
        <button className='button_graph' onClick={() => {api_request(currGraphTick, '2022-01-01','2022-07-01')}}>Generate</button>
        
        <GraphComponent data={pr}/>
    </div>
  );
}

export default App;