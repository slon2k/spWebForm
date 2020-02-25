import * as React from 'react';
import Form from "../components/form/Form";

const FormPage = ({addItem}) => {
  return (
    <div>
      <Form addItem={addItem}/>
    </div>
  )
}

export default FormPage
