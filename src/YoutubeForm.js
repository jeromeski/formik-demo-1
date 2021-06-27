import {useFormik} from 'formik';


const initialValues = {
  name: "",
  email: "",
  channel: ""
}

const onSubmit = (values) => {
  console.log(values)
}

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




function YoutubeForm() {

  const formik = useFormik({
    initialValues,
    onSubmit ,
    validate
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="form-control">
        <label htmlFor="name">Name:</label>
        <input 
          type="text" 
          name="name" 
          id="name"
          onChange={formik.handleChange}
          value={formik.values.name}
        />
        {formik.errors.name ? <div className="error">{formik.errors.name}</div>: null}
      </div>

      <div className="form-control">
        <label htmlFor="email">Email:</label>
        <input 
          type="email" 
          name="email" 
          id="email"
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        {formik.errors.email ? <div className="error">{formik.errors.email}</div>: null}
      </div>

      <div className="form-control">
        <label htmlFor="channel">Channel:</label>
        <input 
          type="text" 
          name="channel" 
          id="channel"
          onChange={formik.handleChange}
          value={formik.values.channel}
        />
        {formik.errors.channel ? <div className="error">{formik.errors.channel}</div>: null}
      </div>

      <button type="submit">Submit</button>
    </form>
  )
}

export default YoutubeForm;