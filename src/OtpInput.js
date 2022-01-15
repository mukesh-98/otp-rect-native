import {
	Platform,
	SafeAreaView,
	StatusBar,
	StyleSheet,
	TextInput,
	Keyboard,
} from "react-native";
import React, { Component } from "react";

export default class OtpInput extends Component {
	inputs = new Array(this.props.numberOfInputs).fill(1).map((ele, index) => {
		return {
			refs: React.createRef(null),
		};
	});

	constructor(prop) {
		super(prop);
		this.state = {};
	}

	shouldComponentUpdate(prevState, nextState) {
		if (prevState !== nextState) {
			return true;
		} else {
			return false;
		}
	}

	componentDidUpdate() {
		this.handleDoneOtp();
	}

	handleDoneOtp = () => {
		let doneOtp = Object.values(this.state).join("");
		if (doneOtp.length === this.props.numberOfInputs) {
			Keyboard.dismiss();
			this.props.onDone(doneOtp);
		}
	};

	componentDidMount() {
		this.inputs[0].refs.current.focus();
	}

	componentWillUnmount() {
		this.setState({});
	}

	render() {
		const styles = StyleSheet.create({
			container: {
				marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
				flex: 1,
				zIndex: 1,
				height: 50,
				flexDirection: "row",
				justifyContent: "center",
				...this.props.inputContainerStyles,
			},
			input: {
				height: 40,
				zIndex: 1,
				margin: 12,
				borderWidth: 1,
				padding: 10,
				width: 40,
				borderRadius: 5,
				backgroundColor: "white",
				...this.props.inputStyles,
			},
		});

		return (
			<SafeAreaView style={styles.container}>
				{this.inputs.map((ele, index) => (
					<TextInput
						key={index}
						keyboardType="numeric"
						ref={this.inputs[index].refs}
						style={styles.input}
						onKeyPress={({ nativeEvent: { key: keyValue } }) => {
							if (
								keyValue === "Backspace" &&
								this.inputs[index - 1] &&
								this.state[index]
							) {
								this.inputs[index - 1].refs.current.focus();
							}
						}}
						maxLength={1}
						onChange={({ nativeEvent: { text } }) => {
							this, this.setState((prev) => ({ ...prev, [index]: text }));
							if (this.inputs[index + 1] && !this.state[index]) {
								this.inputs[index + 1].refs.current.focus();
							}
							this.props.onChangeInput(text);
						}}
					/>
				))}
			</SafeAreaView>
		);
	}
}
