import {StyleSheet} from 'react-native';

import {Metrix, Colors} from '../../config';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column-reverse',
    marginVertical: 10,
  },
  containerBG: {
    height: Metrix.VerticalSize(230),
    width: Metrix.HorizontalSize(155),
  },
  cardHeader: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingTop: 7,
    justifyContent: 'space-between',
    paddingHorizontal: Metrix.HorizontalSize(7),
  },
  cardHeaderRight: {
    color: Colors.White,
    backgroundColor: Colors.Primary,
    paddingHorizontal: Metrix.HorizontalSize(5),
    paddingVertical: Metrix.VerticalSize(3),
    borderRadius: 4,
    fontWeight: '700',
    fontSize: 9,
  },
  cardHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.Primary,
    borderRadius: 4,
    paddingHorizontal: Metrix.HorizontalSize(5),
    paddingVertical: Metrix.VerticalSize(3),
  },
  cardHeaderLeftText: {
    fontSize: 9,
    fontWeight: '700',
    color: Colors.White,
  },
  cardFooter: {
    flex: 2.6,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  // bottom
  cardDescBottomUpperName: {
    fontWeight: '700',
    color: Colors.White,
    paddingVertical: 10,
    fontSize: 12,
  },
  cardDescBottomUpperDasignation: {
    flexDirection: 'row',
    paddingVertical: 4,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardDescBottomUpperDasignationText: {
    paddingHorizontal: 13,
    fontWeight: '700',
    fontSize: 10,
    color: Colors.White,
  },
  cardIcons: {
    width: 14,
    height: 14,
  },
});

export default styles;
