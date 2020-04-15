import React from 'react';
import {
    View,
    StyleSheet,
    Modal,
    StyleProp,
    TextStyle,
    ViewStyle,
    TouchableOpacity,
} from 'react-native';
import ActionButton from './ActionButton';
import Styles from './Styles';

export interface PickerModalProps {
    show?: boolean,
    leftButtonText?: string,
    middleButtonText?: string,
    rightButtonText?: string,
    leftButtonTextStyle?: StyleProp<TextStyle>,
    middleButtonTextStyle?: StyleProp<TextStyle>,
    rightButtonTextStyle?: StyleProp<TextStyle>,
    onLeftButtonPress?: () => void,
    onMiddleButtonPress?: () => void,
    onRightButtonPress?: () => void,
    onModalPress?: () => void,
    modalContainerStyle?: StyleProp<ViewStyle>,
    pickerContainerStyle?: StyleProp<ViewStyle>,
}

const PickerModal: React.StatelessComponent<PickerModalProps> = (props) => {
    return (
        <Modal
            transparent={true}
            visible={props.show}
        >
            <View style={[styles.modalContainer, props.modalContainerStyle]}>
                <TouchableOpacity style={styles.back} activeOpacity={1} onPress={props.onModalPress} />
                <View style={[styles.pickerContainer, props.pickerContainerStyle]}>
                    <View style={styles.pickerActionsButtons}>
                        <ActionButton
                            label={props.leftButtonText}
                            onPress={props.onLeftButtonPress}
                            containerStyle={styles.leftActionButtonContainer}
                            labelStyle={[
                                styles.actionButtonText,
                                styles.leftButtonText,
                                props.leftButtonTextStyle
                            ]}
                        />
                        <ActionButton
                            label={props.middleButtonText}
                            onPress={props.onMiddleButtonPress}
                            containerStyle={styles.middleActionButtonContainer}
                            labelStyle={[
                                styles.actionButtonText,
                                styles.middleButtonText,
                                props.middleButtonTextStyle,
                            ]}
                        />
                        <ActionButton
                            label={props.rightButtonText}
                            onPress={props.onRightButtonPress}
                            containerStyle={styles.rightActionButtonContainer}
                            labelStyle={[
                                styles.actionButtonText,
                                styles.rightButtonText,
                                props.rightButtonTextStyle
                            ]}
                        />
                    </View>
                    {props.children}
                </View>
            </View>
        </Modal>

    );
};

const defaultProps:PickerModalProps={
    rightButtonText: 'Close',
};

PickerModal.defaultProps = defaultProps;

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: Styles.color.black055,
    },
    pickerContainer: {
        backgroundColor: Styles.color.white,
    },
    pickerActionsButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: Styles.color.white,
        borderBottomWidth: 1,
        borderBottomColor: Styles.color.gray,
    },
    leftActionButtonContainer: {
        flex: 1,
        paddingLeft: Styles.spacing.padding,
    },
    middleActionButtonContainer: {
        flex: 1,
    },
    rightActionButtonContainer: {
        flex: 1,
        paddingRight: Styles.spacing.padding,
    },
    actionButtonText: {
        color: Styles.color.blue,
        fontSize: Styles.fontSize.default,
        fontWeight: '500',
        paddingVertical: Styles.spacing.padding,
    },
    leftButtonText: {
        textAlign: "left",
        paddingLeft: Styles.spacing.padding,
    },
    middleButtonText: {
        textAlign: "center",
    },
    rightButtonText: {
        textAlign: 'right',
        paddingRight: Styles.spacing.padding,
    },
    back: {
        height: '100%'
    },
})


export default PickerModal;