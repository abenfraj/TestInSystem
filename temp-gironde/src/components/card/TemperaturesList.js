import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import * as React from "react";
import {useEffect, useState} from "react";
import LoadingCircle from "../loading/LoadingCircle";
import "../../App.css";

const TemperaturesList = ({temperaturesPerHour}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [firstHalfOfTemperaturesPerHour, setFirstHalfOfTemperaturesPerHour] = useState([]);
    const [secondHalfOfTemperaturesPerHour, setSecondHalfOfTemperaturesPerHour] = useState([]);
    const [thirdHalfOfTemperaturesPerHour,setThirdHalfOfTemperaturesPerHour] = useState([]);

    useEffect(() => {
        setFirstHalfOfTemperaturesPerHour(() => temperaturesPerHour.slice(0, 8));
        setSecondHalfOfTemperaturesPerHour(() => temperaturesPerHour.slice(8, 16));
        setThirdHalfOfTemperaturesPerHour(() => temperaturesPerHour.slice(16, 24));
        setIsLoading(false);
    }, [temperaturesPerHour]);

    if (isLoading) {
        return <Grid container justifyContent={"center"} alignContent={"center"}><LoadingCircle/></Grid>;
    }
    return (
        <CardContent sx={{backgroundColor: "purple", opacity: "0.5"}}>
            <Grid
                container
                direction="row"
                justify="center"
            >
                <Grid item xs={4}>
                    {firstHalfOfTemperaturesPerHour.map((temperature, index) => {
                            return (
                                <Typography variant="body2" color="white" key={index}>
                                    {temperature.heure_mesure_temp.substring(0, 5)} — {temperature.resultat.toFixed(2)}°C
                                </Typography>
                            );
                        }
                    )}
                </Grid>
                <Grid item xs={4}>
                    {secondHalfOfTemperaturesPerHour.map((temperature, index) => {
                            return (
                                <Typography variant="body2" color="white" key={index}>
                                    {temperature.heure_mesure_temp.substring(0, 5)} — {temperature.resultat.toFixed(2)}°C
                                </Typography>
                            );
                        }
                    )}
                </Grid>
                <Grid item xs={4}>
                    {thirdHalfOfTemperaturesPerHour.map((temperature, index) => {
                            return (
                                <Typography variant="body2" color="white" key={index}>
                                    {temperature.heure_mesure_temp.substring(0, 5)} — {temperature.resultat.toFixed(2)}°C
                                </Typography>
                            );
                        }
                    )}
                </Grid>
            </Grid>
        </CardContent>
    )
}

export default TemperaturesList;