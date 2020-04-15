import React, { useState, ReactElement } from 'react';
import {
    Text,
    TouchableOpacity,
    ViewStyle,
    StyleProp,
    Platform,
    TextStyle,
} from 'react-native';
import { default as DateTimePickerCommunity } from '@react-native-community/datetimepicker';
import moment from 'moment';
import PickerModal from './Shared/PickerModal';
import { PickerModalProps } from './Shared/PickerModal';
import Title from './Shared/Title';

type Mode = 'date' | 'time';
type Display = 'spinner' | 'default' | 'clock' | 'calendar';
export interface DateTimePickerProps {
    containerStyle?: StyleProp<ViewStyle>,
    dateTextStyle?: StyleProp<TextStyle>,
    format?: string,
    onDateChange?: (date: string) => void,
    initialDate?: Date,
    disabled?: boolean,
    minDate?: Date
    maxDate?: Date,
    isModal?: boolean, // Only for IOS
    pickerProps?: PickerModalProps,
    mode?: Mode,
    displayType?: Display,
    locale?: string,
    autoDismiss?: boolean,
    title?: string,
    required?: boolean,
    requiredIconColor?: string,
    titleContainerStyle?: StyleProp<ViewStyle>,
    titleTextStyle?: StyleProp<TextStyle>,
}

const DateTimePicker: React.StatelessComponent<DateTimePickerProps> = (props) => {

    const ShouldShowInit = (): boolean => {
        return Platform.OS == 'ios' && !props.isModal;
    }

    const [date, setDate] = useState(props.initialDate ?? new Date());
    const [show, setShow] = useState(ShouldShowInit());

    const onChange = (event: any, selectedDate: Date) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
        props.onDateChange && props.onDateChange(formatDateString(currentDate))
    };

    const showDateTimePicker = () => {
        setShow(true);
    }

    const hideDateTimePicker = () => {
        setShow(false);
    }

    const formatDateString = (date: Date): string => {
        return moment(date).format(props.format);
    }

    const ShouldWithModal = (): boolean => {
        return Platform.OS == 'ios' && props.isModal!;
    }

    const ShouldShowDateContainer = (): boolean => {
        if (Platform.OS == 'android') {
            return true;
        }
        return props.isModal!;
    }

    const _renderTitle = () => {
        if (props.title) {
            return (
                <Title
                    titleContainerStyle={props.titleContainerStyle}
                    titleTextStyle={props.titleTextStyle}
                    title={props.title}
                    required={props.required}
                    requiredIconColor={props.requiredIconColor}
                />
            )
        }
    }

    const withContainer = (children: ReactElement) => {
        if (ShouldWithModal()) {
            return (
                <PickerModal
                    {...props.pickerProps}
                    rightButtonText={props.pickerProps?.rightButtonText}
                    onModalPress={() => props.autoDismiss ? hideDateTimePicker() : {}}
                    onRightButtonPress={() => {
                        hideDateTimePicker();
                        props.pickerProps?.onRightButtonPress && props.pickerProps?.onRightButtonPress();
                    }}
                    show={show}>
                    {children}
                </PickerModal>
            )
        } else {
            return (
                show && children
            )
        }
    }

    return (
        <>
            {
                ShouldShowDateContainer() && (
                    <>
                        {_renderTitle()}
                        <TouchableOpacity
                            style={props.containerStyle}
                            onPress={showDateTimePicker}>
                            <Text style={[
                                props.dateTextStyle
                            ]}>
                                {formatDateString(date)}
                            </Text>
                        </TouchableOpacity>
                    </>
                )
            }

            {
                withContainer(
                    <DateTimePickerCommunity
                        timeZoneOffsetInMinutes={0}
                        value={date}
                        mode={props.mode}
                        is24Hour={true}
                        display={props.displayType}
                        onChange={onChange}
                        maximumDate={props.maxDate}
                        minimumDate={props.minDate}
                    />
                )
            }
        </>
    );
};

const defaultProps: DateTimePickerProps = {
    isModal: true,
    mode: 'date',
    displayType: 'default',
    autoDismiss: true,
}

DateTimePicker.defaultProps = defaultProps;

export default DateTimePicker;