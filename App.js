import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';

export default function App() {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // Hàm xử lý việc chỉ cho phép nhập số và tự động định dạng
    const handlePhoneNumberChange = (text) => {
        // Loại bỏ tất cả các ký tự không phải số
        const numericValue = text.replace(/[^0-9]/g, '');

        // Định dạng lại số điện thoại (ví dụ: 123-456-7890)
        let formattedNumber = numericValue;
        if (numericValue.length > 3 && numericValue.length <= 6) {
            formattedNumber = `${numericValue.slice(0, 3)}-${numericValue.slice(3)}`;
        } else if (numericValue.length > 6) {
            formattedNumber = `${numericValue.slice(0, 3)}-${numericValue.slice(3, 6)}-${numericValue.slice(6)}`;
        }

        setPhoneNumber(formattedNumber);
        setErrorMessage(''); // Xóa thông báo lỗi khi người dùng nhập liệu
    };

    // Hàm xử lý khi người dùng nhấn nút "Tiếp tục"
    const handleContinuePress = () => {
        // Xóa các ký tự định dạng để chỉ còn lại số
        const plainNumber = phoneNumber.replace(/[^0-9]/g, '');

        if (plainNumber.length !== 10) {
            setErrorMessage('Số điện thoại không hợp lệ. Vui lòng nhập 10 số.');
        } else {
            alert('Số điện thoại: ' + plainNumber);
            setErrorMessage(''); // Xóa lỗi nếu số điện thoại hợp lệ
        }
    };

    return (
        <View style={styles.container}>
            {/* Phần tiêu đề Đăng nhập luôn ở trên cùng */}
            <View style={styles.headerContainer}>
                <Text style={styles.header}>Đăng nhập</Text>
            </View>

            {/* Phần nhập liệu và nút Tiếp tục */}
            <KeyboardAvoidingView
                style={styles.innerContainer}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                {/* Hướng dẫn nhập số điện thoại */}
                <Text style={styles.subHeader}>Nhập số điện thoại</Text>
                <Text style={styles.description}>
                    Dùng số điện thoại để đăng nhập hoặc đăng ký tài khoản tại OneHousing Pro
                </Text>

                {/* Trường nhập số điện thoại */}
                <TextInput
                    style={styles.input}
                    placeholder="Nhập số điện thoại của bạn"
                    keyboardType="numeric" // Chỉ nhập bằng bàn phím số
                    value={phoneNumber}
                    onChangeText={handlePhoneNumberChange} // Chỉ cho phép nhập số và định dạng lại
                    maxLength={12} // Giới hạn độ dài (bao gồm dấu gạch ngang)
                />

                {/* Hiển thị thông báo lỗi nếu có */}
                {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

                {/* Nút Tiếp tục */}
                <TouchableOpacity style={styles.button} onPress={handleContinuePress}>
                    <Text style={styles.buttonText}>Tiếp tục</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </View>
    );
}

// Styles cho giao diện
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    headerContainer: {
        backgroundColor: '#fff', // Màu nền cho tiêu đề
        paddingTop: 50, // Đảm bảo phần tiêu đề không chạm vào mép trên màn hình
        paddingBottom: 20, // Khoảng cách dưới tiêu đề
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    innerContainer: {
        flex: 1,
        paddingHorizontal: 20,
        justifyContent: 'center', // Canh giữa nội dung theo chiều dọc
    },
    subHeader: {
        fontSize: 18,
        fontWeight: '600',
    },
    description: {
        fontSize: 14,
        color: '#666',
        marginBottom: 30,
    },
    input: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#eee',
        paddingVertical: 15,
        alignItems: 'center',
        borderRadius: 5,
    },
    buttonText: {
        fontSize: 18,
        color: '#000',
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
    },
});
