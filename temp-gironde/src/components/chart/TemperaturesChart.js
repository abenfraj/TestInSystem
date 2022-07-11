import {Line} from "react-chartjs-2";
import {Chart as ChartJS} from 'chart.js/auto'
import ChartDatePicker from "./ChartDatePicker";
import {useEffect, useState} from "react";
import Grid from "@mui/material/Grid";
import {Button} from "@mui/material";
import UpdateIcon from '@mui/icons-material/Update';
import LoadingCircle from "../loading/LoadingCircle";
import * as React from "react";

const TemperaturesChart = () => {
    const currentDay = new Date();
    const currentDayMinusOne = new Date(currentDay.getTime() - 24 * 60 * 60 * 1000);
    const [chosenStartDate, setChosenStartDate] = useState(currentDayMinusOne);
    const [chosenEndDate, setChosenEndDate] = useState(currentDay);
    const [isLoading, setIsLoading] = useState(false);
    const [hourLabels, setHourLabels] = useState([]);
    const [dayLabels, setDayLabels] = useState([]);
    const [displayedLabels, setDisplayedLabels] = useState(hourLabels);
    const [displayedData, setDisplayedData] = useState([]);

    useEffect(
        () => {
            if (watercourseData.datasets[0].data.length > 72) {
                setDisplayedLabels(dayLabels);
            } else {
                setDisplayedLabels(hourLabels);
            }
        }, [dayLabels, hourLabels]
    );

    const watercourseData = {
        labels: displayedLabels,
        datasets: [{
            label: "Température (en °C)",
            data: displayedData,
            borderColor: [
                '#FF9406',
            ],
            borderWidth: 2,
        }],
    }
    const watercourseOptions = {
        elements: {
            point: {
                radius: 0
            }
        },
        plugins: {
            legend: {
                labels: {
                    color: "white",
                    font: {
                        size: 18
                    }
                }
            }
        },
        scales: {
            y: {
                grid: {
                    color: "white",
                },
                ticks: {
                    color: "white",
                    font: {
                        size: 14,
                    },
                }
            },
            x: {
                grid: {
                    color: "white",
                },
                ticks: {
                    color: "white",
                    font: {
                        size: 14,
                    },
                }
            }
        }
    }

    const apiKey = "https://hubeau.eaufrance.fr/api/v1/temperature/chronique"
    const setNewChartData = () => {
        setIsLoading(true);
        fetch(apiKey +
            "?code_departement=33" +
            "&code_station=05025600" +
            "&date_debut_mesure=" + chosenStartDate.toISOString().split('T')[0] +
            "&date_fin_mesure=" + chosenEndDate.toISOString().split('T')[0] +
            "&fields=heure_mesure_temp,resultat,date_mesure_temp")
            .then(response => response.json())
            .then(data => {
                setIsLoading(false);
                if (data.count === 0) {
                    alert("Les mesures n'ont pas été prises sur toute la période sélectionnée");
                } else {
                    setDayLabels(data.data.slice(0).map(item => item.date_mesure_temp));
                    setHourLabels(data.data.slice(0).map(item => item.heure_mesure_temp));
                    setDisplayedData(data.data.slice(0).map(item => item.resultat));
                }
            }).catch(error => {
            setIsLoading(false);
            console.log(error);
        }).finally(() => {
                setIsLoading(false);
            }
        );
    }

    if (isLoading) {
        return <Grid container justifyContent={"center"} alignContent={"center"}><LoadingCircle/></Grid>;
    }

    return (
        <Grid container flexDirection={"column"} alignItems={"center"}>
            <Line data={watercourseData} options={watercourseOptions}/>
            <Grid sx={{marginTop: "50px"}}>
                <ChartDatePicker
                    label={"Date début mesure"}
                    chosenDate={chosenStartDate}
                    setChosenDate={setChosenStartDate}
                    maxDate={chosenEndDate}
                />
            </Grid>
            <Grid sx={{marginTop: "25px"}}>
                <ChartDatePicker
                    label={"Date fin mesure"}
                    chosenDate={chosenEndDate}
                    setChosenDate={setChosenEndDate}
                    minDate={new Date(chosenStartDate.getTime() + (24 * 60 * 60 * 1000))}
                />
            </Grid>
            <Grid sx={{marginTop: "25px"}}>
                <Button variant="contained" endIcon={<UpdateIcon/>} sx={{color: "white", backgroundColor: "#3D48EE"}}
                        onClick={
                            () => {
                                setNewChartData();
                            }
                        }>
                    Mettre à jour
                </Button>
            </Grid>
        </Grid>
    );
}

export default TemperaturesChart;