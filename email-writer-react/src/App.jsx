import { useState } from "react";
import axios from "axios";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

import {
  Container,
  Typography,
  TextField,
  Button,
  MenuItem,
  Box,
  Paper,
  CircularProgress,
} from "@mui/material";

function App() {

  const [emailContent, setEmailContent] = useState("");
  const [tone, setTone] = useState("professional");
  const [generatedReply, setGeneratedReply] = useState("");
  const [loading, setLoading] = useState(false);

  // Generate Email Function
  const handleGenerateEmail = async () => {

    try {

      setLoading(true);

      const response = await axios.post(
        "http://localhost:8080/api/email/generate",
        {
          emailContent,
          tone,
        }
      );

      setGeneratedReply(response.data);

    } catch (error) {

      console.error(error);
      setGeneratedReply("Error generating email reply.");

    } finally {

      setLoading(false);
    }
  };

  // Copy to Clipboard Function
  const handleCopy = async () => {

    try {

      await navigator.clipboard.writeText(generatedReply);
      alert("Copied to clipboard!");

    } catch (err) {

      console.error("Failed to copy:", err);
    }
  };

  return (

    <Container maxWidth="md" sx={{ mt: 5 }}>

      <Paper
        elevation={4}
        sx={{
          p: 4,
          borderRadius: 3,
        }}
      >

        {/* Heading */}

        <Typography
          variant="h4"
          gutterBottom
          align="center"
          fontWeight="bold"
        >
          AI Email Reply Generator
        </Typography>

        {/* Email Content Input */}

        <TextField
          label="Original Email Content"
          multiline
          rows={8}
          fullWidth
          value={emailContent}
          onChange={(e) => setEmailContent(e.target.value)}
          margin="normal"
        />

        {/* Tone Selection */}

        <TextField
          select
          label="Select Tone"
          fullWidth
          value={tone}
          onChange={(e) => setTone(e.target.value)}
          margin="normal"
        >

          <MenuItem value="professional">
            Professional
          </MenuItem>

          <MenuItem value="friendly">
            Friendly
          </MenuItem>

          <MenuItem value="formal">
            Formal
          </MenuItem>

          <MenuItem value="casual">
            Casual
          </MenuItem>

        </TextField>

        {/* Generate Button */}

        <Box
          textAlign="center"
          mt={3}
        >

          <Button
            variant="contained"
            size="large"
            onClick={handleGenerateEmail}
            disabled={loading}
          >

            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Generate Reply"
            )}

          </Button>

        </Box>

        {/* Generated Reply */}

        {generatedReply && (

          <Box mt={4}>

            {/* Reply Heading */}

            <Typography
              variant="h6"
              gutterBottom
            >
              Generated Reply:
            </Typography>

            {/* Reply Container */}

            <Paper
              elevation={2}
              sx={{
                p: 3,
                backgroundColor: "#f5f5f5",
                whiteSpace: "pre-wrap",
                borderRadius: 2,
                mb:1.5
              }}
            >
              {generatedReply}
            </Paper>

            {/* Copy Button */}

            <Box
              textAlign="right"
              mt={10}
            >

              <Button
                variant="outlined"
                startIcon={<ContentCopyIcon />}
                onClick={handleCopy}
              >
                Copy to Clipboard
              </Button>

            </Box>

          </Box>  
        )}

      </Paper>

    </Container>
  );
}

export default App;