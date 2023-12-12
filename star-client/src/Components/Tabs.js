import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import PropTypes from 'prop-types';
import React from 'react';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}   >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const generateTab = (index, labelText, closeTab) => (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div>{labelText}</div>
      <IconButton size="small" onClick={() => closeTab(index)}>
        <CloseIcon />
      </IconButton>
    </div>
  );
  

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);
  const [tabs, setTabs] = React.useState([
    { label: generateTab(0, 'Tab 1'), index: 0 },
    { label: generateTab(1, 'Tab 2'), index: 1 },
    { label: generateTab(2, 'Tab 3'), index: 2 },
  ]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const closeTab = (index) => {
    const updatedTabs = tabs.filter((tab) => tab.index !== index);
    setTabs(updatedTabs);

    if (value === index) {
      setValue(updatedTabs.length > 0 ? updatedTabs[0].index : 0);
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', width: '100vh' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          indicatorColor="primary"
          textColor="inherit" >
          {tabs.map((tab) => (
            <Tab key={tab.index} label={tab.label}
              {...a11yProps(tab.index)}
              sx={{
                marginRight: '8px',
                backgroundColor: value === tab.index ? '#FFCF96' : '#FFF5E0',
                '&:hover': { backgroundColor: '#FFCF96'},
                borderRadius: '20px 20px 0 0',
              }} />
          ))}
        </Tabs>
      </Box>
    </Box>
  );
}
