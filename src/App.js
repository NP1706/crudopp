import React, { Component } from 'react'

export class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      filter: " ",
      filteredData: '',


      filterList: [
        {
          id: 1,
          name: "Male",
          value: "Male"
        },
        {
          id: 2,
          name: "Female",
          value: "Female"
        },
      ],

      data: [{
        "id": 1,
        "empid": 1010,
        "first_name": "Jeanette",
        "last_name": "Penddreth",
        "email": "jpenddreth0@census.gov",
        "gender": "Female",
      }, {
        "id": 2,
        "empid": 1020,
        "first_name": "Giavani",
        "last_name": "Frediani",
        "email": "gfrediani1@senate.gov",
        "gender": "Male",
      }, {
        "id": 3,
        "empid": 1030,
        "first_name": "Noell",
        "last_name": "Bea",
        "email": "nbea2@imageshack.us",
        "gender": "Male",
      }, {
        "id": 4,
        "empid": 1040,
        "first_name": "Willard",
        "last_name": "Valek",
        "email": "wvalek3@vk.com",
        "gender": "Male",
      }],

      data1: [],

      activeFilter: [],
      filteredData: [],

    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }



  onFilterChange(filter) {
    const { activeFilter } = this.state;

    if (activeFilter.includes(filter)) {
      const filterIndex = activeFilter.indexOf(filter);
      const newFilter = [...activeFilter];
      newFilter.splice(filterIndex, 1);
      this.setState({ activeFilter: newFilter });
    } else {
      this.setState({ activeFilter: [...activeFilter, filter] });
    }

  }

  OnclickADD() {
    this.setState({data:Array.push(this.state.data1)})
  }

  handleChange(e) {
    this.setState({ filter: e.target.value },
      console.log(this.state.filter),
      () => {
        const { filter, data } = this.state;
        const lowercasedFilter = filter.toLowerCase();
        this.setState({
          filteredData: data.filter(item => {
            return Object.keys(item).some(key =>
              item[key].toLowerCase().includes(lowercasedFilter)
            );
          })
        })
      });
    console.log(this.state.filter);
  };


  handleChanges = (e) => {
    this.setState({
      data1: [{
        empid: e.target.value,
        first_name: e.target.value,
        last_name: e.target.value,
        email: e.target.value,
        gender: e.target.value,
      }]
    });
  }

  handleSubmit = (event) => {
    alert('A name was submitted: ' + this.state.data);
    event.preventDefault();
  }

  render() {

    const { filterList, activeFilter } = this.state;
    let filteredList;
    if (
      activeFilter.length === 0 || activeFilter.length === filterList.length
    ) {
      filteredList = this.state.data;
    } else {
      filteredList = this.state.data.filter(item =>
        this.state.activeFilter.includes(item.gender)
      );
    }




    return (
      <div>
        <h1 style={{ marginTop: '2%', marginLeft: '15px' }}>Candidates</h1>

        <div style={{ display: 'flex', margin: "1%", justifyContent: 'space-around' }}>


          {this.state.filterList.map(filter => (
            <div classNameName="ui checkbox" style={{ display: 'flex' }}>
              <label htmlFor={filter.id}>{filter.name}     </label>
              <input
                id={filter.id}
                type='checkbox'
                checked={activeFilter.includes(filter.value)}
                onClick={() => this.onFilterChange(filter.value)}
              />
            </div>
          ))}


          <div className="ui search">
            <div className="ui icon input">
              <i className="search icon"></i>
              <input className="prompt" type="text"
                onChange={(e) => (this.handleChange(e))}
                style={{ border: '0', width: '250px', borderBottom: '1px' }} placeholder="Whom are you looking for ?" />

            </div>
          </div>

        </div>

        <table className="ui celled table" style={{ marginLeft: "32px", width: '95%', padding: '5px' }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Gender</th>

            </tr></thead>
          <tbody>
            {
              (this.state.filter === " " ? (filteredList.map((item) => {
                return (
                  <tr key={item.id}>
                    <td data-label="ID" color='gray'>{item.empid}</td>
                    <td data-label="First Nam">{item.first_name}</td>
                    <td data-label="Last Name">{item.last_name}</td>
                    <td data-label="Email">{item.email}</td>
                    <td data-label="Gender">{item.gender}</td>
                  </tr>
                );

              })) : (
                this.state.filteredData.map((item) => {
                  return (
                    <tr key={item.email}>
                      <td data-label="ID" color='gray'>{item.empid}</td>
                      <td data-label="First Nam">{item.first_name}</td>
                      <td data-label="Last Name">{item.last_name}</td>
                      <td data-label="Email">{item.email}</td>
                      <td data-label="Gender">{item.gender}</td>
                    </tr>
                  );

                })
              ))
            }


          </tbody>
        </table>

        <div>

          <h1 style={{ marginTop: '2%', marginLeft: '15px' }}>Add New Candidate</h1>
          <div style={{ marginLeft: '32px', width: '95%' }}>
            <form onSubmit={this.handleSubmit}>

              <div className="ui form">
                <div className="two fields">
                  <div className="field">
                    <input type="text" name="first_name" placeholder="First Name" style={{ borderTop: '0', borderLeft: '0', borderRight: '0' }}
                      onChange={(e) => { this.handleChanges(e) }}
                    />
                  </div>
                  <div className="field">
                    <input type="text" name="last_name" placeholder="Last Name" style={{ borderTop: '0', borderLeft: '0', borderRight: '0' }}
                      onChange={(e) => { this.handleChanges(e) }}
                    />
                  </div>
                  <div className="field">
                    <input type="text" name="empid" placeholder="Employee ID" style={{ borderTop: '0', borderLeft: '0', borderRight: '0' }}
                      onChange={(e) => { this.handleChanges(e) }}
                    />
                  </div>
                </div>
                <div className="field">
                  <input type="email" name="email" placeholder="Email" style={{ borderTop: '0', borderLeft: '0', borderRight: '0' }}
                    onChange={(e) => { this.handleChanges(e) }}
                  />
                </div>

                <div className="inline fields">
                  <div className="field">
                    <div className="ui radio checkbox">
                      <input type="radio" name="gender" value={1} tabindex="1" className="hidden"
                        onChange={(e) => { this.handleChanges(e) }}
                      />
                      <label>Female</label>
                    </div>
                  </div>
                  <div className="field">
                    <div className="ui radio checkbox">
                      <input type="radio" name="gender" value={0} tabindex="0" className="hidden"
                        onChange={(e) => { this.handleChanges(e) }}
                      />
                      <label>Male</label>
                    </div>
                  </div>

                </div>

                <div style={{ textAlign: 'center' }}>
                  <button class="ui button" type='submit' style={{ textAlign: 'center',}} onClick={()=>{this.OnclickADD()}}>
                    ADD
                  </button>
                </div>

              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default App
