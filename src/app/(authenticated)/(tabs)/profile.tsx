
import { useState } from 'react';
import {
  Alert,
  Image,
  ImageBackground,
  Modal,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const COVER_IMAGE =
  'https://i.postimg.cc/mkhpYGGP/Screenshot-2026-11-22-202312.png';

export default function ProfileScreen() {
  const router = useRouter();

  const [name, setName] = useState('JAMBOHATDOG');
  const [username, setUsername] = useState('LUCKY69');

  const [bio, setBio] = useState(
    'bomba na papapdol'
  );

  const [profileImage, setProfileImage] = useState(
    'https://i.postimg.cc/Qtmvgb9g/Screenshot-2026-11-22-202009.png'
  );

  const [editVisible, setEditVisible] = useState(false);
  const [verificationVisible, setVerificationVisible] = useState(true);

  const [editName, setEditName] = useState(name);
  const [editUsername, setEditUsername] = useState(username);
  const [editBio, setEditBio] = useState(bio);
  const [editImage, setEditImage] = useState(profileImage);

  // OPEN EDIT PROFILE
  const openEditProfile = () => {
    setEditName(name);
    setEditUsername(username);
    setEditBio(bio);
    setEditImage(profileImage);
    setEditVisible(true);
  };

  // SAVE PROFILE
  const saveProfile = () => {
    if (!editName.trim() || !editUsername.trim()) {
      Alert.alert('Required', 'Name and username cannot be empty.');
      return;
    }

    setName(editName.trim());
    setUsername(editUsername.trim().replace('@', ''));
    setBio(editBio);
    setProfileImage(editImage.trim() || profileImage);

    setEditVisible(false);

    Alert.alert('Success', 'Your profile has been updated!');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >

        {/* COVER PHOTO */}
        <ImageBackground
          source={{ uri: COVER_IMAGE }}
          style={styles.cover}
          resizeMode="cover"
        >
          <View style={styles.coverOverlay} />

          <View style={styles.coverHeader}>
            <TouchableOpacity
              style={styles.coverIcon}
              onPress={() => router.back()}
            >
              <Ionicons
                name="chevron-back"
                size={30}
                color="white"
              />
            </TouchableOpacity>

            <TouchableOpacity style={styles.coverIcon}>
              <Ionicons
                name="search-outline"
                size={27}
                color="white"
              />
            </TouchableOpacity>
          </View>
        </ImageBackground>

        {/* PROFILE PICTURE */}
        <View style={styles.profileImageContainer}>
          <Image
            source={{ uri: profileImage }}
            style={styles.profileImage}
          />
        </View>

        {/* PROFILE INFORMATION */}
        <View style={styles.profileInfo}>
          <Text style={styles.name}>{name}</Text>

          <Text style={styles.username}>@{username}</Text>

          <Text style={styles.bio}>{bio}</Text>

          <View style={styles.joined}>
            <Ionicons
              name="calendar-outline"
              size={19}
              color="#777"
            />

            <Text style={styles.joinedText}>
              Joined November 20, 2026 MY EVENT IN OPOL
            </Text>

            <Ionicons
              name="chevron-forward"
              size={18}
              color="#777"
            />
          </View>

          {/* FOLLOWERS */}
          <View style={styles.followers}>
            <Text style={styles.followCount}>
              0 <Text style={styles.followLabel}>Following</Text>
            </Text>

            <Text style={styles.followCount}>
              20M <Text style={styles.followLabel}>Followers</Text>
            </Text>
          </View>

          {/* PROFILE BUTTONS */}
          <View style={styles.profileButtons}>
            <TouchableOpacity
              style={styles.outlineButton}
              onPress={() =>
                Alert.alert('Share Profile', `@${username}`)
              }
            >
              <Text style={styles.buttonText}>
                Share Profile
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.outlineButton}
              onPress={openEditProfile}
            >
              <Text style={styles.buttonText}>Set Up</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* VERIFICATION CARD */}
        {verificationVisible && (
          <View style={styles.verificationCard}>
            <TouchableOpacity
              style={styles.closeVerification}
              onPress={() => setVerificationVisible(false)}
            >
              <Ionicons name="close" size={24} color="#888" />
            </TouchableOpacity>

            <Text style={styles.verificationTitle}>
              You're not verified yet
            </Text>

            <Text style={styles.verificationDescription}>
              Get verified to increase your account's credibility
              and grow faster.
            </Text>

            <TouchableOpacity
              style={styles.verificationButton}
              onPress={() =>
                Alert.alert(
                  'Verification',
                  'Verification feature coming soon.'
                )
              }
            >
              <Text style={styles.verificationButtonText}>
                Finish Verification
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {/* PROFILE TABS */}
        <View style={styles.tabs}>
          <TouchableOpacity style={styles.activeTab}>
            <Ionicons
              name="reader-outline"
              size={25}
              color="white"
            />

            <Text style={styles.activeTabText}>Posts</Text>

            <Ionicons
              name="chevron-down"
              size={18}
              color="white"
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.inactiveTab}>
            <Ionicons
              name="chatbubble-outline"
              size={25}
              color="#777"
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.inactiveTab}>
            <Ionicons
              name="repeat-outline"
              size={25}
              color="#777"
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.inactiveTab}>
            <Ionicons
              name="play-circle-outline"
              size={27}
              color="#777"
            />
          </TouchableOpacity>
        </View>

        {/* SETUP SECTION */}
        <View style={styles.setupSection}>
          <View style={styles.setupHeader}>
            <Text style={styles.setupTitle}>
              Let's get you set up
            </Text>

            <Ionicons
              name="ellipsis-horizontal"
              size={20}
              color="#777"
            />
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            <View style={styles.setupCards}>

              <TouchableOpacity style={styles.setupCard}>
                <View style={[styles.setupImage, styles.blueCard]}>
                  <Ionicons
                    name="person-outline"
                    size={50}
                    color="white"
                  />
                </View>

                <Text style={styles.setupCardText}>
                  Complete your profile
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.setupCard}>
                <View style={[styles.setupImage, styles.purpleCard]}>
                  <Ionicons
                    name="person-add-outline"
                    size={50}
                    color="white"
                  />

                  <Text style={styles.leftBadge}>5 left</Text>
                </View>

                <Text style={styles.setupCardText}>
                  Follow 5 accounts
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.setupCard}>
                <View style={[styles.setupImage, styles.orangeCard]}>
                  <Ionicons
                    name="chatbubble-outline"
                    size={50}
                    color="white"
                  />
                </View>

                <Text style={styles.setupCardText}>
                  Explore posts
                </Text>
              </TouchableOpacity>

            </View>
          </ScrollView>
        </View>

        {/* PHOTO GRID */}
        <View style={styles.photoGrid}>
          {[
            'https://i.postimg.cc/0yGnJNJ0/images-(13).jpg',
            'https://i.postimg.cc/0NcCcHnj/images-(12).jpg',
            'https://i.postimg.cc/B6zBGLR7/images-(11).jpg',
            'https://i.postimg.cc/76RnyGp6/images-(10).jpg',
            'https://i.postimg.cc/grFyx9zH/images-(9).jpg',
            'https://i.postimg.cc/Qtmvgb9g/Screenshot-2026-11-22-202009.png',
          ].map((image, index) => (
            <Image
              key={index}
              source={{ uri: image }}
              style={styles.gridImage}
            />
          ))}
        </View>

        <Text style={styles.endText}>
          That's all for now! ✨
        </Text>

      </ScrollView>

      {/* FLOATING ADD BUTTON */}
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() =>
          Alert.alert('Create Post', 'Create post feature coming soon.')
        }
        activeOpacity={0.8}
      >
        <Ionicons name="add" size={38} color="white" />
      </TouchableOpacity>

      {/* BOTTOM NAVIGATION - SAME AS HOME.TSX */}
      <View style={styles.bottomNav}>

        {/* HOME */}
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => router.replace('/home')}
        >
          <Ionicons
            name="home"
            size={28}
            color="white"
          />
        </TouchableOpacity>

        {/* SEARCH */}
        <TouchableOpacity style={styles.navButton}>
          <Ionicons
            name="search-outline"
            size={29}
            color="white"
          />
        </TouchableOpacity>

        {/* MESSAGES */}
        <TouchableOpacity style={styles.navButton}>
          <Ionicons
            name="chatbubble-ellipses-outline"
            size={28}
            color="white"
          />
        </TouchableOpacity>

        {/* NOTIFICATIONS */}
        <TouchableOpacity style={styles.navButton}>
          <Ionicons
            name="notifications-outline"
            size={29}
            color="white"
          />
        </TouchableOpacity>

        {/* MAIL */}
        <TouchableOpacity style={styles.navButton}>
          <Ionicons
            name="mail-outline"
            size={28}
            color="white"
          />
        </TouchableOpacity>

      </View>

      {/* EDIT PROFILE MODAL */}
      <Modal
        visible={editVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setEditVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>

            <View style={styles.modalHeader}>
              <TouchableOpacity
                onPress={() => setEditVisible(false)}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>

              <Text style={styles.modalTitle}>
                Edit profile
              </Text>

              <TouchableOpacity onPress={saveProfile}>
                <Text style={styles.saveText}>Done</Text>
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>

              <View style={styles.editPhotoContainer}>
                <Image
                  source={{
                    uri: editImage.trim() || profileImage,
                  }}
                  style={styles.editPhoto}
                />

                <Text style={styles.editPhotoText}>
                  Change profile photo using an image URL below
                </Text>
              </View>

              <Text style={styles.inputLabel}>Name</Text>

              <TextInput
                style={styles.input}
                value={editName}
                onChangeText={setEditName}
                placeholder="Enter your name"
                placeholderTextColor="#777"
              />

              <Text style={styles.inputLabel}>Username</Text>

              <TextInput
                style={styles.input}
                value={editUsername}
                onChangeText={setEditUsername}
                placeholder="Enter username"
                placeholderTextColor="#777"
                autoCapitalize="none"
              />

              <Text style={styles.inputLabel}>Bio</Text>

              <TextInput
                style={[styles.input, styles.bioInput]}
                value={editBio}
                onChangeText={setEditBio}
                placeholder="Write something about yourself"
                placeholderTextColor="#777"
                multiline
                textAlignVertical="top"
              />

              <Text style={styles.inputLabel}>
                Profile picture URL
              </Text>

              <TextInput
                style={styles.input}
                value={editImage}
                onChangeText={setEditImage}
                placeholder="Paste image URL here"
                placeholderTextColor="#777"
                autoCapitalize="none"
              />

              <TouchableOpacity
                style={styles.saveButton}
                onPress={saveProfile}
              >
                <Text style={styles.saveButtonText}>
                  Save changes
                </Text>
              </TouchableOpacity>

            </ScrollView>
          </View>
        </View>
      </Modal>

    </View>
  );
}

