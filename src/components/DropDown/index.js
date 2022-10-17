import {Image, Pressable, Text, View} from 'react-native';
import React, {Component, useId} from 'react';
import styles from './style';
// import Icon1 from '../../assets/images/user.png';
import Icon2 from '../../assets/images/arrow.png';
import Icon3 from '../../assets/images/down.png';
import {Metrix, Colors} from '../../config';
import {AppAction} from '../../store/actions';
import {connect} from 'react-redux';

export class DropDown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: false,
      radioItems: [
        {
          id: 1,
          title: 'I rather not to say',
        },
        {
          id: 2,
          title: 'I rather not towe say',
        },
        {
          id: 3,
          title: 'I rather not to say',
        },
        {
          id: 4,
          title: 'I rather not to say',
        },
      ],
      active: '',
      selectedData: 'Select',
    };
  }
  selectData = async item => {
    await this.setState({active: item.id, selectedData: item.name});
    let selectedData = this.state.selectedData;
    let stateName = this.props.stateName;
    this.props.updateParent({
      [stateName]: selectedData,
      [this.props.id]: item.id,
    });
    this.setState({
      toggle: !this.state.toggle,
    });
  };
  render() {
    let imageName = this.props?.props?.IconName;
    let DropDownData = this.props?.props?.DropDownData;
    return (
      <View style={styles.dropDown}>
        <Pressable
          style={styles.dropDownWrapper}
          onPress={() => this.setState({toggle: !this.state.toggle})}>
          {imageName && (
            <View
              style={{
                width: '15%',
                height: Metrix.VerticalSize(20),
              }}>
              <Image
                style={{height: '100%', width: '100%', resizeMode: 'contain'}}
                source={imageName}
              />
            </View>
          )}
          <View style={{width: '80%'}}>
            <Text
              style={{
                color: Colors.PlaceColor,
                fontSize: Metrix.FontMedium,
                marginLeft: 3,
              }}>
              {this.props.stateValue == ''
                ? this.state.selectedData
                : this.props.stateValue}
            </Text>
          </View>
          <View style={{width: '5%'}}>
            <Image source={this.state.toggle ? Icon2 : Icon3} />
          </View>
        </Pressable>
        {this.state.toggle && (
          <View style={styles.dropDownData}>
            {DropDownData?.map(item => {
              return (
                <Pressable
                  onPress={() => this.selectData(item)}
                  key={item.id}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: Metrix.VerticalSize(19),
                  }}>
                  <View
                    style={[
                      styles.dropDownDataRadioActive,
                      {
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor:
                          this.state.active === item.id
                            ? Colors.Primary
                            : Colors.White,
                      },
                    ]}>
                    {this.state.active === item.id ? (
                      <View
                        style={[
                          styles.dropDownDataRadioActive,
                          {
                            height: 12,
                            width: 12,
                            backgroundColor: Colors.White,
                          },
                        ]}></View>
                    ) : (
                      <View />
                    )}
                  </View>
                  <Text style={styles.dropDownDataTitle}>{item.name}</Text>
                </Pressable>
              );
            })}
          </View>
        )}
      </View>
    );
  }
}
function mapDispatchToProps(dispatch) {
  return {
    setData: payload => {
      dispatch(AppAction.localData(payload));
    },
  };
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(DropDown);
