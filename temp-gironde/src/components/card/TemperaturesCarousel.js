import Carousel from "react-material-ui-carousel";
import TemperaturesCard from "./TemperaturesCard";
import Grid from "@mui/material/Grid";

const TemperaturesCarousel = ({data}) => {

    let filteredData = data.reduce((acc, current) => {
        const x = acc.find(item => item.date_mesure_temp === current.date_mesure_temp);
        if (!x) {
            return acc.concat([current]);
        } else {
            return acc;
        }
    }, []);

    const filteredDataByDay = filteredData.splice(0).reverse().map(filteredData =>
        ([
            filteredData.date_mesure_temp,
            filteredData.libelle_station,
            filteredData.libelle_commune
        ]));

    return (
        <Carousel
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                width: 500,
                height: 615,
                backgroundColor: "#2590B7",
                borderRadius: "5% / 5%"
            }}
            navButtonsAlwaysVisible={true}
            swipe={false}>
            {filteredDataByDay.map((watercourse, index) => (
                <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justify="center"
                    style={{minHeight: '100vh'}}
                    key={index}
                >
                    <Grid item xs="auto">
                        <TemperaturesCard data={watercourse}/>
                    </Grid>
                </Grid>
            ))}
        </Carousel>
    );
}

export default TemperaturesCarousel;