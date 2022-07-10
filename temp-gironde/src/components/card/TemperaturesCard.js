import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Grid from "@mui/material/Grid";
import {useEffect, useState} from "react";
import MeasureInfo from "./MeasureInfo";
import TemperaturesList from "./TemperaturesList";
import LoadingCircle from "../loading/LoadingCircle";

const TemperaturesCard = ({data}) => {
    const [temperaturesPerHour, setTemperaturesPerHour] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const date = new Date(data[0]);

    const subtractDays = (numOfDays = 1, date = new Date(data[0])) => {
        const dateCopy = new Date(date.getTime());

        dateCopy.setDate(dateCopy.getDate() - numOfDays);

        return dateCopy;
    }

    const formatDate = (date) => {
        let d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-');
    }

    const previousDate = subtractDays(1, date);
    const formattedPreviousDate = formatDate(previousDate);

    const weekday = new Array(7);
    weekday[0] = "Dim.";
    weekday[1] = "Lun.";
    weekday[2] = "Mar.";
    weekday[3] = "Mer.";
    weekday[4] = "Jeu.";
    weekday[5] = "Ven.";
    weekday[6] = "Sam.";
    const day = weekday[date.getDay()];

    const apiKey = "https://hubeau.eaufrance.fr/api/v1/temperature/chronique"
    useEffect(() => {
        fetch(apiKey +
            "?code_departement=33" +
            "&code_station=05025600" +
            "&date_debut_mesure=" + formattedPreviousDate +
            "&date_fin_mesure=" + data[0] +
            "&fields=heure_mesure_temp,resultat,date_mesure_temp")
            .then(response => response.json())
            .then(resData => {
                setTemperaturesPerHour(resData.data);
                setIsLoading(false);
            }).catch(error => {
            console.log(error);
        });
    }, [data, formattedPreviousDate]);

    if (isLoading) {
        return <Grid container justifyContent={"center"} alignContent={"center"}><LoadingCircle/></Grid>;
    }
    return (
        <Card sx={{width: 500, maxWidth: 700, backgroundColor: "transparent"}}>
            <MeasureInfo data={data} day={day}/>
            <CardMedia
                component="img"
                height="140"
                sx={{padding: "1em 0 4em 0", objectFit: "contain"}}
                image="https://cdn-icons-png.flaticon.com/512/2425/2425869.png"
                alt="cloud"
            />
            <TemperaturesList temperaturesPerHour={temperaturesPerHour}/>
        </Card>
    );
}

export default TemperaturesCard;