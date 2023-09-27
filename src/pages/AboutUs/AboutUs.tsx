import { Box, Container, Link, Typography, IconButton, Paper } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import PublicRoundedIcon from '@mui/icons-material/PublicRounded';
import { useEffect } from 'react';
import { motion } from 'framer-motion';

import okImg from '../../assets/images/OK.jpg';
import alImg from '../../assets/images/AL.jpg';
import rsLogo from '../../assets/images/logo-rs.svg';

import './styles.scss';

export const AboutUs: React.FC = (): JSX.Element => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Container sx={{ mt: 5 }}>
      <motion.div initial={{ x: -100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 1 }}>
        <Typography variant="h1" className="about-title">
          The Creative Minds Behind Maestro Market
        </Typography>
      </motion.div>

      <Box className="about-wrapper">
        <motion.div initial={{ x: -100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 1 }}>
          <Typography variant="h6" className="about-text">
            We're thrilled that you're not only interested in our marketplace but also in the talented individuals who
            have worked tirelessly to bring Maestro Market to life. Your curiosity about our team warms our hearts, and
            we're excited to introduce you to the brilliant minds behind the scenes.
          </Typography>
        </motion.div>
        <motion.div
          className="developer-block"
          initial={{ x: '100%', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <Paper elevation={3} sx={{ padding: '2rem', margin: '2rem 0' }}>
            <Box className="dev-wrapper">
              <Box className="dev-description">
                <Typography variant="h4" className="dev-name">
                  Olga Kitel
                </Typography>

                <Typography variant="body1" className="dev-text">
                  Dedicated front-end developer who brings a unique perspective to the world of web development, thanks
                  to medical background. Specializing in both front-end and back-end web development, with a particular
                  passion for crafting React applications. Effective soft skills contribute to productive teamwork.
                  Beyond IT, she finds enjoyment in walking her dog, reading books, playing tabletop games, and
                  traveling.
                </Typography>
                <Typography variant="body1" className="dev-text">
                  <strong>Contribution:</strong> Project and test environment setup, repository setup and CI (Github
                  actions, Husky), deployment to Netlify, routing implementation and setup, project maintenance and
                  formal communications as a team leader, design and development: Registration Page, Not Found Page,
                  Profile Page, Detailed Product Page, Cart Page, About Us Page. Comprehensive unit test coverage.
                </Typography>
                <Box className="dev-links">
                  <Link
                    href="https://github.com/OKitel"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid="dev-github-link"
                  >
                    <IconButton size="medium" color="inherit">
                      <GitHubIcon />
                    </IconButton>
                  </Link>
                  <Link
                    href="https://www.linkedin.com/in/olga-kitel-623558224/"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid="dev-linkedin-link"
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
        </motion.div>
        <motion.div
          className="developer-block"
          initial={{ x: '-100%', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <Paper elevation={3} sx={{ padding: '2rem', margin: '2rem 0' }}>
            <Box className="dev-wrapper dev-wrapper_reverse">
              <Box className="dev-description">
                <Typography variant="h4" className="dev-name_reverse">
                  Artem Lobovskiy
                </Typography>

                <Typography variant="body1" className="dev-text">
                  Graduated from university with an engineer degree in automation of technological processes. Provided a
                  wide range of different computer services as an individual enterpreneur. Deeply experienced in the
                  field of telecommunications after years of working as a network engineer. Has been engaged in
                  organizing e-commerce and SEO optimization of own websites. At the moment has been working as a
                  frontend web developer since January 2022. In his spare time learns AWS, studies English with native
                  speaker, plays bass and practices boxing.
                </Typography>
                <Typography variant="body1" className="dev-text">
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
        </motion.div>
        <motion.div
          className="developer-block"
          initial={{ x: '100%', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          <Paper elevation={3} sx={{ padding: '0 2rem', margin: '2rem 0' }}>
            <Box className="dev-wrapper">
              <Box>
                <Typography variant="h4" className="dev-name">
                  Collaboration
                </Typography>
                <Typography className="dev-text">
                  At the Rolling Scopes School JavaScript/Front-end 2023Q1 course, we embarked on a two-month journey to
                  design a top-notch e-commerce React website. Our progress was deeply influenced by our expertise in
                  using contemporary tools. GitHub became our collaborative platform for coding, while JIRA assisted us
                  in efficiently managing tasks. We effectively communicated on Discord, turning it into a vital hub for
                  quick feedback, brainstorming, and problem-solving. Our growth was consistently supported by weekly
                  Google Meet sessions with our mentor, whose guidance and advice were indispensable.
                </Typography>
                <Typography className="dev-text">
                  As we reflect on our journey, we're profoundly grateful to the Rolling Scopes School for providing us
                  with this invaluable opportunity. It's been a privilege to learn, collaborate, and connect with such
                  dedicated and hard-working individuals.
                </Typography>
                <Box className="dev-links">
                  <Link href="https://github.com/rolling-scopes-school" target="_blank" rel="noopener noreferrer">
                    <IconButton size="medium" color="inherit">
                      <GitHubIcon />
                    </IconButton>
                  </Link>
                  <Link href="https://rs.school/" target="_blank" rel="noopener noreferrer">
                    <IconButton size="medium" color="inherit">
                      <PublicRoundedIcon />
                    </IconButton>
                  </Link>
                  <Link
                    href="https://www.linkedin.com/company/the-rolling-scopes-school/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <IconButton size="medium" color="inherit">
                      <LinkedInIcon />
                    </IconButton>
                  </Link>
                </Box>
              </Box>
              <Link href="https://rs.school/" target="_blank" rel="noopener noreferrer">
                <img className="rs-logo" src={rsLogo} alt="The Rolling Scopes School Logo" />
              </Link>
            </Box>
          </Paper>
        </motion.div>
      </Box>
    </Container>
  );
};
