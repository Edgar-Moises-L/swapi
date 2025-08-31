import { TextField, Button, Grid } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useState, useEffect } from 'react';
import { putData, postData } from '../../services/Api.jsx';
import { Modal } from 'react-bootstrap';

const Formulario = ({ open, onClose, initialValues, mode, onDeleteSuccess }) => {
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
        title: Yup.string().required("Campo obligatorio"),
        director: Yup.string().required("Campo obligatorio"),
        producer: Yup.string().required("Campo obligatorio"),
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
            if (mode === "create") {
                await postData(`/films`, data);
            } else if (mode === "edit") {
                await putData(`/films/${data._id}`, data);
            }

            setShowOffcanvas(false);
            if (typeof onClose === "function") onClose();

            if (mode === "create" || mode === "edit" ) {
            setModalInfo({
                open: true,
                title: "Registro guardado con éxito",
                message: "La película se ha guardado correctamente.",
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
                message: "Ocurrió un error al guardar la película.",
                success: false,
            });
        }
    };

    const { handleSubmit, handleChange, errors, values, resetForm } = useFormik({
        initialValues: initialValues || { title: "", director: "", producer: "" },
        enableReinitialize: true,
        validationSchema,
        onSubmit,
    });

    useEffect(() => {
        if (mode === "create") {
            resetForm({ values: { title: "", director: "", producer: "" } });
        } else {
            resetForm({ values: initialValues || { title: "", director: "", producer: "" } });
        }
    }, [mode, initialValues, resetForm]);

    const title = mode === "create" ? "Crear película" : mode === "view" ? "Ver película" : mode === "edit" ? "Editar película" : "Película";

    return (
        <>
            <Offcanvas show={showOffcanvas} onHide={() => { setShowOffcanvas(false); if (typeof onClose === "function") onClose(); }} placement="end">
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
                                    disabled={mode === "view"}
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
                                    disabled={mode === "view"}
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
                                    disabled={mode === "view"}
                                />
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
