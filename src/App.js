import './App.css';
import {Container} from "@mui/material";
import {useState} from "react";
import Box from '@mui/material/Box';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import defaultData from "./defaultData";

/**
 * Remove trailing punctuation - this helps ensure an item doesn't add
 * jarring punctuation within a comma separated list.
 *
 * @param {string} text
 * @return {string}
 *   Text with trailing punctuation removed
 */
function rtp(text) {
  const match = text.match(new RegExp(`[^a-zA-Z0-9]+$`));
  if (!match || !match.index) {
    return text;
  }
  return text.slice(0, match.index);
}

/**
 * Makes the first character of a string lowercase.
 * This is so it looks right in a comma separated list.
 *
 * @param {string} string
 *
 * @return {string}
 *   The string with a lowercase first character
 */
const low = (string) => {
  return string.charAt(0).toLowerCase() + string.slice(1);
}

/**
 * Capitalize the string.
 *
 * @param string
 * @return {string}
 */
const cap = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}


function App() {
  const theTestData = localStorage.getItem('grading-criteria') ? JSON.parse(localStorage.getItem('grading-criteria')) : defaultData;
  // The grading criteria, grouped by question.
  const [testData, setTestData] = useState(theTestData);

  // The items to be pasted in an object with the same structure as the test data - but
  // only includes the items that should be added to the paste string.
  const [toPaste, setToPaste] = useState({});

  // The string to be pasted into the "comments" in Canvas. This changes as additional
  // items are checked.
  const [pasteString, setPasteString] = useState('');


  /**
   * This is the logic that runs when any item is checked/unchecked
   * @param {string} description
   *   A description of why points were added or removed.
   * @param {string} section
   *   The question or other area pertinent to the feedback.
   * @param {boolean} checked
   *   If the checkbox is checked or not.
   */
  const updateToPaste = (description, section, checked) => {
    const toPasteClone = toPaste;
    if (checked) {
      // Add the item to be part of the paste string.
      if (!toPasteClone[section]) {
        toPasteClone[section] = [];
      }
      toPasteClone[section].push(description);
    } else if (toPasteClone[section]) {
      // Remove the item from the paste string.
      const index = toPasteClone[section].indexOf(description);
      if (index > -1) {
        toPasteClone[section].splice(index, 1); // 2nd parameter means remove one item only
      }
      if (toPasteClone[section].length === 0) {
        delete toPasteClone[section];
      }
    }
    setToPaste(toPasteClone);

    let output = '';
    Object.keys(toPasteClone).forEach(section => {
      output += `${section.toUpperCase()}: ${cap(toPasteClone[section].join(', ').trim())}. `;
    })
    setPasteString(output.trim());
  }


  const dataForm = () => {
    const output = [];
    Object.keys(testData).forEach((item, index) => {
      output.push(<Question key={index} updateToPaste={updateToPaste}  testData={testData} section={item} setTestData={setTestData} toPaste={toPaste}/>)
    });
    return output;
  }



  return (
    <Container maxWidth="lg">
      <header>
        <h1>Do grades</h1>
      </header>
      {pasteString && <h4>Paste this in:</h4>}
      {pasteString}
      <hr />
      {dataForm()}
    </Container>
  );
}

export default App;

const Question = ({testData, section, updateToPaste, setTestData, toPaste}) => {
  const [custom, setCustom] = useState('');
  const showItems = () => {
    return testData[section].map((item, index) =>
      <FormControlLabel key={index} control={<Checkbox
        onChange={(e) => updateToPaste(item.description, section, e.target.checked)}  />}
                        label={item.description}
                        checked={!!(toPaste[section] && toPaste[section].indexOf(item.description) !== -1)}
      />
    );
  }



  const addCustom = () => {
    updateToPaste(rtp(low(custom)), section, true);
    setCustom('');
  }

  const addCustomAndSave = () => {
    setTestData((prior) => {
      if(!prior[section]) {
        prior[section] = [];
      }
      prior[section].push({description: rtp(low(custom))});
      localStorage.setItem('grading-criteria', JSON.stringify(prior));
      return {...prior};
    });
    addCustom();
  }

  return(
    <Box>
      <h2>{section}</h2>
      <FormGroup>
        {showItems()}
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="standard-basic"
              label="Custom Item"
              variant="standard"
              value={custom}
              onChange={(e) => setCustom(e.target.value)}
            />
          </Grid>
          <Grid item xs={2}>
            <Button variant="contained" onClick={addCustom}>Add</Button>
          </Grid>
          <Grid item xs={3}>
            <Button variant="outlined" onClick={addCustomAndSave}>Add + save</Button>
          </Grid>
        </Grid>
      </FormGroup>
    </Box>)
}
