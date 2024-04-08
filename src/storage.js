import MMKVStorage from "react-native-mmkv-storage";

export default storage = new MMKVStorage.Loader().withEncryption().initialize();
