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


function YoutubeForm() {

  const formik = useFormik({
    initialValues,
    onSubmit ,
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
          {...formik.getFieldProps('name')}
        />
        {formik.touched.name && formik.errors.name ? <div className="error">{formik.errors.name}</div>: null}
      </div>

      <div className="form-control">
        <label htmlFor="email">Email:</label>
        <input 
          type="email" 
          name="email" 
          id="email"
          {...formik.getFieldProps('email')}
        />
        {formik.touched.email && formik.errors.email ? <div className="error">{formik.errors.email}</div>: null}
      </div>

      <div className="form-control">
        <label htmlFor="channel">Channel:</label>
        <input 
          type="text" 
          name="channel" 
          id="channel"
          {...formik.getFieldProps('channel')}
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

export default YoutubeForm;