// src/screens/LeaderboardScreen.tsx
import React from 'react';
import { View, Text, Image, StyleSheet, FlatList } from 'react-native';

const leaderboardData = [
    { id: '1', name: 'xinnnyeee', score: '1399m', image: 'path_to_image' },
    { id: '2', name: '', score: '', image: '' },
    { id: '3', name: '', score: '', image: '' },
    { id: '4', name: '', score: '', image: '' },
    { id: '5', name: '', score: '', image: '' },
    { id: '6', name: '', score: '', image: '' },
];

const LeaderboardScreen: React.FC = () => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={{ uri: 'path_to_image' }} style={styles.profileImage} />
                <View>
                    <Text style={styles.congratsText}>Good Job,</Text>
                    <Text style={styles.usernameText}>xinnnyeee!</Text>
                    <Text style={styles.cardHeightText}>Card height: 333m</Text>
                </View>
            </View>
            <View style={styles.leaderboardContainer}>
                <Text style={styles.leaderboardTitle}>Leaderboard</Text>
                <FlatList
                    data={leaderboardData}
                    renderItem={({ item }) => (
                        <View style={styles.leaderboardItem}>
                            <Text style={styles.leaderboardPosition}>{item.id}</Text>
                            <Image source={{ uri: item.image }} style={styles.leaderboardImage} />
                            <Text style={styles.leaderboardName}>{item.name}</Text>
                            <Text style={styles.leaderboardScore}>{item.score}</Text>
                        </View>
                    )}
                    keyExtractor={item => item.id}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5D7C2',
    },
    header: {
        flexDirection: 'row',
        padding: 16,
        alignItems: 'center',
    },
    profileImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginRight: 16,
    },
    congratsText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    usernameText: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    cardHeightText: {
        fontSize: 16,
        color: '#666',
    },
    leaderboardContainer: {
        margin: 16,
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
    },
    leaderboardTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    leaderboardItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    leaderboardPosition: {
        fontSize: 18,
        fontWeight: 'bold',
        width: 30,
    },
    leaderboardImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 16,
    },
    leaderboardName: {
        fontSize: 16,
        flex: 1,
    },
    leaderboardScore: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default LeaderboardScreen;
