import './App.css';
import { useEffect, useState } from 'react';
let App = () => {
  const [name, setname] = useState('');
  const [age, setage] = useState()
  const [movie, setmovie] = useState('');
  const [data, setdata] = useState([]);
  let cancel = () => {
    setname('');
    setage('');
    setmovie('');
  }
  let adddata = async () => {
    let data = { name, age, movie }
    let resp = await fetch(`${process.env.REACT_APP_API_URL}/api/add/`,
      {
        method: "post",
        body: JSON.stringify(data),
        headers: { 'Content-type': 'application/json' }
      }
    )
    if (resp.ok) {
      let res = await resp.json();
      if (res.statuscode === 1) {
        alert("data added")
        fetchdata()
      } else {
        alert("failed")
      }
    } else {
      alert("fail to fetch api");
    }
  }

  let fetchdata = async () => {
    let resp = await fetch(`${process.env.REACT_APP_API_URL}/api/getdata/`);
    if (resp.ok) {
      let res = await resp.json();
      if (res.statuscode === 1) {
        setdata(res.udata)
      } else {
        alert("no data available")
      }
    } else {
      alert("faild to fetch")
    }
  }

  let remove = async (idk) => {
    let conf = window.confirm("Are you sure?")
    if (conf === true) {
      let resp = await fetch(`${process.env.REACT_APP_API_URL}/api/del/${idk}`,
        {
          method: "delete",
          headers: { 'Content-type': 'application/json' }
        }
      )
      if (resp.ok) {
        let res = await resp.json();
        if (res.statuscode === 1) {
          alert("data deleted")
          fetchdata()
        } else {
          alert("failed")
        }
      } else {
        alert("fail to fetch api");
      }
    }
  }




  useEffect(() => {
    fetchdata();
  }, [])

  return (
    <div className="container">
      <div className="position-absolute top-50 start-50 translate-middle">
        <div className="card" style={{ width: "18rem" }}>
          <div className="card-body">
            <h5 className="card-title">Demo Form</h5> <br />
            <div className="input-group">
              <input value={name} onChange={(e) => setname(e.target.value)} placeholder='Name' type="text" aria-label="Name" className="form-control" style={{ width: "300px" }} /> <br />
              <input value={age} onChange={(e) => setage(e.target.value)} placeholder='Age' type="text" aria-label="Age" className="form-control" style={{ width: "300px" }} /> <br />
              <input value={movie} onChange={(e) => setmovie(e.target.value)} placeholder='Favourite Movie' type="text" aria-label="Name" className="form-control" style={{ width: "300px" }} />
            </div>
            <br />
            <button onClick={adddata} className='btn btn-primary'> Submit </button> &nbsp; &nbsp; <button onClick={cancel} className='btn btn-danger'> Cancel </button>
          </div>
        </div>
      </div>
      {
        data !== null ?
          <table style={{ marginTop: "500px" }} className="table">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Age</th>
                <th scope="col">Favourate Movie</th>
                <th scope='col'> Remove </th>
              </tr>
            </thead>
            {
              data.map((dat, i) =>
                <tbody>
                  <tr key={i}>
                    <td>{dat.Name} </td>
                    <td>{dat.Age} </td>
                    <td>{dat.Movie} </td>
                    <td><button onClick={() => remove(dat._id)} className='btn btn-danger'> Remove</button></td>
                  </tr>
                </tbody>
              )
            }
          </table>
          : <h4> No data available </h4>
      }
    </div>
  );
}

export default App;
