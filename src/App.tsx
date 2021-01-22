import React from 'react';
import { Card, CardContent, Box } from '@material-ui/core';
import { Field } from 'formik';
import { CheckboxWithLabel, TextField } from 'formik-material-ui';
import { mixed, number, object, string } from "yup";
import { FormikStep, FormikStepper } from './FormStepper';
import ShowFullName from './ShowFullName';

const sleep = (time: number) => new Promise((acc) => setTimeout(acc, time));

function App() {
  return (
    <Card>
      <CardContent>
        <FormikStepper
          initialValues={{
            firstName: '',
            lastName: '',
            millionaire: false,
            money: 0,
            description: '',
          }}
          onSubmit={async (values) => {
            await sleep(1000);
            console.log('values', values);
          }}
        >
          <FormikStep 
            label="Personal Data"
            validationSchema={object({
              lastName: string().required("Required")
            })}
          >
            <Box paddingBottom={2}>
              <Field fullWidth name="firstName" component={TextField} label="First Name" />
            </Box>
            <Box paddingBottom={2}>
              <Field fullWidth name="lastName" component={TextField} label="Last Name" />
            </Box>
            <Box paddingBottom={2}>
              <Field
                name="millionaire"
                type="checkbox"
                component={CheckboxWithLabel}
                Label={{ label: 'I am a millionaire' }}
              />
            </Box>
          </FormikStep>
          <FormikStep
            label="Bank Accounts"
            validationSchema={object({
              money: mixed().when('millionaire', {
                is: true,
                then: number()
                  .required()
                  .min(
                    1000000,
                    'Because you said you are a millionaire you need to have 1 million'
                  ),
                otherwise: number().required(),
              }),
            })}
          >
            <Box paddingBottom={2}>
              <ShowFullName />
            </Box>

            <Box paddingBottom={2}>
              <Field
                fullWidth
                name="money"
                type="number"
                component={TextField}
                label="All the money I have"
              />
            </Box>
            
          </FormikStep>
          <FormikStep label="More Info">
            <Box paddingBottom={2}>
              <Field fullWidth name="description" component={TextField} label="Description" />
            </Box>
          </FormikStep>
        </FormikStepper>
      </CardContent>
    </Card>
  );
}

export default App;