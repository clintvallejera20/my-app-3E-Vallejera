import { useState } from 'react';
import {
  Alert,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { VideoView, useVideoPlayer } from 'expo-video';

// POST TYPE
type Post = {
  id: string;
  username: string;
  time: string;
  avatar: string;
  text: string;
  image?: string;
  video?: string;
  likes: string;
  comments: string;
  reposts: string;
  views: string;
};

// VIDEO PLAYER
function PostVideo({ uri }: { uri: string }) {
  const player = useVideoPlayer(uri, (player) => {
    player.loop = true;
    player.volume = 1.0;
  });

  return (
    <VideoView
      player={player}
      style={styles.postMedia}
      nativeControls
      contentFit="contain"
    />
  );
}

// DEFAULT POSTS
const initialPosts: Post[] = [
  {
    id: '1',
    username: 'Asta',
    time: '2h',
    avatar: 'https://i.postimg.cc/63q8wHX8/images-(3).jpg',
    text: 'HATDOG',
    image: 'https://i.postimg.cc/63q8wHX8/images-(3).jpg',
    likes: '18',
    comments: '2',
    reposts: '5',
    views: '120',
  },
  {
    id: '2',
    username: 'Yuno',
    time: '1h',
    avatar: 'https://i.postimg.cc/q7b886Bk/images-(4).jpg',
    text: 'Wind',
    image: 'https://i.postimg.cc/q7b886Bk/images-(4).jpg',
    likes: '1m',
    comments: '100k',
    reposts: '2k',
    views: '16k',
  },
  {
    id: '3',
    username: 'Luck',
    time: '23h',
    avatar: 'https://i.postimg.cc/rpm4FyGF/images-(5).jpg',
    text: 'Light',
    image: 'https://i.postimg.cc/rpm4FyGF/images-(5).jpg',
    likes: '400k',
    comments: '50k',
    reposts: '10k',
    views: '2m',
  },
  {
    id: '4',
    username: 'Yami',
    time: '5h',
    avatar: 'https://i.postimg.cc/X7byBkKF/images-(6).jpg',
    text: 'Slash',
    image: 'https://i.postimg.cc/X7byBkKF/images-(6).jpg',
    likes: '15m',
    comments: '2m',
    reposts: '8k',
    views: '500k',
  },
  {
    id: '5',
    username: 'Mangna',
    time: '21m',
    avatar: 'https://i.postimg.cc/mD9ttPt6/images-(7).jpg',
    text: 'Water',
    image: 'https://i.postimg.cc/mD9ttPt6/images-(7).jpg',
    likes: '100k',
    comments: '20k',
    reposts: '4k',
    views: '900k',
  },
  {
    id: '6',
    username: 'Nacht',
    time: '38m',
    avatar: 'https://i.postimg.cc/pVDmvnNY/images-(8).jpg',
    text: 'Shadow',
    image: 'https://i.postimg.cc/pVDmvnNY/images-(8).jpg',
    likes: '500k',
    comments: '300k',
    reposts: '20k',
    views: '3m',
  },
];

const MY_AVATAR =
  'https://i.postimg.cc/x8y83f0V/501126546-1403481204109014-4759083872591247462-n.jpg';

export default function HomeScreen() {
  const router = useRouter();

  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [videoUri, setVideoUri] = useState<string | null>(null);
  const [caption, setCaption] = useState('');
  const [activeTab, setActiveTab] = useState('For you');

  // SELECT VIDEO FROM GALLERY
  const pickVideo = async () => {
    try {
      const permission =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permission.granted) {
        Alert.alert(
          'Permission Required',
          'Please allow access to your gallery.',
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['videos'],
        allowsEditing: false,
        quality: 1,
      });

      if (!result.canceled && result.assets.length > 0) {
        setVideoUri(result.assets[0].uri);
        setCaption('');
      }
    } catch (error) {
      Alert.alert('Error', 'Unable to select video.');
    }
  };

  // PUBLISH VIDEO
  const handlePost = () => {
    if (!videoUri) {
      Alert.alert('No Video', 'Please select a video first.');
      return;
    }

    const newPost: Post = {
      id: Date.now().toString(),
      username: 'Mamayutaydiayko',
      time: 'now',
      avatar: MY_AVATAR,
      text: caption.trim(),
      video: videoUri,
      likes: '0',
      comments: '0',
      reposts: '0',
      views: '0',
    };

    setPosts((previousPosts) => [newPost, ...previousPosts]);

    setVideoUri(null);
    setCaption('');

    Alert.alert('Success', 'Your video has been posted!');
  };

  // CANCEL VIDEO
  const cancelVideo = () => {
    setVideoUri(null);
    setCaption('');
  };

  const tabs = ['For you', 'Following', 'Add +', 'News', 'Business'];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* TOP HEADER */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerIcon}
          onPress={() => router.push('/profile')}
        >
          <Ionicons name="person-circle" size={39} color="#AAB8C2" />
        </TouchableOpacity>

        <Text style={styles.xLogo}>𝕏</Text>

        <TouchableOpacity style={styles.headerIcon}>
          <Ionicons name="person-add-outline" size={28} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* CATEGORY TABS */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.tabsScroll}
        contentContainerStyle={styles.tabsContainer}
      >
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            style={styles.tab}
            onPress={() => setActiveTab(tab)}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab && styles.activeTabText,
              ]}
            >
              {tab}
            </Text>

            {activeTab === tab && (
              <View style={styles.activeTabLine} />
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* HOME FEED */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.feedContent}
      >
        {/* LANGUAGE INFORMATION SECTION */}
        <View style={styles.languageSection}>
          <Text style={styles.languageTitle}>
            See posts in any language
          </Text>

          <Text style={styles.languageDescription}>
            Update your settings to add any language you want.
          </Text>

          <TouchableOpacity style={styles.languageButton}>
            <Text style={styles.languageButtonText}>
              Add languages
            </Text>
          </TouchableOpacity>
        </View>

        {/* VIDEO UPLOAD PREVIEW */}
        {videoUri && (
          <View style={styles.uploadContainer}>
            <View style={styles.uploadHeader}>
              <Text style={styles.uploadTitle}>Create post</Text>

              <TouchableOpacity onPress={cancelVideo}>
                <Ionicons name="close" size={25} color="#FFFFFF" />
              </TouchableOpacity>
            </View>

            <TextInput
              style={styles.captionInput}
              placeholder="What's happening?"
              placeholderTextColor="#777777"
              value={caption}
              onChangeText={setCaption}
              multiline
              maxLength={500}
            />

            <PostVideo uri={videoUri} />

            <View style={styles.uploadFooter}>
              <Text style={styles.captionCount}>
                {caption.length}/500
              </Text>

              <TouchableOpacity
                style={styles.postButton}
                onPress={handlePost}
              >
                <Text style={styles.postButtonText}>Post</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* POSTS */}
        {posts.map((post) => (
          <View key={post.id} style={styles.post}>
            <Image
              source={{ uri: post.avatar }}
              style={styles.avatar}
            />

            <View style={styles.postContent}>
              {/* USER INFORMATION */}
              <View style={styles.nameRow}>
                <Text style={styles.username} numberOfLines={1}>
                  {post.username}
                </Text>

                <Text style={styles.time}>· {post.time}</Text>

                <TouchableOpacity style={styles.moreButton}>
                  <Ionicons
                    name="close"
                    size={20}
                    color="#888888"
                  />
                </TouchableOpacity>
              </View>

              {/* POST CAPTION */}
              {!!post.text && (
                <Text style={styles.postText}>
                  {post.text}
                </Text>
              )}

              {/* POST VIDEO */}
              {post.video && (
                <PostVideo uri={post.video} />
              )}

              {/* POST IMAGE */}
              {post.image && (
                <Image
                  source={{ uri: post.image }}
                  style={styles.postMedia}
                  resizeMode="cover"
                />
              )}

              {/* POST ACTIONS */}
              <View style={styles.actions}>
                <TouchableOpacity style={styles.action}>
                  <Ionicons
                    name="chatbubble-outline"
                    size={20}
                    color="#858585"
                  />
                  <Text style={styles.actionText}>
                    {post.comments}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.action}>
                  <Ionicons
                    name="repeat-outline"
                    size={21}
                    color="#858585"
                  />
                  <Text style={styles.actionText}>
                    {post.reposts}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.action}>
                  <Ionicons
                    name="heart-outline"
                    size={21}
                    color="#858585"
                  />
                  <Text style={styles.actionText}>
                    {post.likes}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.action}>
                  <Ionicons
                    name="stats-chart-outline"
                    size={20}
                    color="#858585"
                  />
                  <Text style={styles.actionText}>
                    {post.views}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity>
                  <Ionicons
                    name="bookmark-outline"
                    size={20}
                    color="#858585"
                  />
                </TouchableOpacity>

                <TouchableOpacity>
                  <Ionicons
                    name="share-outline"
                    size={20}
                    color="#858585"
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}

        <Text style={styles.endText}>
          You're all caught up!
        </Text>
      </ScrollView>

      {/* FLOATING CREATE POST BUTTON */}
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={pickVideo}
        activeOpacity={0.8}
      >
        <Ionicons name="add" size={36} color="#FFFFFF" />
      </TouchableOpacity>

      {/* BOTTOM NAVIGATION */}
      <View style={styles.bottomNavContainer}>
        <BlurView
          intensity={90}
          tint="dark"
          style={styles.bottomNav}
        >
          <TouchableOpacity
            style={styles.navButton}
            onPress={() => router.replace('/')}
          >
            <Ionicons name="home" size={27} color="#FFFFFF" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.navButton}>
            <Ionicons
              name="search-outline"
              size={28}
              color="#FFFFFF"
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.navButton}>
            <Ionicons
              name="chatbubble-ellipses-outline"
              size={27}
              color="#FFFFFF"
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.navButton}>
            <Ionicons
              name="notifications-outline"
              size={28}
              color="#FFFFFF"
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navButton}
            onPress={() => router.push('/profile')}
          >
            <Ionicons
              name="mail-outline"
              size={27}
              color="#FFFFFF"
            />
          </TouchableOpacity>
        </BlurView>
      </View>
    </View>
  );
}

