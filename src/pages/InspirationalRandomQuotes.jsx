// export const fetchRandomQuote = async () => {
//   try {
//     const response = await fetch('https://buddha-api.com/api/random');
//     if (!response.ok) throw new Error('Failed to fetch quote');
    
//     const data = await response.json();
//     return { 
//       text: data.en || "No quote available.", 
//       author: data.author || "Unknown"
//     };
    
//   } catch (error) {
//     console.error("Error fetching the quote:", error.message);
//    
//     return {
//       text: "The mind is everything. What you think you become.",
//       author: "Buddha",
//     };
//   }
// };
// export const fetchRandomQuote = async () => {
//   try {
//     const response = await fetch("https://api.api-ninjas.com/v1/quotes?category=happiness", {
//       method: "GET",
//       headers: {
//         "X-Api-Key": "rjLvoE5akxQb7sUpSQ5E3g==3wq3i5PVHzOU5LzJ", // Replace with your actual API key
//         "Content-Type": "application/json",
//       }});
//   //   console.log(response);
//     if (!response.ok) throw new Error("Buddha API request failed");
//     const data = await response.json();
//     console.log(data);
//     setQuote({ text: data.quote, author: "Buddha" });
//   } catch (error) {
//     console.error("Error fetching the quote:", error);
//     
//     setQuote({ text: "Peace comes from within. Do not seek it without.", author: "Buddha" });
//   }
// };

