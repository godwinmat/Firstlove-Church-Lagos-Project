import React from "react";
import { Portal, Modal } from "react-native-paper";

function CustomModal({
	onDismiss,
	visible,
	contentContainerStyle,
	modalWrapperStyle,
	children,
}) {
	return (
		<Portal>
			<Modal
				visible={visible}
				onDismiss={onDismiss}
				contentContainerStyle={contentContainerStyle}
				style={modalWrapperStyle}
			>
				{children}
			</Modal>
		</Portal>
	);
}

export default CustomModal;
