import React from 'react';
import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { SnackbarProvider } from 'notistack';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box } from '@mui/material';
import TaskList from './components/TaskList';
import { QueryClient, QueryClientProvider } from 'react-query';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const queryClient = new QueryClient();

function App() {
  return (
    <SnackbarProvider maxSnack={5}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <main>
            <Box
              sx={{
                maxWidth: 700,
                margin: '0px auto 0px auto'
              }}>
              <TaskList />
            </Box>
          </main>
        </ThemeProvider>
      </QueryClientProvider>
    </SnackbarProvider>
  );
}

export default App;
