import React from 'react';
import {
  StyleSheet,
  Text,
  Modal,
  View,
  TouchableWithoutFeedback,
} from 'react-native';
import { AppColors } from 'core/colors';
import { Ionicons } from '@expo/vector-icons';
import { NuButton, Separator } from 'components';
import { SeparatorSizes } from 'components/separator';
import { useNavigation } from '@react-navigation/native';
import { WalletRoutes } from 'screens/wallet/routes';
import { RootRoutes } from 'navigation/routes';
import { ptBRErrors } from 'domain/checkout/utils/locale-errors';
import { ProductDetailsIDs } from 'screens/product-details/types';
import { TransactionMessages } from 'domain/checkout/checkout.interface';

const TransactionModal: React.FC<{
  text?: string | null;
  visible?: boolean;
  status?: string;
  onClose: () => void;
}> = ({ visible, status, onClose, text }) => {
  const navigation = useNavigation();

  const navigateToWallet = () => {
    onClose?.();
    navigation.navigate(
      RootRoutes.AppStack as never,
      {
        screen: WalletRoutes.Home,
      } as never,
    );
  };

  const textMsg = React.useMemo(() => {
    if (ptBRErrors[text || '']) return ptBRErrors[text || ''];
    if (status === 'success') return TransactionMessages.PurchaseSuccessfully;
    return TransactionMessages.InsufficientFunds;
  }, [status, text]);

  return (
    <Modal
      animationType="slide"
      transparent
      visible={visible}
      onRequestClose={onClose}
      onDismiss={onClose}>
      <View style={styles.modal}>
        <TouchableWithoutFeedback
          onPress={onClose}
          testID={ProductDetailsIDs.TransactionModal}>
          <View style={styles.content}>
            <View style={styles.contentText}>
              <Ionicons
                name={
                  status === 'success' ? 'md-happy-outline' : 'md-sad-outline'
                }
                size={60}
                color={
                  status === 'success' ? AppColors.success : AppColors.secondary
                }
              />
              <Separator />
              <Text style={styles.text}>{textMsg}</Text>
              <Separator />
            </View>
            <NuButton
              testID={ProductDetailsIDs.CloseTransactionModal}
              text="Fechar"
              variant="outline"
              accessibilityLabel="Close modal"
              fullWidth
              onPress={onClose}
            />
            <Separator size={SeparatorSizes.M} />
            {status === 'success' && (
              <NuButton
                testID={ProductDetailsIDs.ButtonSeenHistory}
                text="Ver histórico"
                fullWidth
                onPress={navigateToWallet}
                accessibilityLabel="See my history transactions"
              />
            )}
          </View>
        </TouchableWithoutFeedback>
      </View>
    </Modal>
  );
};

export default TransactionModal;

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    padding: 20,
  },
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
  content: {
    alignItems: 'center',
    justifyContent: 'space-between',
    top: '25%',
    backgroundColor: AppColors.white,
    padding: 20,
    minHeight: 220,
    minWidth: 280,
    maxWidth: 500,
    borderRadius: 20,
    shadowColor: AppColors.shadowColor,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 2,
    shadowRadius: 10,
  },
});
