import React from 'react';
import {
    View,
    Text,
    ViewStyle,
    StyleProp,
    StyleSheet,
    TextStyle
} from 'react-native';
import Styles from './Styles';

interface Props {
    titleContainerStyle?: StyleProp<ViewStyle>,
    titleTextStyle?: StyleProp<TextStyle>,
    title?: string,
    required?: boolean,
    requiredIconColor?: string,
}

const Title: React.StatelessComponent<Props> = (props) => {
    return (
        <View style={[styles.titleContainer, props.titleContainerStyle]}>
            <Text style={props.titleTextStyle}>
                {props.title}
            </Text>
            {props.required &&
                <Text style={[styles.required, { color: props.requiredIconColor ?? Styles.color.black }]}>
                    {'*'}
                </Text>
            }
        </View>
    )
};

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
    },
    required: {
        marginLeft: 3,
        fontSize: Styles.fontSize.default,
    },
})

export default Title;