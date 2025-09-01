import { TextField, Button, Grid, Box, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useState, useEffect } from 'react';
import { putData, postData } from '../../services/Api.jsx';
import { Modal } from 'react-bootstrap';
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";

const FormStarship = ({ open, onClose, initialValues, mode, refreshData }) => {
    const [showOffcanvas, setShowOffcanvas] = useState(open);
    const [modalInfo, setModalInfo] = useState({
        open: false,
        title: '',
        message: '',
        success: false,
    });

    useEffect(() => {
        setShowOffcanvas(open);
    }, [open]);

    const validationSchema = Yup.object({
        name: Yup.string().required("Campo obligatorio"),
        model: Yup.string().required("Campo obligatorio"),
        starship_class: Yup.string(),
        length: Yup.number().positive("Debe ser positivo"),
        passengers: Yup.number().min(0),
        max_atmosphering_speed: Yup.number().min(0),
        hyperdrive_rating: Yup.number().min(0),
        MGLT: Yup.number().min(0),
        cargo_capacity: Yup.number().min(0),
        consumables: Yup.string(),
    });

    const handleCloseConfirmationModal = () => {
        const wasSuccess = modalInfo.success;
        setModalInfo(prev => ({ ...prev, open: false }));
        if (wasSuccess && typeof refreshData === "function") {
            refreshData();
        }
    };

    const onSubmit = async (data) => {
        try {
            if (mode === "create") {
                await postData(`/starships`, data);
            } else if (mode === "edit") {
                await putData(`/starships/${data._id}`, data);
            }

            setShowOffcanvas(false);
            if (typeof onClose === "function") onClose();

            if (mode === "create" || mode === "edit") {
                setModalInfo({
                    open: true,
                    title: "Registro guardado con éxito",
                    message: "La nave se ha guardado correctamente.",
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
                message: "Ocurrió un error al guardar la nave.",
                success: false,
            });
        }
    };

    const { handleSubmit, handleChange, errors, values, resetForm } = useFormik({
        initialValues: initialValues || {
            name: "",
            model: "",
            starship_class: "",
            length: "",
            passengers: "",
            max_atmosphering_speed: "",
            hyperdrive_rating: "",
            MGLT: "",
            cargo_capacity: "",
            consumables: "",
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
                    model: "",
                    starship_class: "",
                    length: "",
                    passengers: "",
                    max_atmosphering_speed: "",
                    hyperdrive_rating: "",
                    MGLT: "",
                    cargo_capacity: "",
                    consumables: "",
                }
            });
        } else {
            resetForm({ values: initialValues || {} });
        }
    }, [mode, initialValues, resetForm]);

    const title = mode === "create" ? "Crear nave" : mode === "view" ? "Ver nave" : mode === "edit" ? "Editar nave" : "Nave";

    return (
        <>
    <Offcanvas show={showOffcanvas} onHide={() => { setShowOffcanvas(false); if (typeof onClose === "function") onClose(); }} placement="end" style={{ width: 500 }}>
                <Offcanvas.Header closeButton style={{ borderBottom: "none", paddingBottom: 8 }} >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2, width: "100%", justifyContent: "space-between" }}>
                        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                            <RocketLaunchIcon sx={{ color: '#3b5bd3' }} />
                            <Typography variant="h6" sx={{ fontWeight: 700, color: '#3b5bd3' }}>{title}</Typography>
                        </Box>
                    </Box>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <form onSubmit={handleSubmit}>
                        <Grid container  spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    name="name"
                                    label="Nombre"
                                    type="text"
                                    value={values.name}
                                    onChange={handleChange}
                                    error={errors.name}
                                    helperText={errors.name}
                                    disabled={mode === "view"}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    name="model"
                                    label="Modelo"
                                    type="text"
                                    value={values.model}
                                    onChange={handleChange}
                                    error={errors.model}
                                    helperText={errors.model}
                                    disabled={mode === "view"}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    name="starship_class"
                                    label="Clase de nave"
                                    type="text"
                                    value={values.starship_class}
                                    onChange={handleChange}
                                    error={errors.starship_class}
                                    helperText={errors.starship_class}
                                    disabled={mode === "view"}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    name="length"
                                    label="Longitud"
                                    type="number"
                                    value={values.length}
                                    onChange={handleChange}
                                    error={errors.length}
                                    helperText={errors.length}
                                    disabled={mode === "view"}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    name="passengers"
                                    label="Pasajeros"
                                    type="number"
                                    value={values.passengers}
                                    onChange={handleChange}
                                    error={errors.passengers}
                                    helperText={errors.passengers}
                                    disabled={mode === "view"}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    name="max_atmosphering_speed"
                                    label="Velocidad máxima"
                                    type="number"
                                    value={values.max_atmosphering_speed}
                                    onChange={handleChange}
                                    error={errors.max_atmosphering_speed}
                                    helperText={errors.max_atmosphering_speed}
                                    disabled={mode === "view"}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    name="hyperdrive_rating"
                                    label="Rating de hiperimpulsor"
                                    type="number"
                                    value={values.hyperdrive_rating}
                                    onChange={handleChange}
                                    error={errors.hyperdrive_rating}
                                    helperText={errors.hyperdrive_rating}
                                    disabled={mode === "view"}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    name="MGLT"
                                    label="MGLT"
                                    type="number"
                                    value={values.MGLT}
                                    onChange={handleChange}
                                    error={errors.MGLT}
                                    helperText={errors.MGLT}
                                    disabled={mode === "view"}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    name="cargo_capacity"
                                    label="Capacidad de carga"
                                    type="number"
                                    value={values.cargo_capacity}
                                    onChange={handleChange}
                                    error={errors.cargo_capacity}
                                    helperText={errors.cargo_capacity}
                                    disabled={mode === "view"}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    name="consumables"
                                    label="Consumibles"
                                    type="text"
                                    value={values.consumables}
                                    onChange={handleChange}
                                    error={errors.consumables}
                                    helperText={errors.consumables}
                                    disabled={mode === "view"}
                                />
                            </Grid>
                        </Grid>
                       <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                            <Button type="submit" variant="contained">
                                {mode === "view" ? "Cerrar" : "Guardar"}
                            </Button>
                        </Box>
                    </form>
                </Offcanvas.Body>
            </Offcanvas>

                  <Modal show={modalInfo.open} onHide={handleCloseConfirmationModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{modalInfo.title}</Modal.Title>
                </Modal.Header>

                <Modal.Body className="text-center">
                    {modalInfo.success ? (
                        <CheckCircleIcon sx={{ fontSize: 60, color: "#1976d2", marginBottom: 2 }} />
                    ) : (
                        <ErrorIcon sx={{ fontSize: 60, color: "red", marginBottom: 2 }} />
                    )}

                    <p style={{ fontSize: "16px", color: "#333", marginTop: "10px" }}>
                        {modalInfo.message}
                    </p>
                </Modal.Body>
            </Modal>

        </>
    );
};

export default FormStarship;
