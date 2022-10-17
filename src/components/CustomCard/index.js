import {
  Image,
  ImageBackground,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import React, {Component} from 'react';
import {Images, ApiCaller} from '../../config';
import styles from './styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import navigationService from '../../config/navigationService';
const BaseUrl = `${ApiCaller.url}img/upload/`;
export class CustomCard extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const data = this.props.item;
    const dummyImg = this.props.dummyImage;
    return (
      <TouchableOpacity
        onPress={() =>
          navigationService.navigate('Preview', {id: data.id, isCardUser: true})
        }
        style={styles.container}>
        <ImageBackground
          imageStyle={{borderRadius: 6}}
          style={styles.containerBG}
          source={{
            uri: data?.photo == null ? dummyImg : `${BaseUrl}${data.photo}`,
          }}>
          {/* bg desc begin */}
          <View style={styles.cardHeader}>
            <View style={styles.cardHeaderLeft}>
              <Ionicons name="location" size={10} color="white" />
              <Text style={styles.cardHeaderLeftText}>{data?.distance}</Text>
            </View>
            <Text style={styles.cardHeaderRight}>Add to diary</Text>
          </View>
          <View style={styles.cardFooter}>
            <Text style={styles.cardDescBottomUpperName}>
              {data?.name}, {data?.age}
            </Text>
            <View style={styles.cardDescBottomUpperDasignation}>
              <Image style={styles.cardIcons} source={Images.Cap} />
              <Text style={styles.cardDescBottomUpperDasignationText}>
                {data?.eduction}
              </Text>
            </View>
            <View style={styles.cardDescBottomUpperDasignation}>
              <Image style={styles.cardIcons} source={Images.Bag} />
              <Text style={styles.cardDescBottomUpperDasignationText}>
                {data?.profession}
              </Text>
            </View>
            <View style={styles.cardDescBottomUpperDasignation}>
              <Ionicons name="star" color={'white'} />
              <Text style={styles.cardDescBottomUpperDasignationText}>
                4.9 rating
              </Text>
            </View>
          </View>
          {/* bg desc end */}
        </ImageBackground>
      </TouchableOpacity>
    );
  }
}

export default CustomCard;
