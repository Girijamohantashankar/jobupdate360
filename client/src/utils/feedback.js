const LAST_VISIT_KEY = 'lastVisit';
const FEEDBACK_GIVEN_KEY = 'feedbackGiven';


export const setInitialVisitTime = () => {
    const now = new Date().getTime();
    localStorage.setItem(LAST_VISIT_KEY, now);
};

// Check if one hour has passed since the last visit time
export const hasOneHourPassed = () => {
    const lastVisit = parseInt(localStorage.getItem(LAST_VISIT_KEY), 10);
    const now = new Date().getTime();
    return (now - lastVisit) >= 2000;
    //   return (now - lastVisit) >= 3600000;
};

export const hasGivenFeedback = () => {
    return localStorage.getItem(FEEDBACK_GIVEN_KEY) === 'true';
};

export const setFeedbackGiven = () => {
    localStorage.setItem(FEEDBACK_GIVEN_KEY, 'true');
};
