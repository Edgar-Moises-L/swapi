import { TextField, Button, Grid } from "@mui/material"
import { useFormik } from "formik";
import * as Yup from "yup";
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useState, useEffect } from 'react';


const Formulario = ({ title, open, onClose, initialValues, mode }) => {
    const [show, setShow] = useState(open);

    useEffect(() => {
        setShow(open);
    }, [open]);

    const validationSchema = Yup.object({
        title: Yup.string()
            .required("El título es obligatorio"),
        director: Yup.string()
            .required("El director es obligatorio"),
        producer: Yup.string()
            .required("El productor es obligatorio"),
    })

    const onSubmit = (data) => {
        console.log(data);
        onClose();
    }

    const { handleSubmit, handleChange, errors, values } = useFormik({
        initialValues: initialValues || {
            title: "",
            director: "",
            producer: ""
        },
        enableReinitialize: true,
        validationSchema,
        onSubmit,
    });

    return (
        <Offcanvas show={show} onHide={() => { setShow(false); onClose(); }} placement="end">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>{title}</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <form onSubmit={handleSubmit}>
                    <Grid container direction="column" alignContent={"center"} justifyContent={"space-evenly"} spacing={2} sx={{ width: "100%" }}>
                        <Grid item xs={12} md={8}>
                            <TextField
                                label="Título"
                                name="title"
                                value={values.title}
                                onChange={handleChange}
                                error={errors.title}
                                helperText={errors.title}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} md={8}>
                            <TextField
                                label="Director"
                                name="director"
                                value={values.director}
                                onChange={handleChange}
                                error={errors.director}
                                helperText={errors.director}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} md={8}>
                            <TextField
                                label="Productor"
                                name="producer"
                                value={values.producer}
                                onChange={handleChange}
                                error={errors.producer}
                                helperText={errors.producer}
                                fullWidth
                            />
                        </Grid>
                    </Grid>

                    <Button type="submit" variant="contained">Guardar</Button>
                </form>
            </Offcanvas.Body>
        </Offcanvas >
    );
};


export default Formulario


import { TextField, Button, Grid } from "@mui/material"
import { useFormik } from "formik";
import * as Yup from "yup";
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';

const Formulario = ({ title }) => {
    let initialValues = {
        title: "",
        director: "",
        producer: ""
    }

    const validationSchema = Yup.object({
        title: Yup.string()
            .required("El título es obligatorio"),
        director: Yup.string()
            .required("El director es obligatorio"),
        producer: Yup.string()
            .required("El productor es obligatorio"),
    })


    const onSubmit = (data) => {
        console.log(data);
    }

    const { handleSubmit, handleChange, errors } = useFormik({
        initialValues,
        validationSchema,
        onSubmit,
    })

    const [show, setShow] = useState(false);

    return (
        <>
            <Button onClick={() => setShow(true)}>Abrir panel</Button>

            <Offcanvas
                show={show}
                onHide={() => setShow(false)}
                placement="end"
            >
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>{title}</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <form onSubmit={handleSubmit}>
                        <Grid container direction="column" alignContent={"center"} justifyContent={"space-evenly"} spacing={2} sx={{ width: "100%" }}>
                            <Grid item xs={12} md={8}>
                                <TextField
                                    type="text"
                                    label="Título"
                                    variant="outlined"
                                    name="title"
                                    onChange={handleChange}
                                    fullWidth
                                    error={errors.title}
                                    helperText={errors.title}
                                />
                            </Grid>

                            <Grid item xs={12} md={8}>
                                <TextField
                                    type="text"
                                    label="Director"
                                    variant="outlined"
                                    name="director"
                                    onChange={handleChange}
                                    fullWidth
                                    error={errors.director}
                                    helperText={errors.director}
                                />
                            </Grid>

                            <Grid item xs={12} md={8}>
                                <TextField
                                    type="text"
                                    label="Productor"
                                    variant="outlined"
                                    name="producer"
                                    onChange={handleChange}
                                    fullWidth
                                    error={errors.producer}
                                    helperText={errors.producer}
                                />
                            </Grid>
                        </Grid>

                        <Button variant="contained" type="submit">
                            Guardar
                        </Button>
                    </form>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );


}

export default Formulario


