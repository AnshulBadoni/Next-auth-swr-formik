import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import useSWR from 'swr';

const validationSchema = Yup.object({
  title: Yup.string().required('Title is required'),
  body: Yup.string().required('Body is required'),
  userId: Yup.number().required('User ID is required'),
});

const initialValues = {
  title: '',
  body: '',
  userId: 1,
};

const FormikForm = () => {
  const { data = [], mutate } = useSWR<Posts[]>('https://jsonplaceholder.typicode.com/posts', {
    refreshInterval: 0,
  });
  console.log(Array.isArray(data)); // should log true

  const handleSubmit = (values: Posts, { setSubmitting }) => {
    const postData = async () => {
      const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
      console.log(res.ok); // should log true

      if (!res.ok) {
        throw new Error('Failed to submit form');
      }

      return (res.json());
    };

    postData()
      .then((data) => {
        mutate([...(data || []), ...(data || [])]);
        setSubmitting(false);
      })
      .catch((error) => {
        console.error(error);
        setSubmitting(false);
      });
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className='my-12 bg-slate-800 w-96 mx-auto rounded-md'>
          <div className='my-6 flex' >
            <div className='mx-auto'>
            <label htmlFor="title">Title</label><br />
            <Field className="bg-slate-600 rounded-md h-8" id="title" name="title" type="text" />
            <ErrorMessage name="title" />
          </div>
          </div>
          <div className='my-6 flex'>
          <div className='mx-auto'>
            <label htmlFor="body">Body</label> <br />
            <Field className="bg-slate-600 rounded-md h-8" id="body" name="body" type="text" />
            <ErrorMessage name="body" />
          </div>
          </div>
          <div className='my-6 flex'>
          <div className='mx-auto'>
            <label htmlFor="userId">User ID: </label><br />
            <Field className="bg-slate-600 rounded-md h-8" id="userId" name="userId" type="number" />
            <ErrorMessage name="userId" />
          </div>
          </div>
          <button className='flex justify-center item-center mx-auto my-8' type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
};

interface Posts {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export default FormikForm;