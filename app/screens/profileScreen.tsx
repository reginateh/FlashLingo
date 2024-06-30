import { View, Text, TouchableOpacity, ScrollView, Image, StyleSheet, RefreshControl } from "react-native";
import { useState, useEffect, useCallback } from "react";
import React from 'react';
import { FIREBASE_AUTH } from "@/firebaseConfig";
import { onAuthStateChanged, User, updateProfile } from "firebase/auth";
import Button from "../components/button";
import { router } from "expo-router";
import { Avatar } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { usePullToRefresh } from '../hooks/usePullToRefresh';
import ChangeUsernameScreen from "./changeUsernameScreen";
import ChangeEmailScreen from "./changeEmailScreen";
import AddFriendScreen from "./addFriendScreen";


const ProfileScreen: React.FC = () => {
  const { refreshing, onRefresh } = usePullToRefresh(async () => {
    // Simulate a network request or other async operations
    return new Promise(resolve => setTimeout(resolve, 2000));
  });
  const navigation = useNavigation();


  const handleProfilePicturePress = () => {
    // Navigate or perform action on profile picture press
  };

  const handleAddFriend = () => {
    // Navigate to addFriendScreen
    return <AddFriendScreen />
  };

  const handleNamePress = () => {
    // Navigate to changeUsernameScreen
    return <ChangeUsernameScreen />

  };

  const handleEmailPress = () => {
    // Navigate to changeEmailScreen
    return <ChangeEmailScreen />
  };

  const handleShowMoreFriendsPress = () => {
    // Navigate or perform action on show more friends press

  };

  const handleSetPress = (setNumber: number) => {
    // Navigate or perform action on set press
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.profileHeader}>
        <TouchableOpacity onPress={handleProfilePicturePress}>
          <Avatar
            size="xlarge"
            rounded
            source={require('../../assets/images/profile1.jpeg')} // Replace with your image source
            containerStyle={styles.avatar}
          />
        </TouchableOpacity>
        <View style={styles.profileInfo}>
          <Text style={styles.userId}>Hi xinnnyeee</Text>
          <Text style={styles.cardHeight}>Card Height: 333m</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.infoRow} onPress={handleNamePress}>
        <Text style={styles.infoLabel}>Name</Text>
        <Text style={styles.infoValue}>xinnnyeee</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.infoRow} onPress={handleEmailPress}>
        <Text style={styles.infoLabel}>Email</Text>
        <Text style={styles.infoValue}>xyxy@gmail.com</Text>
      </TouchableOpacity>
      <View style={styles.friendsSection}>
        <View style={styles.friendRow}>
            <Text style={styles.friends}>Friends</Text>
            <TouchableOpacity onPress={handleAddFriend}>
              <Avatar 
                size='small'
                rounded
                source={require('../../assets/images/addFriend.png')}
                containerStyle={styles.avatar}
                />
            </TouchableOpacity>
        </View>
        <View style={styles.friendsList}>
          <View style={styles.friendItem}>
            <Avatar size = 'large' rounded source={require('../../assets/images/profile2.jpeg')} />
              <Text>Elise</Text>
            </View>
            <View style={styles.friendItem}>
            <Avatar size = 'large' rounded source={require('../../assets/images/profile3.jpeg')} />
              <Text>Isabelle</Text>
            </View>
            <View style={styles.friendItem}>
            <Avatar size = 'large' rounded source={require('../../assets/images/profile4.jpeg')} />
              <Text>Sylvie</Text>
            </View>
          </View>
        <TouchableOpacity onPress={handleShowMoreFriendsPress}>
          <View style={styles.showMoreFriendsRow}>
            <Text style={styles.showMoreFriends}>Show more friends</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View>
        <Text style={styles.infoLabel}>Finished Sets</Text>
        <TouchableOpacity style={styles.set} onPress={() => handleSetPress(1)}>
          <Text style={styles.setText}>Set 1</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.set} onPress={() => handleSetPress(2)}>
          <Text style={styles.setText}>Set 2</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#F5D7C2',
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    marginRight: 20,
  },
  profileInfo: {
    flexDirection: 'column',
  },
  userId: {
    fontSize: 16,
    fontWeight: 'bold',
    height: 70,
    lineHeight: 50,
    marginBottom: 5,
  },
  cardHeight: {
    fontSize: 16,
    fontWeight: 'bold',
    height: 60,
    lineHeight: 30,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoValue: {
    fontSize: 16,
  },
  friendsSection: {
    marginVertical: 20,
  },
  friendRow: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center',
  },
  friends: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
  },
  friendsList: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  friendItem: {
    alignItems: 'center',
  },
  showMoreFriendsRow: {
    flex: 1,
    marginBottom: 10,
    paddingVertical: 10,
    alignItems: 'flex-end',
  },
  showMoreFriends: {
    fontSize: 12,
  },
  set: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginVertical: 10,
  },
  setText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

