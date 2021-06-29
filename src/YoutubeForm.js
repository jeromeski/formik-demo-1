import {Formik, Form, Field, ErrorMessage, FieldArray, FastField} from 'formik';
import * as Yup from 'yup';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons'
import TextError from './TextError';
import { useState } from 'react';


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

const apiResValues = {
  name: "Jerome Gee",
  email: "jeromegee@gmail.com",
  channel: "TheRealJeromeG",
  comments: "Hello Foo, Hi Baz",
  address: "B15 L9 Rome St Palmera 4",
  social: {
    facebook: "facebook.com",
    twitter: "twitter.com"
  },
  phoneNumbers: ["123","456"],
  phNumbers: [""]
}

const apiCall = (setSubmitting, resetForm) => {
  let counter = 3;
  const timer = setInterval(() => {
    counter--
    console.log(counter)
    if(counter === 0) {
      setSubmitting(false)
      resetForm()
      clearInterval(timer)
    }
  },1000)
  
}

const onSubmit = (values, onSubmitProps) => {
  console.log("values :", values);
  console.log("onSubmitProps:", onSubmitProps);
  const {setSubmitting, resetForm} = onSubmitProps;
  apiCall(setSubmitting, resetForm)
}

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required!'),
  email: Yup.string().required('Email field is required!').matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, {message: 'Invalid email format!'}),
  channel: Yup.string().required('Channel is required'),
  address: Yup.string().required('Address is required!'),
  social: Yup.object({
    facebook: Yup.string().required(),
    twitter: Yup.string().required()
  }),
  
})

const validateComments = value  => {
  let error;
  if(!value) {
    error = "Required"
  }
  return error;
}


function YoutubeForm() {
  const [formValues, setFormValues] = useState(null)

  return (
    <Formik 
      initialValues={formValues || initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      // validateOnChange={false}
      // validateOnBlur={false}
      // validateOnMount
      enableReinitialize
    >
      {({errors, touched, ...formik}) => { 
        // console.log(formik, '\n', "errors :",errors, '\n' , "touched :", touched)
        return <Form>
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
          <ErrorMessage name="channel" component={TextError}/>
        </div>
        <div className="form-control">
          <label htmlFor="comments">Comments:</label>
          <Field 
            as="textarea"
            name="comments" 
            id="comments"
            validate={validateComments}
          />
          <ErrorMessage name="comments" component={TextError}/>
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
        {/* <button type="button" onClick={() => formik.validateField('comments')}>Validate Field</button>
        <button type="button" onClick={() => formik.validateForm()}>Validate Form</button>
        <button type="button" onClick={() => formik.setFieldTouched('comments')}>Visit Comments</button>
        <button type="button" onClick={() => formik.setTouched({
          name: true,
          email: true,
          channel: true,
          comments: true
        })}>Visit Fields</button> */}
        <button type="button" onClick={() => setFormValues(apiResValues)}>
          Load Data
        </button>
        <button type="reset">Reset</button>
        <button 
          type="submit" 
          disabled={!formik.isValid || formik.isSubmitting}
          >
            Submit
        </button>
      </Form>}}
    </Formik>
  )
}

export default YoutubeForm;