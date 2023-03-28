import React from "react";
import { TextInput, View } from "react-native";

import { styles } from "./commentStyle"


const CommentComponent = () => {
    const [comment, setComment] = React.useState('');
    return (
        <View style={styles.textAreaContainer}>
            <TextInput
                style={styles.textArea}
                underlineColorAndroid="transparent"
                placeholder="Commentaires"
                placeholderTextColor="grey"
                numberOfLines={50}
                multiline={true}
                onChangeText={(text) => setComment(text)}
                value={comment} />
        </View>

    );
}

export default CommentComponent;