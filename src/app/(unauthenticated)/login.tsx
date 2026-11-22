
import React from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';

export default function LoginScreen() {
  const router = useRouter();

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <StatusBar barStyle="light-content" />

      {/* TWITTER LOGO */}
      <View style={styles.logoContainer}>
        <Ionicons
          name="logo-twitter"
          size={65}
          color="#FFFFFF"
        />
        <Text style={styles.logo}>Twitter</Text>
      </View>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Welcome Back!</Text>
        <Text style={styles.subtitle}>
          Login to continue your Twitter experience.
        </Text>
      </View>

      {/* Login Form */}
      <View style={styles.form}>
        <Text style={styles.label}>Email Address</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          placeholderTextColor="#777777"
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.label}>Password</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          placeholderTextColor="#777777"
          secureTextEntry
        />

        {/* Forgot Password */}
        <TouchableOpacity style={styles.forgotContainer}>
          <Text style={styles.forgotText}>Forgot password?</Text>
        </TouchableOpacity>

        {/* Login Button */}
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() =>
            router.replace('/(authenticated)/(tabs)/home')
          }
        >
          <Text style={styles.loginButtonText}>Log In</Text>
        </TouchableOpacity>
      </View>

      {/* Divider */}
      <View style={styles.dividerContainer}>
        <View style={styles.divider} />
        <Text style={styles.orText}>OR</Text>
        <View style={styles.divider} />
      </View>

      {/* Register */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Don't have an account?
        </Text>

        <Link href="/(unauthenticated)/register" asChild>
          <TouchableOpacity>
            <Text style={styles.registerText}>Sign Up</Text>
          </TouchableOpacity>
        </Link>
      </View>

      {/* Bottom Text */}
      <Text style={styles.bottomText}>
        Connect with people and share your thoughts.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    backgroundColor: '#000000',
    paddingHorizontal: 28,
    paddingVertical: 40,
  },

  logoContainer: {
    alignItems: 'center',
    marginBottom: 55,
    gap: 10,
  },

  logo: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#FFFFFF',
    letterSpacing: -1,
  },

  header: {
    marginBottom: 35,
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 14,
    color: '#999999',
  },

  form: {
    width: '100%',
  },

  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 9,
    marginTop: 18,
  },

  input: {
    height: 55,
    backgroundColor: '#1C1C1E',
    borderWidth: 1,
    borderColor: '#333333',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 15,
    color: '#FFFFFF',
  },

  forgotContainer: {
    alignItems: 'flex-end',
    marginTop: 15,
  },

  forgotText: {
    color: '#AAAAAA',
    fontSize: 13,
  },

  loginButton: {
    height: 55,
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },

  loginButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
  },

  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 35,
    gap: 15,
  },

  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#333333',
  },

  orText: {
    color: '#777777',
    fontSize: 12,
    fontWeight: '600',
  },

  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    gap: 5,
  },

  footerText: {
    fontSize: 14,
    color: '#999999',
  },

  registerText: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#FFFFFF',
  },

  bottomText: {
    textAlign: 'center',
    fontSize: 12,
    color: '#666666',
    marginTop: 65,
  },
});
