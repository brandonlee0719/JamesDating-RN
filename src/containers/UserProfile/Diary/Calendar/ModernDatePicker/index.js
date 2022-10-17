import { View, Text, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import DatePicker, { getFormatedDate } from 'react-native-modern-datepicker';
import { styles } from '../styles';
import { Header } from '../../../../../components';
import { Colors } from '../../../../../config';


const MyDatePicker = (props) => {

    const handleGetDate = async (date) => {
        props.setSelectedDate(date)
    }

    return (
        <>
            <Header.Standard
                //   extraStyle={{backgroundColor: Colors.white}}
                leftIconName={'close'}
                onPressLeft={props.handleClose}
                Heading={'Diary History'}
                onPressRight={() => navigationService.navigate('Calendar')}
                rightIconName={"add"}
                bgColor="transparent"
                iconColor={Colors.Black}
                iconBg={{ backgroundColor: '#B7EDED', padding: 10, borderRadius: 6 }}
            />
            {/* header end*/}
            <Pressable style={styles.datePicker}>
                <Pressable style={styles.datePickerWrapper}>
                    <DatePicker
                        onDateChange={(date) => {
                            props.setSelectedDate(date)
                            props.handleClose()
                        }}
                        selected={getFormatedDate(new Date(), 'MM-YYYY-DD')}
                        onSelectedChange={date => props.setSelectedDate(date)}
                    />
                </Pressable>
            </Pressable>
        </>
    )
}

export default MyDatePicker




