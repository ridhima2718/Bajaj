export default async (req, res) => {
    if (req.method === 'GET') {
      // Handle GET request
      res.status(200).json({ "operation_code": 1 });
    } else if (req.method === 'POST') {
      // Handle POST request
      try {
        const { data } = req.body;
  
        // Validate input data
        if (!data || !Array.isArray(data)) {
          return res.status(400).json({
            is_success: false,
            message: "Invalid input data"
          });
        }
  
        const user_id = "john_doe_17091999"; // Replace with dynamic user data if needed
        const email = "john@xyz.com"; // Replace with dynamic email if needed
        const roll_number = "ABCD123"; // Replace with dynamic roll number if needed
  
        // Process data to separate numbers and alphabets
        const numbers = data.filter(item => !isNaN(item));
        const alphabets = data.filter(item => /^[A-Za-z]$/.test(item));
  
        // Find the highest lowercase alphabet
        const lowercaseAlphabets = alphabets.filter(item => /^[a-z]$/.test(item));
        const highestLowercaseAlphabet = lowercaseAlphabets.length > 0
            ? [lowercaseAlphabets.sort().reverse()[0]]
            : [];
  
        // Construct response object
        const response = {
          is_success: true,
          user_id: user_id,
          email: email,
          roll_number: roll_number,
          numbers: numbers,
          alphabets: alphabets,
          highest_lowercase_alphabet: highestLowercaseAlphabet
        };
  
        res.status(200).json(response);
      } catch (error) {
        res.status(500).json({
          is_success: false,
          message: 'Internal Server Error'
        });
      }
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  };
  