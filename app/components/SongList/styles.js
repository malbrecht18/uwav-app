import { StyleSheet } from 'react-native';

module.exports = StyleSheet.create({
    styleTextInput: {
        height: 50,
        paddingLeft: 50,
        borderBottomWidth: 0.2,
        borderBottomColor: 'rgba(66, 175, 112, 0.4)',
        borderBottomStartRadius: 100,
        borderBottomEndRadius: 100,
    },
      styleSongName: {
        backgroundColor: 'rgba(0,0,0,0)',
        paddingLeft: 10,
        fontSize: 16,
    },
      styleArtistName: {
        backgroundColor: 'rgba(0,0,0,0)',
        paddingLeft: 7,
        fontSize: 12,
    },
      container: {
        flex:1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0)',
        padding: 5,
    },
      textInputContainer: {
        flex: 1,
        paddingTop:20,
        backgroundColor: 'rgba(0,0,0,0)'
    },
      activityIndicatorContainer: {
        flex: 1,
        padding: 20
    },
      flatListStyle: {
        backgroundColor: 'rgba(0,0,0,0)',
        marginBottom: 88,
    },
      imageStyle: {
        width: 50,
        height: 50,
    },
      viewTitleSectionList: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
      titleSectionList: {
        fontSize: 28,
        alignItems: 'center',
        fontWeight: 'bold',
    },
      separatorSectionList: {
        fontSize: 18,
        padding: 5,
        fontWeight: 'bold',
    },
})