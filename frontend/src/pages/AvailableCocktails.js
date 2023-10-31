import _ from 'lodash';
import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { useHistory } from "react-router-dom";
import useStyles from './styles/CommonStyles';
import { Card, CardContent, Typography, Grid, Paper, Button } from "@mui/material";
import ListIcon from "@mui/icons-material/List";
const AvailableCocktails = () => {
    const history = useHistory();
    let [availableCocktails, setAvailableCocktails] = useState([])

    useEffect(() => {
        const getAvailableCocktails = async () => {
            try{
                await axios({
                    method: 'get',
                    url: `/api/available-cocktails`
                }).then(response => {
                    setAvailableCocktails(response.data)
                    console.log(response.data)
                });
            } catch (e){
                console.log(e);
            }
        }
        getAvailableCocktails();
    }, [])

    const handleRedirectToIngredientDetails = () => {
        history.push("/ingredients");
    };
    const classes = useStyles();
    return (
        <div>
            <Paper sx={{
                background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
                color: "white",
                padding: "16px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                }}
            >
                <Typography variant="h4" component="div">
                List of available cocktails
                </Typography>

                <div component={Paper}>
                    <Button color="primary" type="button" onClick={() => handleRedirectToIngredientDetails()} style={{marginLeft: '150px', fontSize: '25', backgroundColor: 'black'}}>
                        <ListIcon /> <span style={{marginLeft: '2px', color: 'white'}}>Show Ingredient List</span>
                    </Button>
                </div>

            </Paper>

            <Grid container style={{margin: "10px", justifyContent: "center", alignItems: "center"}}>
                {(availableCocktails.length <= 0)?
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                        <Grid item xs={12}>
                        <Card sx={{ width: "300px", margin: "10px" }}>
                            <CardContent>
                            <Typography variant="h6" component="div">
                                You don't have any ingredients to make a cocktail. Or check your ingredient expiray date!
                            </Typography>
                            </CardContent>
                        </Card>
                        </Grid>
                    </div>
                :
                    _.map(availableCocktails, (cocktail,index) =>
                        <Grid item xs={3} key={index}>
                            <Card sx={{ width: '300px', margin: '10px' }}>
                                <CardContent>
                                    <Typography variant="h6" component="div">
                                    {cocktail.name}
                                    </Typography>
                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                        
                                        <ul> Ingredients List:
                                            {cocktail.ingredients.map((ingredient, i) => (
                                                <li key={i}>{ingredient}</li>
                                            ))}
                                        </ul>
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        )
                    }
            </Grid>
        </div>
    )
};

export default AvailableCocktails;