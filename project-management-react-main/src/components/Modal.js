import React, { useEffect, useState } from 'react'
import Input from './Input'
import ComboBox from './comboBox'
import EmplooyeView from './emplooyeView'
import Select from 'react-select';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import EmployeeService from '../service/EmployeeService';
import ProjectService from '../service/ProjectService';
import Project from '../Model/Project';
import Checkbox from './CheckBox';


export default function Modal() {

  const [data, setData] = useState([])
  const [phone, setPhone] = useState("")
  const [emplooye, setEmplooye] = useState([])
  const [active,setActive] = useState(false);
  
 
  let empService = new EmployeeService();


  let projectService = new ProjectService();


  let [project, setProject] =
    useState(new Project());

  useEffect(() => {
    getAllEmployees();
    
  }, [])
 
  

  // function handleClick(e){

  //   let value=e.target.value
  //   setData(o => [...o,value]);
  //   setEmplooyes(value);

  //   console.log(data)
  // }
  async function getAllEmployees() {
    setEmplooye(await empService.getAll());
  }
  
  function addProject(event) {
    projectService.addProject({ ...project })
      .then(response => {
        let pro = [...project];
        pro.push({ ...project });
        setProject(pro);
      });
      
  }
  
  
    function handleInputChange(event){
      const {name, value} = event.target;
      
      let newProject = {...project};
      newProject["active"] = active;
      newProject[name] = value;
      setProject(newProject);
  }
  

  return (
    <div className='modal-container'>
      {/* <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2> */}
      {/* <button onClick={closeModal}>close</button> */}

     

      <Input id="projectName"
        value={project.projectName}
        handleChange={handleInputChange}
        type="text"
        label="Project Name">
      </Input>
      <ComboBox options={["ali", "ahmet"]} label="Customers" />
      <Checkbox id="active" 
                              handleChange={()=> setActive(!active)}
                              value={active}
                              label="Status?"></Checkbox>
      <Input id="offer"
        value={project.offer}
        handleChange={handleInputChange}
        type="text"
        label="Offer"></Input>
      <Input value={project.startDate} label="Start Date" type="date" id="startDate" handleChange={handleInputChange} />
      <Input value={project.endDate} label="Start Date" type="date" id="endDate" handleChange={handleInputChange} />
      {/* <DatePicker className="date" onChange={d=> setEndDate(d)} value={endDate} /> */}
      <ComboBox options={["kerem", "akif"]} label="Project Manager" />
      <Select

        isMulti
        name="emplooyes"
        options={emplooye.map((item, index) => {
          return {
            value: item.id,
            label: item.name
          }
        })}
        className="basic-multi-select"
        classNamePrefix="select"
      />

      {
        data === [] ? null :
          data.map(item => (
            <EmplooyeView label={item} />
          ))
      }
      <PhoneInput
        className="phone"
        country={'tr'}
        value={phone}
        onChange={phone => setPhone(phone)}
      />
      {/* <Input id="phone" name="phone" label="Tel" type="tel" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" required /> */}
      <Input id="mail" name="mail" label="E-Mail" type="email" />
      <div className='addButtonDiv'>
        <button onClick={addProject} className='project-button'>
          Save
        </button>
      </div>



    </div>
  )
}
