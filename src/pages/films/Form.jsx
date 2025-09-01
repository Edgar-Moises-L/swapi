import { TextField, Button, Grid, Box, Typography} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useState, useEffect } from 'react';
import { putData, postData } from '../../services/Api.jsx';
import { Modal } from 'react-bootstrap';
import MovieIcon from "@mui/icons-material/Movie";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";

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
        title: Yup.string().required("Campo obligatorio"),
        director: Yup.string().required("Campo obligatorio"),
        producer: Yup.string().required("Campo obligatorio"),
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
                await postData(`/films`, data);
            } else if (mode === "edit") {
                await putData(`/films/${data._id}`, data);
            }

            setShowOffcanvas(false);
            if (typeof onClose === "function") onClose();

            if (mode === "create" || mode === "edit") {
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
            <Offcanvas show={showOffcanvas} onHide={() => { setShowOffcanvas(false); if (typeof onClose === "function") onClose(); }} placement="end" style={{ width: 500 }}>
                <Offcanvas.Header closeButton style={{ borderBottom: "none", paddingBottom: 8 }} >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2, width: "100%", justifyContent: "space-between" }}>
                        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                            <MovieIcon sx={{ color: '#3b5bd3' }} />
                            <Typography variant="h6" sx={{ fontWeight: 700, color: '#3b5bd3' }}>{title}</Typography>
                        </Box>
                    </Box>
                </Offcanvas.Header>

                <Offcanvas.Body>

                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={3} sx={{ justifyContent: "center" }}>
                            <Grid item xs={12} md={6}>
                        
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
                            <Grid item xs={12} md={6}>
                   
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
                            <Grid item xs={12} md={6}>
                      
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

                        <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 3 }}>
                            <Button type="submit" variant="contained" sx={{ mt: 2 }}>
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

export default Formulario;
