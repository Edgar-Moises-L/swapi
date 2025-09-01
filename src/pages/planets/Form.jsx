import { TextField, Button, Grid, Select, MenuItem, FormHelperText, InputLabel, FormControl, Checkbox, ListItemText, Box, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useState, useEffect } from 'react';
import { putData, postData, fetchList } from '../../services/Api.jsx';
import { Modal } from 'react-bootstrap';
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import PublicIcon from "@mui/icons-material/Public";

const FormPlanet = ({ open, onClose, initialValues, mode, refreshData }) => {
  const [showOffcanvas, setShowOffcanvas] = useState(open);
  const [residents, setResidents] = useState([]);
  const [modalInfo, setModalInfo] = useState({
    open: false,
    title: '',
    message: '',
    success: false,
  });

  useEffect(() => {
    const fetchResidents = async () => {
      try {
        const data = await fetchList('/characters/list/character');
        setResidents(data || []);
        console.log("residents fetched:", data);
      } catch (error) {
        console.error("Error al obtener residentes:", error);
      }
    };
    fetchResidents();
  }, []);

  useEffect(() => {
    setShowOffcanvas(open);
  }, [open]);

  const validationSchema = Yup.object({
    name: Yup.string().required("Campo obligatorio"),
    diameter: Yup.number().typeError("Debe ser un número").nullable(),
    rotation_period: Yup.number().typeError("Debe ser un número").nullable(),
    orbital_period: Yup.number().typeError("Debe ser un número").nullable(),
    gravity: Yup.string(),
    surface_water: Yup.number().typeError("Debe ser un número").nullable(),
    population: Yup.number().typeError("Debe ser un número").nullable(),
    climate: Yup.string(),
    terrain: Yup.string(),
    residents_id: Yup.array().of(Yup.string()),
  });

  const defaultValues = {
    name: "",
    diameter: "",
    rotation_period: "",
    orbital_period: "",
    gravity: "",
    surface_water: "",
    population: "",
    climate: "",
    terrain: "",
    residents_id: []
  };



  const onSubmit = async (formValues) => {
    try {
      const payload = {
        name: formValues.name,
        diameter: formValues.diameter === "" ? null : Number(formValues.diameter),
        rotation_period: formValues.rotation_period === "" ? null : Number(formValues.rotation_period),
        orbital_period: formValues.orbital_period === "" ? null : Number(formValues.orbital_period),
        gravity: formValues.gravity,
        surface_water: formValues.surface_water === "" ? null : Number(formValues.surface_water),
        population: formValues.population === "" ? null : Number(formValues.population),
        climate: formValues.climate,
        terrain: formValues.terrain,
        residents: formValues.residents_id || []
      };

      if (mode === "create") {
        await postData(`/planets`, payload);
      } else if (mode === "edit") {
        const id = initialValues?._id || formValues._id;
        await putData(`/planets/${id}`, payload);
      }

      setShowOffcanvas(false);
      if (typeof onClose === "function") onClose();

      setModalInfo({
        open: true,
        title: "Registro guardado con éxito",
        message: "El planeta se ha guardado correctamente.",
        success: true,
      });
    } catch (error) {
      console.error("Error al guardar:", error);
      setShowOffcanvas(false);
      if (typeof onClose === "function") onClose();

      setModalInfo({
        open: true,
        title: "Error al guardar",
        message: "Ocurrió un error al guardar el planeta.",
        success: false,
      });
    }
  };



  const { handleSubmit, handleChange, setFieldValue, errors, values, resetForm } = useFormik({
    initialValues: mode === "create"
      ? defaultValues
      : { ...defaultValues, ...initialValues },
    enableReinitialize: true,
    validationSchema,
    onSubmit,
  });

  useEffect(() => {
    if (mode === "create") {
      resetForm({ values: defaultValues });
    } else {
      const iv = initialValues || {};
      resetForm({
        values: {
          ...defaultValues,
          ...iv,
          residents_id: Array.isArray(iv.residents_id) ? iv.residents_id : (iv.residents ? iv.residents : [])
        }
      });
    }
  }, [mode, initialValues, resetForm]);

  const title = mode === "create" ? "Crear planeta" : mode === "view" ? "Ver planeta" : mode === "edit" ? "Editar planeta" : "Planeta";

  const getResidentName = (id) => {
    const r = residents.find(x => x._id === id);
    return r ? r.name : id;
  };

  const handleCloseConfirmationModal = () => {
    const wasSuccess = modalInfo.success;
    setModalInfo(prev => ({ ...prev, open: false }));
    if (wasSuccess && typeof refreshData === "function") {
      refreshData();
    }
  };

  return (
    <>
      <Offcanvas show={showOffcanvas} onHide={() => { setShowOffcanvas(false); if (typeof onClose === "function") onClose(); }} placement="end" style={{ width: 500 }}>
        <Offcanvas.Header closeButton style={{ borderBottom: "none", paddingBottom: 8 }} >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, width: "100%", justifyContent: "space-between" }}>
            <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
              <PublicIcon sx={{ color: '#3b5bd3' }} />
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#3b5bd3' }}>{title}</Typography>
            </Box>
          </Box>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2} >

              <Grid item xs={12} md={12}>
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

              <Grid item xs={12} md={6}>
                <TextField
                  label="Diámetro"
                  name="diameter"
                  value={values.diameter}
                  onChange={handleChange}
                  error={!!errors.diameter}
                  helperText={errors.diameter}
                  fullWidth
                  disabled={mode === "view"}
                />
              </Grid>

              <Grid item xs={12} md={8}>
                <TextField
                  label="Periodo de rotación"
                  name="rotation_period"
                  value={values.rotation_period}
                  onChange={handleChange}
                  error={!!errors.rotation_period}
                  helperText={errors.rotation_period}
                  fullWidth
                  disabled={mode === "view"}
                />
              </Grid>

              <Grid item xs={12} md={8}>
                <TextField
                  label="Periodo orbital"
                  name="orbital_period"
                  value={values.orbital_period}
                  onChange={handleChange}
                  error={!!errors.orbital_period}
                  helperText={errors.orbital_period}
                  fullWidth
                  disabled={mode === "view"}
                />
              </Grid>

              <Grid item xs={12} md={8}>
                <TextField
                  label="Gravedad"
                  name="gravity"
                  value={values.gravity}
                  onChange={handleChange}
                  error={!!errors.gravity}
                  helperText={errors.gravity}
                  fullWidth
                  disabled={mode === "view"}
                />
              </Grid>

              <Grid item xs={12} md={8}>
                <TextField
                  label="Agua superficial"
                  name="surface_water"
                  value={values.surface_water}
                  onChange={handleChange}
                  error={!!errors.surface_water}
                  helperText={errors.surface_water}
                  fullWidth
                  disabled={mode === "view"}
                />
              </Grid>

              <Grid item xs={12} md={8}>
                <TextField
                  label="Población"
                  name="population"
                  value={values.population}
                  onChange={handleChange}
                  error={!!errors.population}
                  helperText={errors.population}
                  fullWidth
                  disabled={mode === "view"}
                />
              </Grid>

              <Grid item xs={12} md={8}>
                <TextField
                  label="Clima"
                  name="climate"
                  value={values.climate}
                  onChange={handleChange}
                  error={!!errors.climate}
                  helperText={errors.climate}
                  fullWidth
                  disabled={mode === "view"}
                />
              </Grid>

              <Grid item xs={12} md={8}>
                Terreno
                <TextField
                  label="Terreno"
                  name="terrain"
                  value={values.terrain}
                  onChange={handleChange}
                  error={!!errors.terrain}
                  helperText={errors.terrain}
                  fullWidth
                  disabled={mode === "view"}
                />
              </Grid>

              <Grid item xs={12} md={12}>
                Residentes
                <FormControl fullWidth error={!!errors.residents_id} disabled={mode === "view"}>
                  <InputLabel id="residents-label">Residentes</InputLabel>
                  <Select
                    labelId="residents-label"
                    id="residents_id"
                    name="residents_id"
                    multiple
                    value={values.residents_id || []}
                    onChange={(e) => setFieldValue('residents_id', e.target.value)}
                    renderValue={(selected) => (selected || []).map(id => getResidentName(id)).join(', ')}
                  >
                    {residents.map(hw => (
                      <MenuItem key={hw._id} value={hw._id}>
                        <Checkbox checked={(values.residents_id || []).indexOf(hw._id) > -1} />
                        <ListItemText primary={hw.name} />
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.residents_id && <FormHelperText>{errors.residents_id}</FormHelperText>}
                </FormControl>
              </Grid>

            </Grid>

            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
              {mode === "view" ? (
                <Button
                  type="button"
                  variant="contained"
                  onClick={() => {
                    setShowOffcanvas(false);
                    if (typeof onClose === "function") onClose();
                  }}
                >
                  Cerrar
                </Button>
              ) : (
                <Button type="submit" variant="contained">
                  Guardar
                </Button>
              )}
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

export default FormPlanet;
