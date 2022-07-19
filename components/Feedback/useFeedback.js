import { useContext } from "react";

import { FeedbackContext } from "./FeedbackProvider";

export const useFeedback = () => useContext(FeedbackContext);
