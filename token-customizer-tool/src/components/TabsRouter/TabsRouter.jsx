import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
// import Typography from '@mui/material/Typography';
import {
  MemoryRouter,
  Route,
  Routes,
  Link,
  matchPath,
  useLocation,
  StaticRouter,
} from 'react-router';

//Page components
import Home from "../../pages/Home/Home";
import Customization from "../../pages/Customization/Customization";
import Confirmation from "../../pages/Confirmation/Confirmation";

function Router(props) {
  const { children } = props;
  if (typeof window === 'undefined') {
    return <StaticRouter location="/">{children}</StaticRouter>;
  }

  return (
    <MemoryRouter initialEntries={['/']} initialIndex={0}>
      {children}
    </MemoryRouter>
  );
}

Router.propTypes = {
  children: PropTypes.node,
};

function useRouteMatch(patterns) {
  const { pathname } = useLocation();

  for (let i = 0; i < patterns.length; i += 1) {
    const pattern = patterns[i];
    const possibleMatch = matchPath(pattern, pathname);
    if (possibleMatch !== null) {
      return possibleMatch;
    }
  }

  return null;
}

function MyTabs() {
  const routeMatch = useRouteMatch(['/', '/customization', '/confirmation']);
  const currentTab = routeMatch?.pattern?.path;

  return (
    <Tabs value={currentTab}>
      <Tab label="Home" value="/" to="/" component={Link} />
      <Tab label="Customization" value="/customization" to="/customization" component={Link} />
      <Tab label="Confirm order" value="/confirmation" to="/confirmation" component={Link} />
    </Tabs>
  );
}

export default function TabsRouter() {
  return (
    <Router>
      <Box sx={{ width: '100%' }}>
        <MyTabs />
        <Routes>
            <Route index element={<Home />} />
            <Route path="/customization" element={<Customization />} />
            <Route path="/confirmation" element={<Confirmation />} />
            <Route path="/*" element={<Home />} />
        </Routes>
      </Box>
    </Router>
  );
}