
export const STEPS = [
    { id: 1, route: '01-problem', title: 'Problem Statement' },
    { id: 2, route: '02-market', title: 'Market Research' },
    { id: 3, route: '03-architecture', title: 'System Architecture' },
    { id: 4, route: '04-hld', title: 'High Level Design' },
    { id: 5, route: '05-lld', title: 'Low Level Design' },
    { id: 6, route: '06-build', title: 'Build Implementation' },
    { id: 7, route: '07-test', title: 'Testing & Validation' },
    { id: 8, route: '08-ship', title: 'Final Shipment' }
];

export const getArtifactKey = (stepId) => `rb_step_${stepId}_artifact`;

export const saveArtifact = (stepId, content) => {
    try {
        localStorage.setItem(getArtifactKey(stepId), content);
        return true;
    } catch (error) {
        console.error('Failed to save artifact', error);
        return false;
    }
};

export const getArtifact = (stepId) => {
    return localStorage.getItem(getArtifactKey(stepId));
};

export const isStepComplete = (stepId) => {
    return !!getArtifact(stepId);
};

export const getCompletedStepsCount = () => {
    return STEPS.filter(step => isStepComplete(step.id)).length;
};

export const canAccessStep = (stepId) => {
    if (stepId === 1) return true;
    // Can access if previous step is complete
    return isStepComplete(stepId - 1);
};
