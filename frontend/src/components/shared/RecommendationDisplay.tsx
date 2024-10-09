import React from "react";

interface RecommendationProps {
  recommendation: string;
}

const RecommendationDisplay: React.FC<RecommendationProps> = ({
  recommendation,
}) => {
  // Function to format and remove markdown format like **.
  const formatRecommendation = () => {
    // Finds where the list of recommendations starts
    const listStartIndex = recommendation.search(/[0-9]\.\s+/);

    // Splits the introduction and the list
    const introduction = recommendation.slice(0, listStartIndex).trim();
    const activityList = recommendation.slice(listStartIndex);

    // Removes stars (markdown-bold) from the text
    const cleanActivityList = activityList.replace(/\*\*/g, "");

    // Splits the recommendations into a numbered list
    const formattedList = cleanActivityList
      .split(/[0-9]\.\s+/)
      .filter(Boolean)
      .map((text, index) => (
        <li key={index} className="mb-2">
          {text.trim()}
        </li>
      ));

    return { introduction, formattedList };
  };

  const { introduction, formattedList } = formatRecommendation();

  return (
    <div className="mt-6">
      <p className="mb-4">{introduction}</p>{" "}
      {/* Displays the chatbot's introduction */}
      <ol className="list-decimal list-inside">
        {formattedList}{" "}
        {/* Displays the formatted list without markdown stars */}
      </ol>
    </div>
  );
};

export default RecommendationDisplay;
