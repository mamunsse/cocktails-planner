import _ from 'lodash';
import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { useHistory } from "react-router-dom";
import {
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TextField,
    FormControlLabel,
    Checkbox,
    Grid
} from '@material-ui/core';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DashboardIcon from '@mui/icons-material/Dashboard';
import useStyles from './styles/CommonStyles';

const IngredientDetails = () => {
    const history = useHistory();
    const today = new Date();
    let [ingredientDetails, setIngredientDetails] = useState([])
    let [addNewIngredient, setAddNewIngredient] = useState(false)
    let [editIngredient, setEditIngredient] = useState(false)
    // form data
    const [ingredientName, setIngredientName] = useState('');
    const [expiryDate, setExpiryDate] = useState(null); 
    const [isAlcoholic, setIsAlcoholic] = useState(false);

    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const getIngredientDetails = async () => {
            try{
                await axios({
                    method: 'get',
                    url: `/api/ingredients/`
                }).then(response => {
                    setIngredientDetails(response.data)
                    console.log(response.data)
                });
            } catch (e){
                console.log(e);
            }
        }
        getIngredientDetails();
    }, [])

    const handleAddClick = async () => {
        setAddNewIngredient(true)
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/ingredients/', {
              name: ingredientName,
              is_alcoholic: isAlcoholic,
              expiry_date: expiryDate,
            });

            if (response.status === 201) {
                setAddNewIngredient(false);
                setEditIngredient(false);
                setIngredientDetails(response.data);
            } else {
                console.log(response.data.name)
                setErrorMessage(response.data.name);
            }
          } catch (error) {
            console.log(error);
          }
    };


    

    const handleEditClick = async (id) => {
        setEditIngredient(true);
        try {
            const response = await axios.get(`/api/ingredients/${id}`); 
            setIngredientName(response.data.name)
            setExpiryDate(response.data.expiry_date)
            isAlcoholic(response.data.is_alcoholic)
        } catch (e) {
            console.log(e);
        }
    };
      
    const handleDashboardClick = () => {
        history.push("/");
    };
      

    const handleDeleteClick = async (id) => {
    try {
        const response = await axios.delete(`/api/ingredients/${id}`);
        setIngredientDetails(response.data)
        console.log(response.data);
    } catch (e) {
        console.log(e);
    }
    };
      

    const classes = useStyles();
    const deleteIconStyle = {
        color: 'red', 
        cursor: 'pointer'
    };

    const isExpired = (expiryDate) => {
        const today = new Date();
        const expiryDateObj = new Date(expiryDate);
        return expiryDateObj < today;
    };

    return (
        <div>
        {addNewIngredient || editIngredient?
            <form onSubmit={handleFormSubmit}>
                <div>
                    <TextField
                    label="Ingredient Name"
                    name='name'
                    variant="outlined"
                    value={ingredientName}
                    onChange={(e) => setIngredientName(e.target.value)}
                    style={{width: '70%', margin: '5px', marginTop: '50px'}}
                    required
                    />
                </div>
                <div>
                    <TextField
                        label="Expiry Date"
                        variant="outlined"
                        type="date"
                        name='expiry_date'
                        value={expiryDate}
                        onChange={(e) => setExpiryDate(e.target.value)}
                        style={{width: '70%', margin: '5px', marginTop: '10px'}}
                        required
                    />
                </div>
                <div style={{marginRight:"60%"}}>
                    <FormControlLabel
                    control={
                        <Checkbox
                        variant="outlined"
                        name='is_alcoholic'
                        checked={isAlcoholic}
                        onChange={(e) => setIsAlcoholic(e.target.checked)}
                        color="primary"
                        />
                    }
                    label="Contain Alcoholic?"
                    />

                </div>
                <div>
                    {
                        addNewIngredient?
                        <Button type="submit" variant="contained" color="primary" style={{width: '20%', margin: '5px'}}>
                            Add New Ingredient
                        </Button>
                        :
                        <Button type="submit" variant="contained" color="primary" style={{width: '20%', margin: '5px'}}>
                            Update Ingredient
                        </Button>

                    }
                </div>
                
            </form>
            :
            
            <div className="cocktail-details-table" style={{margin:'2%'}} >
                
                <Grid container spacing={2} justifyContent="center" alignItems="center" style={{marginBottom:'5px'}} >
                    <div component={Paper}>
                        <Button color="primary" type="button" onClick={(evt) => handleDashboardClick()} >
                            <DashboardIcon /> <span style={{marginLeft: '2px'}}> Back To Dashboard</span>
                        </Button>
                    </div>

                    <div component={Paper} style={{marginLeft:'70px'}} >
                        <Button color="primary" type="button" onClick={(evt) => handleAddClick()} >
                            <AddIcon /> <span style={{marginLeft: '2px'}}>Add New Ingredient</span>
                        </Button>
                    </div>
                </Grid>

                <TableContainer spacing={1} component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow xs={12}>
                                <TableCell className={classes.tableHeaderCell}>Ingredient Name</TableCell>
                                <TableCell className={classes.tableHeaderCell}>Is Alcoholic</TableCell>
                                <TableCell className={classes.tableHeaderCell}>Expirary Date</TableCell>
                                <TableCell className={classes.tableHeaderCell}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                            _.map(ingredientDetails, (r,v,k) =>
                                    <TableRow xs={12}>
                                        <TableCell>{r["name"]}</TableCell>
                                        <TableCell>
                                            {r["is_alcoholic"]?
                                                <p>Yes</p>
                                            :
                                                <p>No</p>
                                            }
                                        </TableCell>
                                        <TableCell className={isExpired(r["expiry_date"]) ? classes.redText : ""}>
                                            {r["expiry_date"]}
                                        </TableCell>
                                        <TableCell>
                                            <EditIcon color="primary" style={{cursor: "pointer"}} onClick={(evt) => handleEditClick(r["id"])} />
                                            <DeleteIcon style={deleteIconStyle} onClick={(evt) => handleDeleteClick(r["id"])} />
                                        </TableCell>
                                    </TableRow>
                                )
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        }
        </div>
        
    )
};

export default IngredientDetails;