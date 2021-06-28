import {useFormik} from 'formik';
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

const validate = (values) => {
  let errors = {};

  if(!values.name) {
    errors.name = 'Name is required'
  }
  if(!values.email) {
    errors.email = 'Email is required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'; 
  }

  if(!values.channel) {
    errors.channel = 'Channel is required'
  }
  return errors;
}


function OldYoutubeForm() {

  const formik = useFormik({
    initialValues,
    onSubmit ,
    // validate,
    validationSchema
  })

  console.log('data :',formik, '\n','touched :', formik.touched)

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="form-control">
        <label htmlFor="name">Name:</label>
        <input 
          type="text" 
          name="name" 
          id="name"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.name}
        />
        {formik.touched.name && formik.errors.name ? <div className="error">{formik.errors.name}</div>: null}
      </div>

      <div className="form-control">
        <label htmlFor="email">Email:</label>
        <input 
          type="email" 
          name="email" 
          id="email"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        {formik.touched.email && formik.errors.email ? <div className="error">{formik.errors.email}</div>: null}
      </div>

      <div className="form-control">
        <label htmlFor="channel">Channel:</label>
        <input 
          type="text" 
          name="channel" 
          id="channel"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.channel}
        />
        {formik.touched.channel && formik.errors.channel ? <div className="error">{formik.errors.channel}</div>: null}
      </div>

      <div>
        {!formik.errors.name && formik.touched.name ? <div><FontAwesomeIcon icon={faCheckCircle} size="xs" className="mr-2" /><small>Name is validated</small></div> : null}
        {!formik.errors.email && formik.touched.email ? <div><FontAwesomeIcon icon={faCheckCircle} size="xs" className="mr-2" /><small>Email is validated</small></div> : null}
        {!formik.errors.channel && formik.touched.channel ? <div><FontAwesomeIcon icon={faCheckCircle} size="xs" className="mr-2" /><small>Channel is validated</small></div> : null}
      </div>

      <button type="submit">Submit</button>
    </form>
  )
}

export default OldYoutubeForm;