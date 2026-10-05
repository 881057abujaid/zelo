import { View } from 'react-native';

import { styles } from './OnboardingProgress.styles';

type OnboardingProgressProps = {
    currentStep: number;
    totalSteps: number;
};

export default function OnboardingProgress({
    currentStep,
    totalSteps,
}: OnboardingProgressProps) {
    return (
        <View style={styles.container}>
            {Array.from({ length: totalSteps }).map((_, index) => {
                const isActive = index + 1 === currentStep;

                return (
                    <View
                        key={index}
                        style={[
                            styles.dot,
                            isActive && styles.activeDot,
                        ]}
                    />
                );
            })}
        </View>
    );
}