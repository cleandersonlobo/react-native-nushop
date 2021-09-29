import React from 'react';
import {
  StyleSheet,
  Modal,
  View,
  TouchableWithoutFeedback,
} from 'react-native';
import { AppColors } from 'core/colors';
import { useNavigation } from '@react-navigation/native';
import { WalletRoutes } from 'screens/wallet/routes';
import { RootRoutes } from 'navigation/routes';
import { ptBRErrors } from 'domain/checkout/utils/locale-errors';
import { ProductDetailsIDs } from 'screens/product-details/types';
import { TransactionMessages } from 'domain/checkout/checkout.interface';
import { WalletErros } from 'domain/wallet';
import ContentModalTranscation from './content-modal-transaction';

const TransactionModal: React.FC<{
  text?: string | null;
  visible?: boolean;
  loading: boolean;
  status?: string;
  onClose: () => void;
  onConfirmTransaction: () => void;
}> = ({ visible, status, onClose, text, onConfirmTransaction, loading }) => {
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
    if (ptBRErrors[text || '']) return ptBRErrors[text as string];
    if (status === WalletErros.Success) {
      return TransactionMessages.PurchaseSuccessfully;
    }
    if (status === WalletErros.WithoutBalance) {
      return TransactionMessages.InsufficientFunds;
    }
    return TransactionMessages.QuestionToConfirmTransaction;
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
            <ContentModalTranscation
              status={status}
              loading={loading}
              onClose={onClose}
              message={textMsg}
              onPressToBuy={onConfirmTransaction}
              onPressSeenHistory={navigateToWallet}
            />
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
