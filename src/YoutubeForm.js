import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons'


const initialValues = {
  name: "",
  email: "",
  channel: ""
}

const onSubmit = (values) => {
  console.log("values :", values)
}

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required!'),
  email: Yup.string().required('Email field is required!').matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, {message: 'Invalid email format!'}),
  channel: Yup.string().required('Channel is required')
}) 


function YoutubeForm() {


  return (
    <Formik 
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({errors, touched}) => (<Form>
        <div className="form-control">
          <label htmlFor="name">Name:</label>
          <Field 
            type="text" 
            name="name" 
            id="name"
          />
          <ErrorMessage name="name"/>
        </div>

        <div className="form-control">
          <label htmlFor="email">Email:</label>
          <Field 
            type="email" 
            name="email" 
            id="email"
          />
          <ErrorMessage name="email"/>
        </div>

        <div className="form-control">
          <label htmlFor="channel">Channel:</label>
          <Field 
            type="text" 
            name="channel" 
            id="channel"
          />
          <ErrorMessage name="channel"/>
        </div>

        <div>
          {!errors.name && touched.name ? <div><FontAwesomeIcon icon={faCheckCircle} size="xs" className="mr-2" /><small>Name is validated</small></div> : null}
          {!errors.email && touched.email ? <div><FontAwesomeIcon icon={faCheckCircle} size="xs" className="mr-2" /><small>Email is validated</small></div> : null}
          {!errors.channel && touched.channel ? <div><FontAwesomeIcon icon={faCheckCircle} size="xs" className="mr-2" /><small>Channel is validated</small></div> : null}
        </div>

        <button type="submit">Submit</button>
      </Form>)}
    </Formik>
  )
}

export default YoutubeForm;