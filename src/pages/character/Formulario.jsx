import { TextField, Button, Grid, Select, MenuItem, FormHelperText, InputLabel, FormControl, Checkbox, ListItemText } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useState, useEffect } from "react";
import { putData, postData, fetchList } from "../../services/Api.jsx";
import { Modal } from "react-bootstrap";

const FormularioPersonaje = ({ open, onClose, initialValues, mode, refreshData }) => {
    const [showOffcanvas, setShowOffcanvas] = useState(open);
    const [films, setFilms] = useState([]);
    const [starships, setStarships] = useState([]);
    const [vehicles, setVehicles] = useState([]);
    const [species, setSpecies] = useState([]);
    const [planets, setPlanets] = useState([]);

    const [modalInfo, setModalInfo] = useState({
        open: false,
        title: "",
        message: "",
        success: false,
    });

    useEffect(() => {
        const loadLists = async () => {
            try {
                const [filmsData, shipsData, vehiclesData, speciesData, planetsData] = await Promise.all([
                    fetchList("/films/list/for-character"),
                    fetchList("/starships/list/for-character"),
                    fetchList("/vehicles/list/for-character"),
                    fetchList("/species/list/for-character"),
                    fetchList("/planets/list/for-character"),
                ]);

                setFilms(filmsData || []);
                setStarships(shipsData || []);
                setVehicles(vehiclesData || []);
                setSpecies(speciesData || []);
                setPlanets(planetsData || []);
            } catch (err) {
                console.error("Error cargando listas:", err);
            }
        };
        loadLists();
    }, []);

    useEffect(() => {
        setShowOffcanvas(open);
    }, [open]);

    const validationSchema = Yup.object({
        name: Yup.string().required("Campo obligatorio"),
        birth_year: Yup.string(),
        eye_color: Yup.string(),
        gender: Yup.string(),
        hair_color: Yup.string(),
        height: Yup.number().typeError("Debe ser un número").nullable(),
        mass: Yup.number().typeError("Debe ser un número").nullable(),
        skin_color: Yup.string(),
        homeworld_id: Yup.string().nullable(),
        species_id: Yup.string().nullable(),
        films_id: Yup.array().of(Yup.string()),
        starships_id: Yup.array().of(Yup.string()),
        vehicles_id: Yup.array().of(Yup.string()),
    });

    const defaultValues = {
        name: "",
        birth_year: "",
        eye_color: "",
        gender: "",
        hair_color: "",
        height: "",
        mass: "",
        skin_color: "",
        homeworld_id: "",
        species_id: "",
        films_id: [],
        starships_id: [],
        vehicles_id: [],
    };

    const onSubmit = async (formValues) => {
        try {
            const payload = {
                name: formValues.name,
                birth_year: formValues.birth_year,
                eye_color: formValues.eye_color,
                gender: formValues.gender,
                hair_color: formValues.hair_color,
                height: formValues.height === "" ? null : Number(formValues.height),
                mass: formValues.mass === "" ? null : Number(formValues.mass),
                skin_color: formValues.skin_color,
                homeworld: formValues.homeworld_id || null,
                species: formValues.species_id || null,
                films: formValues.films_id || [],
                starships: formValues.starships_id || [],
                vehicles: formValues.vehicles_id || [],
            };

            if (mode === "create") {
                await postData(`/characters`, payload);
            } else if (mode === "edit") {
                const id = initialValues?._id || formValues._id;
                await putData(`/characters/${id}`, payload);
            }

            setShowOffcanvas(false);
            if (typeof onClose === "function") onClose();

            setModalInfo({
                open: true,
                title: "Registro guardado con éxito",
                message: "El personaje se ha guardado correctamente.",
                success: true,
            });
        } catch (err) {
            console.error("Error guardando personaje:", err);
            setModalInfo({
                open: true,
                title: "Error",
                message: "Ocurrió un error al guardar el personaje.",
                success: false,
            });
        }
    };
    const handleCloseConfirmationModal = () => {
        const wasSuccess = modalInfo.success;
        setModalInfo((prev) => ({ ...prev, open: false }));
        if (wasSuccess && typeof refreshData === "function") {
            refreshData();
        }
    };


    const { handleSubmit, handleChange, setFieldValue, values, errors, resetForm } = useFormik({
        initialValues: mode === "create" ? defaultValues : { ...defaultValues, ...initialValues },
        enableReinitialize: true,
        validationSchema,
        onSubmit,
    });

    useEffect(() => {
        if (mode === "create") {
            resetForm({ values: defaultValues });
        } else {
            resetForm({ values: { ...defaultValues, ...initialValues } });
        }
    }, [mode, initialValues, resetForm]);

    const title =
        mode === "create" ? "Crear personaje" : mode === "view" ? "Ver personaje" : "Editar personaje";

    return (
        <>
            <Offcanvas
                show={showOffcanvas}
                onHide={() => {
                    setShowOffcanvas(false);
                    if (typeof onClose === "function") onClose();
                }}
                placement="end"
            >
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>{title}</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <form onSubmit={handleSubmit}>
                        <Grid container direction="column" spacing={2}>
                            <Grid item>
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

                            <Grid item>
                                <TextField
                                    label="Año de nacimiento"
                                    name="birth_year"
                                    value={values.birth_year}
                                    onChange={handleChange}
                                    fullWidth
                                    disabled={mode === "view"}
                                />
                            </Grid>

                            <Grid item>
                                <TextField
                                    label="Color de ojos"
                                    name="eye_color"
                                    value={values.eye_color}
                                    onChange={handleChange}
                                    fullWidth
                                    disabled={mode === "view"}
                                />
                            </Grid>

                            <Grid item>
                                <TextField
                                    label="Género"
                                    name="gender"
                                    value={values.gender}
                                    onChange={handleChange}
                                    fullWidth
                                    disabled={mode === "view"}
                                />
                            </Grid>


                            <Grid item>
                                <TextField
                                    label="Color del pelo"
                                    name="hair_color"
                                    value={values.hair_color}
                                    onChange={handleChange}
                                    fullWidth
                                    disabled={mode === "view"}
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    label="Altura"
                                    name="height"
                                    value={values.height}
                                    onChange={handleChange}
                                    fullWidth
                                    disabled={mode === "view"}
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    label="Peso"
                                    name="mass"
                                    value={values.mass}
                                    onChange={handleChange}
                                    fullWidth
                                    disabled={mode === "view"}
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    label="Color de piel"
                                    name="skin_color"
                                    value={values.skin_color}
                                    onChange={handleChange}
                                    fullWidth
                                    disabled={mode === "view"}
                                />
                            </Grid>



                            <Grid item>
                                <FormControl fullWidth>
                                    <InputLabel id="homeworld-label">Planeta natal</InputLabel>
                                    <Select
                                        labelId="homeworld-label"
                                        name="homeworld_id"
                                        value={values.homeworld_id}
                                        onChange={handleChange}
                                        disabled={mode === "view"}
                                    >
                                        {planets.map((p) => (
                                            <MenuItem key={p._id} value={p._id}>
                                                {p.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item>
                                <FormControl fullWidth>
                                    <InputLabel id="species-label">Especie</InputLabel>
                                    <Select
                                        labelId="species-label"
                                        name="species_id"
                                        value={values.species_id}
                                        onChange={handleChange}
                                        disabled={mode === "view"}
                                    >
                                        {species.map((s) => (
                                            <MenuItem key={s._id} value={s._id}>
                                                {s.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item>
                                <FormControl fullWidth>
                                    <InputLabel id="films-label">Películas</InputLabel>
                                    <Select
                                        labelId="films-label"
                                        name="films_id"
                                        multiple
                                        value={values.films_id}
                                        onChange={(e) => setFieldValue("films_id", e.target.value)}
                                        renderValue={(selected) =>
                                            films.filter((f) => selected.includes(f._id)).map((f) => f.title).join(", ")
                                        }
                                        disabled={mode === "view"}
                                    >
                                        {films.map((f) => (
                                            <MenuItem key={f._id} value={f._id}>
                                                <Checkbox checked={values.films_id.includes(f._id)} />
                                                <ListItemText primary={f.title} />
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item>
                                <FormControl fullWidth>
                                    <InputLabel id="starships-label">Naves</InputLabel>
                                    <Select
                                        labelId="starships-label"
                                        name="starships_id"
                                        multiple
                                        value={values.starships_id}
                                        onChange={(e) => setFieldValue("starships_id", e.target.value)}
                                        renderValue={(selected) =>
                                            starships.filter((s) => selected.includes(s._id)).map((s) => s.name).join(", ")
                                        }
                                        disabled={mode === "view"}
                                    >
                                        {starships.map((s) => (
                                            <MenuItem key={s._id} value={s._id}>
                                                <Checkbox checked={values.starships_id.includes(s._id)} />
                                                <ListItemText primary={s.name} />
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item>
                                <FormControl fullWidth>
                                    <InputLabel id="vehicles-label">Vehículos</InputLabel>
                                    <Select
                                        labelId="vehicles-label"
                                        name="vehicles_id"
                                        multiple
                                        value={values.vehicles_id}
                                        onChange={(e) => setFieldValue("vehicles_id", e.target.value)}
                                        renderValue={(selected) =>
                                            vehicles.filter((v) => selected.includes(v._id)).map((v) => v.name).join(", ")
                                        }
                                        disabled={mode === "view"}
                                    >
                                        {vehicles.map((v) => (
                                            <MenuItem key={v._id} value={v._id}>
                                                <Checkbox checked={values.vehicles_id.includes(v._id)} />
                                                <ListItemText primary={v.name} />
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>

                        {mode === "view" ? (
                            <Button type="button" variant="contained" sx={{ mt: 2 }} onClick={() => setShowOffcanvas(false)}>
                                Cerrar
                            </Button>
                        ) : (
                            <Button type="submit" variant="contained" sx={{ mt: 2 }}>
                                Guardar
                            </Button>
                        )}
                    </form>
                </Offcanvas.Body>
            </Offcanvas>
            <Modal
                show={modalInfo.open}
                onHide={handleCloseConfirmationModal}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>{modalInfo.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{modalInfo.message}</Modal.Body>
            </Modal>

        </>
    );
};

export default FormularioPersonaje;
