const Logout = async () => {
    Expo.SecureStore.deleteItemAsync('user_data');
}

export default Logout;