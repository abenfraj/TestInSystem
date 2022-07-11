import "./App.css";
import {useEffect, useState} from "react";
import Grid from '@mui/material/Grid';
import LoadingCircle from "./components/loading/LoadingCircle";
import {Typography} from "@mui/material";
import TemperaturesCarousel from "./components/card/TemperaturesCarousel";
import TemperaturesChart from "./components/chart/TemperaturesChart";
import Wave from 'react-wavify';
import styled from '@emotion/styled';
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";

const App = () => {

    const apiKey = "https://hubeau.eaufrance.fr/api/"
    const [watercourse, setWatercourse] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const WaveContainer = styled.div`
      position: fixed;
      left: 0;
      right: 0;
      top: 0;
      height: ${(props) => props.level + 'vh'};
      display: flex;
      z-index: -1;
      transform: rotate(180deg);
`;

    useEffect(() => {
        fetch(apiKey
            + "v1/temperature/chronique"
            + "?code_departement=33"
            + "&size=240"
            + "&sort=desc"
            + "&code_station=05025600"
            + "&fields=libelle_station,libelle_commune,resultat,date_mesure_temp,heure_mesure_temp")
            .then(res => res.json())
            .then(data => {
                setWatercourse(data);
                setIsLoading(false);
            })
            .catch(err => console.log(err))

    }, [])

    if (isLoading) return (<section className="main-container">
        <Grid container justifyContent={"center"} alignContent={"center"}><LoadingCircle/></Grid>
    </section>)

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <section className="main-container">
                <img
                    src="https://hubeau.eaufrance.fr/sites/default/files/api/demo/hydro/images/logo_hubeau_long_transp.png"
                    alt="logo"
                    className="logo"/>
                <Grid container
                      justifyContent={"space-evenly"}
                      alignContent={"center"}>
                    <Grid item lg={4} xs={12} className="temp-card">
                        <Grid container flexDirection={"column"} alignItems={"center"}>
                            <Grid item xs="auto" sx={{textAlign: "center"}}>
                                <Typography variant="h4" className={"typography"}>Températures cours
                                    d'eau
                                    Gironde</Typography>
                            </Grid>
                            <Grid item xs="auto" sx={{marginTop: "50px"}}>
                                <TemperaturesCarousel data={watercourse.data}/>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item lg={4} xs={7} className="temp-chart" sx={{zIndex: '4', marginTop: "75px"}}>
                        <TemperaturesChart/>
                    </Grid>
                </Grid>
                <WaveContainer level={90}>
                    <Wave
                        fill="#00b6ad"
                        paused={false}
                        options={{
                            height: 275, amplitude: 100, speed: 0.1, points: 3,
                        }}
                    />
                </WaveContainer>
                <WaveContainer level={90}>
                    <Wave
                        fill="#00959e"
                        opacity="0.80"
                        paused={false}
                        options={{
                            height: 400, amplitude: 100, speed: 0.1, points: 2,
                        }}
                    />
                </WaveContainer>
                <WaveContainer level={90}>
                    <Wave
                        fill="#01838a"
                        paused={false}
                        opacity="0.5"
                        options={{
                            height: 525, amplitude: 100, speed: 0.1, points: 4,
                        }}
                    />
                </WaveContainer>
            </section>
        </LocalizationProvider>)
}

export default App;