// STYLES
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },

  header: {
    height: 76,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#000000',
  },

  headerIcon: {
    width: 42,
    alignItems: 'center',
    justifyContent: 'center',
  },

  xLogo: {
    color: '#FFFFFF',
    fontSize: 43,
    fontWeight: '400',
  },

  tabsScroll: {
    flexGrow: 0,
    height: 52,
    borderBottomWidth: 1,
    borderBottomColor: '#252525',
  },

  tabsContainer: {
    alignItems: 'stretch',
    paddingHorizontal: 10,
  },

  tab: {
    minWidth: 105,
    paddingHorizontal: 14,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
  },

  tabText: {
    color: '#858585',
    fontSize: 16,
    fontWeight: '700',
  },

  activeTabText: {
    color: '#FFFFFF',
  },

  activeTabLine: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 3,
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
  },

  feedContent: {
    paddingBottom: 115,
  },

  languageSection: {
    paddingHorizontal: 22,
    paddingTop: 29,
    paddingBottom: 27,
    borderBottomWidth: 1,
    borderBottomColor: '#252525',
  },

  languageTitle: {
    color: '#FFFFFF',
    fontSize: 27,
    fontWeight: '800',
    marginBottom: 10,
  },

  languageDescription: {
    color: '#777777',
    fontSize: 16,
    lineHeight: 23,
    fontWeight: '600',
    marginBottom: 25,
  },

  languageButton: {
    backgroundColor: '#FFFFFF',
    alignSelf: 'flex-start',
    paddingHorizontal: 24,
    paddingVertical: 13,
    borderRadius: 30,
  },

  languageButtonText: {
    color: '#000000',
    fontSize: 15,
    fontWeight: '800',
  },

  post: {
    flexDirection: 'row',
    paddingHorizontal: 13,
    paddingTop: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#252525',
  },

  avatar: {
    width: 43,
    height: 43,
    borderRadius: 24,
    backgroundColor: '#252525',
  },

  postContent: {
    flex: 1,
    marginLeft: 10,
    minWidth: 0,
  },

  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },

  username: {
    color: '#E7E9EA',
    fontSize: 15,
    fontWeight: '800',
    maxWidth: '70%',
  },

  time: {
    color: '#777777',
    fontSize: 14,
    marginLeft: 5,
  },

  moreButton: {
    marginLeft: 'auto',
    paddingLeft: 8,
  },

  postText: {
    color: '#FFFFFF',
    fontSize: 15,
    lineHeight: 21,
    marginBottom: 9,
  },

  postMedia: {
    width: '100%',
    height: 230,
    borderRadius: 14,
    marginTop: 5,
    backgroundColor: '#202020',
  },

  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 13,
    paddingRight: 3,
  },

  action: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },

  actionText: {
    color: '#858585',
    fontSize: 12,
  },

  uploadContainer: {
    margin: 13,
    padding: 14,
    backgroundColor: '#151515',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#333333',
  },

  uploadHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },

  uploadTitle: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: 'bold',
  },

  captionInput: {
    color: '#FFFFFF',
    fontSize: 15,
    minHeight: 55,
    textAlignVertical: 'top',
    paddingVertical: 10,
  },

  uploadFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 12,
  },

  captionCount: {
    color: '#888888',
    fontSize: 12,
  },

  postButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderRadius: 22,
  },

  postButtonText: {
    color: '#000000',
    fontSize: 14,
    fontWeight: 'bold',
  },

  endText: {
    color: '#777777',
    textAlign: 'center',
    padding: 25,
    fontSize: 13,
  },

  floatingButton: {
    position: 'absolute',
    right: 20,
    bottom: 91,
    width: 58,
    height: 58,
    borderRadius: 30,
    backgroundColor: '#1D9BF0',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 7,
    shadowColor: '#000000',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
  },

  bottomNavContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 65,
    overflow: 'hidden',
    borderTopWidth: 1,
    borderTopColor: '#252525',
    backgroundColor: '#000000',
  },

  bottomNav: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 8,
    backgroundColor: 'rgba(0,0,0,0.92)',
  },

  navButton: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});