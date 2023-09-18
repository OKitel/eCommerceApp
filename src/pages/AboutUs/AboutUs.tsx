import { Box, Container, Link, Typography, IconButton, Paper } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

import okImg from '../../assets/images/OK.jpg';
import alImg from '../../assets/images/AL.png';
import rsLogo from '../../assets/images/logo-rs.svg';

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
                Front-end developer with a medical background. Her technical skills include front-end and back-end web
                development. Good interpersonal skills allow her to work productively with a team. Besides IT she enjoys
                walking with her dog, reading books, playing tabletop games, and traveling.
              </Typography>
              <Typography variant="body1">
                <strong>Contribution:</strong> Project setup, repository setup with CI (Github actions), deployment to
                Netlify, design and development: Registration Page, Not found Page, Profile Page, Detailed Product Page,
                Cart Page, About us Page. Comprehensive unit test coverage.
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
        <Paper elevation={3} sx={{ padding: '2rem', margin: '2rem 0' }}>
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
                <strong>Contribution:</strong> JIRA setup, integration with Commerce Tools API using Typescript SDK,
                resolved an incompatibility issue between the Typescript SDK and Vite, added products to CT, Redux
                Toolkit, design and development: Login Page, Catalog Page, Product list with categories, filter and
                sorting, Search Page. Integration of product cards with the shopping cart, application of cart promo
                codes. Comprehensive unit test coverage.
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
        <Paper elevation={3} sx={{ padding: '0 2rem', margin: '2rem 0' }}>
          <Box className="dev-wrapper">
            <Box>
              <Typography variant="h4" className="dev-name">
                Collaboration
              </Typography>
              <Typography className="dev-text">
                At the Rolling Scopes School JavaScript/Front-end 2023Q1 course, we embarked on a two-month journey to
                design a top-notch e-commerce React website. Our progress was deeply influenced by our expertise in
                using contemporary tools. GitHub became our collaborative platform for coding, while JIRA assisted us in
                efficiently managing tasks. We effectively communicated on Discord, turning it into a vital hub for
                quick feedback, brainstorming, and problem-solving. Our growth was consistently supported by weekly
                Google Meet sessions with our mentor, whose guidance and advice were indispensable.
              </Typography>
              <Typography className="dev-text">
                As we reflect on our journey, we're profoundly grateful to the Rolling Scopes School for providing us
                with this invaluable opportunity. It's been a privilege to learn, collaborate, and connect with such
                dedicated and hard-working individuals.
              </Typography>
            </Box>
            <Link href="https://rs.school/" target="_blank" rel="noopener noreferrer">
              <img className="rs-logo" src={rsLogo} alt="The Rolling Scopes School Logo" />
            </Link>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};
