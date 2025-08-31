import { TextField, Button, Grid, Select, MenuItem, FormHelperText, InputLabel, FormControl } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useState, useEffect } from 'react';
import { putData, postData, fetchList } from '../../services/Api.jsx';
import { Modal } from 'react-bootstrap';

const Formulario = ({ open, onClose, initialValues, mode, onDeleteSuccess }) => {
    const [showOffcanvas, setShowOffcanvas] = useState(open);
    const [homeworlds, setHomeworlds] = useState([]);
    const [modalInfo, setModalInfo] = useState({
        open: false,
        title: '',
        message: '',
        success: false,
    });

    useEffect(() => {
        const fetchHomeworlds = async () => {
            try {
                const data = await fetchList('/planets/list/for-character');
                setHomeworlds(data);
                console.log(homeworlds)
            } catch (error) {
                console.error("Error al obtener planetas:", error);
            }
        };
        fetchHomeworlds();
    }, []);

    useEffect(() => {
        setShowOffcanvas(open);
    }, [open]);

    const validationSchema = Yup.object({
        name: Yup.string().required("Campo obligatorio"),
        classification: Yup.string(),
        designation: Yup.string(),
        average_height: Yup.number().typeError("Debe ser un número"),
        average_lifespan: Yup.number().typeError("Debe ser un número"),
        eye_color: Yup.string(),
        hair_color: Yup.string(),
        skin_color: Yup.string(),
        language: Yup.string(),
        homeworld: Yup.string()
    });



    const handleCloseConfirmationModal = () => {
        const wasSuccess = modalInfo.success;
        setModalInfo(prev => ({ ...prev, open: false }));
        if (wasSuccess && typeof onDeleteSuccess === "function") {
            onDeleteSuccess();
        }
    };

    const onSubmit = async (data) => {
        try {
            const payload = {
                ...data,
                homeworld: data.homeworld_id
            }
            if (mode === "create") {
                await postData(`/species`, payload);
            } else if (mode === "edit") {
                await putData(`/species/${data._id}`, payload);
            }

            setShowOffcanvas(false);
            if (typeof onClose === "function") onClose();

            if (mode === "create" || mode === "edit") {
                setModalInfo({
                    open: true,
                    title: "Registro guardado con éxito",
                    message: "la especie se ha guardado correctamente.",
                    success: true,
                });
            }

        } catch (error) {
            console.error("Error al guardar:", error);
            setShowOffcanvas(false);
            if (typeof onClose === "function") onClose();

            setModalInfo({
                open: true,
                title: "Error al guardar",
                message: "Ocurrió un error al guardar la especie.",
                success: false,
            });
        }
    };

    const { handleSubmit, handleChange, errors, values, resetForm } = useFormik({
        initialValues: initialValues || {
            name: "",
            classification: "",
            designation: "",
            average_height: "",
            average_lifespan: "",
            eye_color: "",
            hair_color: "",
            skin_color: "",
            language: "",
            homeworld_id: ""
        },
        enableReinitialize: true,
        validationSchema,
        onSubmit,
    });

    useEffect(() => {
        if (mode === "create") {
            resetForm({
                values: {
                    name: "",
                    classification: "",
                    designation: "",
                    average_height: "",
                    average_lifespan: "",
                    eye_color: "",
                    hair_color: "",
                    skin_color: "",
                    language: "",
                    homeworld: ""
                }
            });
        } else {
            resetForm({
                values: initialValues || {
                    name: "",
                    classification: "",
                    designation: "",
                    average_height: "",
                    average_lifespan: "",
                    eye_color: "",
                    hair_color: "",
                    skin_color: "",
                    language: "",
                    homeworld: ""
                }
            });
        }
    }, [mode, initialValues, resetForm]);

    const title = mode === "create" ? "Crear especie" : mode === "view" ? "Ver especie" : mode === "edit" ? "Editar especie" : "Especie";

    return (
        <>
            <Offcanvas show={showOffcanvas} onHide={() => { setShowOffcanvas(false); if (typeof onClose === "function") onClose(); }} placement="end">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>{title}</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <form onSubmit={handleSubmit}>
                        <Grid container direction="column" alignContent={"center"} justifyContent={"space-evenly"} spacing={2} sx={{ width: "100%" }}>
                            <Grid container direction="column" alignContent={"center"} justifyContent={"space-evenly"} spacing={2} sx={{ width: "100%" }}>
                                <Grid item xs={12} md={8}>
                                    <TextField
                                        label="Nombre"
                                        name="name"
                                        value={values.name}
                                        onChange={handleChange}
                                        error={!!errors.name}
                                        helperText={errors.name}
                                        fullWidth
                                        disabled={mode === "view"}
                                    />
                                </Grid>
                                <Grid item xs={12} md={8}>
                                    <TextField
                                        label="Clasificación"
                                        name="classification"
                                        value={values.classification}
                                        onChange={handleChange}
                                        error={!!errors.classification}
                                        helperText={errors.classification}
                                        fullWidth
                                        disabled={mode === "view"}
                                    />
                                </Grid>
                                <Grid item xs={12} md={8}>
                                    <TextField
                                        label="Designación"
                                        name="designation"
                                        value={values.designation}
                                        onChange={handleChange}
                                        error={!!errors.designation}
                                        helperText={errors.designation}
                                        fullWidth
                                        disabled={mode === "view"}
                                    />
                                </Grid>
                                <Grid item xs={12} md={8}>
                                    <TextField
                                        type="number"
                                        label="Altura promedio"
                                        name="average_height"
                                        value={values.average_height}
                                        onChange={handleChange}
                                        error={!!errors.average_height}
                                        helperText={errors.average_height}
                                        fullWidth
                                        disabled={mode === "view"}
                                    />
                                </Grid>
                                <Grid item xs={12} md={8}>
                                    <TextField
                                        type="number"
                                        label="Esperanza de vida promedio"
                                        name="average_lifespan"
                                        value={values.average_lifespan}
                                        onChange={handleChange}
                                        error={!!errors.average_lifespan}
                                        helperText={errors.average_lifespan}
                                        fullWidth
                                        disabled={mode === "view"}
                                    />
                                </Grid>
                                <Grid item xs={12} md={8}>
                                    <TextField
                                        label="Color de ojos"
                                        name="eye_color"
                                        value={values.eye_color}
                                        onChange={handleChange}
                                        error={!!errors.eye_color}
                                        helperText={errors.eye_color}
                                        fullWidth
                                        disabled={mode === "view"}
                                    />
                                </Grid>
                                <Grid item xs={12} md={8}>
                                    <TextField
                                        label="Color de cabello"
                                        name="hair_color"
                                        value={values.hair_color}
                                        onChange={handleChange}
                                        error={!!errors.hair_color}
                                        helperText={errors.hair_color}
                                        fullWidth
                                        disabled={mode === "view"}
                                    />
                                </Grid>
                                <Grid item xs={12} md={8}>
                                    <TextField
                                        label="Color de piel"
                                        name="skin_color"
                                        value={values.skin_color}
                                        onChange={handleChange}
                                        error={!!errors.skin_color}
                                        helperText={errors.skin_color}
                                        fullWidth
                                        disabled={mode === "view"}
                                    />
                                </Grid>
                                <Grid item xs={12} md={8}>
                                    <TextField
                                        label="Idioma"
                                        name="language"
                                        value={values.language}
                                        onChange={handleChange}
                                        error={!!errors.language}
                                        helperText={errors.language}
                                        fullWidth
                                        disabled={mode === "view"}
                                    />
                                </Grid>
                                <Grid item xs={12} md={8}>
                                    {homeworlds.length > 0 && (
                                        <FormControl fullWidth error={!!errors.homeworld_id} disabled={mode === "view"}>
                                            <InputLabel id="homeworld-label">Planeta de origen</InputLabel>
                                            <Select
                                                labelId="homeworld-label"
                                                id="homeworld_id"
                                                name="homeworld_id"
                                                value={values.homeworld_id || ""}
                                                onChange={handleChange}
                                            >
                                                {homeworlds.map(hw => (
                                                    <MenuItem key={hw._id} value={hw._id}>
                                                        {hw.name}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                            {errors.homeworld_id && <FormHelperText>{errors.homeworld_id}</FormHelperText>}
                                        </FormControl>
                                    )}
                                </Grid>



                            </Grid>

                        </Grid>
                        <Button type="submit" variant="contained" sx={{ mt: 2 }}>
                            {mode === "view" ? "Cerrar" : "Guardar"}
                        </Button>
                    </form>
                </Offcanvas.Body>
            </Offcanvas>


            <Modal show={modalInfo.open} onHide={handleCloseConfirmationModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{modalInfo.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {modalInfo.message}
                </Modal.Body>
            </Modal>

        </>
    );
};

export default Formulario;
