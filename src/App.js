
import React, { useState, useEffect } from 'react';

export default function App() {
    const [notes, setNotes] = useState(null);
    const [form, setForm] = useState({ title: '', description: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(()=>{
        fetchpost()
    },[])


    const fetchpost=async ()=>{
        setIsSubmitting(true)
        const res=await fetch('/notes')
        const data=await res.json()
        setIsSubmitting(false)
        setNotes(data)
    }


    const handleChange=(e)=>{
        setForm({
            ...form,
            [e.target.name]:e.target.value
        })
    }
    //validation

    const validate = () => {
        // console.log('form', form)
        let err = {};
        if (!form.title) {
          err.title = 'Title is required';
        }
        if (!form.title.length > 40) {
          err.title = 'Title cannot be more than 40 characters';
        }
        if (!form.description) {
          err.description = 'Description is required';
        }
    
        return err;
      }


      const showError = (errorObj) => {
        let errMsg = '';
        for (let err in errorObj) {
          errMsg += `${errorObj[err]}. `
        }
        alert(`Errors ${errMsg}`);
      }


      const postNotes = async (data) => {
        await fetch('/notes', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });
      }

      const handleSubmit = async e => {
        e.preventDefault();
        const errs = validate();
    
        if (Object.keys(errs).length === 0) {
          setIsSubmitting(true)
          await postNotes(form);
          setIsSubmitting(false);
          setForm({ title: '', description: '' })
        } else {
          showError(errs);
        }
    
        fetchpost();
      };
    
    return (
        <>
                  <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
                            <a class="navbar-brand" href="#">Navbar</a>
  
  
                  </nav> 


                  <div className='container' style={{ width: '400px', marginTop: 20 }}>

                  <form onSubmit={handleSubmit}>
                            <fieldset>
                                <div className='form-group'>
                                <label>Title</label>
                                <input
                                    type='text'
                                    name='title'
                                    className='form-control'
                                    id='exampleInputEmail1'
                                   name='title'
                                   onChange={handleChange}
                                
                                    aria-describedby='emailHelp'
                                    placeholder='Title'
                                />
                                </div>
                                <div className='form-group'>
                                <label>Description</label>
                                <textarea
                                    className='form-control'
                                    name='description'
                                     
                                    placeholder='Description'
                                    id='exampleTextarea'
                                    rows='3'
                                    style={{resize:'none'}}
                                    onChange={handleChange}
                                ></textarea>
                                </div>
                            </fieldset>
                            <button type="submit" className="btn btn-primary">Submit</button>
        </form>


        <div style={{ width: 400, marginTop: 20 }}>
            {
                      JSON.stringify(notes)
            }
        </div>

                  </div>
        </>
    )
}



