import React, { ReactElement, useState } from 'react';
import { Picker } from '@react-native-community/picker';
import {
    Platform,
    StyleProp,
    ViewStyle,
    TouchableOpacity,
    Text,
    StyleSheet,
    View,
    TextStyle,
} from 'react-native';
import PickerModal from './Shared/PickerModal';
import { PickerModalProps } from './Shared/PickerModal';
import Title from './Shared/Title';


type Mode = 'dialog' | 'dropdown';
export interface PickerItemType {
    label: string,
    value: string,
}

export interface SelectPickerProps {
    items?: PickerItemType[],
    containerStyle?: StyleProp<ViewStyle>,
    selectedTextStyle?: StyleProp<TextStyle>,
    titleContainerStyle?: StyleProp<ViewStyle>,
    titleTextStyle?: StyleProp<TextStyle>,
    initialValue?: string,
    disabled?: boolean,
    mode?: Mode,
    onSelectedChange?: (selectedValue: string) => void,
    placeholder?: string,
    placeholderColor?: string,
    title?: string,
    required?: boolean,
    requiredIconColor?: string,
    rightIcon?: ReactElement // Only for IOS,
    isModal?: boolean, // Only for IOS
    pickerProps?: PickerModalProps,
    autoDismiss?: boolean,
}

const SelectPicker: React.StatelessComponent<SelectPickerProps> = (props) => {

    const ShouldShowInit = (): boolean => {
        return Platform.OS == 'ios' && !props.isModal;
    }

    const _initialValue = (): string => {
        if (props.placeholder) {
            return props.placeholder;
        }

        if (!props.items) {
            return '';
        }
        if (props.initialValue) {
            return props.initialValue;
        }

        if (props.items.length > 0) {
            return props.items[0].value;
        }

        return '';
    }

    const [selected, setSelected] = useState(_initialValue());
    const [show, setShow] = useState(ShouldShowInit());

    const showPicker = () => {
        setShow(true);
    }

    const hidePicker = () => {
        setShow(false);
    }

    const getSelectedValue = (selectedValue: string): string => {
        if (selectedValue == props.placeholder) {
            return '';
        }
        return selected;
    }
    const _renderPickerItems = () => {
        if (props.items) {
            return props.items.map((v, i) => {
                return <Picker.Item key={i} label={v.label} value={v.value} />
            })
        }
    }

    const _renderPlaceHolder = () => {
        return (
            <Picker.Item
                color={props.placeholderColor}
                label={props.placeholder!}
                value={props.placeholder!} />
        )
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

    const ShouldWithModal = (): boolean => {
        return Platform.OS == 'ios' && props.isModal!;
    }

    const withContainer = (children: ReactElement) => {
        switch (Platform.OS) {
            case 'ios':
                return ShouldWithModal()
                    ? <>
                        {_renderTitle()}
                        <TouchableOpacity
                            style={[
                                styles.container,
                                styles.containerIOS,
                                props.containerStyle,
                                props.disabled && styles.disabledContainer,
                            ]}
                            disabled={props.disabled}
                            onPress={showPicker}>
                            <Text style={props.selectedTextStyle}>
                                {selected}
                            </Text>
                            {props.rightIcon && props.rightIcon}
                        </TouchableOpacity>
                        <PickerModal
                            rightButtonText={props.pickerProps?.rightButtonText}
                            onModalPress={() => props.autoDismiss ? hidePicker() : {}}
                            onRightButtonPress={() => {
                                hidePicker();
                                props.pickerProps?.onRightButtonPress && props.pickerProps?.onRightButtonPress();
                            }}
                            show={show}
                        >
                            {children}
                        </PickerModal>
                    </>
                    : children
            case 'android':
            default:
                return (
                    <>
                        {_renderTitle()}
                        <View style={[
                            styles.container,
                            props.containerStyle,
                            props.disabled && styles.disabledContainer
                        ]}>

                            {children}

                        </View>
                    </>
                );
        }
    }

    return (
        <>
            {withContainer(
                <Picker
                    enabled={!props.disabled}
                    selectedValue={selected}
                    style={styles.picker}
                    mode={props.mode}
                    onValueChange={(itemValue: string, itemIndex: number) => {
                        setSelected(itemValue)
                        props.onSelectedChange && props.onSelectedChange(
                            getSelectedValue(itemValue)
                        );
                    }}>
                    {_renderPlaceHolder()}
                    {_renderPickerItems()}
                </Picker>

            )}
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
    },
    containerIOS: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    disabledContainer: {
        borderColor: 'transparent',
        backgroundColor: '#edeff1'
    },
})

const defaultProps: SelectPickerProps = {
    isModal: true,
    autoDismiss: true,
    placeholder: 'Select',
    mode: 'dialog',
}

SelectPicker.defaultProps = defaultProps;

export default SelectPicker;


