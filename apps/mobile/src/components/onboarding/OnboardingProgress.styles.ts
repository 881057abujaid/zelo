import { StyleSheet } from 'react-native';

import { colors } from '../../constants/colors';

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
        paddingTop: 4,
        paddingBottom: 6,
    },

    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#D1D5DB',
    },

    activeDot: {
        width: 24,
        height: 8,
        borderRadius: 4,
        backgroundColor: colors.primary,
    },
});