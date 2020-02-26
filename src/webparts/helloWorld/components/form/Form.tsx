import * as React from 'react'
import { Redirect } from 'react-router-dom';

const initialForm = {
  Title: "",
  Comments: "",
}

const Form = ({addItem}) => {
  const [form, setForm] = React.useState(initialForm);

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value});
  }

  const handleSubmit = async () => {
    await addItem(form);
    <Redirect to="/" />
  }

  return (
    <form>
      <label>
        <h3>Title</h3>
        <input name="Title" value={form.Title} onChange={handleChange}/>
      </label>
      <br/>
      <label>
        <h3>Comments</h3>
        <textarea rows={6} name="Comments" value={form.Comments} onChange={handleChange}></textarea>
      </label>
      <br/>
      <button type="button" onClick={handleSubmit}>Send</button>
      <button type="button" >Close</button>
      <button type="button">Cancel</button>
    </form>
  )
}

export default Form
