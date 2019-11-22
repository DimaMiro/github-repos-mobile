import React from 'react';
import {Image, TouchableOpacity} from 'react-native';
import images from "../res/images";

const TouchableIcon = (props) => {
    const iconName: string = props.iconName;
    return (
        <TouchableOpacity
            onPress={props.onPressAction}>
            <Image source={images[iconName]}/>
        </TouchableOpacity>
    )
}

export default TouchableIcon
