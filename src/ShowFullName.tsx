import { Typography } from "@material-ui/core";
import { useFormikContext } from "formik";
import React from "react";

const ShowFullName = () => {
    const formikContext = useFormikContext<{firstName: string, lastName: string}>();

    return (
        <Typography variant="h6">
            Hello, {formikContext.values.firstName + ' ' + formikContext.values.lastName}
        </Typography>
    );   
}

export default ShowFullName;