import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import * as React from "react";

const MeasureInfo = ({data, day}) => {
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };

    return (
        <CardContent>
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
            >
                <Grid item xs="auto">
                    <Typography variant="h6" color="white">
                        {new Date(data[0]).toLocaleDateString(undefined, options)}
                    </Typography>
                </Grid>
                <Grid item xs="auto">
                    <Typography gutterBottom variant="h2" component="div" color="white">
                        {day}
                    </Typography>
                </Grid>
                <Grid item xs="auto">
                    <Typography variant="body2" color="white">
                        Station : {data[1]}
                    </Typography>
                </Grid>
                <Grid item xs="auto">
                    <Typography variant="body2" color="white">
                        Commune : {data[2]}
                    </Typography>
                </Grid>
            </Grid>
        </CardContent>
    );
}

export default MeasureInfo;