import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import ProjectModal from './Modal';
import ProjectService from '../service/ProjectService';

function ProjectForm(props) {
  const [input, setInput] = useState(props.edit ? props.edit.value : '');
  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [project, setProject] = useState([]);

  let projectService = new ProjectService();
  function openModal() {
    setIsOpen(true);
  }
  useEffect(() => {
    getAllProjects();
  }, []);

  console.log(project);

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }
  async function getAllProjects() {
    setProject(await projectService.getAllProjects());
  }

  function closeModal() {
    setIsOpen(false);
  }

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      background: `linear-gradient(
        '90deg',
        '#4d0ccf',
        '#3aec49'
      )`
    },
  };



  const handleSubmit = e => {
    e.preventDefault();

    props.onSubmit({
      id: Math.floor(Math.random() * 10000),
      text: input
    });
    setInput('');
  };

  return (
    <form onSubmit={handleSubmit} className='project-form'>


      <div className='addButtonDiv'>
        <button onClick={openModal} className='project-button'>
          Add Project
        </button>
      </div>
      <div className='table-div'>

      <table ite  className='table'>
        <thead >
          <tr>
            <th>Project Name</th>
            <th>Customer Name</th>
            <th>Situation</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Project Manager</th>
            <th>Team Members</th>
            <th>ProjeTech Lead</th>


          </tr>
        </thead>
        <tbody >
                   {
                       project.map( (pro,index) => (
                               <tr key={pro.id}>
                                   {/* <td onMouseOver={(event) => {
                                       setBook(emp),
                                           setId(emp.id)
                                   }}>{emp.id}</td> */}
                                   <td>{pro.projectName}</td>
                                   <td>""</td>
                                   <td>{pro.active ? "Active" : "Not Active"}</td>
                                   <td>{pro.startDate}</td>
                                   <td>{pro.endDate}</td>
                                   <td>""</td>
                                   <td>""</td>
                                   <td>""</td>
                                   {/* <td><Button id="fireEmployee"
                                               buttonTitle="Delete Book"
                                               className="btn-danger"
                                               onClick={(event) => deleteBookById(event, emp.id) }></Button></td> */}
                               </tr>
                           )
                       )
                   }
                   </tbody>
      </table>
      </div>


      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}

      >
        <ProjectModal />


      </Modal>
    </form>
  );
}

export default ProjectForm;