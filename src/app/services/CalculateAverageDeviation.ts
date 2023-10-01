import { Issue } from '../../redux/slices/userIssues/slice';

export const CalculateAverageDeviation = (issues: Array<Issue>) => {
  let timeSpentMean = 0;
  let timeOriginalEstimateMean = 0;
  let deviationSum = 0;
  let timeSpentDeviation = 0;
  let timeOriginalEstimateDeviation = 0;
  let deviationMean = 0;
  issues.forEach((issue) => {
    timeSpentMean = timeSpentMean + issue.timeSpent;
    timeOriginalEstimateMean = timeOriginalEstimateMean + issue.timeOriginalEstimate;
  });

  timeSpentMean = timeSpentMean / issues.length;
  timeOriginalEstimateMean = timeOriginalEstimateMean / issues.length;

  issues.forEach((issue) => {
    timeSpentDeviation = ((issue.timeSpent - timeSpentMean) / timeSpentMean) * 100;
    timeOriginalEstimateDeviation =
      ((issue.timeOriginalEstimate - timeOriginalEstimateMean) / timeOriginalEstimateMean) * 100;

    deviationSum += Math.abs(timeSpentDeviation) + Math.abs(timeOriginalEstimateDeviation);
  });

  deviationMean = deviationSum / issues.length;

  return +deviationMean.toFixed(1);
};
