// Function to find the major emotion within a result array
function findMajorEmotion(result) {
  return result.reduce((prev, current) =>
    prev.score > current.score ? prev : current
  );
}

// Iterate through each object in the results array
const resultsWithMainEmotion = (resultsArray) =>
  resultsArray.map((result) => {
    // Find the major emotion in the result array
    const majorEmotion = findMajorEmotion(result.result);

    // Add the major emotion to the result object
    result["sentiment"] = {
      label: majorEmotion?.label,
      score: majorEmotion?.score,
    };

    return result;
  });

export const averageScores = (resultArray) => {
  // Initialize an object to store the total score and count for each label
  const labelData = {
    NEG: { totalScore: 0, count: 0 },
    NEU: { totalScore: 0, count: 0 },
    POS: { totalScore: 0, count: 0 },
  };

  // Iterate over the data and calculate the total score and count for each label
  resultArray.forEach((arr) => {
    arr.forEach((obj) => {
      labelData[obj.label].totalScore += obj.score;
      labelData[obj.label].count = arr.length;
    });
  });

  // Calculate the average score for each label
  const averageScores = Object.entries(labelData).map(
    ([label, { totalScore, count }]) => ({
      label,
      score: totalScore / count,
    })
  );
  return averageScores;
};

export const averageEmotion = (resultArray) => {
  // Initialize an object to store the total score and count for each label
  const labelData = {};

  // Iterate over each dataset in the array
  resultArray.forEach((dataset) => {
    // Iterate over each object in the dataset
    dataset.forEach((obj) => {
      // Check if the label already exists in the labelData object
      if (labelData.hasOwnProperty(obj.label)) {
        // If it exists, add the score to the existing total score
        labelData[obj.label].totalScore += obj.score;
        // Increment the count for the label
        labelData[obj.label].count++;
      } else {
        // If the label does not exist, create a new entry in labelData
        labelData[obj.label] = {
          totalScore: obj.score,
          count: 1,
        };
      }
    });
  });

  // Calculate the average score for each label
  const averageScoresArray = [];

  // Iterate over each label in labelData
  for (const label in labelData) {
    // Calculate the average score for the label
    const averageScore = labelData[label].totalScore / labelData[label].count;
    // Push an object containing the label and average score to the array
    averageScoresArray.push({ label, score: averageScore });
  }

  return averageScoresArray;
};

export default resultsWithMainEmotion;
