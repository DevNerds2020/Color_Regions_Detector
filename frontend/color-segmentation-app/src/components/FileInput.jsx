/* eslint-disable react/prop-types */
import { FileUploader } from 'react-drag-drop-files';
import { Button, Typography } from '@mui/material';
import axios from 'axios';
const fileTypes = ['JPEG', 'PNG', 'GIF', 'JPG'];

const FileInput = (props) => {
  const { setSelectedFile, setBarChartColors, setBarChartSeries, selectedFile, selectedColors } = props;
  const handleFileChange = async (file) => {
    setSelectedFile(file);
  };
  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('includeColors', selectedColors);

    try {
      const response = await axios.post('http://localhost:5000/analyze', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const barChartSeriesData = response.data.map((item) => ({
        color: item.colorValue,
        percentage: item.percentage,
        label: item.color,
        data: [item.percentage],
      }));
      setBarChartSeries(barChartSeriesData);
      const colors = response.data.map((item) => item.colorValue);
      setBarChartColors(colors);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  return (
    <>
      <FileUploader multiple={false} handleChange={handleFileChange} name="file" types={fileTypes} />
      {selectedFile ? (
        <Button onClick={handleSubmit}>Analyze Image</Button>
      ) : (
        <Typography variant="h6" color="red">
          Upload an image to analyze
        </Typography>
      )}
    </>
  );
};

export default FileInput;
