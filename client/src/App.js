import React, {useState, useEffect} from 'react';
import './App.css';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import Axios from 'axios';

// Test to see if this pushes to Github

function App() {  

  const [ImageType, setImageType] = useState('');
  const [BodyPart, setBodyPart] = useState('');
  const [ContrastStatus, setContrastStatus] = useState('');

  // Get data from the back end via Axios
  const [procedures, setProcedures] = useState([])

  useEffect(() => {
    Axios.get('http://localhost:3001/api/get').then((response) => {
      setProcedures(response.data)
    });
  });

  // Take search inputs and send them to the back end
  const doSearch = () => {
    Axios.post('http://localhost:3001/api/search', {
      ImageType: ImageType,
      BodyPart: BodyPart,
      ContrastStatus: ContrastStatus,
    }).then(() => {
      alert('successfully passed data to back end')
    });
  }


  return (
    <div className="App">

      <h1>Choose your procedure</h1>

      <div className='form'>
        <label>Image Type (MRI or CT)</label>
        <input type='text' name='ImageType' onChange={(e) => { setImageType(e.target.value);}}/>
        
        <label>Body Part (Brain or Abdomen)</label>
        <input type='text' name='BodyPart' onChange={(e) => { setBodyPart(e.target.value);}}/>
        
        <label>Contrast (With, Without or With & Without)</label>
        <input type='text' name='ContrastStatus' onChange={(e) => { setContrastStatus(e.target.value);}}/>

        <button onClick={doSearch}>Submit</button>
      </div>
     
      {procedures.map((val) => {
        return <h3> Provider: {val.provider_name} | Patient Cost: {val.negotiated_rate}</h3>
      }
      )}
    </div>
  )
}


export default App;
