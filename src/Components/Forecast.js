import React, { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LinearProgress from '@mui/material/LinearProgress';
import '../Styles/Forecast.css';
import dayjs from 'dayjs';

function Forecast({ city, forecast: { forecastday } }) {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className="forecast-container">
      <b>Forecast {city}</b>
      <div className="curforcast-div">
        {forecastday.map((curDateForecast) => {
          const { date, day, hour } = curDateForecast;
          const {
            maxtemp_c,
            mintemp_c,
            daily_chance_of_rain,
            condition: { icon, text },
          } = day;
          return (
            <Accordion
              expanded={expanded === date}
              onChange={handleChange(date)}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id={date}
              >
                <img src={icon} alt="" />
                <Typography sx={{ width: '33%', flexShrink: 0 }}>
                  {dayjs(date).format('DD-MM-YYYY')} ({text})
                </Typography>
                <Typography sx={{ width: '33%', flexShrink: 0 }}>
                  <b>Temp :</b> {mintemp_c}&deg;C to {maxtemp_c}&deg;C
                </Typography>
                <Typography sx={{ width: '33%', flexShrink: 0 }}>
                  <b>{daily_chance_of_rain}</b>% of rain possible
                </Typography>
              </AccordionSummary>
              <AccordionDetails className="accordion-details">
                {hour.map((curHour, index) => {
                  return (
                    <div className="hourtrack ">
                      <b>{index}:00</b>
                      <img src={curHour?.condition?.icon} alt="" />
                      <div className="progress">
                        <LinearProgress
                          variant="determinate"
                          value={(curHour.temp_c * 100) / maxtemp_c}
                          sx={{
                            '& .MuiLinearProgress-bar': {
                              backgroundColor: 'green', // change to your desired color
                            },
                          }}
                        />
                        {curHour.temp_c}&deg;C
                      </div>
                    </div>
                  );
                })}
              </AccordionDetails>
            </Accordion>
          );
        })}
      </div>
    </div>
  );
}

export default Forecast;
