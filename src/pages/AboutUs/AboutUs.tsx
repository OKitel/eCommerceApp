import { Box, Container, Link, Typography, IconButton, Paper } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

import okImg from '../../assets/images/OK.jpg';
import alImg from '../../assets/images/AL.png';

import './styles.scss';

export const AboutUs: React.FC = (): JSX.Element => {
  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h1" className="about-title">
        The Creative Minds Behind Maestro Market
      </Typography>

      <Box className="about-wrapper">
        <Typography variant="h6" className="about-text">
          We're thrilled that you're not only interested in our marketplace but also in the talented individuals who
          have worked tirelessly to bring Maestro Market to life. Your curiosity about our team warms our hearts, and
          we're excited to introduce you to the brilliant minds behind the scenes.
        </Typography>

        <Paper elevation={3} sx={{ padding: '2rem', margin: '2rem 0' }}>
          <Box className="dev-wrapper">
            <Box className="dev-description">
              <Typography variant="h4" className="dev-name">
                Olga Kitel
              </Typography>

              <Typography variant="body1" className="dev-text">
                Olga is a junior front-end developer with a medical background. Her technical skills include front-end
                and back-end web development. Good interpersonal skills allow her to work productively with a team.
                Besides IT she enjoys walking with her dog, reading books, playing tabletop games, and traveling.
              </Typography>
              <Typography variant="body1">
                <strong>Contribution:</strong> Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              </Typography>
              <Box className="dev-links">
                <Link href="https://github.com/OKitel" target="_blank" rel="noopener noreferrer">
                  <IconButton size="medium" color="inherit">
                    <GitHubIcon />
                  </IconButton>
                </Link>
                <Link
                  href="https://www.linkedin.com/in/olga-kitel-623558224/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <IconButton size="medium" color="inherit">
                    <LinkedInIcon />
                  </IconButton>
                </Link>
              </Box>
            </Box>
            <Box>
              <img className="dev-img" src={okImg} alt="Olga Kitel" />
            </Box>
          </Box>
        </Paper>
        <Paper elevation={3} sx={{ padding: '2rem', margin: '1rem 0' }}>
          <Box className="dev-wrapper dev-wrapper_reverse">
            <Box className="dev-description">
              <Typography variant="h4" className="dev-name_reverse">
                Artem Lobovskiy
              </Typography>

              <Typography variant="body1" className="dev-text">
                Graduated from university with an engineer degree in automation of technological processes. Provided a
                wide range of different computer services as an individual enterpreneur. Deeply experienced in the field
                of telecommunications after years of working as a network engineer. Has been engaged in organizing
                e-commerce and SEO optimization of own websites. At the moment has been working as a frontend web
                developer since January 2022. In his spare time learns AWS, studies English with native speaker, plays
                bass and practices boxing.
              </Typography>
              <Typography variant="body1">
                <strong>Contribution:</strong> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam ab
                reprehenderit alias asperiores.
              </Typography>
              <Box className="dev-links_reverse">
                <Link href="https://github.com/lobovskiy" target="_blank" rel="noopener noreferrer">
                  <IconButton size="medium" color="inherit">
                    <GitHubIcon />
                  </IconButton>
                </Link>
                <Link href="https://www.linkedin.com/in/lobovskii/" target="_blank" rel="noopener noreferrer">
                  <IconButton size="medium" color="inherit">
                    <LinkedInIcon />
                  </IconButton>
                </Link>
              </Box>
            </Box>
            <Box>
              <img className="dev-img" src={alImg} alt="Artem Lobovskiy" />
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};
