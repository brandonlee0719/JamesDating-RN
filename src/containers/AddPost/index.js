import React, { Component } from "react";
import { View, ScrollView } from "react-native";
import { connect } from "react-redux";
import { Button, Forminput, Header } from "../../components";
import { Metrix, NavigationService } from "../../config";
import { AppAction } from "../../store/actions";
import styles from "./styles";

class Home extends Component {

    state = {
        title: "",
        body: "",
        titleErrMsg: "",
        bodyErrMsg: ""
    }

    addPost = () => {
        const { title, body } = this.state;
        const { AddPost } = this.props;
        if (!title && !body)
            this.setState({ bodyErrMsg: "Please fill all fields." })
        else if (!title)
            this.setState({ titleErrMsg: "Please enter title." })
        else if (!body)
            this.setState({ bodyErrMsg: "Please add description." })
        else {
            AddPost({ title, body })
            this.setState({ title: "", body: "" })
        }
    }

    render() {
        const { title, body, titleErrMsg, bodyErrMsg } = this.state
        return (
            <View style={styles.container}>
                <Header.Standard
                    leftIconName={"arrow-left"}
                    onPressLeft={NavigationService.goBack}
                    Heading={"Add Post"}
                />
                <ScrollView
                    contentInsetAdjustmentBehavior="automatic"
                    keyboardShouldPersistTaps="handled"
                    keyboardDismissMode="interactive"
                    style={{ width: "100%" }}>

                    <View style={styles.content}>
                        <Forminput.TextField
                            placeholder="Title"
                            returnKeyType="next"
                            onChangeText={(title) => { this.setState({ title, titleErrMsg: "" }) }}
                            value={title}
                            blurOnSubmit={false}
                            errMsg={titleErrMsg}
                            containerStyle={{ marginTop: Metrix.VerticalSize(25) }}
                            onSubmitEditing={() => { this.bodyInputRef.focus() }}
                        />
                        <Forminput.TextArea
                            placeholder="Description"
                            reference={(ref) => { this.bodyInputRef = ref }}
                            onChangeText={(body) => { this.setState({ body, bodyErrMsg: "" }) }}
                            errMsg={bodyErrMsg}
                            value={body}
                            containerStyle={{ marginVertical: Metrix.VerticalSize(25) }}
                        />

                        <Button.Standard
                            text="Add Post"
                            onPress={this.addPost}
                        />
                    </View>
                </ScrollView>
            </View>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        AddPost: (payload) => { dispatch(AppAction.AddPost(payload)) },
        Logout: () => { dispatch(AppAction.Logout()) }
    }
}

export default connect(null, mapDispatchToProps)(Home);