import { useState } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import FileInput from './components/FileInput';
import ColorChooser from './components/ColorChooser';

function App() {
  const [barChartSeries, setBarChartSeries] = useState([]);
  const [barChartColors, setBarChartColors] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedColors, setSelectedColors] = useState([]);

  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <h2>Color Detector (v.0.1) </h2>
      <div>
        <FileInput
          setBarChartColors={setBarChartColors}
          setBarChartSeries={setBarChartSeries}
          selectedFile={selectedFile}
          setSelectedFile={setSelectedFile}
          selectedColors={selectedColors}
        />
        <ColorChooser selectedColors={selectedColors} setSelectedColors={setSelectedColors} />
      </div>
      <div>
        <h2>Color Percentages:</h2>
        <BarChart selectedColors={selectedColors} series={barChartSeries} width={1200} height={350} colors={barChartColors} />
      </div>
    </div>
  );
}

export default App;
