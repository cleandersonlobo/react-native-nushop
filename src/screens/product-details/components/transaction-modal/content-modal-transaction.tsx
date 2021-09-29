import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ProductDetailsIDs } from 'screens/product-details/types';
import { Ionicons } from '@expo/vector-icons';
import { NuButton, Separator } from 'components';
import { SeparatorSizes } from 'components/separator';
import { AppColors } from 'core/colors';

interface Props {
  status?: string;
  message: string;
  onClose: () => void;
  onPressToBuy: () => void;
  loading: boolean;
  onPressSeenHistory: () => void;
}

const ContenModalTransaction: React.FC<Props> = ({
  status,
  message,
  onClose,
  onPressSeenHistory,
  onPressToBuy,
  loading,
}) => {
  const iconProps: { name: keyof typeof Ionicons.glyphMap; color: string } =
    React.useMemo(() => {
      if (!status)
        return {
          name: 'md-thumbs-up-outline',
          color: AppColors.darkLight,
        };
      if (status === 'success') {
        return { name: 'md-happy-outline', color: AppColors.success };
      }
      return { name: 'md-sad-outline', color: AppColors.secondary };
    }, [status]);

  return (
    <>
      <View style={styles.contentText}>
        <Ionicons size={60} {...iconProps} />
        <Separator />
        <Text style={styles.text}>{message}</Text>
        <Separator />
      </View>

      <Separator size={SeparatorSizes.M} />
      {!status && (
        <NuButton
          testID={ProductDetailsIDs.ConfirmTransaction}
          variant="purple"
          text="Confirmar"
          disabled={loading}
          loading={loading}
          onPress={onPressToBuy}
          accessibilityLabel="Confirm buy"
          fullWidth
        />
      )}
      {status === 'success' && (
        <NuButton
          testID={ProductDetailsIDs.ButtonSeenHistory}
          text="Ver histórico"
          fullWidth
          onPress={onPressSeenHistory}
          accessibilityLabel="See my history transactions"
        />
      )}
      <Separator />
      <NuButton
        testID={ProductDetailsIDs.CloseTransactionModal}
        text="Fechar"
        variant={status && status !== 'success' ? 'outline' : 'text'}
        accessibilityLabel="Close modal"
        fullWidth
        onPress={onClose}
      />
    </>
  );
};

export default ContenModalTransaction;

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    color: AppColors.dark,
    paddingHorizontal: 20,
    fontWeight: '500',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 24,
    color: AppColors.darkLight,
  },
  contentText: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
