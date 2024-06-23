import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from "react-native";
import { useState, useEffect } from "react";
import React from 'react';
import { FIREBASE_AUTH } from "@/firebaseConfig";
import { onAuthStateChanged, User, updateProfile } from "firebase/auth";
import Button from "../components/button";
import { router } from "expo-router";
import { Avatar } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen: React.FC = () => {
  const navigation = useNavigation();

  const handleProfilePicturePress = () => {
    // Navigate or perform action on profile picture press
  };

  const handleNamePress = () => {
    // Navigate or perform action on name press
  };

  const handleEmailPress = () => {
    // Navigate or perform action on email press
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
          <Text style={styles.userId}>UserID: 12345678</Text>
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
        <TouchableOpacity onPress={handleShowMoreFriendsPress}>
          <Text style={styles.showMoreFriends}>Show more friends</Text>
        </TouchableOpacity>
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
      </View>
      <View style={styles.finishedSets}>
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

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#F4CBA8',
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
  },
  cardHeight: {
    fontSize: 16,
    fontWeight: 'bold',
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
  showMoreFriends: {
    fontSize: 12,
    color: '828282',
    marginBottom: 10,
  },
  friendsList: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  friendItem: {
    alignItems: 'center',
  },
  finishedSets: {
    marginVertical: 20,
    fontSize: 20,
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

export default ProfileScreen;
