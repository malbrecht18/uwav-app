const SpotifyStore = async (key: string, value?: Object) => {

    let json = ''

    if ('object' == typeof value) {
      Expo.SecureStore.setItemAsync(key, JSON.stringify(value))
    }
    else {
      json = await Expo.SecureStore.getItemAsync(key)
      return JSON.parse(json);
    }
  }

export default SpotifyStore