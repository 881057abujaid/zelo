import { useState } from "react";
import {
    ImageBackground,
    Pressable,
    Text,
    View,
} from "react-native";

import type { World } from "@/features/worlds/worlds.service";
import { styles } from "./WorldCard.styles";

interface WorldCardProps {
    world: World;
    index: number;
    onPress?: (world: World) => void;
}

export function WorldCard({
    world,
    index,
    onPress,
}: WorldCardProps) {
    const [imageFailed, setImageFailed] = useState(false);

    const imageUrl = world.imageUrl?.trim();

    const showImage = Boolean(imageUrl) && !imageFailed;

    return (
        <Pressable
            accessibilityRole="button"
            accessibilityLabel={`Open ${world.title}`}
            onPress={() => onPress?.(world)}
            style={({ pressed }) => [
                styles.card,
                pressed && styles.cardPressed,
            ]}
        >
            {showImage && imageUrl ? (
                <ImageBackground
                    source={{ uri: imageUrl }}
                    style={styles.backgroundImage}
                    imageStyle={styles.image}
                    resizeMode="cover"
                    onError={() => setImageFailed(true)}
                >
                    <View style={styles.overlay}>
                        <WorldCardContent
                            world={world}
                            index={index}
                        />
                    </View>
                </ImageBackground>
            ) : (
                <View style={styles.fallbackBackground}>
                    <View style={styles.overlay}>
                        <WorldCardContent
                            world={world}
                            index={index}
                        />
                    </View>
                </View>
            )}
        </Pressable>
    );
}

interface WorldCardContentProps {
    world: World;
    index: number;
}

function WorldCardContent({
    world,
    index,
}: WorldCardContentProps) {
    return (
        <>
            <View style={styles.topContent}>
                <Text style={styles.worldBadge}>
                    WORLD {index + 1}
                </Text>

                <View style={styles.information}>
                    <Text style={styles.title}>
                        {world.title}
                    </Text>

                    {world.description ? (
                        <Text
                            style={styles.description}
                            numberOfLines={3}
                        >
                            {world.description}
                        </Text>
                    ) : null}
                </View>
            </View>

            <View style={styles.bottomPanel}>
                <View style={styles.progressTextGroup}>
                    <Text style={styles.progressTitle}>
                        Start your journey
                    </Text>

                    <Text style={styles.progressSubtitle}>
                        Explore challenges and learn new skills
                    </Text>
                </View>

                <View style={styles.arrowButton}>
                    <Text style={styles.arrowText}>›</Text>
                </View>
            </View>
        </>
    );
}