import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { Stack, useRouter, useSegments } from "expo-router";

import { colors } from "@/constants/colors";
import { useAuthStore } from "@/features/auth/auth.store";

export default function RootLayout() {
  const router = useRouter();
  const segments = useSegments();

  const isAuthenticated = useAuthStore(
    (state) => state.isAuthenticated,
  );

  const isRestoringSession = useAuthStore(
    (state) => state.isRestoringSession,
  );

  const restoreSession = useAuthStore(
    (state) => state.restoreSession,
  );

  const [hasStartedRestoration, setHasStartedRestoration] =
    useState(false);

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

  useEffect(() => {
    if (!hasStartedRestoration || isRestoringSession) {
      return;
    }

    const currentRoute = segments[0];

    const isProtectedRoute =
      currentRoute === "home" ||
      currentRoute === "profile" ||
      currentRoute === "world-completion";

    const isAuthRoute =
      currentRoute === undefined ||
      currentRoute === "login" ||
      currentRoute === "register";

    if (!isAuthenticated && isProtectedRoute) {
      router.replace("/");
      return;
    }

    if (isAuthenticated && isAuthRoute) {
      router.replace("/home");
    }
  }, [
    hasStartedRestoration,
    isRestoringSession,
    isAuthenticated,
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