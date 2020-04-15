import React from 'react';
import {
    StyleProp,
    ViewStyle,
    TextStyle,
    TouchableHighlight,
    Text,
} from 'react-native';
import Styles from './Styles';

interface ActionButtonProps {
    containerStyle?: StyleProp<ViewStyle>,
    onPress?: () => void,
    label?: string,
    labelStyle?: StyleProp<TextStyle>,
}

const ActionButton: React.StatelessComponent<ActionButtonProps> = (props) => {
    return (
        <TouchableHighlight
            underlayColor={Styles.color.white}
            onPress={props.onPress}
            style={props.containerStyle}>
            <Text
                style={props.labelStyle}
            >
                {props.label}
            </Text>
        </TouchableHighlight>
    )
}

export default ActionButton;