import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { Stack, useRouter, useSegments } from "expo-router";

import { colors } from "@/constants/colors";
import { useAuthStore } from "@/features/auth/auth.store";

export default function RootLayout() {
  const router = useRouter();
  const segments = useSegments();

  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isRestoringSession = useAuthStore((state) => state.isRestoringSession);
  const restoreSession = useAuthStore((state) => state.restoreSession);

  const [hasStartedRestoration, setHasStartedRestoration] = useState(false);

  // 1️⃣ Restore session on app start
  useEffect(() => {
    let isMounted = true;

    async function initializeAuth() {
      try {
        await restoreSession();
      } finally {
        if (isMounted) {
          setHasStartedRestoration(true);
        }
      }
    }

    void initializeAuth();

    return () => {
      isMounted = false;
    };
  }, [restoreSession]);

  // 2️⃣ Route protection based on auth state and onboarding
  useEffect(() => {
    if (!hasStartedRestoration || isRestoringSession) return;

    const currentRoute = segments[0];

    const isOnboardingRoute = currentRoute === "onboarding";
    const isTabsRoute = currentRoute === "(tabs)";

    const isAuthRoute =
      currentRoute === undefined ||
      currentRoute === "login" ||
      currentRoute === "register";

    if (!isAuthenticated) {
      if (
        isOnboardingRoute ||
        isTabsRoute ||
        currentRoute === "home" ||
        currentRoute === "profile"
      ) {
        router.replace("/");
      }

      return;
    }

    if (!user) return;

    if (!user.isOnboardingComplete) {
      if (!isOnboardingRoute) {
        router.replace("/onboarding/nova");
      }

      return;
    }

    if (isOnboardingRoute || isAuthRoute || !isTabsRoute) {
      router.replace("/(tabs)/home");
    }
  }, [
    hasStartedRestoration,
    isRestoringSession,
    isAuthenticated,
    user,
    segments,
    router,
  ]);

  if (!hasStartedRestoration || isRestoringSession) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator
          size="large"
          color={colors.primary}
        />
      </View>
    );
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.background,
  },
});