import {Formik, Form, Field, ErrorMessage, FieldArray, FastField} from 'formik';
import * as Yup from 'yup';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons'
import TextError from './TextError';


const initialValues = {
  name: "",
  email: "",
  channel: "",
  comments: "",
  address: "",
  social: {
    facebook: "",
    twitter: ""
  },
  phoneNumbers: ["",""],
  phNumbers: [""]
}

const onSubmit = (values) => {
  console.log("values :", values)
}

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required!'),
  email: Yup.string().required('Email field is required!').matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, {message: 'Invalid email format!'}),
  channel: Yup.string().required('Channel is required'),
  comments: Yup.string().min(5).max(100),
  address: Yup.string().required('Address is required!'),
  social: Yup.object({
    facebook: Yup.string().required(),
    twitter: Yup.string().required()
  }),
  
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
          <ErrorMessage name="name" component={TextError}/>
        </div>

        <div className="form-control">
          <label htmlFor="email">Email:</label>
          <Field 
            type="email" 
            name="email" 
            id="email"
          />
          <ErrorMessage name="email">
            {(errorMsg) => <div className="error">{errorMsg}</div> }
          </ErrorMessage>
        </div>

        <div className="form-control">
          <label htmlFor="channel">Channel:</label>
          <Field 
            type="text" 
            name="channel" 
            id="channel"
            placeholder="Youtube Channel"
          />
          <ErrorMessage name="channel"/>
        </div>
        <div className="form-control">
          <label htmlFor="comment">Comments:</label>
          <Field 
            as="textarea"
            name="comments" 
            id="comments"
          />
          <ErrorMessage name="comments"/>
        </div>
        <div className="form-control">
          <label htmlFor="address">Address:</label>
          <FastField name="address">
            {(props) => {
              const {field, form, meta} = props;
              console.count('Rerender :')
              return <div>
                <input type='text' id="address" {...field}/>
                {meta.touched && meta.error ? <TextError>{meta.error}</TextError> : null}
              </div>
            }}
          </FastField>
        </div>
        <div className="form-control">
          <label htmlFor="facebook">Facebook</label>
          <Field 
            type="text" 
            id="facebook" 
            name="social.facebook"
          />
          <ErrorMessage name="social.facebook"
          component={TextError} 
          />
        </div>
        <div className="form-control">
          <label htmlFor="twitter">Twitter</label>
          <Field 
            type="text" 
            id="twitter" 
            name="social.twitter"
          />
          <ErrorMessage name="social.twitter" component={TextError}/>
        </div>
        <div className="form-control">
          <label htmlFor="phone">Phone:</label>
          <Field 
            type="text" 
            id="phone" 
            name="phoneNumbers[0]"
          />
          <ErrorMessage name="phoneNumber[0]" component={TextError}/>
        </div>
        <div className="form-control">
          <label htmlFor="phone">Mobile:</label>
          <Field 
            type="text" 
            id="phone" 
            name="phoneNumbers[1]"
          />
          <ErrorMessage name="phoneNumber[1]" component={TextError}/>
        </div>
        <div className="form-control">
          <label htmlFor="phNumbers">List of phone numbers</label>
          <FieldArray 
            name="phNumbers"
          >
            {(fieldArrayProps) => {
              // console.log('fieldArrayProps :', fieldArrayProps)
              const {push, remove, form} = fieldArrayProps;
              const {values} = form;
              const {phNumbers} = values;
              return (
                phNumbers.map((phNumber, index) => {
                  return <div key={index}>
                    <Field name={`phNumber[${index}]`} />
                    <button onClick={() => push("")}>+</button>
                    {
                      index > 0 &&
                        <button onClick={() => remove(index)}>-</button>
                    }
                  </div>
                })
              )
            }}
          </FieldArray>
          <ErrorMessage name="phoneNumber[1]" component={TextError}/>
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