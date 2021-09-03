import { NuButton, Separator } from 'components';
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { AppColors } from 'core/colors';
import { WalletTestIDs } from 'screens/wallet/types';

const WalletErrorLoad: React.FC<{ onPress?: () => void }> = ({ onPress }) => {
  return (
    <View style={styles.content} testID={WalletTestIDs.WalletError}>
      <MaterialIcons name="error-outline" size={48} color={AppColors.primary} />
      <Separator />
      <Text style={styles.text}>Ops! Ocorreu algum error inesperado.</Text>
      <Separator size="M" />
      <NuButton
        onPress={onPress}
        style={styles.button}
        variant="outline"
        text="Tentar novamente"
      />
    </View>
  );
};

export default WalletErrorLoad;

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: AppColors.white,
  },
  button: {
    width: '100%',
    maxWidth: 280,
  },
  text: {
    fontSize: 14,
    color: AppColors.darkLight,
    lineHeight: 24,
  },
});
