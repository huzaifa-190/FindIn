import { StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import { TextInput } from 'react-native-paper';
import colors from '../Constants/Colors';

export default function InputField({
  label = '',
  maxLength = 100,
  isSecureTextEntry = false,
  value = '',
  onChangeText = () => {}
}) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <View>
      <TextInput
        secureTextEntry={isSecureTextEntry && !isVisible ? true : false}
        mode='outlined'
        label={label}
        outlineColor={colors.grey}
        outlineStyle={styles.outLine}
        maxLength={maxLength}
        textColor={colors.grey}
        style={{ fontSize: 14, color: colors.grey }}
        dense={true}
        value={value}
        onChangeText={onChangeText}
        right={
          isSecureTextEntry
            ? isVisible
              ? <TextInput.Icon icon="eye-off" size={20} onPress={() => setIsVisible(!isVisible)} />
              : <TextInput.Icon icon="eye" size={20} onPress={() => setIsVisible(!isVisible)} />
            : null
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  outLine: {
    marginBottom: 10,
    padding: 12,
    height: 50,
    borderRadius: 10,
    borderColor: colors.grey,
    borderWidth: 0.5,
  },
});