// STYLES
const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#000',
  },

  scrollContent: {
    paddingBottom: 110,
  },

  // COVER PHOTO
  cover: {
    height: 210,
    width: '100%',
    backgroundColor: '#444',
  },

  coverOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.15)',
  },

  coverHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingTop: 35,
  },

  coverIcon: {
    width: 42,
    height: 42,
    borderRadius: 30,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // PROFILE PICTURE
  profileImageContainer: {
    marginTop: -55,
    marginLeft: 17,
    alignSelf: 'flex-start',
    borderWidth: 5,
    borderColor: '#000',
    borderRadius: 65,
    backgroundColor: '#000',
  },

  profileImage: {
    width: 110,
    height: 110,
    borderRadius: 60,
    backgroundColor: '#CCD6DD',
  },

  // PROFILE INFORMATION
  profileInfo: {
    paddingHorizontal: 18,
    marginTop: 12,
  },

  name: {
    color: '#fff',
    fontSize: 27,
    fontWeight: '900',
  },

  username: {
    color: '#777',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 3,
  },

  bio: {
    color: '#fff',
    fontSize: 14,
    lineHeight: 21,
    marginTop: 18,
  },

  joined: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    gap: 7,
  },

  joinedText: {
    color: '#777',
    fontSize: 15,
    fontWeight: 'bold',
  },

  followers: {
    flexDirection: 'row',
    gap: 18,
    marginTop: 20,
  },

  followCount: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },

  followLabel: {
    color: '#777',
    fontWeight: 'bold',
  },

  // PROFILE BUTTONS
  profileButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 25,
  },

  outlineButton: {
    flex: 1,
    height: 48,
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },

  // VERIFICATION
  verificationCard: {
    marginHorizontal: 18,
    marginTop: 35,
    backgroundColor: '#242424',
    borderRadius: 20,
    padding: 25,
    paddingTop: 35,
  },

  closeVerification: {
    position: 'absolute',
    right: 15,
    top: 15,
  },

  verificationTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },

  verificationDescription: {
    color: '#999',
    fontSize: 15,
    lineHeight: 21,
    fontWeight: '600',
    marginTop: 10,
  },

  verificationButton: {
    backgroundColor: 'white',
    borderRadius: 30,
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 25,
  },

  verificationButtonText: {
    color: 'black',
    fontSize: 17,
    fontWeight: 'bold',
  },

  // PROFILE TABS
  tabs: {
    flexDirection: 'row',
    height: 65,
    borderBottomWidth: 0.5,
    borderBottomColor: '#333',
    marginTop: 35,
    alignItems: 'center',
  },

  activeTab: {
    flex: 1.5,
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    borderBottomWidth: 3,
    borderBottomColor: 'white',
  },

  activeTabText: {
    color: 'white',
    fontSize: 17,
    fontWeight: 'bold',
  },

  inactiveTab: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // SETUP SECTION
  setupSection: {
    paddingTop: 18,
    paddingBottom: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: '#333',
  },

  setupHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 18,
    marginBottom: 20,
  },

  setupTitle: {
    color: 'white',
    fontSize: 19,
    fontWeight: 'bold',
  },

  setupCards: {
    flexDirection: 'row',
    paddingHorizontal: 17,
    gap: 15,
  },

  setupCard: {
    width: 230,
  },

  setupImage: {
    width: 230,
    height: 125,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },

  blueCard: {
    backgroundColor: '#079FD8',
  },

  purpleCard: {
    backgroundColor: '#9B40D8',
  },

  orangeCard: {
    backgroundColor: '#F3A500',
  },

  leftBadge: {
    position: 'absolute',
    bottom: 8,
    left: 10,
    color: 'white',
    backgroundColor: '#1765A0',
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 5,
    fontSize: 11,
    fontWeight: 'bold',
  },

  setupCardText: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 10,
  },

  // PHOTO GRID
  photoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 10,
  },

  gridImage: {
    width: '33.1%',
    height: 125,
    marginBottom: 3,
  },

  endText: {
    color: '#777',
    textAlign: 'center',
    marginVertical: 25,
  },

  // FLOATING ADD BUTTON
  floatingButton: {
    position: 'absolute',
    right: 18,
    bottom: 85,
    width: 62,
    height: 62,
    borderRadius: 35,
    backgroundColor: '#1D9BF0',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
  },

  // BOTTOM NAVIGATION - SAME AS HOME
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 65,
    backgroundColor: '#000',
    borderTopWidth: 0.5,
    borderTopColor: '#292929',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
  },

  navButton: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // EDIT PROFILE MODAL
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.75)',
    justifyContent: 'flex-end',
  },

  modalContainer: {
    backgroundColor: '#111',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 20,
    paddingBottom: 30,
    maxHeight: '90%',
  },

  modalHeader: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
    borderBottomColor: '#444',
  },

  modalTitle: {
    color: 'white',
    fontSize: 17,
    fontWeight: 'bold',
  },

  cancelText: {
    color: '#aaa',
    fontSize: 15,
  },

  saveText: {
    color: '#1D9BF0',
    fontSize: 15,
    fontWeight: 'bold',
  },

  editPhotoContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },

  editPhoto: {
    width: 85,
    height: 85,
    borderRadius: 50,
  },

  editPhotoText: {
    color: '#888',
    fontSize: 12,
    marginTop: 10,
  },

  inputLabel: {
    color: 'white',
    fontSize: 14,
    marginTop: 15,
    marginBottom: 8,
  },

  input: {
    backgroundColor: '#222',
    borderWidth: 1,
    borderColor: '#444',
    borderRadius: 10,
    padding: 13,
    color: 'white',
    fontSize: 15,
  },

  bioInput: {
    height: 100,
  },

  saveButton: {
    backgroundColor: 'white',
    borderRadius: 25,
    padding: 15,
    alignItems: 'center',
    marginTop: 25,
    marginBottom: 20,
  },

  saveButtonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 15,
  },

});
