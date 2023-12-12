import AddIcon from '@mui/icons-material/Add';
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
      {...other}
    >
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
  const [tabs, setTabs] = React.useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const closeTab = (index) => {
    // Check if the closing tab is the currently selected one
    const isSelectedTab = value === index;
  
    // Filter out the closing tab
    const updatedTabs = tabs.filter((tab) => tab.index !== index);
  
    // Update the value only if the closing tab is selected
    if (isSelectedTab) {
      // If there are remaining tabs, set the value to the first one; otherwise, set to 0
      setValue(updatedTabs.length > 0 ? updatedTabs[0].index : 0);
    }
  
    setTabs(updatedTabs);
  };
  

  const addTab = () => {
    const newIndex = tabs.length;
    const newTab = {
      label: generateTab(newIndex, `Tab ${newIndex + 1}`, closeTab),
      index: newIndex,
    };
    setTabs([...tabs, newTab]);
    setValue(newIndex);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', width: '100vh' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          indicatorColor="primary"
          textColor="inherit"
        >
          {tabs.map((tab) => (
            <Tab
              key={tab.index}
              label={tab.label}
              {...a11yProps(tab.index)}
              sx={{
                marginRight: '8px',
                backgroundColor: value === tab.index ? '#FFCF96' : '#FFF5E0',
                '&:hover': { backgroundColor: '#FFCF96' },
                borderRadius: '20px 20px 0 0',
              }}
            />
          ))}
          <Tab
            label={
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <IconButton size="small" onClick={addTab}>
                  <AddIcon />
                </IconButton>
              </div>
            }
            {...a11yProps(tabs.length)}
          />
        </Tabs>
      </Box>
    </Box>
  );
}