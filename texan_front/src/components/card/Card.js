import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    width: "65%",
    borderRadius: 8,
    boxSizing: "border-box",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 16,
    display: "flex",
    alignItems: "center",
    marginBottom: "0.5rem",
  },
  pos: {
    marginBottom: 12,
  },

  icone: {
    marginRight: 6,
    color: "rgb(82, 76, 76)",
  },
  iconeReseaux: {
    marginRight: 15,
  },
});

export default function SimpleCard({ nom, content, icone: Icone }) {
  const classes = useStyles();
  // const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.root}>
      <CardContent>
        {nom && (
          <Typography
            className={classes.title}
            color='textSecondary'
            gutterBottom>
            <Icone color='primary' className={classes.icone} /> {nom}
          </Typography>
        )}

        <div style={{ display: !nom ? "flex" : undefined }}>
          {content.map((c, i) => (
            <Typography
              key={i}
              variant='body2'
              component='p'
              className={!nom ? classes.iconeReseaux : undefined}>
              {c}
            </Typography>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
