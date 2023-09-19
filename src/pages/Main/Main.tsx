import {
  Box,
  Typography,
  Paper,
  Button,
  Container,
  Chip,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import { LINKS } from '../../components/consts';
import { CARDS_ON_SALE } from './consts';
import maestroConductorUrl from '../../assets/images/maestro-conductor.png';
import promoFiveUrl from '../../assets/images/promo5.jpg';
import promoFifteenUrl from '../../assets/images/promo15.jpg';

import './styles.scss';

export const Main: React.FC = (): JSX.Element => {
  const navigate = useNavigate();

  return (
    <Container className="main">
      <Box className="main-poster">
        <div className="main-poster__image">
          <img src={maestroConductorUrl} alt="maestro conductor" />
        </div>
        <div className="main-poster__content">
          <Typography variant="h1">Welcome to Maestro!</Typography>
          <Typography className="main-poster__subtitle" variant="h5">
            Online market, where melodies come alive
          </Typography>
          <Button className="main-poster__button" variant="contained" component={RouterLink} to={LINKS.catalog}>
            Go shopping
          </Button>
        </div>
      </Box>

      <Box className="main-promo">
        <Paper className="main-promo__card">
          <div className="main-promo__image">
            <img src={promoFiveUrl} alt="promo banner 15% off" />
          </div>
          <div className="main-promo__content">
            <Typography className="main-promo__subtitle" variant="h5">
              Apply promo code in your cart:
            </Typography>
            <Chip className="main-promo__code" color="primary" label="FUSION"></Chip>
          </div>
        </Paper>
        <Paper className="main-promo__card">
          <div className="main-promo__image">
            <img src={promoFifteenUrl} alt="promo banner 15% off" />
          </div>
          <div className="main-promo__content">
            <Typography className="main-promo__subtitle" variant="h5">
              Apply promo code in your cart:
            </Typography>
            <Chip className="main-promo__code" color="primary" label="WEWILLROCKYOU"></Chip>
          </div>
        </Paper>
      </Box>

      <Box className="main-sale">
        <Typography gutterBottom variant="h4">
          Categories on sale
        </Typography>
        <Box className="main-sale__cards">
          {CARDS_ON_SALE.map((card) => (
            <Card key={card.name}>
              <CardActionArea
                href={card.link}
                onClick={(event: React.MouseEvent<HTMLElement>): void => {
                  event.preventDefault();
                  navigate(card.link);
                }}
              >
                <CardMedia
                  className="main-sale__card-image"
                  component="img"
                  height="140"
                  image={card.image}
                  alt={card.name}
                />
                <div className="sale-ribbon">Sale</div>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {card.name}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Box>
      </Box>
    </Container>
  );
};
