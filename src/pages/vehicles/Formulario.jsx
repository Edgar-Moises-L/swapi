import { TextField, Button, Grid } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useState, useEffect } from 'react';
import { putData, postData } from '../../services/Api.jsx';
import { Modal } from 'react-bootstrap';

const Formulario = ({ open, onClose, initialValues, mode, refreshData }) => {
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
        vehicle_class: Yup.string().typeError("Debe ser un número"),
        passengers: Yup.number().typeError("Debe ser un número"),
        max_atmosphering_speed: Yup.number().typeError("Debe ser un número"),
        cargo_capacity: Yup.number().typeError("Debe ser un número"),
        consumables: Yup.string()
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
                await postData(`/vehicles`, data);
            } else if (mode === "edit") {
                await putData(`/vehicles/${data._id}`, data);
            }

            setShowOffcanvas(false);
            if (typeof onClose === "function") onClose();

            if (mode === "create" || mode === "edit") {
                setModalInfo({
                    open: true,
                    title: "Registro guardado con éxito",
                    message: "El veiculo se ha guardado correctamente.",
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
                message: "Ocurrió un error al guardar el veiculo.",
                success: false,
            });
        }
    };

    const { handleSubmit, handleChange, errors, values, resetForm } = useFormik({
        initialValues: initialValues || {
            name: "",
            model: "",
            vehicle_class: "",
            passengers: "",
            max_atmosphering_speed: "",
            cargo_capacity: "",
            consumables: ""
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
                    vehicle_class: "",
                    passengers: "",
                    max_atmosphering_speed: "",
                    cargo_capacity: "",
                    consumables: ""
                }
            });
        } else {
            resetForm({
                values: initialValues || {
                    name: "",
                    model: "",
                    vehicle_class: "",
                    passengers: "",
                    max_atmosphering_speed: "",
                    cargo_capacity: "",
                    consumables: ""
                }
            });
        }
    }, [mode, initialValues, resetForm]);

    const title = mode === "create" ? "Crear veiculo" : mode === "view" ? "Ver veiculo" : mode === "edit" ? "Editar veiculo" : "Peiculo";

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
                                        error={errors.name}
                                        helperText={errors.name}
                                        fullWidth
                                        disabled={mode === "view"}
                                    />
                                </Grid>
                                <Grid item xs={12} md={8}>
                                    <TextField
                                        label="Modelo"
                                        name="model"
                                        value={values.model}
                                        onChange={handleChange}
                                        error={errors.model}
                                        helperText={errors.model}
                                        fullWidth
                                        disabled={mode === "view"}
                                    />
                                </Grid>
                                <Grid item xs={12} md={8}>
                                    <TextField
                                        label="Clase de nave"
                                        name="vehicle_class"
                                        value={values.vehicle_class}
                                        onChange={handleChange}
                                        error={errors.vehicle_class}
                                        helperText={errors.vehicle_class}
                                        fullWidth
                                        disabled={mode === "view"}
                                    />
                                </Grid>
                                <Grid item xs={12} md={8}>
                                    <TextField
                                        type="number"
                                        label="Pasajeros"
                                        name="passengers"
                                        value={values.passengers}
                                        onChange={handleChange}
                                        error={errors.passengers}
                                        helperText={errors.passengers}
                                        fullWidth
                                        disabled={mode === "view"}
                                    />
                                </Grid>
                                <Grid item xs={12} md={8}>
                                    <TextField
                                        type="number"
                                        label="Velocidad máxima atmosférica"
                                        name="max_atmosphering_speed"
                                        value={values.max_atmosphering_speed}
                                        onChange={handleChange}
                                        error={errors.max_atmosphering_speed}
                                        helperText={errors.max_atmosphering_speed}
                                        fullWidth
                                        disabled={mode === "view"}
                                    />
                                </Grid>
                                <Grid item xs={12} md={8}>
                                    <TextField
                                        type="number"
                                        label="Capacidad de carga"
                                        name="cargo_capacity"
                                        value={values.cargo_capacity}
                                        onChange={handleChange}
                                        error={errors.cargo_capacity}
                                        helperText={errors.cargo_capacity}
                                        fullWidth
                                        disabled={mode === "view"}
                                    />
                                </Grid>
                                <Grid item xs={12} md={8}>
                                    <TextField
                                        label="Consumibles"
                                        name="consumables"
                                        value={values.consumables}
                                        onChange={handleChange}
                                        error={errors.consumables}
                                        helperText={errors.consumables}
                                        fullWidth
                                        disabled={mode === "view"}
                                    />
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
