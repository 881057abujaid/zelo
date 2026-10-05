import {
    Image,
    Pressable,
    Text,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { styles } from './WelcomeScreen.styles';

export default function WelcomeScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                {/* Brand */}
                <View style={styles.brand}>
                    <Image
                        source={require('../../../assets/images/zelo-logo.png')}
                        style={styles.logo}
                        resizeMode="contain"
                    />
                </View>

                {/* Hero */}
                <View style={styles.hero}>
                    <Text style={styles.title}>
                        Learn to Code{'\n'}
                        <Text style={styles.titleAccent}>
                            Like a Game
                        </Text>
                    </Text>

                    <Text style={styles.description}>
                        Master coding through interactive challenges,
                        missions and boss battles.
                    </Text>
                </View>

                {/* Actions */}
                <View style={styles.actions}>
                    <Pressable
                        style={({ pressed }) => [
                            styles.primaryButton,
                            pressed && styles.primaryButtonPressed,
                        ]}
                    >
                        <Text style={styles.primaryButtonText}>
                            Get Started
                        </Text>
                    </Pressable>

                    <Pressable
                        style={({ pressed }) => [
                            styles.loginButton,
                            pressed && styles.loginButtonPressed,
                        ]}
                    >
                        <Text style={styles.loginText}>
                            Log In
                        </Text>
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    );
}